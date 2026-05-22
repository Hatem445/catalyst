'use strict';

const DATA_PATHS = {
  official: './assets/data/exams/official-2026-models.json',
  archive: './assets/data/exams/archive-2017-2025.json',
  blueprint: './assets/data/mocks/chemistry-blueprint.json',
  workedExamples: './assets/data/worked-examples.json',
  microLessons: './assets/data/micro-lessons.json',
  sourceMap: './assets/data/exams/source-map-2026.json',
  manualReview: './assets/data/exams/manual-review-needed.json',
};

const STORE = {
  initialized: false,
  initPromise: null,
  questions: [],
  archiveQuestions: [],
  workedExamples: [],
  microLessons: [],
  blueprint: null,
  sourceMap: null,
  manualReview: [],
  searchEntries: [],
};

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

async function loadJson(path, fallback = {}) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) return fallback;
  try {
    return await res.json();
  } catch (_) {
    return fallback;
  }
}

function hasCorruptedMarkers(value) {
  const s = String(value || '');
  if (s.includes('???') || s.includes('�') || s.includes('\uFFFD')) return true;
  // Detect common Arabic mojibake sequences from bad UTF-8/Windows-1256 decoding.
  const mojibakeHits = [
    'ظ…', 'ظ†', 'ظ„', 'ط§ظ', 'ط¹ظ', 'ط±ط', 'طھط', 'ظٹط',
  ].reduce((acc, token) => acc + (s.includes(token) ? 1 : 0), 0);
  return mojibakeHits >= 3;
}

function normalizeVisualAid(raw = {}) {
  const direct = raw.visualAid || raw.supportData || raw.extraData || raw.media || null;
  if (direct && typeof direct === 'object') {
    const type = String(direct.type || direct.kind || '').trim();
    if (!type) return null;
    return { ...direct, type };
  }

  const imageUrl = raw.imageUrl || raw.image || raw.figureUrl || raw.figure || '';
  if (typeof imageUrl === 'string' && imageUrl.trim()) {
    return {
      type: 'image',
      titleAr: 'شكل السؤال',
      imageUrl: imageUrl.trim(),
      altAr: String(raw.figureCaption || raw.imageCaption || 'صورة توضيحية'),
    };
  }

  const tableRows = asArray(raw.tableRows || raw.table?.rows || raw.tableData);
  if (tableRows.length) {
    return {
      type: 'table',
      titleAr: String(raw.tableTitle || 'بيانات السؤال'),
      headers: asArray(raw.tableHeaders || raw.table?.headers).map(String),
      rows: tableRows.map(row => asArray(row).map(String)),
    };
  }

  const q = String(raw.question || '');
  const stemType = String(raw.stemType || '').toLowerCase();
  const skill = String(raw.skill || '');
  const looksGraphQuestion = (
    q.includes('من قراءة منحنى')
    || q.includes('منحنى')
    || stemType.includes('graph')
    || stemType.includes('chart')
    || skill.includes('الرسوم')
    || skill.includes('البياني')
  );

  if (looksGraphQuestion) {
    return {
      type: 'line-chart-equilibrium',
      titleAr: 'منحنى تغير التركيز مع الزمن',
      captionAr: 'بيانات تدريبية تقريبية لشرح سلوك الاتزان الديناميكي.',
      xLabelAr: 'الزمن',
      yLabelAr: 'التركيز',
      series: [
        {
          name: 'المتفاعلات',
          color: '#76b8ff',
          points: [{ x: 0, y: 9 }, { x: 2, y: 7 }, { x: 4, y: 5.2 }, { x: 6, y: 4 }, { x: 8, y: 4 }, { x: 10, y: 4 }],
        },
        {
          name: 'النواتج',
          color: '#56d5a8',
          points: [{ x: 0, y: 1 }, { x: 2, y: 2.8 }, { x: 4, y: 4.6 }, { x: 6, y: 6 }, { x: 8, y: 6 }, { x: 10, y: 6 }],
        },
      ],
      equilibriumTime: 6,
    };
  }

  return null;
}

