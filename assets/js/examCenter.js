'use strict';

const EXAM_CENTER_CARDS = [
  {
    id: 'official-2026',
    title: 'نماذج الوزارة 2026',
    desc: 'أسئلة مستخرجة من النماذج الرسمية مع مرجع المصدر لكل سؤال.',
    action: 'go-hash',
    hash: '#exam-center?section=official',
  },
  {
    id: 'by-chapter',
    title: 'تدريب حسب الباب',
    desc: 'ابدأ تدريبًا موجّهًا حسب الباب والمهارة والصعوبة ونوع الفخ.',
    action: 'go-hash',
    hash: '#exam-training',
  },
  {
    id: 'mock-exam',
    title: 'امتحان تجريبي',
    desc: 'اختبار سريع 15 سؤال أو نسخة كاملة 46 سؤالًا (قيد الاكتمال عند الحاجة).',
    action: 'go-hash',
    hash: '#mock/quick',
  },
  {
    id: 'worked-examples',
    title: 'أمثلة محلولة',
    desc: 'خطوات حل مختصرة مرتبطة بالقوانين والأسئلة المتكررة.',
    action: 'go-hash',
    hash: '#worked-examples',
  },
  {
    id: 'common-mistakes',
    title: 'أخطائي الشائعة',
    desc: 'راجع الأسئلة التي أخطأت بها مع إعادة التدريب والربط بالقانون.',
    action: 'go-hash',
    hash: '#exam-mistakes',
  },
  {
    id: 'analytics',
    title: 'إحصائياتي',
    desc: 'تحليل الأداء: الدقة، أضعف باب، أكثر فخ متكرر، وتوصية تدريب تالية.',
    action: 'go-hash',
    hash: '#exam-analytics',
  },
];

const TRAINING_CHAPTERS = [
  { key: 'العناصر الانتقالية والحديد', label: 'العناصر الانتقالية والحديد' },
  { key: 'التحليل الكيميائي', label: 'التحليل الكيميائي' },
  { key: 'الاتزان والاتزان الأيوني', label: 'الاتزان والاتزان الأيوني' },
  { key: 'الكيمياء الكهربية', label: 'الكيمياء الكهربية' },
  { key: 'الكيمياء العضوية', label: 'الكيمياء العضوية' },
  { key: 'مهارات مختلطة ورسوم بيانية', label: 'مهارات مختلطة ورسوم بيانية' },
];

const LAW_ALIAS = {
  ksp: 'ksp',
  ph: 'ph',
  faraday: 'faraday',
  titration: 'titration',
  ecell: 'ecell',
  e_cell: 'ecell',
  moles: 'moles',
  ka: 'ka',
  kb: 'kb',
};

const ExamCenter = {
  getCards() {
    return EXAM_CENTER_CARDS.slice();
  },

  getTrainingChapters() {
    return TRAINING_CHAPTERS.slice();
  },

  normalizeLawKey(raw) {
    const k = String(raw || '').trim().toLowerCase();
    return LAW_ALIAS[k] || k;
  },

  buildCenterModel({
    totalQuestions = 0,
    officialQuestions = 0,
    syntheticQuestions = 0,
    safeAutoGraded = 0,
    needsManualReview = 0,
    readiness = 0,
    analyticsSummary = null,
    sourceFiles = [],
  } = {}) {
    return {
      cards: this.getCards(),
      totalQuestions,
      officialQuestions,
      syntheticQuestions,
      safeAutoGraded,
      needsManualReview,
      readiness,
      analyticsSummary: analyticsSummary || { attempted: 0, accuracy: 0 },
      sourceFiles,
    };
  },
};

export { ExamCenter };
