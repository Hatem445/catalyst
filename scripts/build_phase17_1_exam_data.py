from __future__ import annotations

import json
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path

from pypdf import PdfReader

BASE = Path(__file__).resolve().parents[1]
PDF_DIR = BASE / 'sources' / 'exams' / 'official-2026'
OUT_QUESTIONS = BASE / 'assets' / 'data' / 'exams' / 'official-2026-models.json'
OUT_SOURCE_MAP = BASE / 'assets' / 'data' / 'exams' / 'source-map-2026.json'
OUT_WORKED = BASE / 'assets' / 'data' / 'worked-examples.json'

TARGET_BY_KEY = {
    'organic': 25,
    'ionic': 20,
    'electro': 20,
    'analytical': 15,
    'transition': 10,
    'mixed': 10,
}

CHAPTER_TITLES = {
    'organic': 'الكيمياء العضوية',
    'ionic': 'الاتزان والاتزان الأيوني',
    'electro': 'الكيمياء الكهربية',
    'analytical': 'التحليل الكيميائي',
    'transition': 'العناصر الانتقالية والحديد',
    'mixed': 'مهارات مختلطة ورسوم بيانية',
}

TOPIC_BY_KEY = {
    'organic': 'organic_conversions',
    'ionic': 'Ksp_pH_hydrolysis',
    'electro': 'Faraday_E_cell_batteries_corrosion',
    'analytical': 'titration_qualitative_analysis',
    'transition': 'transition_elements_iron_alloys',
    'mixed': 'mixed_skills_graphs_tables',
}

LAW_REFS_BY_KEY = {
    'organic': ['moles'],
    'ionic': ['ksp', 'ph'],
    'electro': ['faraday', 'ecell'],
    'analytical': ['titration'],
    'transition': ['moles'],
    'mixed': ['moles'],
}

CHAPTER_KEYWORDS = {
    'organic': [
        'ألكان', 'ألكين', 'ألكاين', 'ألكاينات', 'ألكينات', 'كحـول', 'كحول', 'إستر',
        'استر', 'ألدهيد', 'كيتون', 'حمض كربوكسيلي', 'هاليد', 'عضوية', 'بنزين',
        'بلمرة', 'إضافة', 'إحلال', 'أسترة', 'ester', 'alkane', 'alkene', 'alkyne'
    ],
    'ionic': [
        'اتزان', 'Ksp', 'pH', 'pOH', 'Ka', 'Kb', 'Kw', 'ذوبان', 'ذائبية',
        'هيدروليز', 'تأين', 'حمض', 'قاعدة', 'اوسـتفالد', 'أوستفالد',
    ],
    'electro': [
        'فاراداي', 'خلية', 'أنود', 'كاثود', 'تحليل كهربي', 'تيار', 'جهد',
        'بطارية', 'تآكل', 'صدأ', 'الكتروليت', 'E_cell', 'electrode',
    ],
    'analytical': [
        'معايرة', 'راسب', 'تحليل نوعي', 'كاشف', 'كرومات', 'برمنجنات', 'كلوريد الباريوم',
        'أسيتات الرصاص', 'أيون', 'تعادل', 'ملح',
    ],
    'transition': [
        'انتقالية', 'حديد', 'حديدوز', 'حديديك', 'سبيكة', 'سبائك', 'منجنيز', 'كروم',
        'فاناديوم', 'تيتانيوم', 'نحاس', 'نيكل',
    ],
}

START_PAT = re.compile(r'^\s*([0-9٠-٩]{1,2})\s*[-–]\s*(.*)$')
OPT_PAT = re.compile(r'^\s*\(\s*([أ-دABCDabcd])\s*\)\s*(.*)$')


def norm_digits(s: str) -> str:
    return s.translate(str.maketrans('٠١٢٣٤٥٦٧٨٩', '0123456789'))


def clean_line(line: str) -> str:
    line = line.replace('\u200f', ' ').replace('\u200e', ' ')
    line = re.sub(r'\s+', ' ', line)
    return line.strip()


def classify_question(text: str) -> str:
    low = text.lower()
    scores = {k: 0 for k in CHAPTER_KEYWORDS.keys()}
    for key, kws in CHAPTER_KEYWORDS.items():
        for kw in kws:
            if kw.lower() in low:
                scores[key] += 1
    key = max(scores, key=scores.get)
    if scores[key] == 0:
        return 'mixed'
    return key