function normalizeQuestion(raw, fallbackYear = 2026, fallbackSource = 'official-model', manualReviewSet = null) {
  const trapTags = asArray(raw.trapTags).map(String);
  const choices = asArray(raw.choices).map(String).slice(0, 4);
  const answerKey = Number(raw.answerKey ?? 0);
  const sourceType = String(raw.sourceType || fallbackSource);
  const officialStatusRaw = String(raw.officialStatus || 'sample-draft');
  const answerKeyVerified = Boolean(raw.answerKeyVerified ?? raw.isAnswerVerified ?? officialStatusRaw.toLowerCase().includes('verified'));
  const isOfficial = sourceType === 'official';
  const hasCorruption = hasCorruptedMarkers(raw.question)
    || hasCorruptedMarkers(raw.explanation)
    || choices.some(hasCorruptedMarkers);
  const flaggedManualByList = manualReviewSet ? manualReviewSet.has(String(raw.id || '')) : false;
  const needsManualReview = flaggedManualByList || hasCorruption || (isOfficial && !answerKeyVerified);
  const hasValidChoices = choices.length === 4 && choices.every(x => String(x).trim().length > 0);
  const hasValidAnswerKey = Number.isInteger(answerKey) && answerKey >= 0 && answerKey <= 3;
  const canAutoGrade = !needsManualReview && hasValidChoices && hasValidAnswerKey && (!isOfficial || answerKeyVerified);
  const officialStatus = needsManualReview ? 'needs-manual-review' : officialStatusRaw;
  const gradingMode = canAutoGrade ? 'auto' : 'manual-review';

  return {
    id: String(raw.id || ''),
    year: Number(raw.year || fallbackYear),
    sourceType,
    sourceConfidence: String(raw.sourceConfidence || (raw.sourceType === 'official' ? 'official' : 'synthetic')),
    sourceRef: String(raw.sourceRef || ''),
    form: String(raw.form || 'A'),
    chapter: String(raw.chapter || 'غير محدد'),
    topic: String(raw.topic || 'general'),
    skill: String(raw.skill || 'فهم عام'),
    difficulty: String(raw.difficulty || 'متوسط'),
    stemType: String(raw.stemType || 'multiple-choice'),
    marks: Number(raw.marks || 1),
    question: String(raw.question || ''),
    displayQuestion: needsManualReview ? 'نص السؤال يحتاج مراجعة يدوية قبل الاستخدام.' : String(raw.question || ''),
    choices,
    answerKey,
    explanation: String(raw.explanation || ''),
    trapTags,
    lawRefs: asArray(raw.lawRefs).map(String),
    workedExampleRef: raw.workedExampleRef ? String(raw.workedExampleRef) : '',
    officialStatus,
    gradingMode,
    answerKeyVerified,
    isAnswerVerified: answerKeyVerified,
    hasCorruption,
    needsManualReview,
    canAutoGrade,
    visualAid: normalizeVisualAid(raw),
  };
}

function normalizeWorkedExample(raw) {
  return {
    id: String(raw.id || ''),
    title: String(raw.title || ''),
    topic: String(raw.topic || ''),
    question: String(raw.question || ''),
    given: asArray(raw.given).map(String),
    summary: String(raw.summary || ''),
    steps: asArray(raw.steps).map(String),
    finalAnswer: String(raw.finalAnswer || ''),
    sanityCheck: String(raw.sanityCheck || ''),
    commonMistake: String(raw.commonMistake || ''),
    lawRefs: asArray(raw.lawRefs).map(String),
    relatedQuestionIds: asArray(raw.relatedQuestionIds).map(String),
    questionId: raw.questionId ? String(raw.questionId) : '',
  };
}

function buildSearchEntries(questions, workedExamples) {
  const questionEntries = questions
    .filter(q => !q.needsManualReview && String(q.question || '').trim().length > 0)
    .map(q => ({
    kind: 'exam-question',
    examQuestionId: q.id,
    uid: 'exam-center',
    sid: q.topic,
    unitTitle: 'مركز الامتحانات',
    secTitle: q.chapter,
    nodeTitle: q.question,
    clr: '#9a86c5',
    text: [q.question, q.topic, q.skill, q.chapter, q.sourceType, q.sourceConfidence, ...(q.choices || [])].join(' '),
    items: (q.choices || []).slice(0, 2),
  }));

  const workedEntries = workedExamples.map(ex => ({
    kind: 'worked-example',
    workedExampleId: ex.id,
    examQuestionId: ex.relatedQuestionIds?.[0] || ex.questionId || '',
    uid: 'exam-center',
    sid: ex.id,
    unitTitle: 'مركز الامتحانات',
    secTitle: 'أمثلة محلولة',
    nodeTitle: ex.title || ex.id,
    clr: '#59b894',
    text: [
      ex.title || '', ex.topic || '', ex.question || '', ex.summary || '', ex.finalAnswer || '',
      ex.sanityCheck || '', ex.commonMistake || '', ...(asArray(ex.steps))
    ].join(' '),
    items: asArray(ex.steps).slice(0, 2),
  }));

  return [...questionEntries, ...workedEntries];
}

function applyQuestionFilter(questions, filter = {}) {
  const chapter = filter.chapter ? String(filter.chapter).toLowerCase() : '';
  const topic = filter.topic ? String(filter.topic).toLowerCase() : '';
  const sourceType = filter.sourceType ? String(filter.sourceType).toLowerCase() : '';
  const difficulty = filter.difficulty ? String(filter.difficulty).toLowerCase() : '';
  const skill = filter.skill ? String(filter.skill).toLowerCase() : '';
  const trapTag = filter.trapTag ? String(filter.trapTag).toLowerCase() : '';
  const verifiedOnly = Boolean(filter.verifiedOnly);
  const safeOnly = Boolean(filter.safeOnly);
  const hideManualReview = Boolean(filter.hideManualReview);
  const ids = new Set(asArray(filter.questionIds).map(String));

  return questions.filter(q => {
    if (chapter && String(q.chapter).toLowerCase() !== chapter) return false;
    if (topic && String(q.topic).toLowerCase() !== topic) return false;
    if (sourceType && String(q.sourceType).toLowerCase() !== sourceType) return false;
    if (difficulty && String(q.difficulty).toLowerCase() !== difficulty) return false;
    if (skill && String(q.skill).toLowerCase() !== skill) return false;
    if (trapTag && !(q.trapTags || []).some(tag => String(tag).toLowerCase().includes(trapTag))) return false;
    if (verifiedOnly && !q.canAutoGrade) return false;
    if (safeOnly && !q.canAutoGrade) return false;
    if (hideManualReview && q.needsManualReview) return false;
    if (ids.size && !ids.has(String(q.id))) return false;
    return true;
  });
}

