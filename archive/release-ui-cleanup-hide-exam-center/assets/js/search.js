'use strict';

import { DB } from './data.js';
import { LAW_SEARCH_ENTRIES } from './laws.js';
import { ExamDB } from './db.js';

const Search = {
  index: null,
  examHydrated: false,
  examHydratePromise: null,

  build() {
    this.index = [];
    this.examHydrated = false;
    this.examHydratePromise = null;

    DB.units.forEach(u => {
      u.sections.forEach(s => {
        s.nodes.forEach(n => {
          const allText = [n.title, ...(n.items || [])].join(' ');
          this.index.push({
            kind: 'lesson',
            uid: u.id,
            sid: s.id,
            unitTitle: u.title,
            secTitle: s.title,
            nodeTitle: n.title,
            clr: u.clr,
            text: allText,
            items: n.items || [],
          });
        });
      });
    });

    LAW_SEARCH_ENTRIES.forEach(law => {
      this.index.push({
        kind: 'law',
        lawId: law.lawId,
        lawCategory: law.lawCategory,
        uid: 'laws',
        sid: law.lawCategory,
        unitTitle: 'القوانين',
        secTitle: law.lawCategoryLabel,
        nodeTitle: law.title,
        clr: '#6ab8d1',
        text: law.text,
        items: law.snippets || [],
      });
    });
  },

  async hydrateExamEntries() {
    if (!this.index) this.build();
    if (this.examHydrated) return;
    if (this.examHydratePromise) return this.examHydratePromise;
    this.examHydratePromise = (async () => {
      try {
        await ExamDB.init();
        const entries = ExamDB.getSearchEntries();
        const seen = new Set(
          this.index.map(entry => `${entry.kind || 'lesson'}:${entry.examQuestionId || ''}:${entry.workedExampleId || ''}:${entry.nodeTitle || ''}`)
        );
        entries.forEach(entry => {
          const key = `${entry.kind || 'lesson'}:${entry.examQuestionId || ''}:${entry.workedExampleId || ''}:${entry.nodeTitle || ''}`;
          if (seen.has(key)) return;
          seen.add(key);
          this.index.push(entry);
        });
        this.examHydrated = true;
      } catch (_) {
        // Keep search functional even when exam data cannot be loaded.
      } finally {
        this.examHydratePromise = null;
      }
    })();
    return this.examHydratePromise;
  },

  query(q) {
    if (!this.index) this.build();
    if (!q || q.length < 2) return [];

    const ql = q.toLowerCase();
    const hits = [];
    const seen = new Set();

    this.index.forEach(entry => {
      const haystack = String(entry.text || '').toLowerCase();
      if (!haystack.includes(ql)) return;

      const key = `${entry.kind || 'lesson'}:${entry.uid}:${entry.sid}:${entry.nodeTitle}:${entry.examQuestionId || ''}:${entry.workedExampleId || ''}`;
      if (seen.has(key)) return;

      seen.add(key);
      const matchItems = (entry.items || []).filter(it => String(it).toLowerCase().includes(ql)).slice(0, 2);
      hits.push({ ...entry, matchItems });
    });

    return hits.slice(0, 25);
  },
};

export { Search };