def difficulty_from_text(text: str) -> str:
    ln = len(text)
    if ln > 380:
        return 'صعب'
    if ln > 210:
        return 'متوسط'
    return 'سهل'


def parse_question_blocks(pdf: Path):
    reader = PdfReader(str(pdf))
    current = None
    blocks = []
    unreadable_pages = []

    for page_i, page in enumerate(reader.pages, start=1):
        raw = page.extract_text() or ''
        if len(raw.strip()) < 80:
            unreadable_pages.append(page_i)
            continue

        lines = [clean_line(x) for x in raw.splitlines()]
        lines = [x for x in lines if x]

        for line in lines:
            m = START_PAT.match(line)
            if m:
                num = int(norm_digits(m.group(1)))
                if 1 <= num <= 60:
                    if current:
                        blocks.append(current)
                    current = {
                        'qnum': num,
                        'page': page_i,
                        'lines': [clean_line(m.group(2))] if clean_line(m.group(2)) else [],
                    }
                    continue
            if current:
                current['lines'].append(line)

    if current:
        blocks.append(current)

    return blocks, unreadable_pages, len(reader.pages)


def parse_mcq_from_block(block: dict):
    lines = block['lines']
    opt_starts = []
    for i, line in enumerate(lines):
        if OPT_PAT.match(line):
            opt_starts.append(i)

    if len(opt_starts) < 4:
        return None, 'no-4-options'

    opt_starts = opt_starts[:4]

    stem_lines = [x for x in lines[:opt_starts[0]] if x]
    if not stem_lines:
        return None, 'empty-stem'

    options = []
    for idx, start in enumerate(opt_starts):
        end = opt_starts[idx + 1] if idx + 1 < len(opt_starts) else len(lines)
        chunk = lines[start:end]
        if not chunk:
            continue
        first = chunk[0]
        m = OPT_PAT.match(first)
        first_text = m.group(2).strip() if m else first
        rest = [x for x in chunk[1:] if x and not START_PAT.match(x)]
        full = ' '.join([first_text] + rest).strip()
        options.append(full)

    if len(options) != 4:
        return None, 'options-not-4'

    stem = ' '.join(stem_lines).strip()
    return {'stem': stem, 'choices': options}, None


def build_official_questions():
    all_records = []
    source_stats = {
        'version': 'phase17.1-v1',
        'generatedAt': datetime.utcnow().isoformat() + 'Z',
        'strategy': 'official-first-from-local-pdfs',
        'files': [],
        'questionSourceIndex': {},
    }

    for pdf in sorted(PDF_DIR.glob('Chemistry_AR_Model_*_2026.pdf')):
        model_match = re.search(r'Model_(\d+)_2026', pdf.name)
        model_num = int(model_match.group(1)) if model_match else 0
        blocks, unreadable_pages, total_pages = parse_question_blocks(pdf)

        parsed = 0
        unreadable_q = []
        seq = 0
        for b in blocks:
            parsed_q, err = parse_mcq_from_block(b)
            if parsed_q is None:
                unreadable_q.append({'qnum': b['qnum'], 'page': b['page'], 'reason': err})
                continue

            parsed += 1
            seq += 1
            text_for_class = parsed_q['stem'] + ' ' + ' '.join(parsed_q['choices'])
            chapter_key = classify_question(text_for_class)
            qid = f"off2026_m{model_num:02d}_q{b['qnum']:02d}_{seq:02d}"

            rec = {
                'id': qid,
                'year': 2026,
                'sourceType': 'official',
                'sourceConfidence': 'official',
                'sourceRef': f'{pdf.name} | Model {model_num} | Page {b["page"]}',
                'form': f'Model-{model_num}',
                'chapter': CHAPTER_TITLES[chapter_key],
                'topic': TOPIC_BY_KEY[chapter_key],
                'skill': 'تحليل سؤال رسمي من نموذج الوزارة',
                'difficulty': difficulty_from_text(parsed_q['stem']),
                'stemType': 'multiple-choice',
                'marks': 1,
                'question': parsed_q['stem'],
                'choices': parsed_q['choices'],
                'answerKey': 0,
                'isAnswerVerified': False,
                'explanation': 'سؤال رسمي مستخرج من نموذج 2026. مفتاح الإجابة الرسمي غير متاح داخل هذا الملف، لذلك لا يتم احتساب تصحيحه تلقائياً حالياً.',
                'trapTags': ['official-key-missing'],
                'lawRefs': LAW_REFS_BY_KEY[chapter_key],
                'workedExampleRef': '',
                'officialStatus': 'official-extracted-unverified-answer',
            }
            all_records.append(rec)
            source_stats['questionSourceIndex'][qid] = {
                'pdf': pdf.name,
                'model': model_num,
                'page': b['page'],
                'official': True,
                'answerVerified': False,
            }

        source_stats['files'].append({
            'file': pdf.name,
            'model': model_num,
            'totalPages': total_pages,
            'parsedQuestionBlocks': len(blocks),
            'extractedQuestions': parsed,
            'unreadablePages': unreadable_pages,
            'unreadableQuestions': unreadable_q,
        })

    return all_records, source_stats


