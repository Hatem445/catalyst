'use strict';

import { ExamDB } from './db.js';

function stableSortById(items) {
  return items.slice().sort((a, b) => String(a.id).localeCompare(String(b.id)));
}

const MockEngine = {
  generateMock(options = {}) {
    const count = Number(options.count || 10);
    const topic = options.topic ? String(options.topic) : '';
    const pool = topic ? ExamDB.getQuestions({ topic }) : ExamDB.getQuestions();
    const sorted = stableSortById(pool);
    return sorted.slice(0, Math.max(1, count));
  },
};

export { MockEngine };
