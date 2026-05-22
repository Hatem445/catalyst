'use strict';

const EXAM_ANALYTICS_KEY = 'cmp_exam_analytics_v1';

function createEmptyAnalytics() {
  return {
    attempted: 0,
    correct: 0,
    byTopic: {},
    byChapter: {},
    byTrap: {},
    mistakes: [],
    recent: [],
    averageTimeSec: 0,
    totalTimeSec: 0,
    lastUpdatedAt: 0,
  };
}

function readAnalytics() {
  try {
    const parsed = JSON.parse(localStorage.getItem(EXAM_ANALYTICS_KEY) || 'null');
    if (!parsed || typeof parsed !== 'object') return createEmptyAnalytics();
    return { ...createEmptyAnalytics(), ...parsed };
  } catch (_) {
    return createEmptyAnalytics();
  }
}

function writeAnalytics(state) {
  try {
    localStorage.setItem(EXAM_ANALYTICS_KEY, JSON.stringify(state));
  } catch (_) {
    // Keep app usable even when storage is unavailable.
  }
}

function upsertMistake(state, record) {
  const item = {
    questionId: record.questionId,
    topic: record.topic,
    chapter: record.chapter,
    trapTags: record.trapTags || [],
    count: 1,
    lastSeenAt: record.timestamp,
    sourceType: record.sourceType || 'unknown',
  };
  const idx = (state.mistakes || []).findIndex(x => x.questionId === item.questionId);
  if (idx >= 0) {
    state.mistakes[idx].count += 1;
    state.mistakes[idx].lastSeenAt = item.lastSeenAt;
    state.mistakes[idx].topic = item.topic;
    state.mistakes[idx].chapter = item.chapter;
    state.mistakes[idx].trapTags = item.trapTags;
  } else {
    state.mistakes = [item, ...(state.mistakes || [])];
  }
}

function updateBucket(buckets, key, correct) {
  const k = String(key || 'other');
  const stat = buckets[k] || { attempted: 0, correct: 0 };
  stat.attempted += 1;
  if (correct) stat.correct += 1;
  buckets[k] = stat;
}

const ExamAnalytics = {
  getState() {
    return readAnalytics();
  },

  reset() {
    writeAnalytics(createEmptyAnalytics());
  },

  recordAnswer({
    questionId,
    selected,
    answerKey,
    correct,
    chapter,
    topic,
    trapTags = [],
    sourceType = 'unknown',
    timeSpentSec = null,
    confidence = '',
    timestamp = Date.now(),
  }) {
    const state = readAnalytics();
    state.attempted += 1;
    if (correct) state.correct += 1;

    updateBucket(state.byTopic, topic, correct);
    updateBucket(state.byChapter, chapter, correct);

    (trapTags || []).forEach(tag => {
      const key = String(tag || '').trim();
      if (!key) return;
      state.byTrap[key] = (state.byTrap[key] || 0) + 1;
    });

    const spent = Number(timeSpentSec);
    if (Number.isFinite(spent) && spent > 0) {
      state.totalTimeSec += spent;
      state.averageTimeSec = Math.round(state.totalTimeSec / state.attempted);
    }

    const record = {
      questionId: String(questionId || ''),
      selected: Number(selected),
      answerKey: Number(answerKey),
      correct: Boolean(correct),
      chapter: String(chapter || ''),
      topic: String(topic || ''),
      trapTags: (trapTags || []).map(String),
      sourceType: String(sourceType || 'unknown'),
      timeSpentSec: Number.isFinite(spent) && spent > 0 ? spent : null,
      confidence: String(confidence || ''),
      timestamp: Number(timestamp),
    };

    state.recent = [record, ...(state.recent || [])].slice(0, 300);

    if (!correct) {
      upsertMistake(state, record);
    }

    state.lastUpdatedAt = Number(timestamp);
    writeAnalytics(state);
  },

  getSummary() {
    const state = readAnalytics();
    const accuracy = state.attempted > 0
      ? Math.round((state.correct / state.attempted) * 100)
      : 0;

    let weakestChapter = '';
    let weakestAcc = 101;
    Object.entries(state.byChapter || {}).forEach(([chapter, s]) => {
      const acc = s.attempted ? (s.correct / s.attempted) * 100 : 100;
      if (s.attempted >= 2 && acc < weakestAcc) {
        weakestAcc = acc;
        weakestChapter = chapter;
      }
    });

    let mostCommonTrap = '';
    let trapCount = 0;
    Object.entries(state.byTrap || {}).forEach(([tag, count]) => {
      if (count > trapCount) {
        trapCount = count;
        mostCommonTrap = tag;
      }
    });

    return {
      attempted: state.attempted,
      correct: state.correct,
      accuracy,
      byTopic: state.byTopic || {},
      byChapter: state.byChapter || {},
      averageTimeSec: state.averageTimeSec || 0,
      weakestChapter,
      mostCommonTrap,
      mistakesCount: (state.mistakes || []).length,
    };
  },

  getCommonMistakes(limit = 20) {
    const state = readAnalytics();
    return (state.mistakes || [])
      .slice()
      .sort((a, b) => (b.count || 0) - (a.count || 0))
      .slice(0, Math.max(1, Number(limit || 20)));
  },

  getRecent(limit = 50) {
    const state = readAnalytics();
    return (state.recent || []).slice(0, Math.max(1, Number(limit || 50)));
  },
};

export { ExamAnalytics, EXAM_ANALYTICS_KEY };
