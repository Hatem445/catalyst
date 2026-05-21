'use strict';
/* ═══════════════════════════════════════════════════════════════════
   CHEMISTRY MINDMAP PRO — v1.0 (Phase 1 Foundation)
   Architecture: Flat-state → Renderer → Mounting
═══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   1. ITEM TYPE PARSER
   Prefix tags: [Q]=law [E]=eq [O]=obs [M]=mem [T]=tip
───────────────────────────────────────────── */
const ItemParser = {
  parse(raw) {
    const map = {
      '[Q]': { type:'law', label:'قانون',   cls:'badge-law',  icon:'⚖️' },
      '[E]': { type:'eq',  label:'معادلة',  cls:'badge-eq',   icon:'⚗️' },
      '[O]': { type:'obs', label:'ملاحظة',  cls:'badge-obs',  icon:'👁️' },
      '[M]': { type:'mem', label:'احفظ',    cls:'badge-mem',  icon:'🔴' },
      '[T]': { type:'tip', label:'تلميح',   cls:'badge-tip',  icon:'💡' },
    };
    for (const [pfx, meta] of Object.entries(map)) {
      if (raw.startsWith(pfx)) {
        return { text: raw.slice(pfx.length).trim(), ...meta, bg: ItemParser.bg(meta.type) };
      }
    }
    return { text: raw, type: 'plain', cls: '', icon: '•', bg: '' };
  },
  bg(t) {
    const m = { law:'rgba(255,204,68,.06)', eq:'rgba(0,255,179,.06)', obs:'rgba(255,110,180,.06)', mem:'rgba(185,122,255,.06)', tip:'rgba(59,158,255,.06)' };
    return m[t] || '';
  },
  render(raw) {
    const p = this.parse(raw);
    const badge = p.cls ? `<span class="item-badge ${p.cls}">${p.icon} ${p.label}</span>` : '';
    return `<div class="node-item" style="background:${p.bg}">
      <span class="item-bullet">${p.cls ? '📌' : '•'}</span>
      <span>${badge}${p.text}</span>
    </div>`;
  }
};

