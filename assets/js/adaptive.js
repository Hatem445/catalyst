'use strict';

import { DB, QUIZ, CARDS, TOPIC_DEFS } from './data.js';
import { Progress } from './progress.js';

const QUIZ_PERF_KEY = 'cmp_quiz_perf_v1';
const FLASH_SCHEDULE_KEY = 'cmp_flash_schedule_v1';
const DAILY_PLAN_KEY = 'cmp_daily_plan_v1';
const ADAPTIVE_STATE_KEY = 'cmp_adaptive_state_v1';

const BALANCED_INTERVALS = {
  hard: 10 * 60 * 1000,
  ok: 8 * 60 * 60 * 1000,
  easy: 48 * 60 * 60 * 1000,
};

const TOPIC_ORDER_FALLBACK = ['organic_hc', 'organic_derivatives', 'transition', 'iron', 'qualitative'];

let quizPerf = { byQuestion: {}, byTopic: {}, recentWrong: [] };
let flashSchedule = {};
let dailyPlan = { dateKey: '', tasks: [], completedTaskIds: [] };
let adaptiveState = {};

const cardIndexById = Object.fromEntries(CARDS.map((c, i) => [c.id, i]));
const questionIndexById = Object.fromEntries(QUIZ.map((q, i) => [q.id, i]));

function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

function saveAll() {
  try {
    localStorage.setItem(QUIZ_PERF_KEY, JSON.stringify(quizPerf));
    localStorage.setItem(FLASH_SCHEDULE_KEY, JSON.stringify(flashSchedule));
    localStorage.setItem(DAILY_PLAN_KEY, JSON.stringify(dailyPlan));
    localStorage.setItem(ADAPTIVE_STATE_KEY, JSON.stringify(adaptiveState));
  } catch (_) {}
}

function loadAll() {
  quizPerf = safeParse(QUIZ_PERF_KEY, { byQuestion: {}, byTopic: {}, recentWrong: [] });
  flashSchedule = safeParse(FLASH_SCHEDULE_KEY, {});
  dailyPlan = safeParse(DAILY_PLAN_KEY, { dateKey: '', tasks: [], completedTaskIds: [] });
  adaptiveState = safeParse(ADAPTIVE_STATE_KEY, {});
}

