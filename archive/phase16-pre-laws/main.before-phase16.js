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
let deferredInstallPrompt = null;

function updateInstallButtonVisibility() {
  const btn = document.getElementById('btn-install');
  if (!btn) return;
  btn.style.display = deferredInstallPrompt ? '' : 'none';
}

async function handleInstallApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const choice = await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  updateInstallButtonVisibility();
  if (choice && choice.outcome === 'accepted') {
    toast('تم بدء تثبيت التطبيق');
  }
}

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
    case 'open-periodic-filter':
      App.openPeriodicFilter(target.dataset.filter || 'transition');
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
      if (target.dataset.index !== undefined) App.answerQuiz(Number(target.dataset.index));
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
    case 'set-flash-topic':
      if (target.dataset.topic) App.setFlashTopic(target.dataset.topic);
      break;
    case 'periodic-filter':
      App.setPeriodicFilter(target.dataset.filter || 'all');
      break;
    case 'periodic-open':
      if (target.dataset.z) App.openPeriodicElement(Number(target.dataset.z));
      break;
    case 'periodic-close-detail':
      App.closePeriodicElement();
      break;
    case 'periodic-search-submit':
      App.submitPeriodicSearch();
      break;
    case 'periodic-search-clear':
      App.clearPeriodicSearch();
      break;
    case 'start-adaptive-topic':
      if (target.dataset.topic) App.startAdaptiveQuiz(target.dataset.topic, 5);
      break;
    case 'start-retry-quiz':
      App.startRetryQuizFromMistakes(5);
      break;
    case 'open-adaptive-flash':
      if (target.dataset.topic) App.openAdaptiveFlash(target.dataset.topic);
      break;
    case 'toggle-plan-task':
      if (target.dataset.taskId) App.togglePlanTask(target.dataset.taskId);
      break;
    case 'start-plan-task':
      if (target.dataset.taskId) App.startPlanTask(target.dataset.taskId);
      break;
    case 'rxn-play':
      if (target.dataset.animId) App.playReaction(target.dataset.animId);
      break;
    case 'rxn-pause':
      if (target.dataset.animId) App.pauseReaction(target.dataset.animId);
      break;
    case 'rxn-next-step':
      if (target.dataset.animId) App.nextReactionStep(target.dataset.animId);
      break;
    case 'rxn-restart':
      if (target.dataset.animId) App.restartReaction(target.dataset.animId);
      break;
    case 'toggle-rxn-anim':
      if (target.dataset.animId) App.toggleReactionAnim(target.dataset.animId);
      break;
    case 'restart-rxn-anim':
      if (target.dataset.animId) App.restartReactionAnim(target.dataset.animId);
      break;
    case 'install-app':
      handleInstallApp();
      break;
    default:
      break;
  }
}

function handleDelegatedInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (target.dataset.action === 'search-input') {
    App.onSearch(target.value);
    return;
  }
  if (target.dataset.action === 'periodic-search-input') {
    App.setPeriodicSearchDraft(target.value);
  }
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
    const t = e.target;
    if (e.key === 'Enter' && t instanceof HTMLInputElement && t.dataset.action === 'periodic-search-input') {
      e.preventDefault();
      App.submitPeriodicSearch();
      return;
    }
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
      e.preventDefault();
      App.tab('search');
    }
  });

  // Handle browser back
  window.addEventListener('popstate', () => App.back());

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallButtonVisibility();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateInstallButtonVisibility();
    toast('تم تثبيت التطبيق بنجاح');
  });
})();
