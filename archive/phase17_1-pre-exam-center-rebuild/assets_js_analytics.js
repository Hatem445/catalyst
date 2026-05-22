'use strict';

const EXAM_ANALYTICS_KEY = 'cmp_exam_analytics_v1';

function createEmptyAnalytics() {
  return {
    attempted: 0,
    correct: 0,
    byTopic: {},
    mistakes: [],
    recent: [],
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

const ExamAnalytics = {
  getState() {
    return readAnalytics();
  },

  reset() {
    writeAnalytics(createEmptyAnalytics());
  },

  recordAnswer({ questionId, topic, correct, selectedIndex, answerKey, timestamp = Date.now() }) {
    const state = readAnalytics();
    state.attempted += 1;
    if (correct) state.correct += 1;

    const topicKey = String(topic || 'other');
    const topicStat = state.byTopic[topicKey] || { attempted: 0, correct: 0 };
    topicStat.attempted += 1;
    if (correct) topicStat.correct += 1;
    state.byTopic[topicKey] = topicStat;

    const record = {
      questionId: String(questionId || ''),
      topic: topicKey,
      correct: Boolean(correct),
      selectedIndex: Number(selectedIndex),
      answerKey: Number(answerKey),
      timestamp: Number(timestamp),
    };
    state.recent = [record, ...(state.recent || [])].slice(0, 25);

    if (!correct) {
      const item = {
        questionId: record.questionId,
        topic: topicKey,
        count: 1,
        lastSeenAt: record.timestamp,
      };
      const idx = (state.mistakes || []).findIndex(x => x.questionId === item.questionId);
      if (idx >= 0) {
        state.mistakes[idx].count += 1;
        state.mistakes[idx].lastSeenAt = item.lastSeenAt;
      } else {
        state.mistakes = [item, ...(state.mistakes || [])];
      }
    }

    state.lastUpdatedAt = Number(timestamp);
    writeAnalytics(state);
  },

  getSummary() {
    const state = readAnalytics();
    const accuracy = state.attempted > 0
      ? Math.round((state.correct / state.attempted) * 100)
      : 0;
    return {
      attempted: state.attempted,
      correct: state.correct,
      accuracy,
      byTopic: state.byTopic || {},
    };
  },

  getCommonMistakes(limit = 5) {
    const state = readAnalytics();
    return (state.mistakes || [])
      .slice()
      .sort((a, b) => (b.count || 0) - (a.count || 0))
      .slice(0, Math.max(1, Number(limit || 5)));
  },
};

export { ExamAnalytics, EXAM_ANALYTICS_KEY };
