'use strict';

import { ExamDB } from './db.js';

function stableSortById(items) {
  return items.slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
}

function interleaveByChapter(items, maxCount) {
  const buckets = {};
  items.forEach(item => {
    const key = item.chapter || 'other';
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(item);
  });
  Object.keys(buckets).forEach(k => {
    buckets[k] = stableSortById(buckets[k]);
  });

  const chapterKeys = Object.keys(buckets);
  const out = [];
  let cursor = 0;
  while (out.length < maxCount && chapterKeys.length) {
    const chapter = chapterKeys[cursor % chapterKeys.length];
    const arr = buckets[chapter];
    if (arr.length) out.push(arr.shift());
    if (!arr.length) {
      const idx = chapterKeys.indexOf(chapter);
      if (idx >= 0) chapterKeys.splice(idx, 1);
      cursor = 0;
      continue;
    }
    cursor += 1;
  }
  return out;
}

const MockEngine = {
  generateQuickMock(options = {}) {
    const count = Number(options.count || 15);
    const base = ExamDB.getQuestions({ safeOnly: true, verifiedOnly: true, hideManualReview: true });
    const mixed = interleaveByChapter(base, count);
    return mixed.map(q => q.id);
  },

  generateFullMock() {
    const verified = ExamDB.getQuestions({ safeOnly: true, verifiedOnly: true, hideManualReview: true });
    if (verified.length < 44) {
      return {
        complete: false,
        mcqQuestionIds: interleaveByChapter(verified, Math.min(verified.length, 30)).map(q => q.id),
        essayPlaceholders: 2,
        note: 'قيد الاكتمال',
      };
    }

    const picked = interleaveByChapter(verified, 44).map(q => q.id);
    return {
      complete: true,
      mcqQuestionIds: picked,
      essayPlaceholders: 2,
      note: '',
    };
  },

  generateChapterTraining(chapter, filters = {}, limit = 30) {
    const q = ExamDB.getQuestions({
      chapter,
      skill: filters.skill || '',
      difficulty: filters.difficulty || '',
      trapTag: filters.trapTag || '',
      verifiedOnly: filters.verifiedOnly ?? false,
      safeOnly: filters.safeOnly ?? true,
      hideManualReview: true,
    });
    return stableSortById(q).slice(0, limit).map(x => x.id);
  },

  generateRetryFromMistakes(mistakeQuestionIds = [], limit = 20) {
    const set = new Set((mistakeQuestionIds || []).map(String));
    const q = ExamDB.getQuestions({ verifiedOnly: true, safeOnly: true, hideManualReview: true }).filter(item => set.has(String(item.id)));
    return stableSortById(q).slice(0, limit).map(x => x.id);
  },
};

export { MockEngine };