def make_synthetic_question(key: str, idx: int):
    chapter = CHAPTER_TITLES[key]
    topic = TOPIC_BY_KEY[key]
    base_id = f'syn2026_{key}_{idx:03d}'

    if key == 'ionic':
        c = round(0.01 + (idx % 9) * 0.01, 2)
        ph = round(-1 * __import__('math').log10(c), 2)
        wrong1 = round(ph + 1, 2)
        wrong2 = round(ph - 0.7, 2)
        wrong3 = round(14 - ph, 2)
        choices = [f'{ph}', f'{wrong1}', f'{wrong2}', f'{wrong3}']
        answer = 0
        q = f'احسب pH لمحلول حمض قوي أحادي البروتون تركيزه {c} mol/L عند 25°C.'
        exp = f'لأن الحمض قوي: [H+] = {c}. إذن pH = -log[H+] = {ph}.'
        trap = ['ph-poh-swap']
        laws = ['ph']
        skill = 'حساب pH من تركيز حمض قوي'
    elif key == 'electro':
        I = 2 + (idx % 4)
        t = 300 + (idx % 5) * 120
        q_val = I * t
        choices = [str(q_val), str(q_val + 120), str(q_val - 60), str(q_val * 2)]
        answer = 0
        q = f'في خلية تحليل كهربي مر بها تيار شدته {I} A لمدة {t} s. احسب كمية الكهرباء Q بالكولوم.'
        exp = f'Q = I × t = {I} × {t} = {q_val} C.'
        trap = ['unit-time-mismatch']
        laws = ['faraday']
        skill = 'تطبيق قانون فاراداي الأول'
    elif key == 'analytical':
        ma = round(0.1 + (idx % 6) * 0.05, 2)
        va = 25
        mb = round(0.1 + (idx % 4) * 0.05, 2)
        vb = round((ma * va) / mb, 2)
        choices = [str(vb), str(round(vb + 5, 2)), str(round(vb - 4, 2)), str(round(vb * 2, 2))]
        answer = 0
        q = f'عند نقطة التكافؤ في معايرة حمض أحادي بقاعدة أحادية: إذا كان Ma={ma} M وVa={va} mL وMb={mb} M، احسب Vb.'
        exp = 'لأن n متساوية: MaVa = MbVb، إذن Vb = (Ma×Va)/Mb.'
        trap = ['ignore-equivalents']
        laws = ['titration']
        skill = 'حل مسائل المعايرة'
    elif key == 'transition':
        q = 'أي عبارة صحيحة عن عناصر السلسلة الانتقالية الأولى؟'
        choices = [
            'تتميز بتعدد حالات التأكسد وتكوين مركبات ملونة.',
            'لا تكون أيونات موجبة في المحاليل المائية.',
            'جميعها لا تتفاعل مع الأكسجين.',
            'لا تُظهر أي خواص مغناطيسية.',
        ]
        answer = 0
        exp = 'تعدد حالات التأكسد ووجود إلكترونات d غير ممتلئة يفسر اللون والخواص المغناطيسية.'
        trap = ['memorization-trap']
        laws = ['moles']
        skill = 'فهم خواص العناصر الانتقالية'
    elif key == 'organic':
        q = 'في تفاعل إضافة Br2 على الإيثين C2H4، ما الناتج العضوي المباشر؟'
        choices = ['1,2-ثنائي بروموإيثان', 'إيثانول', 'إيثانال', 'إيثان']
        answer = 0
        exp = 'تنكسر رابطة π في الألكين وتحدث إضافة عبر الرابطة المزدوجة لينتج ثنائي هاليد متجاور.'
        trap = ['addition-vs-substitution']
        laws = ['moles']
        skill = 'تمييز تفاعلات الإضافة في العضوية'
    else:
        q = 'من قراءة منحنى تغير التركيز مع الزمن، ما الدلالة على وصول النظام للاتزان؟'
        choices = [
            'ثبات تراكيز المتفاعلات والنواتج مع الزمن.',
            'اختفاء أحد المتفاعلات تماماً.',
            'وصول درجة الحرارة للصفر.',
            'توقف التصادمات الجزيئية.',
        ]
        answer = 0
        exp = 'عند الاتزان الديناميكي تثبت التراكيز رغم استمرار التفاعلين الأمامي والعكسي.'
        trap = ['equilibrium-static-misconception']
        laws = ['moles']
        skill = 'قراءة الرسوم البيانية'

    return {
        'id': base_id,
        'year': 2026,
        'sourceType': 'practice-generated',
        'sourceConfidence': 'synthetic',
        'sourceRef': 'generated to match official 2026 exam pattern',
        'form': 'Practice-2026',
        'chapter': chapter,
        'topic': topic,
        'skill': skill,
        'difficulty': 'متوسط' if idx % 3 else 'صعب',
        'stemType': 'multiple-choice',
        'marks': 1,
        'question': q,
        'choices': choices,
        'answerKey': answer,
        'isAnswerVerified': True,
        'explanation': exp,
        'trapTags': trap,
        'lawRefs': laws,
        'workedExampleRef': '',
        'officialStatus': 'practice-verified',
    }