function uniqueSorted(values) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b), 'ar'));
}

const ExamDB = {
  async init() {
    if (STORE.initialized) return STORE;
    if (STORE.initPromise) return STORE.initPromise;

    STORE.initPromise = (async () => {
      const [officialRaw, archiveRaw, blueprintRaw, workedRaw, microRaw, sourceMapRaw, manualReviewRaw] = await Promise.all([
        loadJson(DATA_PATHS.official, { questions: [] }),
        loadJson(DATA_PATHS.archive, { questions: [] }),
        loadJson(DATA_PATHS.blueprint, {}),
        loadJson(DATA_PATHS.workedExamples, { examples: [] }),
        loadJson(DATA_PATHS.microLessons, { lessons: [] }),
        loadJson(DATA_PATHS.sourceMap, {}),
        loadJson(DATA_PATHS.manualReview, { items: [] }),
      ]);

      const manualReviewSet = new Set(asArray(manualReviewRaw.items || manualReviewRaw).map(item => String(item.id || '')));

      const officialQuestions = asArray(officialRaw.questions || officialRaw)
        .map(q => normalizeQuestion(q, 2026, 'official-model', manualReviewSet));
      const archiveQuestions = asArray(archiveRaw.questions || archiveRaw)
        .map(q => normalizeQuestion(q, 2020, 'archive', manualReviewSet));
      const workedExamples = asArray(workedRaw.examples || workedRaw)
        .map(normalizeWorkedExample);
      const microLessons = asArray(microRaw.lessons || microRaw).map(lesson => ({
        id: String(lesson.id || ''),
        topic: String(lesson.topic || ''),
        skill: String(lesson.skill || ''),
        title: String(lesson.title || ''),
        body: String(lesson.body || ''),
      }));

      STORE.questions = officialQuestions;
      STORE.archiveQuestions = archiveQuestions;
      STORE.blueprint = blueprintRaw || {};
      STORE.workedExamples = workedExamples;
      STORE.microLessons = microLessons;
      STORE.sourceMap = sourceMapRaw || {};
      STORE.manualReview = asArray(manualReviewRaw.items || manualReviewRaw);
      STORE.searchEntries = buildSearchEntries(officialQuestions, workedExamples);
      STORE.initialized = true;
      return STORE;
    })();

    return STORE.initPromise;
  },

  isReady() {
    return STORE.initialized;
  },

  getQuestionById(id) {
    const target = String(id || '');
    return STORE.questions.find(q => q.id === target) || null;
  },

  getQuestions(filter = {}) {
    return applyQuestionFilter(STORE.questions.slice(), filter);
  },

  getChapterNames() {
    return uniqueSorted(STORE.questions.map(q => q.chapter));
  },

  getSkillNames(chapter = '') {
    const q = chapter ? this.getQuestions({ chapter }) : STORE.questions;
    return uniqueSorted(q.map(item => item.skill));
  },

  getDifficultyNames(chapter = '') {
    const q = chapter ? this.getQuestions({ chapter }) : STORE.questions;
    return uniqueSorted(q.map(item => item.difficulty));
  },

  getTrapTags(chapter = '') {
    const q = chapter ? this.getQuestions({ chapter }) : STORE.questions;
    return uniqueSorted(q.flatMap(item => item.trapTags || []));
  },

  getArchiveQuestions() {
    return STORE.archiveQuestions.slice();
  },

  getWorkedExample(ref) {
    const target = String(ref || '');
    return STORE.workedExamples.find(ex => ex.id === target) || null;
  },

  getWorkedExamples(filter = {}) {
    const topic = filter.topic ? String(filter.topic).toLowerCase() : '';
    if (!topic) return STORE.workedExamples.slice();
    return STORE.workedExamples.filter(ex => String(ex.topic || '').toLowerCase() === topic);
  },

  getWorkedExamplesByQuestionId(questionId) {
    const target = String(questionId || '');
    return STORE.workedExamples.filter(ex =>
      ex.questionId === target || (ex.relatedQuestionIds || []).includes(target)
    );
  },

  getMicroLessonsByTopic(topic) {
    const target = String(topic || '').toLowerCase();
    return STORE.microLessons.filter(x => String(x.topic || '').toLowerCase() === target);
  },

  getBlueprint() {
    return STORE.blueprint || {};
  },

  getSourceMap() {
    return STORE.sourceMap || {};
  },

  getManualReviewList() {
    return STORE.manualReview.slice();
  },

  getSearchEntries() {
    return STORE.searchEntries.slice();
  },
};

export { ExamDB };
