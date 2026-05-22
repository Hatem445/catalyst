'use strict';

import { createInitialState } from './state.js';
import { Search } from './search.js';
import { createApp } from './router.js';

function toast(msg, duration = 2200) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

const App = createApp(createInitialState());
window.App = App;
window.toast = toast;
let deferredInstallPrompt = null;
let suppressHashRoute = false;

function setHash(nextHash) {
  const normalized = nextHash && nextHash.startsWith('#') ? nextHash : `#${nextHash || ''}`;
  if (window.location.hash === normalized) return;
  suppressHashRoute = true;
  window.location.hash = normalized;
  setTimeout(() => { suppressHashRoute = false; }, 0);
}

function parseHashRoute() {
  const rawHash = window.location.hash || '';
  if (!rawHash) return { type: 'home' };

  if (rawHash.startsWith('#question/')) {
    const questionId = decodeURIComponent(rawHash.slice('#question/'.length));
    return { type: 'question', questionId };
  }

  if (rawHash.startsWith('#exam-training')) {
    const queryStr = rawHash.includes('?') ? rawHash.slice(rawHash.indexOf('?') + 1) : '';
    const params = new URLSearchParams(queryStr);
    return { type: 'exam-training', chapter: params.get('chapter') || '' };
  }

  if (rawHash.startsWith('#mock/quick')) return { type: 'mock-quick' };
  if (rawHash.startsWith('#mock/full')) return { type: 'mock-full' };
  if (rawHash.startsWith('#worked-examples')) return { type: 'worked-examples' };
  if (rawHash.startsWith('#exam-mistakes')) return { type: 'exam-mistakes' };
  if (rawHash.startsWith('#exam-analytics')) return { type: 'exam-analytics' };

  if (rawHash.startsWith('#exam-center')) {
    const queryStr = rawHash.includes('?') ? rawHash.slice(rawHash.indexOf('?') + 1) : '';
    const params = new URLSearchParams(queryStr);
    return { type: 'exam-center', section: params.get('section') || '' };
  }

  if (rawHash.startsWith('#laws')) {
    const queryStr = rawHash.includes('?') ? rawHash.slice(rawHash.indexOf('?') + 1) : '';
    const params = new URLSearchParams(queryStr);
    const focus = params.get('focus');
    return focus ? { type: 'laws-focus', focus } : { type: 'laws' };
  }

  return { type: 'home' };
}