def build_worked_examples():
    examples = [
        {
            'id': 'we_ksp_2026_01',
            'title': 'Ksp (ملح 1:1)',
            'topic': 'Ksp_pH_hydrolysis',
            'question': 'احسب الذوبانية المولارية x لملح يتفكك 1:1 إذا Ksp=9×10^-10.',
            'given': ['Ksp=9×10^-10', 'التفكك: AB ⇌ A+ + B-'],
            'lawRefs': ['ksp'],
            'steps': ['للتفكك 1:1: Ksp=x²', 'x=√Ksp=3×10^-5 mol/L'],
            'finalAnswer': 'x = 3×10^-5 mol/L',
            'sanityCheck': 'الوحدة mol/L وقيمة صغيرة مناسبة لملح قليل الذوبان.',
            'commonMistake': 'نسيان أخذ الجذر التربيعي.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_ph_2026_01',
            'title': 'pH لحمض قوي',
            'topic': 'Ksp_pH_hydrolysis',
            'question': 'احسب pH لمحلول HCl تركيزه 10^-3 M.',
            'given': ['[H+]=10^-3 M'],
            'lawRefs': ['ph'],
            'steps': ['pH=-log[H+]', 'pH=3'],
            'finalAnswer': 'pH = 3',
            'sanityCheck': 'أقل من 7 إذن المحلول حمضي.',
            'commonMistake': 'استخدام pOH بدل pH.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_ka_2026_01',
            'title': 'حمض ضعيف وثابت التأين Ka',
            'topic': 'Ksp_pH_hydrolysis',
            'question': 'إذا كان Ka=1×10^-5 وCa=0.1 M، احسب [H3O+].',
            'given': ['Ka=1×10^-5', 'Ca=0.1 M'],
            'lawRefs': ['ka'],
            'steps': ['[H3O+]=√(Ka×Ca)', '[H3O+]=√(10^-6)=10^-3 M'],
            'finalAnswer': '[H3O+] = 1×10^-3 M',
            'sanityCheck': 'تركيز H3O+ أصغر من التركيز الابتدائي كما هو متوقع للحمض الضعيف.',
            'commonMistake': 'الخلط بين Ka وKb.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_titration_2026_01',
            'title': 'معايرة حمض/قاعدة',
            'topic': 'titration_qualitative_analysis',
            'question': 'احسب Mb إذا Ma=0.2M, Va=25mL, Vb=20mL لحمض وقاعدة أحاديين.',
            'given': ['Ma=0.2', 'Va=25', 'Vb=20'],
            'lawRefs': ['titration'],
            'steps': ['MaVa=MbVb', 'Mb=(0.2×25)/20=0.25 M'],
            'finalAnswer': 'Mb = 0.25 M',
            'sanityCheck': 'المعادلة متسقة بعد توحيد وحدات الحجم.',
            'commonMistake': 'نسيان توحيد وحدات الأحجام.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_faraday_2026_01',
            'title': 'قانون فاراداي',
            'topic': 'Faraday_E_cell_batteries_corrosion',
            'question': 'إذا I=3A وt=400s احسب Q.',
            'given': ['I=3A', 't=400s'],
            'lawRefs': ['faraday'],
            'steps': ['Q=I×t', 'Q=1200 C'],
            'finalAnswer': 'Q = 1200 C',
            'sanityCheck': 'الوحدة C صحيحة.',
            'commonMistake': 'إدخال الزمن بالدقائق دون تحويل.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_ecell_2026_01',
            'title': 'القوة الدافعة الكهربية',
            'topic': 'Faraday_E_cell_batteries_corrosion',
            'question': 'إذا E°red(cathode)=0.34 وE°red(anode)=-0.76 احسب E_cell.',
            'given': ['0.34 V', '-0.76 V'],
            'lawRefs': ['ecell'],
            'steps': ['E_cell=E°red(cathode)-E°red(anode)', 'E_cell=0.34-(-0.76)=1.10 V'],
            'finalAnswer': 'E_cell = 1.10 V',
            'sanityCheck': 'قيمة موجبة تعني خلية جلفانية تلقائية.',
            'commonMistake': 'عكس ترتيب القطبين.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_org_2026_01',
            'title': 'تحويل عضوي أساسي',
            'topic': 'organic_conversions',
            'question': 'تحويل الإيثين إلى إيثانول.',
            'given': ['C2H4 متفاعل'],
            'lawRefs': ['moles'],
            'steps': ['تفاعل إضافة ماء في وسط حمضي', 'الناتج: C2H5OH'],
            'finalAnswer': 'C2H4 + H2O → C2H5OH',
            'sanityCheck': 'تمت إضافة H وOH على الرابطة المزدوجة.',
            'commonMistake': 'الخلط بين الهدرة والهدرجة.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_qual_2026_01',
            'title': 'تحليل نوعي بسيط',
            'topic': 'titration_qualitative_analysis',
            'question': 'كيف تميز بين أيون الكلوريد وأيون الكبريتات؟',
            'given': ['محاليل أملاح مجهولة'],
            'lawRefs': ['titration'],
            'steps': ['أضف AgNO3 للكشف عن Cl-', 'أضف BaCl2 للكشف عن SO4^2-'],
            'finalAnswer': 'يتكوّن AgCl الأبيض للكلوريد وBaSO4 الأبيض غير الذائب للأيون الكبريتي.',
            'sanityCheck': 'اختر الوسط المناسب لتجنب التداخل.',
            'commonMistake': 'استخدام كاشف غير انتقائي قبل ضبط الوسط.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_transition_2026_01',
            'title': 'حديد وانتقالية',
            'topic': 'transition_elements_iron_alloys',
            'question': 'اكتب معادلة أكسدة Fe2+ إلى Fe3+.',
            'given': ['أيون الحديدوز'],
            'lawRefs': ['moles'],
            'steps': ['Fe2+ يفقد إلكتروناً واحداً', 'المعادلة: Fe2+ → Fe3+ + e-'],
            'finalAnswer': 'Fe2+ → Fe3+ + e-',
            'sanityCheck': 'موازنة الشحنة صحيحة.',
            'commonMistake': 'إضافة إلكترون في الطرف الخاطئ.',
            'relatedQuestionIds': [],
        },
        {
            'id': 'we_moles_2026_01',
            'title': 'حساب عدد المولات',
            'topic': 'mixed_skills_graphs_tables',
            'question': 'احسب عدد المولات في 11.2 L من غاز عند STP.',
            'given': ['V=11.2 L', 'Vm=22.4 L/mol'],
            'lawRefs': ['moles'],
            'steps': ['n=V/22.4', 'n=11.2/22.4=0.5 mol'],
            'finalAnswer': 'n = 0.5 mol',
            'sanityCheck': 'نصف الحجم المولاري يعطي نصف مول.',
            'commonMistake': 'استخدام 24L بدلاً من 22.4L في STP.',
            'relatedQuestionIds': [],
        },
    ]
    return {'version': 'phase17.1-v1', 'examples': examples}


