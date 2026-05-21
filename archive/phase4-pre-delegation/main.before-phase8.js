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

function handleDelegatedClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  if (!action) return;

  switch (action) {
    case 'back':
      App.back();
      break;
    case 'toggle-theme':
      App.toggleTheme();
      break;
    case 'tab':
      if (target.dataset.tab) App.tab(target.dataset.tab);
      break;
    case 'open-unit':
      if (target.dataset.unitId) App.openUnit(target.dataset.unitId);
      break;
    case 'open-section':
      if (target.dataset.unitId && target.dataset.sectionId) {
        App.openSection(target.dataset.unitId, target.dataset.sectionId);
      }
      break;
    case 'toggle-node':
      if (target.dataset.nodeId && target.dataset.unitId) {
        App.toggleNode(target.dataset.nodeId, target.dataset.unitId);
      }
      break;
    case 'jump-to':
      if (target.dataset.unitId && target.dataset.sectionId) {
        App.jumpTo(target.dataset.unitId, target.dataset.sectionId);
      }
      break;
    case 'restart-quiz':
      App.restartQuiz();
      break;
    case 'answer-quiz':
      if (target.dataset.index) App.answerQuiz(Number(target.dataset.index));
      break;
    case 'next-quiz':
      App.nextQ();
      break;
    case 'flip-card':
      App.flipCard();
      break;
    case 'rate-card':
      if (target.dataset.level) App.rateCard(target.dataset.level);
      break;
    case 'prev-card':
      App.prevCard();
      break;
    case 'next-card':
      App.nextCard();
      break;
    default:
      break;
  }
}

function handleDelegatedInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (target.dataset.action !== 'search-input') return;
  App.onSearch(target.value);
}

async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
  } catch (_) {
    // Keep app functional even if SW registration fails.
  }
}

(function boot() {
  Search.build(); // Pre-build search index
  App.tab('home');
  document.addEventListener('click', handleDelegatedClick);
  document.addEventListener('input', handleDelegatedInput);
  registerServiceWorker();

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