async function applyHashRoute() {
  if (suppressHashRoute) return;
  const route = parseHashRoute();
  switch (route.type) {
    case 'exam-center':
      await App.openExamCenter(route.section || '');
      break;
    case 'exam-training':
      await App.openExamTraining(route.chapter || '');
      break;
    case 'mock-quick':
      await App.openQuickMock();
      break;
    case 'mock-full':
      await App.openFullMock();
      break;
    case 'worked-examples':
      await App.openWorkedExamples();
      break;
    case 'exam-mistakes':
      await App.openExamMistakes();
      break;
    case 'exam-analytics':
      await App.openExamAnalytics();
      break;
    case 'question':
      if (route.questionId) await App.openQuestionById(route.questionId);
      break;
    case 'laws-focus':
      App.openLawFocus(route.focus);
      break;
    case 'laws':
      App.tab('laws');
      break;
    default:
      App.tab('home');
      break;
  }
}

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
    case 'go-hash':
      if (target.dataset.hash) {
        setHash(target.dataset.hash);
        applyHashRoute();
      }
      break;
    case 'tab':
      if (target.dataset.tab === 'exam-center') {
        setHash('#exam-center');
        App.openExamCenter();
      } else if (target.dataset.tab) {
        App.tab(target.dataset.tab);
      }
      break;
    case 'open-exam-center':
      setHash('#exam-center');
      App.openExamCenter();
      break;
    case 'exam-open-chapter':
      if (target.dataset.chapter) {
        setHash(`#exam-training?chapter=${encodeURIComponent(target.dataset.chapter)}`);
        App.openExamTraining(target.dataset.chapter);
      }
      break;
    case 'exam-open-quick-mock':
      setHash('#mock/quick');
      App.openQuickMock();
      break;
    case 'exam-open-full-mock':
      setHash('#mock/full');
      App.openFullMock();
      break;
    case 'exam-open-worked':
      setHash('#worked-examples');
      App.openWorkedExamples();
      break;
    case 'exam-open-mistakes':
      setHash('#exam-mistakes');
      App.openExamMistakes();
      break;
    case 'exam-open-analytics':
      setHash('#exam-analytics');
      App.openExamAnalytics();
      break;
    case 'exam-set-filter':
      App.setExamFilter(target.dataset.filterKey || '', target.dataset.filterValue || '');
      break;
    case 'exam-clear-filters':
      App.clearExamFilters();
      break;
    case 'exam-start-training':
      App.startExamTraining();
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
    case 'open-law':
      if (target.dataset.lawId) {
        App.openLawEntry(target.dataset.lawId, target.dataset.lawCategory || 'all');
      }
      break;
    case 'open-question':
      if (target.dataset.questionId) {
        setHash(`#question/${encodeURIComponent(target.dataset.questionId)}`);
        App.openQuestionById(target.dataset.questionId);
      }
      break;
    case 'open-worked-example':
      App.openWorkedExample(target.dataset.exampleId || '', target.dataset.questionId || '');
      if (target.dataset.questionId) {
        setHash(`#question/${encodeURIComponent(target.dataset.questionId)}`);
      }
      break;
    case 'exam-select-choice':
      if (target.dataset.choiceIndex !== undefined) App.selectExamChoice(Number(target.dataset.choiceIndex));
      break;
    case 'exam-confirm-answer':
      App.confirmExamAnswer();
      break;
    case 'exam-next-question':
      App.nextExamQuestion();
      break;
    case 'exam-train-same-chapter':
      App.trainSameChapter();
      break;
    case 'exam-review-law':
      if (target.dataset.lawRef) {
        const focus = encodeURIComponent(target.dataset.lawRef);
        setHash(`#laws?focus=${focus}`);
        App.reviewExamLaw(target.dataset.lawRef);
      }
      break;
    case 'exam-open-related-worked':
      if (target.dataset.exampleId) {
        setHash('#worked-examples');
        App.openWorkedExamples(target.dataset.exampleId);
      }
      break;
    case 'exam-retry-mistake':
      if (target.dataset.questionId) {
        setHash(`#question/${encodeURIComponent(target.dataset.questionId)}`);
        App.openQuestionById(target.dataset.questionId);
      }
      break;
    case 'exam-open-section':
      App.openExamSection(target.dataset.section || 'official-2026');
      break;
    case 'exam-open-mock':
      setHash('#mock/quick');
      App.openQuickMock();
      break;
    case 'exam-set-topic':
      App.setExamTopic(target.dataset.topic || 'all');
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
    case 'laws-category':
      App.setLawsCategory(target.dataset.category || 'all');
      break;
    case 'laws-clear-search':
      App.clearLawsSearch();
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
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
  if (target.dataset.action === 'search-input') {
    App.onSearch(target.value);
    return;
  }
  if (target.dataset.action === 'periodic-search-input') {
    App.setPeriodicSearchDraft(target.value);
    return;
  }
  if (target.dataset.action === 'laws-search-input') {
    App.setLawsQuery(target.value);
    return;
  }
  if (target.dataset.action === 'exam-filter-input') {
    App.setExamFilter(target.dataset.filterKey || '', target.value || '');
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

(async function boot() {
  Search.build();
  App.tab('home');
  document.addEventListener('click', handleDelegatedClick);
  document.addEventListener('input', handleDelegatedInput);
  document.addEventListener('change', handleDelegatedInput);
  registerServiceWorker();
  App.initExamData();

  document.addEventListener('keydown', e => {
    const t = e.target;
    if (e.key === 'Enter' && t instanceof HTMLInputElement && t.dataset.action === 'periodic-search-input') {
      e.preventDefault();
      App.submitPeriodicSearch();
      return;
    }
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'SELECT') {
      e.preventDefault();
      App.tab('search');
    }
  });

  window.addEventListener('popstate', () => App.back());
  window.addEventListener('hashchange', () => {
    applyHashRoute();
  });

  await applyHashRoute();

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
