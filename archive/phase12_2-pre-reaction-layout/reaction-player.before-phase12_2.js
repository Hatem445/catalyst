'use strict';

const REACTION_LESSONS = [
  {
    id: 'rxn_anim_1',
    titleAr: 'إضافة البروم على الإيثين',
    equation: 'CH2=CH2 + Br2 → BrCH2-CH2Br',
    reactantsAr: 'الإيثين + البروم',
    conditionsAr: 'CCl4 (مذيب خامل) — درجة حرارة الغرفة',
    productAr: '1,2-ثنائي بروموإيثان',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'الرابطة π في الألكين أكثر قابلية لإعادة التوزيع من σ، لذلك تبدأ منها الإضافة.',
    scenes: [
      {
        kind: 'frame',
        stepLabel: '1/6',
        title: 'المشهد 1: عرض المتفاعلات',
        desc: 'نبدأ من ألكين لديه رابطة مزدوجة مع جزيء Br2.',
        phaseAr: 'قبل التفاعل',
        conditionAr: 'وسط غير مائي',
        focusAr: 'التركيز على C=C',
        left: { title: 'الألكين', formula: 'CH2=CH2', note: 'رابطة مزدوجة' },
        middle: { title: 'الكاشف', formula: 'Br-Br', note: 'جزيء بروم' },
        right: { title: 'الهدف', formula: 'تفاعل إضافة', note: 'تحويل غير مشبع → مشبع' },
        focus: 'left',
        takeaway: 'أي إضافة تبدأ بتحديد الرابطة النشطة أولًا.'
      },
      {
        kind: 'frame',
        stepLabel: '2/6',
        title: 'المشهد 2: تنشيط الرابطة π',
        desc: 'نُبرز أن إلكترونات π هي الأكثر تعرضًا للهجوم.',
        phaseAr: 'تهيئة إلكترونية',
        conditionAr: 'Br2 يقترب من C=C',
        focusAr: 'تحرك كثافة إلكترونية',
        left: { title: 'الموقع النشط', formula: 'C=C (π)', note: 'أعلى طاقة' },
        middle: { title: 'استقطاب Br2', formula: 'δ+Br-Brδ-', note: 'استقطاب لحظي' },
        right: { title: 'نتيجة أولية', formula: 'بدء إعادة الترتيب', note: 'تمهيد للكسر/التكوين' },
        focus: 'middle',
        takeaway: 'الإضافة الكهربية تعتمد على استقطاب الكاشف.'
      },
      {
        kind: 'frame',
        stepLabel: '3/6',
        title: 'المشهد 3: اقتراب الكاشف',
        desc: 'البروم يقترب من الرابطة المزدوجة في مسار موجّه.',
        phaseAr: 'اقتراب موجّه',
        conditionAr: 'زمن قصير — تصادم فعّال',
        focusAr: 'تلاقي المتفاعلات',
        left: { title: 'الألكين', formula: 'CH2=CH2', note: 'غني بالإلكترونات' },
        middle: { title: 'مسار التفاعل', formula: 'π → Br', note: 'سهم انتقال' },
        right: { title: 'Br2*', formula: 'Br2 (مفعّل)', note: 'جاهز للتفاعل' },
        focus: 'both',
        takeaway: 'ليس كل تصادم منتجًا؛ الاتجاه الصحيح مهم.'
      },
      {
        kind: 'frame',
        stepLabel: '4/6',
        title: 'المشهد 4: كسر/تكوين الروابط',
        desc: 'تضعف π وتتكون رابطتا C-Br الجديدتان.',
        phaseAr: 'قلب الآلية',
        conditionAr: 'إضافة كهربية مبسطة',
        focusAr: 'اختفاء π وظهور σ',
        left: { title: 'قبل', formula: 'CH2=CH2 + Br2', note: 'رابطة π موجودة' },
        middle: { title: 'تحول', formula: 'π ⟶ σ', note: 'إعادة توزيع' },
        right: { title: 'أثناء', formula: 'BrCH2-CH2Br', note: 'تكوين رابطتين C-Br' },
        focus: 'right',
        takeaway: 'الناتج يفقد الرابطة المزدوجة تمامًا.'
      },
      {
        kind: 'frame',
        stepLabel: '5/6',
        title: 'المشهد 5: تثبيت الناتج',
        desc: 'نحصل على مركب مشبع: ثنائي هاليد متجاور.',
        phaseAr: 'بعد التفاعل',
        conditionAr: 'المعادلة أصبحت مكتملة',
        focusAr: 'تأكيد الناتج',
        left: { title: 'الناتج', formula: 'BrCH2-CH2Br', note: 'مشبع' },
        middle: { title: 'الدليل العملي', formula: 'اختفاء لون Br2', note: 'مؤشر مدرسي شائع' },
        right: { title: 'النوع', formula: 'إضافة', note: 'تميّز الألكينات' },
        focus: 'left',
        takeaway: 'هذا تفاعل تمييزي للألكينات في المستوى المدرسي.'
      },
      {
        kind: 'summary',
        stepLabel: '6/6',
        title: 'المشهد 6: الخلاصة',
        desc: 'ملخص سريع لما حدث في الإضافة على الألكين.',
        bullets: [
          'الرابطة π هي نقطة البداية.',
          'Br2 يستهلك لتكوين رابطتين C-Br.',
          'الناتج النهائي مشبع بلا C=C.'
        ]
      }
    ]
  },
  {
    id: 'rxn_anim_2',
    titleAr: 'أكسدة الإيثانول (كحول أولي)',
    equation: 'CH3CH2OH → CH3CHO → CH3COOH',
    reactantsAr: 'إيثانول (كحول أولي)',
    conditionsAr: 'K2Cr2O7 / H2SO4 مع ضبط الزمن',
    productAr: 'إيثانال ثم حمض إيثانويك',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'التحكم في زمن وشدة الأكسدة يحدد إن كان الناتج ألدهيدًا أو حمضًا.',
    scenes: [
      {
        kind: 'frame',
        stepLabel: '1/6',
        title: 'المشهد 1: نقطة البداية',
        desc: 'الإيثانول هو كحول أولي قابل للأكسدة التدريجية.',
        phaseAr: 'قبل الأكسدة',
        conditionAr: 'تحضير العينة',
        focusAr: 'مجموعة -OH الطرفية',
        left: { title: 'المتفاعل', formula: 'CH3CH2OH', note: 'كحول أولي' },
        middle: { title: 'الهدف', formula: 'أكسدة تدريجية', note: 'مرحلتان' },
        right: { title: 'الناتج المتوقع', formula: 'CHO ثم COOH', note: 'بحسب الظروف' },
        focus: 'left',
        takeaway: 'نوع الكحول يحدد مسار الأكسدة الأساسي.'
      },
      {
        kind: 'frame',
        stepLabel: '2/6',
        title: 'المشهد 2: إدخال العامل المؤكسد',
        desc: 'ثنائي الكرومات الحمضي يبدأ سحب الهيدروجين/إضافة الأكسجين.',
        phaseAr: 'بدء التفاعل',
        conditionAr: 'K2Cr2O7/H2SO4',
        focusAr: 'دور العامل المؤكسد',
        left: { title: 'الكحول', formula: 'CH3CH2OH', note: 'قبل التحول' },
        middle: { title: 'العامل', formula: '[O]', note: 'بيئة حمضية' },
        right: { title: 'اتجاه', formula: 'نحو CH3CHO', note: 'الخطوة الأولى' },
        focus: 'middle',
        takeaway: 'الشرط الكيميائي هو مفتاح التحكم الحقيقي.'
      },
      {
        kind: 'frame',
        stepLabel: '3/6',
        title: 'المشهد 3: تكوين الألدهيد',
        desc: 'عند الإيقاف المبكر يمكن الحصول على الإيثانال.',
        phaseAr: 'أكسدة أولى',
        conditionAr: 'تقطير سريع',
        focusAr: 'منع الأكسدة الزائدة',
        left: { title: 'قبل', formula: 'CH3CH2OH', note: 'كحول' },
        middle: { title: 'تحول', formula: '→', note: 'مرحلة 1' },
        right: { title: 'بعد', formula: 'CH3CHO', note: 'ألدهيد' },
        focus: 'right',
        takeaway: 'التقطير المبكر يحمي الألدهيد من الاستمرار.'
      },
      {
        kind: 'frame',
        stepLabel: '4/6',
        title: 'المشهد 4: أكسدة ثانية',
        desc: 'باستمرار التسخين والأكسدة يتحول الألدهيد إلى حمض.',
        phaseAr: 'أكسدة لاحقة',
        conditionAr: 'زمن أطول/تسخين أعلى',
        focusAr: 'تحول CHO إلى COOH',
        left: { title: 'وسيط', formula: 'CH3CHO', note: 'ألدهيد' },
        middle: { title: 'إضافة [O]', formula: '+[O]', note: 'استمرار الأكسدة' },
        right: { title: 'ناتج نهائي', formula: 'CH3COOH', note: 'حمض كربوكسيلي' },
        focus: 'both',
        takeaway: 'الاستمرار في الأكسدة يغيّر هوية المركب.'
      },
      {
        kind: 'frame',
        stepLabel: '5/6',
        title: 'المشهد 5: قرار الطالب',
        desc: 'ما الذي تريد إنتاجه؟ الألدهيد أم الحمض؟',
        phaseAr: 'مرحلة قرار',
        conditionAr: 'تحكم زمني حراري',
        focusAr: 'اختيار المنتج',
        left: { title: 'خيار 1', formula: 'CH3CHO', note: 'إيقاف مبكر' },
        middle: { title: '↔', formula: 'ضبط الظروف', note: 'زمن/حرارة' },
        right: { title: 'خيار 2', formula: 'CH3COOH', note: 'استمرار الأكسدة' },
        focus: 'center',
        takeaway: 'نفس المتفاعل قد يعطي ناتجين مختلفين بالتحكم العملي.'
      },
      {
        kind: 'summary',
        stepLabel: '6/6',
        title: 'المشهد 6: الخلاصة',
        desc: 'الأكسدة هنا مسار تدريجي لا خطوة واحدة.',
        bullets: [
          'كحول أولي → ألدهيد → حمض.',
          'التقطير المبكر يحفظ الألدهيد.',
          'زيادة الزمن تدفع للناتج الحمضي.'
        ]
      }
    ]
  },
  {
    id: 'rxn_anim_3',
    titleAr: 'الأسترة: حمض إيثانويك + إيثانول',
    equation: 'CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O',
    reactantsAr: 'حمض إيثانويك + إيثانول',
    conditionsAr: 'H2SO4 مركز (حفاز) + تسخين لطيف',
    productAr: 'إيثيل إيثانوات + ماء',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'الأسترة تفاعل اتزاني؛ إزالة الماء أو زيادة أحد المتفاعلات تدفع الاتجاه نحو الإستر.',
    scenes: [
      {
        kind: 'frame',
        stepLabel: '1/6',
        title: 'المشهد 1: المتفاعلات الأساسية',
        desc: 'حمض كربوكسيلي + كحول هما مدخل الأسترة.',
        phaseAr: 'بداية النظام',
        conditionAr: 'مزج المتفاعلات',
        focusAr: 'وجود -COOH و -OH',
        left: { title: 'الحمض', formula: 'CH3COOH', note: 'يوفر جزء الأسيل' },
        middle: { title: 'مع', formula: '+', note: 'تفاعل ثنائي' },
        right: { title: 'الكحول', formula: 'C2H5OH', note: 'يوفر مجموعة الإيثيل' },
        focus: 'both',
        takeaway: 'لا تحدث الأسترة بدون هذا الزوج الوظيفي.'
      },
      {
        kind: 'frame',
        stepLabel: '2/6',
        title: 'المشهد 2: دور الحفاز',
        desc: 'H2SO4 يُسرّع التفاعل ولا يظهر كناتج نهائي.',
        phaseAr: 'تنشيط التفاعل',
        conditionAr: 'H2SO4 (cat.) + Δ',
        focusAr: 'خفض طاقة التنشيط',
        left: { title: 'النظام', formula: 'CH3COOH + C2H5OH', note: 'قبل التنشيط' },
        middle: { title: 'حفاز', formula: 'H2SO4', note: 'عامل مساعد' },
        right: { title: 'نتيجة', formula: 'زيادة سرعة', note: 'تحسن معدل التفاعل' },
        focus: 'middle',
        takeaway: 'الحفاز يسرّع ولا يُستهلك في النهاية.'
      },
      {
        kind: 'frame',
        stepLabel: '3/6',
        title: 'المشهد 3: تكوين الإستر',
        desc: 'تبدأ رابطة C-O الجديدة مع خروج ماء.',
        phaseAr: 'تكوين الروابط',
        conditionAr: 'وسط حمضي نشط',
        focusAr: 'رابطة الإستر الجديدة',
        left: { title: 'قبل', formula: 'CH3COOH + C2H5OH', note: 'متفاعلات' },
        middle: { title: 'إعادة ترتيب', formula: '→', note: 'انتقال بروتونات' },
        right: { title: 'بعد', formula: 'CH3COOC2H5 + H2O', note: 'إستر + ماء' },
        focus: 'right',
        takeaway: 'الماء جزء مباشر من نواتج الأسترة.'
      },
      {
        kind: 'frame',
        stepLabel: '4/6',
        title: 'المشهد 4: الاتزان',
        desc: 'التفاعل عكسي ويمكن أن يعود للخلف.',
        phaseAr: 'اتزان ديناميكي',
        conditionAr: 'تفاعل أمامي/عكسي',
        focusAr: 'إشارة الاتزان ⇌',
        left: { title: 'متفاعلات', formula: 'CH3COOH + C2H5OH', note: 'يسار المعادلة' },
        middle: { title: '⇌', formula: 'اتزان', note: 'اتجاهان' },
        right: { title: 'نواتج', formula: 'CH3COOC2H5 + H2O', note: 'يمين المعادلة' },
        focus: 'center',
        takeaway: 'الاتزان يفسر لماذا العائد ليس 100% تلقائيًا.'
      },
      {
        kind: 'frame',
        stepLabel: '5/6',
        title: 'المشهد 5: رفع المحصول',
        desc: 'سحب الماء يدفع الاتزان نحو تكوين المزيد من الإستر.',
        phaseAr: 'تحسين الناتج',
        conditionAr: 'إزالة H2O أو زيادة متفاعل',
        focusAr: 'مبدأ لوشاتيليه',
        left: { title: 'إجراء عملي', formula: 'سحب الماء', note: 'تقليل النواتج الجانبية' },
        middle: { title: 'Le Chatelier', formula: '→', note: 'دفع الاتزان' },
        right: { title: 'نتيجة', formula: 'Ester ↑', note: 'عائد أعلى' },
        focus: 'left',
        takeaway: 'التحكم الاتزاني مهارة تطبيقية مهمة.'
      },
      {
        kind: 'summary',
        stepLabel: '6/6',
        title: 'المشهد 6: الخلاصة',
        desc: 'الأسترة: تفاعل اتزاني محفز حمضيًا.',
        bullets: [
          'الشرط القياسي: H2SO4 + تسخين.',
          'المعادلة عكسية بطبيعتها.',
          'إزالة الماء ترفع ناتج الإستر.'
        ]
      }
    ]
  }
];

