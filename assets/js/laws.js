'use strict';

const LAW_CATEGORIES = [
  { key: 'all', label: 'الكل' },
  { key: 'acids-bases', label: 'الأحماض والقواعد' },
  { key: 'ph-poh', label: 'pH و pOH' },
  { key: 'electrolysis', label: 'التحليل الكهربي' },
  { key: 'ksp', label: 'حاصل الإذابة' },
  { key: 'mass-percent', label: 'النسبة المئوية' },
  { key: 'titration', label: 'المعايرة' },
  { key: 'electrochemical-cells', label: 'الخلايا الكهربية' },
  { key: 'moles', label: 'المولات' },
];

const LAWS = [
  {
    id: 'law_strong_weak_electrolytes',
    category: 'acids-bases',
    title: 'الأحماض والقواعد والإلكتروليتات',
    formula: 'Strong/Weak Electrolytes',
    symbols: 'α: درجة التأين، Ca: تركيز الحمض، Cb: تركيز القاعدة، Ka/Kb: ثابت التأين',
    whenToUse: 'عند التمييز بين حمض/قاعدة قوية أو ضعيفة، وعند حساب درجة التأين أو ثابت التأين.',
    notes: 'الإلكتروليت القوي يتأين كليًا تقريبًا، والضعيف يتأين جزئيًا.',
    mistakes: 'الخلط بين Ka و Kb، أو استخدام تقريب α الصغير دون التحقق من نسبته.',
    lines: [
      '[H+] = تركيز الحمض القوي × عدد مولات +H من المعادلة',
      '[H3O+] = α × Ca = √(Ka × Ca)',
      'Ka = α² × Ca',
      'α = √(Ka / Ca)',
      'Kb = α² × Cb',
      'إذا كانت α < 5%: يسمح بالتقريب',
      'إذا كانت α > 5%: Ka = (α² × Ca) / (1 - α)',
    ],
    keywords: ['Ka', 'Kb', 'alpha', 'درجة التأين', 'أوستفالد', 'حمض قوي', 'حمض ضعيف', 'قاعدة ضعيفة'],
  },
  {
    id: 'law_ph_poh_kw',
    category: 'ph-poh',
    title: 'علاقات pH و pOH',
    formula: 'Kw = [H+] [OH-] = 10^-14, pH + pOH = 14',
    symbols: '[H+]/[H3O+]: تركيز أيون الهيدرونيوم، [OH-]: تركيز الهيدروكسيد، Kw: ثابت تأين الماء',
    whenToUse: 'عند التحويل بين التركيز والأس الهيدروجيني أو تحديد حمضي/متعادل/قلوي.',
    notes: 'زيادة [H3O+] تخفض pH، وزيادة [OH-] تخفض pOH.',
    mistakes: 'نسيان أن pH و pOH علاقة عكسية، أو استخدام 14 دون الانتباه لظروف المنهج القياسية.',
    lines: [
      'Kw = [H+] [OH-] = 10^-14',
      'pKw = pH + pOH = 14',
      '0 → 7: محلول حمضي',
      '7: محلول متعادل',
      '7 → 14: محلول قلوي',
      'على الآلة: SHIFT → LOG لإدخال قيمة pH أو pOH للتركيز',
    ],
    keywords: ['pH', 'pOH', 'Kw', 'pKw', 'حمضي', 'قلوي', 'متعادل'],
  },
  {
    id: 'law_faraday_electrolysis',
    category: 'electrolysis',
    title: 'قوانين فاراداي والتحليل الكهربي',
    formula: 'Q = I × t,  Q/96500 = m/Equivalent Mass',
    symbols: 'Q (C): كمية الكهرباء، I (A): شدة التيار، t (s): الزمن، m: الكتلة',
    whenToUse: 'عند حساب الكتلة المترسبة أو كمية الكهرباء أو عدد مولات الإلكترونات.',
    notes: 'الكتلة المكافئة = الكتلة الذرية / عدد الشحنات (Z).',
    mistakes: 'الخلط بين الكتلة الذرية والكتلة المكافئة أو إهمال تحويل الزمن للثواني.',
    lines: [
      'Q = I × t',
      'Q / 96500 = m / الكتلة المكافئة الجرامية',
      'الكتلة المكافئة = الكتلة الذرية الجرامية / Z',
      'الحجم = المساحة × السمك',
      'الكثافة = الكتلة / الحجم',
      'Q = عدد المولات × 96500 × التكافؤ',
    ],
    keywords: ['Faraday', '96500', 'Q', 'I', 't', 'التحليل الكهربي', 'الكتلة المترسبة'],
  },
  {
    id: 'law_ksp_general',
    category: 'ksp',
    title: 'حاصل الإذابة Ksp',
    formula: 'Ksp = [A^b+]^a [B^a-]^b',
    symbols: 'a,b: معاملات التفكك، x: الذوبانية المولارية',
    whenToUse: 'عند حساب الذوبانية أو مقارنة الترسيب أو ربط التركيز الأيوني بحاصل الإذابة.',
    notes: 'ابدأ دائمًا بالمعادلة الأيونية الصحيحة للملح.',
    mistakes: 'نسيان رفع التركيزات للأسس أو استخدام تركيز الملح مباشرة دون معامل الأيون.',
    lines: [
      'أحادي + أحادي: Ksp = x² ، x = √Ksp',
      'ثنائي + ثنائي: Ksp = x² ، x = √Ksp',
      'أحادي + ثنائي: Ksp = 4x³ ، x = ³√(Ksp/4)',
      'ثلاثي + أحادي: Ksp = 27x⁴ ، x = ⁴√(Ksp/27)',
      'ثنائي + ثلاثي: Ksp = 108x⁵ ، x = ⁵√(Ksp/108)',
      'المولات = الكتلة ÷ الكتلة المولية، ثم التركيز = المولات ÷ الحجم (L)',
    ],
    keywords: ['Ksp', 'الذوبانية', 'x', 'ترسيب', 'salt', 'ionic'],
  },
  {
    id: 'law_mass_percent',
    category: 'mass-percent',
    title: 'النسبة المئوية الكتلية',
    formula: '% by mass = (part mass / total mass) × 100',
    symbols: 'كتلة العنصر: mass of element، كتلة العينة/المركب: total mass',
    whenToUse: 'عند استخراج تركيب المركب أو حساب كتلة عنصر داخل عينة.',
    notes: 'مجموع النسب المئوية لعناصر المركب يجب أن يساوي 100%.',
    mistakes: 'الخلط بين كتلة العنصر في مول المركب وكتلته في عينة فعلية.',
    lines: [
      '% عنصر في مركب = (كتلة العنصر في مول المركب / الكتلة المولية للمركب) × 100',
      '% عنصر في عينة = (كتلة العنصر في العينة / كتلة العينة) × 100',
      'كتلة العنصر في العينة = (% العنصر × كتلة العينة) / 100',
    ],
    keywords: ['percentage', 'mass %', 'النسبة المئوية', 'كتلة العنصر'],
  },
  {
    id: 'law_titration',
    category: 'titration',
    title: 'قانون المعايرة',
    formula: '(Ma × Va)/na = (Mb × Vb)/nb',
    symbols: 'M: التركيز المولاري، V: الحجم، n: عدد مولات H+ أو OH- المتفاعلة',
    whenToUse: 'في مسائل تعادل الحمض والقاعدة عند نقطة التكافؤ.',
    notes: 'في المعايرة نستخدم علاقة الاتزان عند نقطة نهاية التفاعل.',
    mistakes: 'استخدام أحجام بوحدة مختلفة أو تجاهل قيمة n (عدد المكافئات).',
    lines: [
      '(Ma × Va)/na = (Mb × Vb)/nb',
      'نقطة التكافؤ: عدد المكافئات الحمضية = عدد المكافئات القاعدية',
    ],
    keywords: ['titration', 'MaVa', 'MbVb', 'na', 'nb', 'المعايرة'],
  },
  {
    id: 'law_ecell',
    category: 'electrochemical-cells',
    title: 'القوة الدافعة الكهربية E_cell',
    formula: 'E_cell = E°ox(anode) + E°red(cathode)',
    symbols: 'anode: المصعد، cathode: المهبط، E°: جهد قياسي',
    whenToUse: 'عند حساب فرق الجهد القياسي للخلية الجلفانية.',
    notes: 'يمكن الكتابة بصيغ مكافئة بشرط توحيد نوع الجهود (أكسدة/اختزال).',
    mistakes: 'عكس إشارة أحد الأقطاب أو جمع جهود اختزال القطبين دون تحويل صحيح.',
    lines: [
      'E_cell = جهد الأكسدة القياسي للأنود + جهد الاختزال القياسي للكاثود',
      'E_cell = جهد الأكسدة القياسي للأنود - جهد الأكسدة القياسي للكاثود',
      'E_cell = جهد الاختزال القياسي للكاثود - جهد الاختزال القياسي للأنود',
    ],
    keywords: ['E_cell', 'anode', 'cathode', 'خلية جلفانية', 'جهد الاختزال', 'جهد الأكسدة'],
  },
  {
    id: 'law_moles',
    category: 'moles',
    title: 'قوانين عدد المولات',
    formula: 'n = m/M = V/22.4 = N/NA = Molarity × Volume(L)',
    symbols: 'n: المولات، m: الكتلة، M: الكتلة المولية، N: عدد الجسيمات، NA: عدد أفوجادرو',
    whenToUse: 'للتحويل بين الكتلة والحجم والجسيمات والتركيز في أغلب مسائل الكيمياء.',
    notes: 'عدد أفوجادرو = 6.02 × 10^23 جسيم/مول.',
    mistakes: 'استخدام حجم بالملليلتر بدل اللتر في العلاقة مع المولارية.',
    lines: [
      'عدد المولات = الكتلة / الكتلة المولية',
      'عدد المولات = حجم الغاز / 22.4 L (في STP)',
      'عدد المولات = عدد الذرات/الجزيئات/الأيونات ÷ 6.02 × 10^23',
      'عدد المولات = الحجم باللتر × التركيز المولاري (mol/L)',
    ],
    keywords: ['mol', 'moles', '22.4', 'Avogadro', '6.02×10^23', 'عدد المولات'],
  },
];