/* ─────────────────────────────────────────────
   2. CHEMISTRY DATABASE
   Scalable structure: units → sections → nodes → items
───────────────────────────────────────────── */
const DB = {
  units: [

    /* ══════════════ ORGANIC: HYDROCARBONS ══════════════ */
    {
      id: 'hydrocarbons',
      title: 'الهيدروكربونات',
      icon: '🧪',
      color: '--clr-alkene',
      clr: '#00ffb3',
      priority: 'high',
      description: 'الكانات • الكينات • الكاينات • البنزين',
      sections: [
        {
          id: 'hc_overview',
          title: 'مقارنة الهيدروكربونات',
          nodes: [
            {
              id: 'hc_compare_table',
              title: 'جدول المقارنة الشامل',
              isTable: true,
              tableData: {
                headers: ['الخاصية','الكانات','الكينات','الكاينات'],
                rows: [
                  ['الصيغة العامة','CₙH₂ₙ₊₂','CₙH₂ₙ','CₙH₂ₙ₋₂'],
                  ['الرابطة','σ واحدة','σ + π','σ + 2π'],
                  ['النشاط','أقل','متوسط','الأعلى'],
                  ['نوع التفاعل','إحلال','إضافة','إضافة'],
                  ['Br₂/CCl₄ بدون ضوء','لا يفاعل','يزيل اللون','يزيل اللون'],
                  ['مثال','CH₄','C₂H₄','C₂H₂'],
                ]
              },
              items: []
            }
          ]
        },
        {
          id: 'alkanes',
          title: 'الكانات — Alkanes',
          nodes: [
            {
              id: 'methane_rxns',
              title: 'الميثان CH₄ — التفاعلات',
              color: '--clr-alkane', clr: '#3b9eff',
              items: [
                '[E] CH₄ + 2O₂ →(Δ) CO₂ + 2H₂O — احتراق كامل',
                '[E] 2CH₄ + 3O₂ →(هواء محدود) 2CO + 4H₂O — احتراق ناقص',
                '[E] CH₄ + Cl₂ →(UV) CH₃Cl + HCl — كلورة: المرحلة 1',
                '[E] CH₃Cl + Cl₂ →(UV) CH₂Cl₂ + HCl — المرحلة 2',
                '[E] CH₂Cl₂ + Cl₂ →(UV) CHCl₃ + HCl — كلوروفورم',
                '[E] CHCl₃ + Cl₂ →(UV) CCl₄ + HCl — رابع كلوريد الكربون',
                '[E] CH₄ →(1000°C, بدون هواء) C + 2H₂ — أسود الكربون',
                '[O] الكانات لا تتفاعل مع Br₂/CCl₄ بدون UV — كاشف سلبي',
                '[Q] قاعدة الإحلال: يستبدل H بـ Cl تدريجياً مع UV',
              ]
            },
            {
              id: 'alkane_props',
              title: 'خواص الكانات',
              clr: '#3b9eff',
              items: [
                '[Q] الكانات مشبعة — لا روابط π',
                '[M] CH₄ غاز طبيعي، C₄H₁₀ غاز البوتاجاز',
                '[T] ترتيب الكانات: ميثان < إيثان < بروبان < بيوتان',
                'نقطة الغليان تزداد بزيادة الكتلة الجزيئية',
              ]
            }
          ]
        },
        {
          id: 'alkenes',
          title: 'الكينات — Alkenes',
          nodes: [
            {
              id: 'ethene_rxns',
              title: 'الإيثين C₂H₄ — التفاعلات',
              clr: '#00ffb3',
              items: [
                '[E] C₂H₄ + 3O₂ →(Δ) 2CO₂ + 2H₂O — احتراق',
                '[E] C₂H₄ + H₂ →(Ni, 150°-300°) C₂H₆ — هدرجة',
                '[E] C₂H₄ + Br₂ →(CCl₄) BrCH₂-CH₂Br — هلجنة (يزيل اللون 🔴)',
                '[E] C₂H₄ + HBr → CH₃CH₂Br — هيدرو-هلجنة',
                '[E] C₂H₄ + H₂O →(H₂SO₄, 110°) C₂H₅OH — هدرة',
                '[E] C₂H₄ + KMnO₄ →(قلوي) HOCH₂CH₂OH — إيثيلين جلايكول',
                '[E] nC₂H₄ →(Δ, مُحفِّز) (C₂H₄)ₙ — بلمرة PE',
                '[O] يزيل لون KMnO₄ البنفسجي → يتحول لعديم اللون (كاشف)',
                '[Q] قاعدة ماركوفنيكوف: H يتصل بـ C الأكثر هيدروجيناً',
              ]
            },
            {
              id: 'alkene_polymers',
              title: 'بوليمرات الكينات',
              clr: '#00e5ff',
              items: [
                'بولي إيثيلين PE: أكياس وزجاجات بلاستيكية',
                'بولي بروبين PP: سجاد وحبال',
                'PVC: مواسير وعوازل أسلاك',
                'تفلون PTFE: أواني الطهي اللاصقة',
                '[M] البلمرة: n جزيء صغير → جزيء ضخم (بوليمر)',
              ]
            }
          ]
        },
        {
          id: 'alkynes',
          title: 'الكاينات — Alkynes',
          nodes: [
            {
              id: 'ethyne_rxns',
              title: 'الإيثاين C₂H₂ — التفاعلات',
              clr: '#ff6eb4',
              items: [
                '[E] 2C₂H₂ + 5O₂ →(Δ) 4CO₂ + 2H₂O — احتراق (لهب 3500°C)',
                '[E] C₂H₂ + H₂ →(Ni) C₂H₄ — هدرجة إلى إيثين',
                '[E] C₂H₄ + H₂ →(Ni) C₂H₆ — هدرجة إلى إيثان',
                '[E] C₂H₂ + Br₂ →(CCl₄) CHBr=CHBr →+Br₂ CHBr₂-CHBr₂',
                '[E] C₂H₂ + H₂O →(HgSO₄, H₂SO₄) CH₃CHO — أسيتالدهيد',
                '[E] 3C₂H₂ →(Ni, 200°) C₆H₆ — بنزين (بلمرة دورية)',
                '[E] CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂ — تحضير من كربيد الكالسيوم',
                '[O] لهب أكسي-أسيتيلين 3500°C — أشد أنواع اللحام',
                '[M] CaC₂ هو نقطة البداية في معظم سلاسل C₂',
              ]
            },
            {
              id: 'alkyne_prep',
              title: 'سلسلة تحويلات C₂ — الكاملة',
              clr: '#b97aff',
              isPathway: true,
              pathway: [
                { label:'CaC₂',    clr:'#b97aff', sub:'كربيد كالسيوم' },
                { arrow:'+ 2H₂O' },
                { label:'C₂H₂',    clr:'#ff6eb4', sub:'إيثاين' },
                { arrow:'+ H₂\nNi' },
                { label:'C₂H₄',    clr:'#00ffb3', sub:'إيثين' },
                { arrow:'+ H₂\nNi' },
                { label:'C₂H₆',    clr:'#3b9eff', sub:'إيثان' },
              ]
            }
          ]
        },
        {
          id: 'benzene',
          title: 'البنزين C₆H₆',
          nodes: [
            {
              id: 'benzene_rxns',
              title: 'البنزين — التفاعلات',
              clr: '#ffcc44',
              items: [
                '[E] C₆H₆ + HNO₃ →(H₂SO₄ مركز) نيتروبنزين + H₂O — نترة',
                '[E] C₆H₆ + Cl₂ →(FeCl₃) كلوروبنزين + HCl — هلجنة إحلال',
                '[E] C₆H₆ + CH₃Cl →(AlCl₃) تولوين + HCl — ألكلة فريدل-كرافتس',
                '[E] C₆H₆ + 3H₂ →(Ni, Δ) C₆H₁₂ — هدرجة (سيكلوهكسان)',
                '[E] C₆H₆ + 3Cl₂ →(UV) C₆H₆Cl₆ — إضافة (ليندان)',
                '[O] البنزين يتفاعل بالإحلال لا الإضافة في الظروف العادية',
                '[Q] استقرار حلقة البنزين: إلكترونات π مشتركة عبر الحلقة كلها',
                '[M] البنزين لا يزيل لون Br₂/CCl₄ بدون عامل — يفرقه عن الكينات',
              ]
            },
            {
              id: 'phenol_rxns',
              title: 'الفينول C₆H₅OH',
              clr: '#ff7c35',
              items: [
                '[E] C₆H₅OH + Na → C₆H₅ONa + ½H₂',
                '[E] C₆H₅OH + NaOH → C₆H₅ONa + H₂O (الفينول حمض أقوى من الكحول)',
                '[E] C₆H₅OH + 3Br₂ →(ماء) 3HBr + 2,4,6-تريبروموفينول↓ أبيض',
                '[O] FeCl₃ → لون بنفسجي مميز مع الفينول',
                '[Q] الفينول أحمض من الكحول: يتفاعل مع NaOH والفينوكسيد مستقر',
              ]
            }
          ]
        },
        {
          id: 'organic_expected',
          title: 'الأسئلة المتوقعة — هيدروكربونات',
          nodes: [
            {
              id: 'hc_questions',
              title: 'أسئلة متوقعة في الامتحانات',
              isExpected: true,
              items: [
                'لماذا يتفاعل البنزين بالإحلال لا الإضافة؟',
                'كيف تفرق كيميائياً بين كانات وكينات وكاينات؟',
                'اكتب سلسلة: CaC₂ → حمض الأسيتيك (5 خطوات)',
                'ما ناتج C₂H₄ مع KMnO₄ القلوي؟',
                'لماذا لهب الأسيتيلين أشد من الميثان؟',
                'ما الفرق بين تفاعل الإحلال والإضافة؟',
                'ما ناتج بلمرة الإيثين؟ وما استخداماته؟',
              ]
            }
          ]
        }
      ]
    },

    /* ══════════════ ORGANIC: DERIVATIVES ══════════════ */
    {
      id: 'org_derivatives',
      title: 'مشتقات الهيدروكربونات',
      icon: '⚗️',
      clr: '#ec4899',
      description: 'كحولات • فينول • أحماض • استرات',
      sections: [
        {
          id: 'func_groups',
          title: 'المجموعات الوظيفية',
          nodes: [
            {
              id: 'fg_table',
              title: 'جدول المجموعات الوظيفية',
              isTable: true,
              tableData: {
                headers: ['المجموعة','الصيغة','اللاحقة','مثال'],
                rows: [
                  ['هيدروكسيل','-OH',  'ول',   'C₂H₅OH إيثانول'],
                  ['ألدهيد',   '-CHO', 'ال',   'CH₃CHO إيثانال'],
                  ['كيتون',    '-CO-', 'ون',   'CH₃COCH₃ بروبانون'],
                  ['كربوكسيل','-COOH','ويك',  'CH₃COOH حمض إيثانويك'],
                  ['استر',     '-COO-','وات',  'CH₃COOC₂H₅'],
                  ['أمين',     '-NH₂', 'أمين', 'C₂H₅NH₂'],
                ]
              },
              items: []
            }
          ]
        },
        {
          id: 'alcohols_sec',
          title: 'الكحولات — Alcohols',
          nodes: [
            {
              id: 'ethanol_rxns',
              title: 'الإيثانول C₂H₅OH — التفاعلات',
              clr: '#b97aff',
              items: [
                '[E] C₂H₅OH + Na → C₂H₅ONa + ½H₂',
                '[E] C₂H₅OH + HBr → C₂H₅Br + H₂O',
                '[E] C₂H₅OH →(H₂SO₄, 110°) C₂H₄ + H₂O — نزع ماء → إيثين',
                '[E] 2C₂H₅OH →(H₂SO₄, 140°) C₂H₅-O-C₂H₅ + H₂O — إيثر',
                '[E] C₂H₅OH →(K₂Cr₂O₇/H₂SO₄) CH₃CHO → CH₃COOH — أكسدة',
                '[E] C₂H₅OH + CH₃COOH →(H₂SO₄) CH₃COOC₂H₅ + H₂O — استرة',
                '[Q] 110°C → إيثين / 140°C → إيثر — درجة الحرارة تحدد الناتج',
                '[O] الكحولات لا تتفاعل مع NaOH (يفرقها عن الفينول)',
              ]
            }
          ]
        },
        {
          id: 'acids_esters_sec',
          title: 'الأحماض والاسترات',
          nodes: [
            {
              id: 'acetic_rxns',
              title: 'حمض الأسيتيك CH₃COOH',
              clr: '#ff4d6d',
              items: [
                '[E] CH₃COOH + NaOH → CH₃COONa + H₂O',
                '[E] 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑',
                '[E] CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑',
                '[E] CH₃COOH + C₂H₅OH →(H₂SO₄) CH₃COOC₂H₅ + H₂O',
                '[O] تفاعل مع Na₂CO₃ وNaHCO₃ يفرقه عن الفينول',
              ]
            },
            {
              id: 'ester_hydrolysis',
              title: 'الاسترات — التحلل',
              clr: '#00e5ff',
              items: [
                '[E] CH₃COOC₂H₅ + H₂O →(Δ) CH₃COOH + C₂H₅OH — تحلل مائي (عكسي)',
                '[E] CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH — صابرة (لا رجعة)',
                '[M] الصابرة = تحلل قلوي = غير عكسية (تختلف عن الاسترة)',
              ]
            }
          ]
        }
      ]
    },

    /* ══════════════ IRON ══════════════ */
    {
      id: 'iron',
      title: 'الحديد (Fe) — المعادلات',
      icon: '🔩',
      clr: '#f97316',
      description: 'أكاسيد الحديد • أملاحه • كواشفه',
      sections: [
        {
          id: 'fe_basic',
          title: 'تفاعلات الحديد الأساسية',
          nodes: [
            {
              id: 'fe_o2_h2o',
              title: 'Fe مع O₂ والماء',
              clr: '#ea580c',
              items: [
                '[E] 3Fe + 2O₂ →(Δ) Fe₃O₄ — يحترق في O₂',
                '[E] 3Fe + 4H₂O →(500°C) Fe₃O₄ + 4H₂↑',
                '[O] الحديد لا يتفاعل مع الماء البارد',
              ]
            },
            {
              id: 'fe_acid',
              title: 'Fe مع الأحماض',
              clr: '#b45309',
              items: [
                '[E] Fe + 2HCl →(مخفف) FeCl₂ + H₂↑ — ينتج Fe²⁺',
                '[E] Fe + H₂SO₄ →(مخفف) FeSO₄ + H₂↑',
                '[M] Fe + HNO₃ مركز → خمول كيميائي (طبقة Fe₂O₃ غير مسامية)',
                '[M] الأحماض المخففة دائماً تعطي Fe²⁺ وليس Fe³⁺',
              ]
            },
            {
              id: 'fe_halogens',
              title: 'Fe مع الهالوجينات',
              clr: '#92400e',
              items: [
                '[E] 2Fe + 3Cl₂ →(Δ) 2FeCl₃ — ينتج Fe³⁺',
                '[E] Fe + S →(Δ) FeS — كبريتيد الحديد II',
                '[M] الهالوجينات → Fe³⁺ / الأحماض المخففة → Fe²⁺',
              ]
            }
          ]
        },
        {
          id: 'fe_compare',
          title: 'مقارنة Fe²⁺ و Fe³⁺',
          nodes: [
            {
              id: 'fe_ions_table',
              title: 'الكواشف الكيميائية',
              isTable: true,
              tableData: {
                headers: ['الكاشف', 'Fe²⁺ (حديد II)', 'Fe³⁺ (حديد III)'],
                rows: [
                  ['NaOH','أخضر مبلل Fe(OH)₂↓','بني-أحمر Fe(OH)₃↓'],
                  ['NH₄OH','أخضر مبلل','بني محمر'],
                  ['K₄[Fe(CN)₆]','أبيض','أزرق برلين'],
                  ['KSCN','لا لون','أحمر دموي 🔴 (كاشف مميز)'],
                  ['مصدره','Fe + حمض مخفف','Fe + هالوجين أو مؤكسد'],
                ]
              },
              items: []
            }
          ]
        }
      ]
    },

    /* ══════════════ TRANSITION METALS ══════════════ */
    {
      id: 'transition',
      title: 'السلسلة الانتقالية',
      icon: '⚛️',
      clr: '#a0c4ff',
      description: 'Sc → Zn • حالات التأكسد • الخصائص',
      sections: [
        {
          id: 'trans_general',
          title: 'الخصائص العامة',
          nodes: [
            {
              id: 'trans_props',
              title: 'خواص عامة مميزة',
              clr: '#a0c4ff',
              items: [
                '[Q] معظم أيوناتها ملونة — سبب: إلكترونات مفردة في 3d تمتص فوتونات مرئية',
                '[Q] بارامغناطيسية: تحتوي إلكترونات مفردة في 3d',
                '[Q] دايامغناطيسية: لا إلكترونات مفردة (مثل Zn²⁺, Cu⁺)',
                '[Q] النشاط الحفازي: بسبب الإلكترونات الحرة في 4s و 3d',
                '[M] Cr [Ar]4s¹3d⁵ — Cu [Ar]4s¹3d¹⁰ (يشذان للاستقرار)',
                '[M] Zn ليس انتقالياً حقيقياً: 3d¹⁰ في أيونه لا يحتوي مفردة',
              ]
            },
            {
              id: 'trans_oxidation',
              title: 'حالات التأكسد',
              isTable: true,
              tableData: {
                headers: ['العنصر','Z','التركيب','حالات التأكسد'],
                rows: [
                  ['Sc','21','4s²3d¹','+3 فقط'],
                  ['Ti','22','4s²3d²','+2,+3,+4'],
                  ['V', '23','4s²3d³','+2,+3,+4,+5'],
                  ['Cr','24','4s¹3d⁵','+2,+3,+6 (يشذ)'],
                  ['Mn','25','4s²3d⁵','+2,+3,+4,+6,+7 (الأكثر)'],
                  ['Fe','26','4s²3d⁶','+2,+3'],
                  ['Co','27','4s²3d⁷','+2,+3'],
                  ['Ni','28','4s²3d⁸','+2,+3'],
                  ['Cu','29','4s¹3d¹⁰','+1,+2 (يشذ)'],
                  ['Zn','30','4s²3d¹⁰','+2 فقط'],
                ]
              },
              items: []
            }
          ]
        }
      ]
    },

    /* ══════════════ QUALITATIVE ANALYSIS ══════════════ */
    {
      id: 'qualitative',
      title: 'التحليل النوعي',
      icon: '🔬',
      clr: '#10b981',
      description: 'كواشف الأيونات • قواعد الذوبان',
      sections: [
        {
          id: 'anion_tests',
          title: 'كواشف الأنيونات',
          nodes: [
            {
              id: 'anions_table',
              title: 'جدول الأنيونات الشامل',
              isTable: true,
              tableData: {
                headers: ['الأيون','الكاشف','الناتج','الملاحظة'],
                rows: [
                  ['Cl⁻','AgNO₃','AgCl↓ أبيض','يذوب في NH₃'],
                  ['Br⁻','AgNO₃','AgBr↓ أصفر فاتح','يذوب ببطء في NH₃'],
                  ['I⁻','AgNO₃','AgI↓ أصفر غامق','لا يذوب في NH₃'],
                  ['CO₃²⁻','HCl مخفف','CO₂ يعكر ماء الجير','الراسب يذوب في الحمض'],
                  ['SO₄²⁻','BaCl₂ + HCl','BaSO₄↓ أبيض','لا يذوب في الحمض (تأكيدي)'],
                  ['NO₃⁻','FeSO₄ + H₂SO₄','حلقة بنية','اختبار الحلقة البنية'],
                ]
              },
              items: []
            }
          ]
        },
        {
          id: 'cation_tests',
          title: 'كواشف الكاتيونات',
          nodes: [
            {
              id: 'g3_cations',
              title: 'المجموعة 3: Fe²⁺, Fe³⁺, Al³⁺',
              clr: '#10b981',
              items: [
                '[E] Fe²⁺ + 2NH₄OH → Fe(OH)₂↓ أخضر مبلل',
                '[E] Fe³⁺ + 3NH₄OH → Fe(OH)₃↓ بني-أحمر',
                '[E] Al³⁺ + 3NH₄OH → Al(OH)₃↓ أبيض جيلاتيني',
                '[O] Al(OH)₃ يذوب في NaOH الزائد (مذبذب)',
                '[O] KSCN → أحمر دموي مع Fe³⁺ فقط (كاشف مميز)',
              ]
            },
            {
              id: 'flame_tests',
              title: 'اختبارات اللهب',
              isTable: true,
              tableData: {
                headers: ['الأيون','لون اللهب'],
                rows: [
                  ['Ca²⁺','أحمر آجور (طوبي)'],
                  ['Ba²⁺','أخضر'],
                  ['Sr²⁺','أحمر قرمزي (كرزي)'],
                  ['Na⁺','أصفر مميز'],
                  ['K⁺','بنفسجي (خلال زجاج كوبالت)'],
                  ['Cu²⁺','أزرق-أخضر'],
                ]
              },
              items: []
            }
          ]
        }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────
   3. QUIZ DATA
───────────────────────────────────────────── */
const QUIZ = [
  { q:'لماذا يشذ الكروم في تركيبه الإلكتروني؟', opts:['لأن 4s² أكثر استقراراً','لأن نصف امتلاء 3d⁵ مع 4s¹ أكثر استقراراً','خطأ في الجدول الدوري','لأن عدده الذري 24'], ans:1, explain:'نصف الامتلاء (3d⁵) وامتلاء 3d¹⁰ يمنحان استقراراً إضافياً.' },
  { q:'ما الكاشف المميز لـ Fe³⁺؟', opts:['NaOH','KSCN → أحمر دموي','H₂S','BaCl₂'], ans:1, explain:'KSCN يعطي لوناً أحمر دموياً مميزاً مع Fe³⁺ دون Fe²⁺.' },
  { q:'ما الصيغة العامة للكينات (Alkenes)؟', opts:['CₙH₂ₙ₊₂','CₙH₂ₙ₋₂','CₙH₂ₙ','CₙHₙ'], ans:2, explain:'الكينات مشبعة جزئياً برابطة π واحدة: CₙH₂ₙ' },
  { q:'لماذا لا يتفاعل الحديد مع HNO₃ المركز؟', opts:['لأنه فلز نبيل','لأنه يكوّن طبقة Fe₂O₃ غير مسامية (خمول)','لأن الحمض ضعيف التأين','لأن الحرارة منخفضة'], ans:1, explain:'الخمول الكيميائي: طبقة أكسيد سطحية غير مسامية تمنع استمرار التفاعل.' },
  { q:'ما ناتج تفاعل الإيثين مع KMnO₄ القلوي؟', opts:['إيثانول','ثاني أكسيد الكربون','إيثيلين جلايكول HOCH₂CH₂OH','حمض الأسيتيك'], ans:2, explain:'KMnO₄ القلوي يؤكسد الرابطة الثنائية لينتج ثنائي الكحول (الجلايكول).' },
  { q:'ما لون راسب Fe(OH)₂؟', opts:['بني-أحمر','أصفر','أخضر مبلل','أبيض'], ans:2, explain:'Fe(OH)₂ أخضر مبلل، يتأكسد في الهواء إلى Fe(OH)₃ البني-أحمر.' },
  { q:'أي الهيدروكربونات الأكثر نشاطاً كيميائياً؟', opts:['الكانات','الكينات','الكاينات','البنزين'], ans:2, explain:'الكاينات تحتوي رابطتين π، مما يجعلها الأكثر نشاطاً وقدرة على تفاعلات الإضافة.' },
  { q:'ما ناتج تسخين C₂H₅OH مع H₂SO₄ عند 110°C؟', opts:['إيثر ثنائي إيثيل','بولي إيثيلين','إيثين CH₂=CH₂','إيثانول مرة أخرى'], ans:2, explain:'110°C → نزع ماء داخل الجزيء → إيثين. (140°C → نزع ماء بين جزيئتين → إيثر)' },
  { q:'كيف تكشف عن الفينول كيميائياً؟', opts:['AgNO₃','BaCl₂','FeCl₃ → لون بنفسجي','KSCN'], ans:2, explain:'FeCl₃ يعطي لوناً بنفسجياً مميزاً مع الفينول. كما أن Br₂/ماء يعطي راسباً أبيض.' },
  { q:'ما العنصر الانتقالي الذي يعطي أعلى حالة تأكسد (+7)؟', opts:['الكروم (Cr)','الفاناديوم (V)','المنجنيز (Mn)','الحديد (Fe)'], ans:2, explain:'المنجنيز Mn يعطي +7 في برمنجنات البوتاسيوم KMnO₄ — أعلى حالة تأكسد في السلسلة الأولى.' },
  { q:'ما ناتج احتراق الميثان الكامل؟', opts:['CO + H₂O','CO₂ + H₂','CO₂ + H₂O','C + H₂O'], ans:2, explain:'الاحتراق الكامل يحتاج O₂ كافياً: CH₄ + 2O₂ → CO₂ + 2H₂O' },
  { q:'ما الذي يفرق الفينول عن الكحول تجاه NaOH؟', opts:['كلاهما يتفاعل','كلاهما لا يتفاعل','الفينول يتفاعل فقط','الكحول يتفاعل فقط'], ans:2, explain:'الفينول حمض أقوى من الكحول، لذا يتفاعل مع NaOH: C₆H₅OH + NaOH → C₆H₅ONa + H₂O' },
];

/* ─────────────────────────────────────────────
   4. FLASHCARDS
───────────────────────────────────────────── */
const CARDS = [
  { f:'التركيب الإلكتروني للكروم (24)؟', b:'[Ar], 4s¹, 3d⁵\nيشذ لأن نصف الامتلاء 3d⁵ أكثر استقراراً', unit:'transition' },
  { f:'الفرق: بارامغناطيسي vs دايامغناطيسي', b:'بارامغناطيسي: إلكترونات مفردة → يُجذب للمغناطيس\nدايامغناطيسي: لا إلكترونات مفردة → يُنبذ', unit:'transition' },
  { f:'معادلة الحديد مع الماء (500°C)', b:'3Fe + 4H₂O → Fe₃O₄ + 4H₂↑', unit:'iron' },
  { f:'الصيغ العامة: كانات، كينات، كاينات', b:'كانات: CₙH₂ₙ₊₂\nكينات: CₙH₂ₙ\nكاينات: CₙH₂ₙ₋₂', unit:'hydrocarbons' },
  { f:'كيف تكشف عن Fe³⁺ في محلول؟', b:'أضف KSCN → اللون الأحمر الدموي يثبت وجود Fe³⁺', unit:'iron' },
  { f:'ناتج C₂H₅OH مع H₂SO₄ عند 110°C vs 140°C', b:'110°C → إيثين CH₂=CH₂ (نزع ماء داخلي)\n140°C → إيثر C₂H₅-O-C₂H₅ (نزع ماء خارجي)', unit:'org_derivatives' },
  { f:'لماذا لا يُعد الزنك فلزاً انتقالياً حقيقياً؟', b:'أيون Zn²⁺ له 3d¹⁰ مكتمل\nلا إلكترونات مفردة في أي حالة تأكسد', unit:'transition' },
  { f:'كيف تفرق بين Cl⁻ وBr⁻ وI⁻؟', b:'AgNO₃:\nCl⁻ → أبيض (يذوب في NH₃)\nBr⁻ → أصفر فاتح\nI⁻ → أصفر غامق (لا يذوب)', unit:'qualitative' },
  { f:'معادلة تحضير البنزين من الأسيتيلين', b:'3C₂H₂ →(Ni, 200°C) C₆H₆\nبلمرة دورية لثلاثة جزيئات', unit:'hydrocarbons' },
  { f:'الفرق بين الاسترة والصابرة', b:'الاسترة: RCOOH + ROH ⇌ RCOOR + H₂O (عكسية)\nالصابرة: RCOOR + NaOH → RCOONa + ROH (لا رجعة)', unit:'org_derivatives' },
  { f:'العناصر الشاذة في تركيبها الإلكتروني', b:'Cr: [Ar] 4s¹ 3d⁵\nCu: [Ar] 4s¹ 3d¹⁰\nسبب: استقرار نصف الامتلاء والامتلاء الكامل', unit:'transition' },
  { f:'الكاتيونات التي تترسب مع HCl المخفف', b:'Ag⁺ → AgCl أبيض\nHg₂²⁺ → Hg₂Cl₂ أبيض\nPb²⁺ → PbCl₂ أبيض (يذوب ساخناً)', unit:'qualitative' },
];

/* ─────────────────────────────────────────────
   5. PROGRESS TRACKER
───────────────────────────────────────────── */
const Progress = (() => {
  const KEY = 'cmp_progress_v1';
  const CONF_KEY = 'cmp_fc_conf_v1';
  let data = {};
  let conf = {};

  function load() {
    try {
      const s = localStorage.getItem(KEY);
      if (s) data = JSON.parse(s, (k, v) => Array.isArray(v) ? new Set(v) : v);
      const c = localStorage.getItem(CONF_KEY);
      if (c) conf = JSON.parse(c);
    } catch(e) {}
  }

  function save() {
    try {
      const out = {};
      for (const k in data) out[k] = [...data[k]];
      localStorage.setItem(KEY, JSON.stringify(out));
      localStorage.setItem(CONF_KEY, JSON.stringify(conf));
    } catch(e) {}
  }

  function markSeen(unitId, nodeId) {
    if (!data[unitId]) data[unitId] = new Set();
    data[unitId].add(nodeId);
    save();
  }

  function getPct(unitId, total) {
    if (!data[unitId] || total === 0) return 0;
    return Math.round(data[unitId].size / total * 100);
  }

  function setConf(idx, level) { // level: 'hard'|'ok'|'easy'
    conf[idx] = level;
    save();
  }

  function getConf(idx) { return conf[idx] || null; }

  function totalSeen() {
    return Object.values(data).reduce((a, s) => a + s.size, 0);
  }

  function totalNodes() {
    return DB.units.reduce((a, u) => a + u.sections.reduce((b, s) => b + s.nodes.filter(n => !n.isTable && !n.isExpected && !n.isPathway).length, 0), 0);
  }

  load();
  return { markSeen, getPct, setConf, getConf, totalSeen, totalNodes, save };
})();

/* ─────────────────────────────────────────────
   6. SEARCH ENGINE
───────────────────────────────────────────── */
const Search = {
  index: null,

  build() {
    this.index = [];
    DB.units.forEach(u => {
      u.sections.forEach(s => {
        s.nodes.forEach(n => {
          const allText = [n.title, ...(n.items || [])].join(' ');
          this.index.push({ uid: u.id, sid: s.id, unitTitle: u.title, secTitle: s.title, nodeTitle: n.title, clr: u.clr, text: allText, items: n.items || [] });
        });
      });
    });
  },

  query(q) {
    if (!this.index) this.build();
    if (!q || q.length < 2) return [];
    const ql = q.toLowerCase();
    const hits = [];
    const seen = new Set();
    this.index.forEach(entry => {
      if (entry.text.toLowerCase().includes(ql)) {
        const key = entry.uid + entry.sid + entry.nodeTitle;
        if (!seen.has(key)) {
          seen.add(key);
          const matchItems = entry.items.filter(it => it.toLowerCase().includes(ql)).slice(0, 2);
          hits.push({ ...entry, matchItems });
        }
      }
    });
    return hits.slice(0, 25);
  }
};

/* ─────────────────────────────────────────────
   7. SVG MIND MAP ENGINE
───────────────────────────────────────────── */
const MindMap = {
  // Renders an organic conversion SVG pathway
  renderPathwaySVG(pathway, width) {
    const H = 90; // svg height
    const nodeW = 74, nodeH = 36;
    const arrowW = 50;
    const nodes = pathway.filter(p => p.label);
    const arrows = pathway.filter(p => p.arrow);
    const totalW = nodes.length * nodeW + arrows.length * arrowW;
    const svgW = Math.max(width, totalW + 20);

    let x = 10; let items = [];

    pathway.forEach((p, i) => {
      if (p.label) {
        const cx = x + nodeW / 2;
        const cy = H / 2;
        items.push(`
          <rect x="${x}" y="${cy - nodeH/2}" width="${nodeW}" height="${nodeH}"
            rx="10" fill="${p.clr}18" stroke="${p.clr}" stroke-width="1.5"/>
          <text x="${cx}" y="${cy - 4}" text-anchor="middle"
            font-family="Courier New" font-size="12" font-weight="700" fill="${p.clr}">${p.label}</text>
          <text x="${cx}" y="${cy + 14}" text-anchor="middle"
            font-family="Cairo,sans-serif" font-size="9" fill="#8aaccc">${p.sub || ''}</text>
        `);
        x += nodeW;
      } else if (p.arrow) {
        const cx = x + arrowW / 2;
        const cy = H / 2;
        const lines = p.arrow.split('\n');
        items.push(`
          <line x1="${x + 4}" y1="${cy}" x2="${x + arrowW - 8}" y2="${cy}"
            stroke="#4a6380" stroke-width="1.5" stroke-dasharray="4 3"/>
          <polygon points="${x+arrowW-8},${cy-4} ${x+arrowW-1},${cy} ${x+arrowW-8},${cy+4}"
            fill="#4a6380"/>
          ${lines.map((l, li) => `<text x="${cx}" y="${cy - 8 + li*10}" text-anchor="middle"
            font-family="Courier New" font-size="9" fill="#ffcc44">${l}</text>`).join('')}
        `);
        x += arrowW;
      }
    });

    return `<svg width="${svgW}" height="${H}" xmlns="http://www.w3.org/2000/svg">${items.join('')}</svg>`;
  },

  // Bond formation animation SVG for alkenes
  bondFormationSVG(type) {
    if (type === 'alkene_addition') {
      return `<svg width="300" height="110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px">
        <!-- C=C double bond -->
        <circle cx="90" cy="55" r="18" fill="#00ffb318" stroke="#00ffb3" stroke-width="1.5"/>
        <text x="90" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#00ffb3">C</text>
        <circle cx="180" cy="55" r="18" fill="#00ffb318" stroke="#00ffb3" stroke-width="1.5"/>
        <text x="180" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#00ffb3">C</text>
        <!-- σ bond (solid) -->
        <line x1="108" y1="51" x2="162" y2="51" stroke="#00ffb3" stroke-width="2"/>
        <!-- π bond (animated) -->
        <line x1="108" y1="60" x2="162" y2="60" stroke="#ff6eb4" stroke-width="2" stroke-dasharray="6 3" class="anim-pulse"/>
        <!-- Labels -->
        <text x="135" y="44" text-anchor="middle" font-size="9" fill="#8aaccc" font-family="Cairo,sans-serif">رابطة σ</text>
        <text x="135" y="76" text-anchor="middle" font-size="9" fill="#ff6eb4" font-family="Cairo,sans-serif" class="anim-glow">رابطة π (تنكسر في الإضافة)</text>
        <!-- Br approaching -->
        <circle cx="240" cy="55" r="14" fill="#ffcc4418" stroke="#ffcc44" stroke-width="1.5" class="anim-float" style="animation-delay:0.5s"/>
        <text x="240" y="60" text-anchor="middle" font-family="Courier New" font-size="13" font-weight="700" fill="#ffcc44">Br</text>
        <line x1="198" y1="55" x2="224" y2="55" stroke="#ffcc44" stroke-width="1.5" stroke-dasharray="4 3" class="anim-pulse"/>
        <!-- Annotation -->
        <text x="150" y="100" text-anchor="middle" font-size="9" fill="#4a6380" font-family="Cairo,sans-serif">تفاعل إضافة: π تنكسر → رابطة σ جديدة مع Br</text>
      </svg>`;
    }
    if (type === 'alkyne_triple') {
      return `<svg width="300" height="110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px">
        <circle cx="90" cy="55" r="18" fill="#ff6eb418" stroke="#ff6eb4" stroke-width="1.5"/>
        <text x="90" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#ff6eb4">C</text>
        <circle cx="180" cy="55" r="18" fill="#ff6eb418" stroke="#ff6eb4" stroke-width="1.5"/>
        <text x="180" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#ff6eb4">C</text>
        <!-- σ bond -->
        <line x1="108" y1="55" x2="162" y2="55" stroke="#ff6eb4" stroke-width="2.5"/>
        <!-- π bond 1 -->
        <line x1="108" y1="46" x2="162" y2="46" stroke="#b97aff" stroke-width="2" stroke-dasharray="5 3" class="anim-pulse"/>
        <!-- π bond 2 -->
        <line x1="108" y1="64" x2="162" y2="64" stroke="#00e5ff" stroke-width="2" stroke-dasharray="5 3" class="anim-pulse" style="animation-delay:0.4s"/>
        <text x="135" y="90" text-anchor="middle" font-size="10" fill="#8aaccc" font-family="Cairo,sans-serif">رابطة ثلاثية: σ + π + π</text>
        <text x="135" y="28" text-anchor="middle" font-size="9" fill="#b97aff" font-family="Cairo,sans-serif">رابطة π</text>
        <text x="135" y="79" text-anchor="middle" font-size="9" fill="#00e5ff" font-family="Cairo,sans-serif">رابطة π</text>
      </svg>`;
    }
    return '';
  }
};

/* ─────────────────────────────────────────────
   8. RENDERER SYSTEM
   All renders return HTML strings → mounted to #view
───────────────────────────────────────────── */
const Renderer = {

  /* — HOME — */
  home() {
    const totalSeen = Progress.totalSeen();
    const totalNodes = Progress.totalNodes();
    const pct = totalNodes > 0 ? Math.round(totalSeen / totalNodes * 100) : 0;

    const hero = `
      <div class="home-hero fade-in">
        <svg class="hero-molecules" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice">
          <circle cx="20" cy="20" r="6" fill="#00ffb3" class="anim-float"/>
          <circle cx="280" cy="90" r="8" fill="#3b9eff" class="anim-float" style="animation-delay:1s"/>
          <circle cx="150" cy="10" r="5" fill="#b97aff" class="anim-float" style="animation-delay:0.5s"/>
          <line x1="20" y1="20" x2="150" y2="10" stroke="#00ffb3" stroke-width="0.8" opacity="0.5"/>
          <line x1="150" y1="10" x2="280" y2="90" stroke="#3b9eff" stroke-width="0.8" opacity="0.5"/>
          <circle cx="60" cy="100" r="4" fill="#ffcc44" class="anim-float" style="animation-delay:1.5s"/>
          <circle cx="240" cy="30" r="7" fill="#ff6eb4" class="anim-float" style="animation-delay:0.8s"/>
          <line x1="60" y1="100" x2="240" y2="30" stroke="#ff6eb4" stroke-width="0.8" opacity="0.4"/>
        </svg>
        <div class="hero-title">⚗️ Chemistry<br>MindMap Pro</div>
        <div class="hero-sub">كيمياء الثانوية — الطريقة الذكية</div>
      </div>`;

    const stats = `
      <div class="stats-row fade-in fade-in-delay-1">
        <div class="stat-chip">
          <div class="stat-val" style="color:var(--neon-cyan)">${totalSeen}</div>
          <div class="stat-label">موضوع تمت مراجعته</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val" style="color:var(--neon-green)">${pct}%</div>
          <div class="stat-label">الإنجاز الكلي</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val" style="color:var(--neon-amber)">${CARDS.length}</div>
          <div class="stat-label">بطاقات تذكر</div>
        </div>
      </div>`;

    const unitsHtml = DB.units.map((u, i) => {
      const totalN = u.sections.reduce((a, s) => a + s.nodes.length, 0);
      const pct = Progress.getPct(u.id, totalN);
      const delay = i === 0 ? '' : `fade-in-delay-${Math.min(i, 3)}`;
      return `
        <div class="glass-card unit-card fade-in ${delay}" onclick="App.openUnit('${u.id}')" style="border-color:${u.clr}30">
          <div class="unit-card-icon" style="background:${u.clr}15">${u.icon}</div>
          <div class="unit-card-body">
            <div class="unit-card-title" style="color:${u.clr}">${u.title}</div>
            <div class="unit-card-meta">${u.description}</div>
            <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:${u.clr}"></div></div>
          </div>
          <div class="unit-card-arrow">←</div>
        </div>`;
    }).join('');

    return hero + stats + `<div class="section-label">الوحدات الدراسية</div><div class="units-grid">${unitsHtml}</div>`;
  },

  /* — UNIT — */
  unit(unit) {
    const sectionsHtml = unit.sections.map(s => `
      <div class="glass-card section-item fade-in" onclick="App.openSection('${unit.id}','${s.id}')" style="border-color:${unit.clr}25">
        <div class="section-dot" style="background:${unit.clr}"></div>
        <div class="section-item-title">${s.title}</div>
        <div class="section-item-count">${s.nodes.length} موضوع ←</div>
      </div>`).join('');

    return `
      <div class="breadcrumb">
        <span onclick="App.tab('home')">🏠 الرئيسية</span>
        <span class="breadcrumb-sep">←</span>
        <span style="color:${unit.clr}">${unit.icon} ${unit.title}</span>
      </div>
      <div class="section-list">${sectionsHtml}</div>`;
  },

  /* — SECTION — */
  section(unit, sec) {
    const html = sec.nodes.map(node => this._renderNode(unit, node)).join('');
    return `
      <div class="breadcrumb">
        <span onclick="App.tab('home')">🏠</span>
        <span class="breadcrumb-sep">←</span>
        <span onclick="App.openUnit('${unit.id}')" style="color:${unit.clr}">${unit.title}</span>
        <span class="breadcrumb-sep">←</span>
        <span>${sec.title}</span>
      </div>
      ${html}`;
  },

  _renderNode(unit, node) {
    /* TABLE */
    if (node.isTable && node.tableData) {
      const td = node.tableData;
      return `
        <div class="glass-card compare-block fade-in" style="padding:14px;margin-bottom:10px;border-color:${(node.clr||unit.clr)}25">
          <h4 style="color:${node.clr||unit.clr};margin-bottom:10px;font-size:13px">${node.title}</h4>
          <div class="table-scroll">
            <table class="chem-table">
              <tr>${td.headers.map(h => `<th style="color:${node.clr||unit.clr}">${h}</th>`).join('')}</tr>
              ${td.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
            </table>
          </div>
        </div>`;
    }

    /* EXPECTED QUESTIONS */
    if (node.isExpected) {
      return `
        <div class="expected-block fade-in">
          <div class="expected-header">❓ ${node.title}</div>
          ${node.items.map((q, i) => `
            <div class="expected-item">
              <span class="expected-num">س${i+1}</span>
              <span>${q}</span>
            </div>`).join('')}
        </div>`;
    }

    /* PATHWAY */
    if (node.isPathway && node.pathway) {
      const w = document.getElementById('view')?.clientWidth || 320;
      const svgHtml = MindMap.renderPathwaySVG(node.pathway, w - 28);
      return `
        <div class="glass-card fade-in" style="padding:12px;margin-bottom:8px;border-color:${(node.clr||unit.clr)}25">
          <div class="node-title" style="color:${node.clr||unit.clr};margin-bottom:10px;font-size:13px;font-weight:800">${node.title}</div>
          <div class="pathway-scroll">${svgHtml}</div>
        </div>`;
    }

    /* ACCORDION NODE */
    const clr = node.clr || unit.clr;
    const nid = node.id;
    const itemsHtml = (node.items || []).map(item => ItemParser.render(item)).join('');

    return `
      <div class="node-wrap fade-in">
        <div class="node-header" id="nh_${nid}" onclick="App.toggleNode('${nid}','${unit.id}')"
          style="border-color:${clr}35">
          <div class="node-title" style="color:${clr}">${node.title}</div>
          <span class="node-count">${(node.items||[]).length}</span>
          <span class="node-chevron">▼</span>
        </div>
        <div class="node-body" id="nb_${nid}" style="border-color:${clr}25;background:${clr}08">
          ${itemsHtml}
          ${this._bondDemo(node)}
        </div>
      </div>`;
  },

  _bondDemo(node) {
    if (node.id === 'ethene_rxns') {
      return `<div class="bond-demo" style="margin-top:12px">
        <div class="bond-demo-label">🔬 آلية تفاعل الإضافة</div>
        ${MindMap.bondFormationSVG('alkene_addition')}
      </div>`;
    }
    if (node.id === 'ethyne_rxns') {
      return `<div class="bond-demo" style="margin-top:12px">
        <div class="bond-demo-label">🔬 الرابطة الثلاثية</div>
        ${MindMap.bondFormationSVG('alkyne_triple')}
      </div>`;
    }
    return '';
  },

  /* — ORGANIC TAB (special visual) — */
  organic() {
    const hc = DB.units.find(u => u.id === 'hydrocarbons');
    const der = DB.units.find(u => u.id === 'org_derivatives');

    // Organic conversion pathway: C₂ complete chain
    const pw = DB.units[0].sections.find(s=>s.id==='alkynes')?.nodes.find(n=>n.isPathway);
    const w = document.getElementById('view')?.clientWidth || 320;
    const pwSVG = pw ? MindMap.renderPathwaySVG(pw.pathway, w - 28) : '';

    // Functional group chips
    const fgChips = [
      { fg:'-OH',   clr:'#b97aff', name:'هيدروكسيل' },
      { fg:'-CHO',  clr:'#ffcc44', name:'ألدهيد' },
      { fg:'-COOH', clr:'#ff4d6d', name:'كربوكسيل' },
      { fg:'-COO-', clr:'#00e5ff', name:'استر' },
      { fg:'-CO-',  clr:'#ff7c35', name:'كيتون' },
      { fg:'-NH₂',  clr:'#00ffb3', name:'أمين' },
    ].map(c => `<span class="fg-chip" style="color:${c.clr};border-color:${c.clr}55;background:${c.clr}10">${c.fg} ${c.name}</span>`).join('');

    return `
      <div class="section-label">الكيمياء العضوية — نظرة عامة</div>

      <div class="glass-card glow-green fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-green);margin-bottom:8px">🔗 المجموعات الوظيفية</div>
        <div>${fgChips}</div>
      </div>

      <div class="glass-card fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-pink);margin-bottom:10px">↔️ سلسلة تحويلات C₂</div>
        <div class="pathway-scroll">${pwSVG}</div>
      </div>

      <div class="glass-card fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-blue);margin-bottom:10px">🔬 آلية الإضافة على الكينات</div>
        ${MindMap.bondFormationSVG('alkene_addition')}
      </div>

      <div class="glass-card fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-pink);margin-bottom:10px">⚡ الرابطة الثلاثية — الكاينات</div>
        ${MindMap.bondFormationSVG('alkyne_triple')}
      </div>

      <div class="section-label" style="margin-top:10px">الوحدات العضوية</div>
      <div class="glass-card unit-card fade-in" onclick="App.openUnit('hydrocarbons')" style="border-color:#00ffb330">
        <div class="unit-card-icon" style="background:#00ffb315">🧪</div>
        <div class="unit-card-body">
          <div class="unit-card-title" style="color:var(--neon-green)">الهيدروكربونات</div>
          <div class="unit-card-meta">كانات • كينات • كاينات • بنزين</div>
        </div>
        <div class="unit-card-arrow">←</div>
      </div>
      <div class="glass-card unit-card fade-in fade-in-delay-1" onclick="App.openUnit('org_derivatives')" style="border-color:#ec489930">
        <div class="unit-card-icon" style="background:#ec489915">⚗️</div>
        <div class="unit-card-body">
          <div class="unit-card-title" style="color:#ec4899">مشتقات الهيدروكربونات</div>
          <div class="unit-card-meta">كحولات • أحماض • استرات</div>
        </div>
        <div class="unit-card-arrow">←</div>
      </div>
    `;
  },

  /* — SEARCH — */
  search(q) {
    const results = Search.query(q);
    if (!q || q.length < 2) {
      return `<div class="search-box">
        <input class="search-input" type="search" id="si" placeholder="ابحث: معادلة، عنصر، تفاعل..." value="${q||''}"
          oninput="App.onSearch(this.value)" autocomplete="off" autofocus/>
        <span class="search-icon">🔍</span>
      </div>
      <div class="search-hint">🔍<br>اكتب كلمتين على الأقل<br>للبحث في كل المحتوى</div>`;
    }
    const resHtml = results.length === 0
      ? '<div class="search-hint">😕 لا نتائج — جرب كلمة مختلفة</div>'
      : results.map(r => `
          <div class="search-result" onclick="App.jumpTo('${r.uid}','${r.sid}')">
            <div class="sr-title" style="color:${r.clr}">${r.nodeTitle}</div>
            <div class="sr-path">${r.unitTitle} ← ${r.secTitle}</div>
            ${r.matchItems.map(it => {
              const ql = q.toLowerCase();
              const safe = it.replace(/</g,'&lt;');
              const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
              return `<div class="sr-preview">${safe.replace(re,'<mark>$1</mark>')}</div>`;
            }).join('')}
          </div>`).join('');

    return `<div class="search-box">
      <input class="search-input" type="search" id="si" placeholder="ابحث..." value="${q}"
        oninput="App.onSearch(this.value)" autocomplete="off"/>
      <span class="search-icon">🔍</span>
    </div>
    ${results.length > 0 ? `<div class="search-count">${results.length} نتيجة</div>` : ''}
    ${resHtml}`;
  },

  /* — QUIZ — */
  quiz(S) {
    if (S.done) {
      const pct = Math.round(S.score / QUIZ.length * 100);
      const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
      const msg = pct >= 80 ? 'ممتاز! أنت جاهز للامتحان' : pct >= 60 ? 'جيد، راجع المحتوى ثم أعد' : 'راجع المحتوى وأعد المحاولة';
      return `
        <div class="quiz-result glass-card" style="padding:28px">
          <div class="quiz-result-score" style="color:${pct>=80?'var(--neon-green)':pct>=60?'var(--neon-amber)':'var(--neon-red)'}">${emoji}</div>
          <div class="quiz-result-label">${S.score} / ${QUIZ.length}</div>
          <div class="quiz-result-sub">${pct}% صحيح — ${msg}</div>
          <div class="quiz-result-bar-wrap">
            <div class="quiz-prog-bar"><div class="quiz-prog-fill" style="width:${pct}%"></div></div>
          </div>
          <button class="btn-primary" onclick="App.restartQuiz()">🔄 إعادة الاختبار</button>
          <button class="btn-ghost" onclick="App.tab('flash')">🃏 مراجعة بالبطاقات</button>
        </div>`;
    }

    const q = QUIZ[S.idx];
    const pct = Math.round(S.idx / QUIZ.length * 100);
    const optsHtml = q.opts.map((o, i) => {
      let cls = '';
      if (S.answered) {
        if (i === q.ans) cls = 'correct';
        else if (i === S.chosen && i !== q.ans) cls = 'wrong';
        else cls = 'revealed';
      }
      return `<button class="quiz-opt ${cls}" onclick="App.answerQuiz(${i})" ${S.answered?'disabled':''}>${o}</button>`;
    }).join('');

    return `
      <div class="quiz-progress-wrap">
        <div class="quiz-prog-bar"><div class="quiz-prog-fill" style="width:${pct}%"></div></div>
        <div class="quiz-prog-label">السؤال ${S.idx+1} من ${QUIZ.length}</div>
      </div>
      <div class="glass-card quiz-card">
        <div class="quiz-q">${q.q}</div>
        <div class="quiz-opts">${optsHtml}</div>
        ${S.answered && q.explain ? `<div class="quiz-explain">💡 ${q.explain}</div>` : ''}
        ${S.answered ? `<button class="btn-primary" style="margin-top:14px" onclick="App.nextQ()">التالي ←</button>` : ''}
      </div>`;
  },

  /* — FLASHCARDS — */
  flash(S) {
    const card = CARDS[S.idx];
    const unit = DB.units.find(u => u.id === card.unit);
    const clr = unit ? unit.clr : '#3b9eff';
    const conf = Progress.getConf(S.idx);

    return `
      <div class="fc-counter">${S.idx + 1} / ${CARDS.length} — ${unit ? unit.title : ''}</div>
      <div class="fc-scene" onclick="App.flipCard()">
        <div class="fc-card ${S.flipped ? 'flipped' : ''}" style="min-height:200px;position:relative">
          <div class="fc-face" style="border-color:${clr}30;min-height:200px">
            <div class="fc-face-label">السؤال — انقر للإجابة</div>
            <div class="fc-face-text">${card.f}</div>
          </div>
          <div class="fc-face fc-face-back" style="border-color:${clr};min-height:200px">
            <div class="fc-face-label" style="color:${clr}">الإجابة ✓</div>
            <div class="fc-face-text">${card.b}</div>
          </div>
        </div>
      </div>
      <div class="fc-hint">${S.flipped ? 'كيف كانت درجة صعوبتها؟' : '👆 انقر على البطاقة لرؤية الإجابة'}</div>
      ${S.flipped ? `
        <div class="fc-confidence" style="margin-bottom:12px">
          <button class="fc-conf-btn fc-conf-hard" onclick="App.rateCard('hard')">😓 صعب</button>
          <button class="fc-conf-btn fc-conf-ok"   onclick="App.rateCard('ok')">🤔 تقريباً</button>
          <button class="fc-conf-btn fc-conf-easy" onclick="App.rateCard('easy')">✅ سهل</button>
        </div>` : ''}
      <div class="fc-nav">
        <button class="fc-nav-btn" onclick="App.prevCard()">← السابق</button>
        <div style="color:var(--text-muted);font-size:11px;text-align:center">
          ${conf === 'easy' ? '✅ سهل' : conf === 'ok' ? '🤔 تقريباً' : conf === 'hard' ? '😓 صعب' : '⬜ لم تُقيَّم'}
        </div>
        <button class="fc-nav-btn" onclick="App.nextCard()">التالي →</button>
      </div>`;
  }
};

/* ─────────────────────────────────────────────
   9. APP CONTROLLER
───────────────────────────────────────────── */
const App = (() => {
  const S = {
    tab: 'home',
    path: [],          // [{type:'unit'|'section', uid, sid}]
    searchQ: '',
    quiz: { idx:0, score:0, answered:false, done:false, chosen:-1 },
    flash: { idx:0, flipped:false },
  };

  const view = () => document.getElementById('view');
  const nav  = (id) => document.getElementById('nav-' + id);

  function mount(html) {
    const v = view();
    v.innerHTML = html;
    v.scrollTop = 0;
    v.classList.remove('fade-in');
    void v.offsetWidth; // reflow
    v.classList.add('fade-in');
  }

  function updateNav() {
    ['home','organic','search','quiz','flash'].forEach(t => {
      const el = nav(t);
      if (el) el.classList.toggle('active', S.tab === t);
    });
  }

  function updateBack() {
    const btn = document.getElementById('btn-back');
    if (!btn) return;
    btn.style.display = S.path.length > 0 ? '' : 'none';
  }

  function render() {
    updateNav();
    updateBack();

    if (S.tab === 'home') {
      if (S.path.length === 0) {
        mount(Renderer.home());
      } else if (S.path.length === 1) {
        const unit = DB.units.find(u => u.id === S.path[0]);
        mount(unit ? Renderer.unit(unit) : Renderer.home());
      } else if (S.path.length === 2) {
        const unit = DB.units.find(u => u.id === S.path[0]);
        const sec  = unit?.sections.find(s => s.id === S.path[1]);
        mount(unit && sec ? Renderer.section(unit, sec) : Renderer.home());
      }
    } else if (S.tab === 'organic') {
      mount(Renderer.organic());
    } else if (S.tab === 'search') {
      mount(Renderer.search(S.searchQ));
      const si = document.getElementById('si');
      if (si) { si.focus(); si.selectionStart = si.selectionEnd = si.value.length; }
    } else if (S.tab === 'quiz') {
      mount(Renderer.quiz(S.quiz));
    } else if (S.tab === 'flash') {
      mount(Renderer.flash(S.flash));
    }
  }

  /* Public API */
  return {
    tab(t) {
      S.tab = t;
      if (t !== 'home') S.path = [];
      render();
    },

    back() {
      if (S.path.length > 0) { S.path.pop(); render(); }
    },

    openUnit(id) {
      S.tab = 'home'; S.path = [id]; render();
    },

    openSection(uid, sid) {
      S.tab = 'home'; S.path = [uid, sid]; render();
    },

    jumpTo(uid, sid) {
      S.tab = 'home'; S.path = [uid, sid]; render();
    },

    toggleNode(nid, unitId) {
      const h = document.getElementById('nh_' + nid);
      const b = document.getElementById('nb_' + nid);
      if (!h || !b) return;
      const open = b.classList.contains('open');
      h.classList.toggle('open', !open);
      b.classList.toggle('open', !open);
      if (!open) Progress.markSeen(unitId, nid);
    },

    onSearch(q) {
      S.searchQ = q;
      const results = Search.query(q);
      const container = view();
      if (!container) return;
      // Fast partial re-render
      const existing = container.querySelector('.search-count, .search-hint, .search-result');
      if (!existing) { render(); return; }
      // Rebuild only results section
      mount(Renderer.search(q));
      const si = document.getElementById('si');
      if (si) { si.focus(); si.selectionStart = si.selectionEnd = si.value.length; }
    },

    /* Quiz */
    answerQuiz(i) {
      if (S.quiz.answered) return;
      S.quiz.answered = true;
      S.quiz.chosen = i;
      if (i === QUIZ[S.quiz.idx].ans) S.quiz.score++;
      render();
    },

    nextQ() {
      S.quiz.idx++;
      S.quiz.answered = false;
      S.quiz.chosen = -1;
      if (S.quiz.idx >= QUIZ.length) S.quiz.done = true;
      render();
    },

    restartQuiz() {
      S.quiz = { idx:0, score:0, answered:false, done:false, chosen:-1 };
      render();
    },

    /* Flashcards */
    flipCard() { S.flash.flipped = !S.flash.flipped; render(); },

    nextCard() {
      S.flash.idx = (S.flash.idx + 1) % CARDS.length;
      S.flash.flipped = false;
      render();
    },

    prevCard() {
      S.flash.idx = (S.flash.idx - 1 + CARDS.length) % CARDS.length;
      S.flash.flipped = false;
      render();
    },

    rateCard(level) {
      Progress.setConf(S.flash.idx, level);
      // Auto-advance after rating
      setTimeout(() => {
        S.flash.idx = (S.flash.idx + 1) % CARDS.length;
        S.flash.flipped = false;
        render();
      }, 300);
    },

    toggleTheme() {
      const body = document.body;
      const isLight = body.getAttribute('data-theme') === 'light';
      body.setAttribute('data-theme', isLight ? 'dark' : 'light');
      document.getElementById('btn-theme').textContent = isLight ? '🌙' : '☀️';
    },
  };
})();

/* ─────────────────────────────────────────────
   10. TOAST
───────────────────────────────────────────── */
function toast(msg, duration = 2200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

/* ─────────────────────────────────────────────
   11. BOOT
───────────────────────────────────────────── */
(function boot() {
  Search.build(); // Pre-build search index
  App.tab('home');

  // Keyboard shortcut: '/' to focus search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      e.preventDefault();
      App.tab('search');
    }
  });

  // Handle browser back
  window.addEventListener('popstate', () => App.back());
})();