const PLAY_STEP_MS = 3400;
const runtime = new Map();

function ensureRuntime(id) {
  if (!runtime.has(id)) {
    runtime.set(id, { currentScene: 0, isPlaying: false, timerId: null });
  }
  return runtime.get(id);
}

function stopTimer(state) {
  if (state.timerId) {
    clearTimeout(state.timerId);
    state.timerId = null;
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function focusClass(focus, side) {
  if (focus === 'both' && (side === 'left' || side === 'right')) return ' sb-focus';
  if (focus === side) return ' sb-focus';
  return '';
}

function renderTimeline(stepIndex, total) {
  const dots = Array.from({ length: total }, (_, idx) => {
    const cls = idx <= stepIndex ? 'sb-timeline-dot active' : 'sb-timeline-dot';
    return `<circle cx="${96 + idx * 28}" cy="32" r="6" class="${cls}"/>`;
  }).join('');
  return `<g>${dots}</g>`;
}

function renderFrameScene(scene, stepIndex, total) {
  return `<svg class="rxn-scene-svg" viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" aria-label="${escapeHtml(scene.title)}">
    <defs>
      <linearGradient id="sbBgGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(20,33,56,0.96)"/>
        <stop offset="100%" stop-color="rgba(8,14,25,0.98)"/>
      </linearGradient>
    </defs>

    <rect x="12" y="12" width="396" height="226" rx="16" class="sb-board" fill="url(#sbBgGrad)"/>
    <rect x="26" y="22" width="70" height="24" rx="12" class="sb-step-pill"/>
    <text x="61" y="39" text-anchor="middle" class="sb-step-text">${escapeHtml(scene.stepLabel)}</text>

    ${renderTimeline(stepIndex, total)}

    <text x="26" y="58" class="sb-phase">${escapeHtml(scene.phaseAr)}</text>

    <rect x="26" y="70" width="116" height="82" rx="12" class="sb-box${focusClass(scene.focus, 'left')}"/>
    <text x="36" y="91" class="sb-box-title">${escapeHtml(scene.left.title)}</text>
    <text x="36" y="116" class="sb-formula">${escapeHtml(scene.left.formula)}</text>
    <text x="36" y="136" class="sb-box-note">${escapeHtml(scene.left.note)}</text>

    <rect x="152" y="82" width="116" height="58" rx="12" class="sb-box-middle${focusClass(scene.focus, 'center')}"/>
    <text x="210" y="102" text-anchor="middle" class="sb-box-title">${escapeHtml(scene.middle.title)}</text>
    <text x="210" y="124" text-anchor="middle" class="sb-formula-mid">${escapeHtml(scene.middle.formula)}</text>
    <text x="210" y="142" text-anchor="middle" class="sb-box-note">${escapeHtml(scene.middle.note)}</text>

    <rect x="278" y="70" width="116" height="82" rx="12" class="sb-box${focusClass(scene.focus, 'right')}"/>
    <text x="288" y="91" class="sb-box-title">${escapeHtml(scene.right.title)}</text>
    <text x="288" y="116" class="sb-formula">${escapeHtml(scene.right.formula)}</text>
    <text x="288" y="136" class="sb-box-note">${escapeHtml(scene.right.note)}</text>

    <line x1="140" y1="111" x2="152" y2="111" class="sb-conn"/>
    <line x1="268" y1="111" x2="280" y2="111" class="sb-conn"/>

    <rect x="26" y="160" width="368" height="24" rx="10" class="sb-ribbon sb-condition"/>
    <text x="36" y="176" class="sb-ribbon-text">الشرط: ${escapeHtml(scene.conditionAr)}</text>

    <rect x="26" y="188" width="368" height="24" rx="10" class="sb-ribbon sb-focus-ribbon"/>
    <text x="36" y="204" class="sb-ribbon-text">التركيز: ${escapeHtml(scene.focusAr)}</text>

    <text x="210" y="228" text-anchor="middle" class="sb-takeaway">${escapeHtml(scene.takeaway)}</text>
  </svg>`;
}

function renderSummaryScene(scene, stepIndex, total) {
  return `<svg class="rxn-scene-svg" viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" aria-label="${escapeHtml(scene.title)}">
    <rect x="12" y="12" width="396" height="226" rx="16" class="sb-board"/>
    <rect x="26" y="22" width="70" height="24" rx="12" class="sb-step-pill"/>
    <text x="61" y="39" text-anchor="middle" class="sb-step-text">${escapeHtml(scene.stepLabel)}</text>

    ${renderTimeline(stepIndex, total)}

    <rect x="26" y="62" width="368" height="162" rx="14" class="sb-summary-box"/>
    <text x="210" y="88" text-anchor="middle" class="sb-summary-title">خلاصة الدرس</text>

    <text x="40" y="122" class="sb-summary-line">• ${escapeHtml(scene.bullets[0] || '')}</text>
    <text x="40" y="150" class="sb-summary-line">• ${escapeHtml(scene.bullets[1] || '')}</text>
    <text x="40" y="178" class="sb-summary-line">• ${escapeHtml(scene.bullets[2] || '')}</text>

    <text x="210" y="210" text-anchor="middle" class="sb-takeaway">${escapeHtml(scene.desc)}</text>
  </svg>`;
}

function renderSceneSvg(scene, idx, total) {
  if (scene.kind === 'summary') return renderSummaryScene(scene, idx, total);
  return renderFrameScene(scene, idx, total);
}

function getLessons() {
  return REACTION_LESSONS;
}

function getLessonById(id) {
  return REACTION_LESSONS.find(item => item.id === id) || null;
}

function renderLessonCard(lesson) {
  const state = ensureRuntime(lesson.id);
  state.isPlaying = false;
  stopTimer(state);
  state.currentScene = 0;

  const scene = lesson.scenes[0];
  return `
    <article class="glass-card rxn-lesson-card fade-in" id="${lesson.id}" data-rxn-id="${lesson.id}">
      <header class="rxn-lesson-head">
        <div>
          <h3 class="rxn-lesson-title">${escapeHtml(lesson.titleAr)}</h3>
          <p class="rxn-lesson-eq">${escapeHtml(lesson.equation)}</p>
        </div>
        <span class="rxn-simplified-tag">${escapeHtml(lesson.simplifiedNoteAr)}</span>
      </header>

      <div class="rxn-lesson-meta">
        <div><strong>المتفاعلات:</strong> ${escapeHtml(lesson.reactantsAr)}</div>
        <div><strong>الشرط:</strong> ${escapeHtml(lesson.conditionsAr)}</div>
        <div><strong>الناتج:</strong> ${escapeHtml(lesson.productAr)}</div>
      </div>

      <div class="rxn-scene-wrap" data-rxn-scene-wrap="${lesson.id}">${renderSceneSvg(scene, 0, lesson.scenes.length)}</div>
      <div class="rxn-scene-info">
        <div class="rxn-scene-title" data-rxn-scene-title="${lesson.id}">${escapeHtml(scene.title)}</div>
        <div class="rxn-scene-desc" data-rxn-scene-desc="${lesson.id}">${escapeHtml(scene.desc)}</div>
      </div>
      <div class="rxn-scene-progress" data-rxn-scene-progress="${lesson.id}">المشهد 1 من ${lesson.scenes.length}</div>

      <div class="rxn-lesson-controls">
        <button class="rxn-ctrl-btn" data-action="rxn-play" data-anim-id="${lesson.id}">تشغيل</button>
        <button class="rxn-ctrl-btn" data-action="rxn-pause" data-anim-id="${lesson.id}">إيقاف مؤقت</button>
        <button class="rxn-ctrl-btn" data-action="rxn-next-step" data-anim-id="${lesson.id}">خطوة تالية</button>
        <button class="rxn-ctrl-btn" data-action="rxn-restart" data-anim-id="${lesson.id}">إعادة</button>
      </div>

      <div class="rxn-lesson-why"><strong>لماذا يحدث هذا؟</strong> ${escapeHtml(lesson.whyAr)}</div>
    </article>
  `;
}

function renderScene(lessonId) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return;
  const state = ensureRuntime(lessonId);
  const scene = lesson.scenes[state.currentScene];

  const wrap = document.querySelector(`[data-rxn-scene-wrap="${lessonId}"]`);
  const title = document.querySelector(`[data-rxn-scene-title="${lessonId}"]`);
  const desc = document.querySelector(`[data-rxn-scene-desc="${lessonId}"]`);
  const progress = document.querySelector(`[data-rxn-scene-progress="${lessonId}"]`);
  if (!wrap || !title || !desc || !progress) return;

  wrap.classList.remove('scene-enter');
  wrap.innerHTML = renderSceneSvg(scene, state.currentScene, lesson.scenes.length);
  title.textContent = scene.title;
  desc.textContent = scene.desc;
  progress.textContent = `المشهد ${state.currentScene + 1} من ${lesson.scenes.length}`;
  void wrap.offsetWidth;
  wrap.classList.add('scene-enter');
}

function queueNext(lessonId) {
  const lesson = getLessonById(lessonId);
  const state = ensureRuntime(lessonId);
  if (!lesson || !state.isPlaying) return;

  state.timerId = setTimeout(() => {
    if (!state.isPlaying) return;
    if (state.currentScene >= lesson.scenes.length - 1) {
      state.isPlaying = false;
      state.timerId = null;
      return;
    }
    state.currentScene += 1;
    renderScene(lessonId);
    queueNext(lessonId);
  }, PLAY_STEP_MS);
}

function playReaction(lessonId) {
  const state = ensureRuntime(lessonId);
  stopTimer(state);
  state.isPlaying = true;
  queueNext(lessonId);
}

function pauseReaction(lessonId) {
  const state = ensureRuntime(lessonId);
  state.isPlaying = false;
  stopTimer(state);
}

function nextReactionStep(lessonId) {
  const lesson = getLessonById(lessonId);
  const state = ensureRuntime(lessonId);
  if (!lesson) return;
  pauseReaction(lessonId);
  if (state.currentScene < lesson.scenes.length - 1) {
    state.currentScene += 1;
  }
  renderScene(lessonId);
}

function restartReaction(lessonId) {
  const state = ensureRuntime(lessonId);
  pauseReaction(lessonId);
  state.currentScene = 0;
  renderScene(lessonId);
}

function stopAll() {
  runtime.forEach(state => {
    state.isPlaying = false;
    stopTimer(state);
  });
}

const ReactionPlayer = {
  getLessons,
  renderLessonCard,
  playReaction,
  pauseReaction,
  nextReactionStep,
  restartReaction,
  stopAll,
};

export { ReactionPlayer };
