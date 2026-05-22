'use strict';

const DATA_PATHS = {
  official: './assets/data/exams/official-2026-models.json',
  archive: './assets/data/exams/archive-2017-2025.json',
  blueprint: './assets/data/mocks/chemistry-blueprint.json',
  workedExamples: './assets/data/worked-examples.json',
  microLessons: './assets/data/micro-lessons.json',
};

const STORE = {
  initialized: false,
  initPromise: null,
  questions: [],
  archiveQuestions: [],
  workedExamples: [],
  microLessons: [],
  blueprint: null,
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

function normalizeQuestion(raw, fallbackYear = 2026, fallbackSource = 'official-model') {
  return {
    id: String(raw.id || ''),
    year: Number(raw.year || fallbackYear),
    sourceType: String(raw.sourceType || fallbackSource),
    form: String(raw.form || 'A'),
    chapter: String(raw.chapter || 'غير محدد'),
    topic: String(raw.topic || 'general'),
    skill: String(raw.skill || 'فهم عام'),
    difficulty: String(raw.difficulty || 'متوسط'),
    stemType: String(raw.stemType || 'multiple-choice'),
    marks: Number(raw.marks || 1),
    question: String(raw.question || ''),
    choices: asArray(raw.choices).map(String),
    answerKey: Number(raw.answerKey ?? 0),
    trapTags: asArray(raw.trapTags).map(String),
    lawRefs: asArray(raw.lawRefs).map(String),
    workedExampleRef: raw.workedExampleRef ? String(raw.workedExampleRef) : '',
    officialStatus: String(raw.officialStatus || 'sample-draft'),
  };
}

function buildSearchEntries(questions, workedExamples) {
  const questionEntries = questions.map(q => ({
    kind: 'exam-question',
    examQuestionId: q.id,
    uid: 'exam-center',
    sid: q.topic,
    unitTitle: 'مركز الامتحانات',
    secTitle: q.chapter,
    nodeTitle: q.question,
    clr: '#9a86c5',
    text: [q.question, q.topic, q.skill, q.chapter, ...(q.choices || [])].join(' '),
    items: (q.choices || []).slice(0, 2),
  }));

  const workedEntries = workedExamples.map(ex => ({
    kind: 'worked-example',
    workedExampleId: ex.id,
    examQuestionId: ex.questionId || '',
    uid: 'exam-center',
    sid: ex.id,
    unitTitle: 'مركز الامتحانات',
    secTitle: 'أمثلة محلولة',
    nodeTitle: ex.title || ex.id,
    clr: '#59b894',
    text: [ex.title || '', ex.summary || '', ...(asArray(ex.steps))].join(' '),
    items: asArray(ex.steps).slice(0, 2),
  }));

  return [...questionEntries, ...workedEntries];
}

function applyQuestionFilter(questions, filter = {}) {
  const topic = filter.topic ? String(filter.topic).toLowerCase() : '';
  const chapter = filter.chapter ? String(filter.chapter).toLowerCase() : '';
  const sourceType = filter.sourceType ? String(filter.sourceType).toLowerCase() : '';
  const ids = new Set(asArray(filter.questionIds).map(String));

  return questions.filter(q => {
    if (topic && String(q.topic).toLowerCase() !== topic) return false;
    if (chapter && String(q.chapter).toLowerCase() !== chapter) return false;
    if (sourceType && String(q.sourceType).toLowerCase() !== sourceType) return false;
    if (ids.size && !ids.has(String(q.id))) return false;
    return true;
  });
}

const ExamDB = {
  async init() {
    if (STORE.initialized) return STORE;
    if (STORE.initPromise) return STORE.initPromise;

    STORE.initPromise = (async () => {
      const [officialRaw, archiveRaw, blueprintRaw, workedRaw, microRaw] = await Promise.all([
        loadJson(DATA_PATHS.official, { questions: [] }),
        loadJson(DATA_PATHS.archive, { questions: [] }),
        loadJson(DATA_PATHS.blueprint, {}),
        loadJson(DATA_PATHS.workedExamples, { examples: [] }),
        loadJson(DATA_PATHS.microLessons, { lessons: [] }),
      ]);

      const officialQuestions = asArray(officialRaw.questions || officialRaw).map(q => normalizeQuestion(q, 2026, 'official-model'));
      const archiveQuestions = asArray(archiveRaw.questions || archiveRaw).map(q => normalizeQuestion(q, 2020, 'archive'));
      const workedExamples = asArray(workedRaw.examples || workedRaw).map(ex => ({
        id: String(ex.id || ''),
        questionId: ex.questionId ? String(ex.questionId) : '',
        title: String(ex.title || ''),
        summary: String(ex.summary || ''),
        steps: asArray(ex.steps).map(String),
        lawRefs: asArray(ex.lawRefs).map(String),
      }));
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
    const base = STORE.questions.slice();
    return applyQuestionFilter(base, filter);
  },

  getArchiveQuestions() {
    return STORE.archiveQuestions.slice();
  },

  getWorkedExample(ref) {
    const target = String(ref || '');
    return STORE.workedExamples.find(ex => ex.id === target) || null;
  },

  getWorkedExamples() {
    return STORE.workedExamples.slice();
  },

  getMicroLessonsByTopic(topic) {
    const target = String(topic || '').toLowerCase();
    return STORE.microLessons.filter(x => String(x.topic || '').toLowerCase() === target);
  },

  getBlueprint() {
    return STORE.blueprint || {};
  },

  getSearchEntries() {
    return STORE.searchEntries.slice();
  },
};

export { ExamDB };