def fill_synthetic_gaps(records, source_stats):
    by_key = defaultdict(list)
    for r in records:
        k = next((kk for kk, title in CHAPTER_TITLES.items() if title == r['chapter']), 'mixed')
        by_key[k].append(r)

    # Keep official-first: use all official extracted as-is.
    # Add synthetic only to ensure verified training pool and chapter minimums.
    out = list(records)

    verified_pool = [r for r in out if r.get('isAnswerVerified')]
    syn_added = 0

    for key, target in TARGET_BY_KEY.items():
        current = len(by_key.get(key, []))
        needed = max(0, target - current)
        for i in range(needed):
            syn_added += 1
            q = make_synthetic_question(key, syn_added)
            out.append(q)
            by_key[key].append(q)
            source_stats['questionSourceIndex'][q['id']] = {
                'pdf': None,
                'model': None,
                'page': None,
                'official': False,
                'answerVerified': True,
            }

    # Ensure at least 60 verified questions for quick/full mock grading experience.
    verified_count = sum(1 for r in out if r.get('isAnswerVerified'))
    cycle_keys = ['organic', 'ionic', 'electro', 'analytical', 'transition', 'mixed']
    idx = 0
    while verified_count < 60:
        key = cycle_keys[idx % len(cycle_keys)]
        syn_added += 1
        q = make_synthetic_question(key, syn_added)
        out.append(q)
        by_key[key].append(q)
        source_stats['questionSourceIndex'][q['id']] = {
            'pdf': None,
            'model': None,
            'page': None,
            'official': False,
            'answerVerified': True,
        }
        verified_count += 1
        idx += 1

    source_stats['syntheticAdded'] = syn_added
    return out


