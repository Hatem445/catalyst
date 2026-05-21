'use strict';

import { createInitialState } from './state.js';
import { Search } from './search.js';
import { createApp } from './router.js';

function toast(msg, duration = 2200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

const App = createApp(createInitialState());
window.App = App;
window.toast = toast;

(function boot() {
  Search.build(); // Pre-build search index
  App.tab('home');

  // Keyboard shortcut: '/' to focus search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      e.preventDefault();
      App.tab('search');
    }
  });

  // Handle browser back
  window.addEventListener('popstate', () => App.back());
})();
