'use strict';

import { DB } from './data.js';

const Search = {
  index: null,

  build() {
    this.index = [];
    DB.units.forEach(u => {
      u.sections.forEach(s => {
        s.nodes.forEach(n => {
          const allText = [n.title, ...(n.items || [])].join(' ');
          this.index.push({ uid: u.id, sid: s.id, unitTitle: u.title, secTitle: s.title, nodeTitle: n.title, clr: u.clr, text: allText, items: n.items || [] });
        });
      });
    });
  },

  query(q) {
    if (!this.index) this.build();
    if (!q || q.length < 2) return [];
    const ql = q.toLowerCase();
    const hits = [];
    const seen = new Set();
    this.index.forEach(entry => {
      if (entry.text.toLowerCase().includes(ql)) {
        const key = entry.uid + entry.sid + entry.nodeTitle;
        if (!seen.has(key)) {
          seen.add(key);
          const matchItems = entry.items.filter(it => it.toLowerCase().includes(ql)).slice(0, 2);
          hits.push({ ...entry, matchItems });
        }
      }
    });
    return hits.slice(0, 25);
  }
};


export { Search };
