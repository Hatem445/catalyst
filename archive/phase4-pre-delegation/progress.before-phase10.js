'use strict';

import { DB } from './data.js';

const Progress = (() => {
  const KEY = 'cmp_progress_v1';
  const CONF_KEY = 'cmp_fc_conf_v1';
  let data = {};
  let conf = {};

  function load() {
    try {
      const s = localStorage.getItem(KEY);
      if (s) data = JSON.parse(s, (k, v) => Array.isArray(v) ? new Set(v) : v);
      const c = localStorage.getItem(CONF_KEY);
      if (c) conf = JSON.parse(c);
    } catch(e) {}
  }

  function save() {
    try {
      const out = {};
      for (const k in data) out[k] = [...data[k]];
      localStorage.setItem(KEY, JSON.stringify(out));
      localStorage.setItem(CONF_KEY, JSON.stringify(conf));
    } catch(e) {}
  }

  function markSeen(unitId, nodeId) {
    if (!data[unitId]) data[unitId] = new Set();
    data[unitId].add(nodeId);
    save();
  }

  function getPct(unitId, total) {
    if (!data[unitId] || total === 0) return 0;
    return Math.round(data[unitId].size / total * 100);
  }

  function setConf(idx, level) { // level: 'hard'|'ok'|'easy'
    conf[idx] = level;
    save();
  }

  function getConf(idx) { return conf[idx] || null; }

  function totalSeen() {
    return Object.values(data).reduce((a, s) => a + s.size, 0);
  }

  function totalNodes() {
    return DB.units.reduce((a, u) => a + u.sections.reduce((b, s) => b + s.nodes.filter(n => !n.isTable && !n.isExpected && !n.isPathway).length, 0), 0);
  }

  load();
  return { markSeen, getPct, setConf, getConf, totalSeen, totalNodes, save };
})();


export { Progress };