function getTodayKey(now = Date.now()) {
  const d = new Date(now);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function getTopicDef(topicCode) {
  return TOPIC_DEFS[topicCode] || TOPIC_DEFS.organic_hc;
}

function recordQuizResult(questionId, topic, isCorrect, timestamp = Date.now()) {
  const qStat = quizPerf.byQuestion[questionId] || { attempts: 0, correct: 0, lastTs: 0 };
  qStat.attempts += 1;
  if (isCorrect) qStat.correct += 1;
  qStat.lastTs = timestamp;
  quizPerf.byQuestion[questionId] = qStat;

  const tStat = quizPerf.byTopic[topic] || { attempts: 0, correct: 0, wrong: 0, lastTs: 0 };
  tStat.attempts += 1;
  if (isCorrect) tStat.correct += 1;
  else tStat.wrong += 1;
  tStat.lastTs = timestamp;
  quizPerf.byTopic[topic] = tStat;

  if (!isCorrect) {
    quizPerf.recentWrong.unshift({ questionId, topic, ts: timestamp });
    quizPerf.recentWrong = quizPerf.recentWrong.slice(0, 80);
  }

  saveAll();
}

function scheduleFlashReview(cardId, level, timestamp = Date.now()) {
  const prev = flashSchedule[cardId] || { streak: 0 };
  const streak = level === 'easy' ? prev.streak + 1 : level === 'ok' ? Math.max(1, prev.streak) : 0;
  const nextDueAt = timestamp + (BALANCED_INTERVALS[level] || BALANCED_INTERVALS.ok);
  flashSchedule[cardId] = {
    lastReviewedAt: timestamp,
    nextDueAt,
    streak,
    lastLevel: level,
  };
  saveAll();
}

function getDueFlashCards(now = Date.now()) {
  return Object.entries(flashSchedule)
    .filter(([, v]) => Number(v.nextDueAt || 0) <= now)
    .sort((a, b) => Number(a[1].nextDueAt || 0) - Number(b[1].nextDueAt || 0))
    .map(([id]) => id);
}

function getFlashScheduleForCard(cardId) {
  return flashSchedule[cardId] || null;
}

function topicCards(topicCode) {
  return CARDS.filter(c => c.topicCode === topicCode);
}

function topicQuestions(topicCode) {
  return QUIZ.filter(q => q.topic === topicCode);
}

function computeProgressIncompletion(topicCode) {
  const topicDef = getTopicDef(topicCode);
  const unit = DB.units.find(u => u.id === topicDef.unitId);
  if (!unit) return 0.5;
  const totalNodes = unit.sections.reduce((a, s) => a + s.nodes.length, 0);
  const pct = Progress.getPct(unit.id, totalNodes);
  return Math.max(0, Math.min(1, 1 - pct / 100));
}

function computeQuizMistakeRate(topicCode) {
  const t = quizPerf.byTopic[topicCode];
  if (!t || t.attempts === 0) return 0;
  return Math.max(0, Math.min(1, (t.attempts - t.correct) / t.attempts));
}

function computeFlashUrgency(topicCode, now = Date.now()) {
  const cards = topicCards(topicCode);
  if (!cards.length) return 0;
  let overdue = 0;
  let hard = 0;

  cards.forEach(card => {
    const sched = flashSchedule[card.id];
    if (sched && Number(sched.nextDueAt || 0) <= now) overdue += 1;
    if ((sched && sched.lastLevel === 'hard') || Progress.getConf(cardIndexById[card.id]) === 'hard') hard += 1;
  });

  const overdueRatio = overdue / cards.length;
  const hardRatio = hard / cards.length;
  return Math.max(0, Math.min(1, overdueRatio * 0.7 + hardRatio * 0.3));
}

function hasAnyAdaptiveData() {
  const hasQuiz = Object.keys(quizPerf.byQuestion || {}).length > 0;
  const hasFlash = Object.keys(flashSchedule || {}).length > 0;
  const hasProgress = Progress.totalSeen() > 0;
  return hasQuiz || hasFlash || hasProgress;
}

function computeWeakTopics(now = Date.now()) {
  const list = Object.keys(TOPIC_DEFS).map(topicCode => {
    const quiz = computeQuizMistakeRate(topicCode);
    const progress = computeProgressIncompletion(topicCode);
    const flash = computeFlashUrgency(topicCode, now);
    const score = quiz * 0.45 + progress * 0.35 + flash * 0.20;

    return {
      topic: topicCode,
      unitId: getTopicDef(topicCode).unitId,
      labelAr: getTopicDef(topicCode).labelAr,
      score,
      signals: { quiz, progress, flash },
    };
  });

  return list.sort((a, b) => b.score - a.score);
}

function pickTopicPool(now = Date.now()) {
  const weak = computeWeakTopics(now).filter(t => t.score > 0);
  if (weak.length >= 3) return weak;

  if (!hasAnyAdaptiveData()) {
    const incompleteTopics = Object.keys(TOPIC_DEFS)
      .filter(code => computeProgressIncompletion(code) > 0)
      .sort((a, b) => computeProgressIncompletion(b) - computeProgressIncompletion(a));
    const ordered = [...new Set([...TOPIC_ORDER_FALLBACK, ...incompleteTopics])];
    return ordered.map(code => ({
      topic: code,
      unitId: getTopicDef(code).unitId,
      labelAr: getTopicDef(code).labelAr,
      score: 0.5,
      signals: { quiz: 0, progress: 1, flash: 0 },
    }));
  }

  const merged = [...weak];
  TOPIC_ORDER_FALLBACK.forEach(code => {
    if (!merged.some(x => x.topic === code)) {
      merged.push({
        topic: code,
        unitId: getTopicDef(code).unitId,
        labelAr: getTopicDef(code).labelAr,
        score: 0.1,
        signals: { quiz: 0, progress: 0.2, flash: 0 },
      });
    }
  });
  return merged;
}

function avoidAdjacent(topicPool, idx, prevTopic) {
  if (!topicPool.length) return TOPIC_ORDER_FALLBACK[0];
  const candidate = topicPool[idx % topicPool.length].topic;
  if (candidate !== prevTopic || topicPool.length === 1) return candidate;
  return topicPool[(idx + 1) % topicPool.length].topic;
}

function buildTask(type, topicCode, seq) {
  const def = getTopicDef(topicCode);
  const qIds = topicQuestions(topicCode).slice(0, 5).map(q => q.id);
  const cIds = topicCards(topicCode).slice(0, 5).map(c => c.id);

  const titles = {
    weak_concept: 'مراجعة مفهوم ضعيف',
    related_question: 'حل سؤال مرتبط',
    review_card: 'بطاقة مراجعة',
    short_lesson: 'درس قصير',
    reinforce_question: 'سؤال تعزيز',
    reinforce_card: 'بطاقة تثبيت',
  };

  const desc = {
    weak_concept: `راجع الأساس في ${def.labelAr} لفهم الفكرة قبل الحفظ.`,
    related_question: `حل سؤالًا تدريبيًا من ${def.labelAr} مع تفسير الإجابة.`,
    review_card: `راجع بطاقة مستحقة الآن من ${def.labelAr}.`,
    short_lesson: `افتح درسًا قصيرًا في ${def.labelAr} ثم لخصه في سطرين.`,
    reinforce_question: `جرّب سؤال تعزيز قريب من نقطة الضعف في ${def.labelAr}.`,
    reinforce_card: `بطاقة تثبيت نهائية من ${def.labelAr} لتثبيت المعلومات.`,
  };

  return {
    id: `plan_${seq}_${type}_${topicCode}`,
    type,
    titleAr: titles[type],
    descAr: desc[type],
    topic: topicCode,
    unitId: def.unitId,
    sectionId: def.sectionId,
    questionIds: qIds,
    cardIds: cIds,
    priority: 100 - seq,
    status: 'pending',
  };
}

function buildDailyTasks(topicPool, queueSize = 6) {
  const template = ['weak_concept', 'related_question', 'review_card', 'short_lesson', 'reinforce_question', 'reinforce_card'];
  const tasks = [];
  let prev = '';
  for (let i = 0; i < queueSize; i += 1) {
    const topic = avoidAdjacent(topicPool, i, prev);
    prev = topic;
    tasks.push(buildTask(template[i] || 'weak_concept', topic, i + 1));
  }
  return tasks;
}

function getOrCreateDailyPlan(dateKey = getTodayKey(), queueSize = 6) {
  if (dailyPlan.dateKey === dateKey && Array.isArray(dailyPlan.tasks) && dailyPlan.tasks.length === queueSize) {
    return dailyPlan;
  }

  const topicPool = pickTopicPool().slice(0, 4);
  const tasks = buildDailyTasks(topicPool, queueSize);

  dailyPlan = {
    dateKey,
    tasks,
    completedTaskIds: [],
  };

  saveAll();
  return dailyPlan;
}

function setPlanTaskStatus(taskId, done) {
  const today = getOrCreateDailyPlan();
  const set = new Set(today.completedTaskIds || []);
  if (done) set.add(taskId);
  else set.delete(taskId);
  today.completedTaskIds = [...set];
  today.tasks = (today.tasks || []).map(t => t.id === taskId ? { ...t, status: set.has(taskId) ? 'done' : 'pending' } : t);
  dailyPlan = today;
  saveAll();
}

function togglePlanTask(taskId) {
  const today = getOrCreateDailyPlan();
  const done = (today.completedTaskIds || []).includes(taskId);
  setPlanTaskStatus(taskId, !done);
}

function getRetryQuestionIds(limit = 8) {
  const uniq = [];
  const seen = new Set();
  (quizPerf.recentWrong || []).forEach(w => {
    if (!seen.has(w.questionId) && questionIndexById[w.questionId] !== undefined) {
      seen.add(w.questionId);
      uniq.push(w.questionId);
    }
  });
  return uniq.slice(0, limit);
}

function getQuizRouteForTopic(topicCode, count = 5) {
  const same = QUIZ.map((q, i) => ({ q, i })).filter(x => x.q.topic === topicCode).map(x => x.i);
  if (same.length >= count) return same.slice(0, count);

  const unitId = getTopicDef(topicCode).unitId;
  const near = QUIZ.map((q, i) => ({ q, i }))
    .filter(x => x.q.unitId === unitId && !same.includes(x.i))
    .map(x => x.i);

  const merged = [...same, ...near];
  if (merged.length >= count) return merged.slice(0, count);

  for (let i = 0; i < QUIZ.length && merged.length < count; i += 1) {
    if (!merged.includes(i)) merged.push(i);
  }
  return merged;
}

function getRetryQuizRoute(count = 5) {
  const fromWrong = getRetryQuestionIds(count)
    .map(id => questionIndexById[id])
    .filter(idx => idx !== undefined);

  if (fromWrong.length >= count) return fromWrong.slice(0, count);

  const weak = pickTopicPool().map(x => x.topic);
  const fallback = weak.length ? getQuizRouteForTopic(weak[0], count) : QUIZ.map((_, i) => i).slice(0, count);
  const out = [...fromWrong];
  fallback.forEach(idx => {
    if (out.length < count && !out.includes(idx)) out.push(idx);
  });
  return out;
}

function buildSuggestionForQuestion(question) {
  const topic = question.topic;
  const def = getTopicDef(topic);
  const relatedQuestions = QUIZ
    .filter(q => q.topic === topic && q.id !== question.id)
    .slice(0, 3)
    .map(q => q.id);
  const relatedCards = CARDS
    .filter(c => c.topicCode === topic)
    .slice(0, 3)
    .map(c => c.id);

  return {
    topic,
    titleAr: `محتاج تقوية في ${def.labelAr}`,
    unitId: def.unitId,
    sectionId: def.sectionId,
    relatedQuestions,
    relatedCards,
  };
}

function getPlanTask(taskId) {
  const today = getOrCreateDailyPlan();
  return (today.tasks || []).find(t => t.id === taskId) || null;
}

function getHomeSnapshot(queueSize = 6) {
  const plan = getOrCreateDailyPlan(getTodayKey(), queueSize);
  const done = (plan.completedTaskIds || []).length;
  const weakTopics = computeWeakTopics().slice(0, 3);
  const dueFlashCount = getDueFlashCards().length;
  const retryCount = getRetryQuestionIds(8).length;
  return {
    dateKey: plan.dateKey,
    plan,
    completedCount: done,
    totalTasks: (plan.tasks || []).length,
    weakTopics,
    dueFlashCount,
    retryCount,
  };
}

function setAdaptiveState(patch) {
  adaptiveState = { ...adaptiveState, ...patch };
  saveAll();
}

function getAdaptiveState() {
  return { ...adaptiveState };
}

loadAll();

const Adaptive = {
  keys: {
    QUIZ_PERF_KEY,
    FLASH_SCHEDULE_KEY,
    DAILY_PLAN_KEY,
    ADAPTIVE_STATE_KEY,
  },
  getTodayKey,
  recordQuizResult,
  scheduleFlashReview,
  getDueFlashCards,
  getFlashScheduleForCard,
  computeWeakTopics,
  getOrCreateDailyPlan,
  setPlanTaskStatus,
  togglePlanTask,
  getRetryQuestionIds,
  getQuizRouteForTopic,
  getRetryQuizRoute,
  buildSuggestionForQuestion,
  getPlanTask,
  getHomeSnapshot,
  setAdaptiveState,
  getAdaptiveState,
};

export { Adaptive };
