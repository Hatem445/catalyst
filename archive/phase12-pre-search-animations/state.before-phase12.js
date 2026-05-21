'use strict';

const TABS = ['home','organic','periodic','search','quiz','flash'];

function createInitialState() {
  return {
    tab: 'home',
    path: [],
    searchQ: '',
    periodic: { query: '', filter: 'all', selectedZ: null },
    quiz: { idx:0, score:0, answered:false, done:false, chosen:-1, mode:'normal', route:null, topic:null, suggestion:null },
    flash: { idx:0, flipped:false, topic:'all' },
  };
}

export { TABS, createInitialState };
