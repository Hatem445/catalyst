'use strict';

const EXAM_CENTER_PUBLIC_ENABLED = false;
const TABS = ['home','organic','periodic','search','quiz','flash','laws','exam-center'];

function createInitialState() {
  return {
    tab: 'home',
    path: [],
    searchQ: '',
    laws: { query: '', category: 'all', focusLawId: null },
    exam: {
      view: 'center',
      mode: 'center',
      loading: false,
      error: '',
      section: 'official',
      chapter: '',
      topic: '',
      skill: '',
      difficulty: '',
      trapTag: '',
      questionId: '',
      questionRouteIds: [],
      session: null,
      mockMode: '',
      mockComplete: false,
      mockEssayPlaceholders: 0,
      mockNote: '',
      focusedWorkedExampleId: '',
    },
    periodic: { query: '', searchDraft: '', filter: 'all', selectedZ: null },
    quiz: { idx:0, score:0, answered:false, done:false, chosen:-1, mode:'normal', route:null, topic:null, suggestion:null, choiceOrders:{} },
    flash: { idx:0, flipped:false, topic:'all' },
  };
}

export { EXAM_CENTER_PUBLIC_ENABLED, TABS, createInitialState };