def assign_worked_refs(records, worked_ids):
    seq = 0
    for r in records:
        if r['sourceType'] == 'practice-generated' and r.get('isAnswerVerified'):
            r['workedExampleRef'] = worked_ids[seq % len(worked_ids)]
            seq += 1
        elif r['sourceType'] == 'official':
            r['workedExampleRef'] = worked_ids[seq % len(worked_ids)]
            seq += 1


def main():
    official_records, source_stats = build_official_questions()
    worked = build_worked_examples()

    combined = fill_synthetic_gaps(official_records, source_stats)
    assign_worked_refs(combined, [e['id'] for e in worked['examples']])

    combined = sorted(combined, key=lambda x: x['id'])

    chapter_counts = defaultdict(int)
    official_count = 0
    synthetic_count = 0
    for q in combined:
        chapter_counts[q['chapter']] += 1
        if q['sourceType'] == 'official':
            official_count += 1
        else:
            synthetic_count += 1

    source_stats['summary'] = {
        'officialQuestionCount': official_count,
        'practiceGeneratedCount': synthetic_count,
        'totalQuestions': len(combined),
        'chapterCounts': dict(chapter_counts),
    }

    out_payload = {'version': 'phase17.1-v1', 'questions': combined}

    OUT_QUESTIONS.parent.mkdir(parents=True, exist_ok=True)
    OUT_QUESTIONS.write_text(json.dumps(out_payload, ensure_ascii=False, indent=2), encoding='utf-8')
    OUT_SOURCE_MAP.write_text(json.dumps(source_stats, ensure_ascii=False, indent=2), encoding='utf-8')
    OUT_WORKED.write_text(json.dumps(worked, ensure_ascii=False, indent=2), encoding='utf-8')

    print('WROTE', OUT_QUESTIONS)
    print('WROTE', OUT_SOURCE_MAP)
    print('WROTE', OUT_WORKED)
    print('TOTAL', len(combined), 'OFFICIAL', official_count, 'SYN', synthetic_count)
    for k, v in chapter_counts.items():
        print(k, v)


if __name__ == '__main__':
    main()
