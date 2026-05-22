'use strict';

const EXAM_CENTER_CARDS = [
  {
    id: 'official-2026',
    title: 'نماذج الوزارة 2026',
    desc: 'نماذج تدريب رسمية بنمط امتحاني حديث.',
    action: 'exam-open-section',
    section: 'official-2026',
  },
  {
    id: 'by-chapter',
    title: 'تدريب حسب الباب',
    desc: 'اختر موضوعًا محددًا ودرّب مهارة واحدة بوضوح.',
    action: 'exam-open-section',
    section: 'by-chapter',
  },
  {
    id: 'mock-exam',
    title: 'امتحان تجريبي',
    desc: 'تجربة امتحان متوازن من بنك الأسئلة الحالي.',
    action: 'exam-open-mock',
    section: 'mock',
  },
  {
    id: 'worked-examples',
    title: 'أمثلة محلولة',
    desc: 'خطوات مختصرة لحل الأسئلة الأكثر تكرارًا.',
    action: 'exam-open-section',
    section: 'worked',
  },
  {
    id: 'common-mistakes',
    title: 'أخطائي الشائعة',
    desc: 'راجع الأخطاء المتكررة لتثبيت نقاط الضعف.',
    action: 'exam-open-section',
    section: 'mistakes',
  },
  {
    id: 'analytics',
    title: 'إحصائياتي',
    desc: 'ملخص الأداء العام والدقة حسب الموضوع.',
    action: 'exam-open-section',
    section: 'analytics',
  },
];

const EXAM_TOPIC_CHIPS = [
  { key: 'all', label: 'كل الموضوعات' },
  { key: 'Ksp', label: 'Ksp' },
  { key: 'pH', label: 'pH / pOH' },
  { key: 'Faraday', label: 'فاراداي' },
  { key: 'E_cell', label: 'E_cell' },
  { key: 'titration', label: 'المعايرة' },
  { key: 'organic_conversions', label: 'تحويلات عضوية' },
];

const ExamCenter = {
  getCards() {
    return EXAM_CENTER_CARDS.slice();
  },

  getTopicChips() {
    return EXAM_TOPIC_CHIPS.slice();
  },

  buildModel({ questions = [], analyticsSummary = null, activeTopic = 'all' } = {}) {
    const byTopic = questions.reduce((acc, q) => {
      const key = q.topic || 'other';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const filtered = activeTopic === 'all'
      ? questions
      : questions.filter(q => String(q.topic) === String(activeTopic));

    return {
      cards: this.getCards(),
      chips: this.getTopicChips(),
      totalQuestions: questions.length,
      filteredQuestions: filtered,
      byTopic,
      activeTopic,
      analyticsSummary: analyticsSummary || {
        attempted: 0,
        correct: 0,
        accuracy: 0,
      },
    };
  },
};

export { ExamCenter };