function toSearchText(item) {
  return [
    item.title,
    item.formula,
    item.symbols,
    item.whenToUse,
    item.notes,
    item.mistakes,
    ...(item.lines || []),
    ...((item.keywords || []).map(String)),
  ].join(' ');
}

function filterLaws(query = '', category = 'all') {
  const q = (query || '').trim().toLowerCase();
  return LAWS.filter(item => {
    if (category && category !== 'all' && item.category !== category) return false;
    if (!q) return true;
    return toSearchText(item).toLowerCase().includes(q);
  });
}

const LAW_CATEGORY_BY_KEY = Object.fromEntries(LAW_CATEGORIES.map(c => [c.key, c.label]));

const LAW_SEARCH_ENTRIES = LAWS.map(item => ({
  kind: 'law',
  lawId: item.id,
  lawCategory: item.category,
  lawCategoryLabel: LAW_CATEGORY_BY_KEY[item.category] || 'القوانين',
  title: item.title,
  text: toSearchText(item),
  snippets: item.lines.slice(0, 3),
}));

const LawsData = {
  categories: LAW_CATEGORIES,
  laws: LAWS,
  filterLaws,
  categoryLabel(key) {
    return LAW_CATEGORY_BY_KEY[key] || 'القوانين';
  },
};

export { LawsData, LAW_SEARCH_ENTRIES };
