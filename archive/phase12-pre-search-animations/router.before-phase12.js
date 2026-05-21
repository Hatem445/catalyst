'use strict';

import { DB, QUIZ, CARDS } from './data.js';
import { TABS } from './state.js';
import { Renderer } from './render.js';
import { Progress } from './progress.js';
import { Search } from './search.js';
import { Adaptive } from './adaptive.js';
import { flipFlashCard } from './flashcards.js';

function createApp(S) {

  const view = () => document.getElementById('view');
  const nav  = (id) => document.getElementById('nav-' + id);

  function mount(html) {
    const v = view();
    v.innerHTML = html;
    v.scrollTop = 0;
    v.classList.remove('fade-in');
    void v.offsetWidth; // reflow
    v.classList.add('fade-in');
  }

  function updateNav() {
    TABS.forEach(t => {
      const el = nav(t);
      if (el) el.classList.toggle('active', S.tab === t);
    });
  }

  function updateBack() {
    const btn = document.getElementById('btn-back');
    if (!btn) return;
    btn.style.display = S.path.length > 0 ? '' : 'none';
  }

  function getFlashPool() {
    const topic = S.flash.topic || 'all';
    const indices = [];
    CARDS.forEach((card, idx) => {
      if (topic === 'all' || card.topic === topic) indices.push(idx);
    });
    return indices.length ? indices : CARDS.map((_, idx) => idx);
  }

  function ensureFlashIndexInPool() {
    const pool = getFlashPool();
    if (!pool.includes(S.flash.idx)) S.flash.idx = pool[0];
    return pool;
  }

  function defaultQuizRoute() {
    return QUIZ.map((_, idx) => idx);
  }

  function getActiveQuizRoute() {
    if (Array.isArray(S.quiz.route) && S.quiz.route.length) return S.quiz.route;
    return defaultQuizRoute();
  }

  function getCurrentQuizQuestion() {
    const route = getActiveQuizRoute();
    const qIdx = route[S.quiz.idx];
    if (qIdx === undefined) return null;
    return { route, qIdx, question: QUIZ[qIdx] };
  }

  function render() {
    updateNav();
    updateBack();

    if (S.tab === 'home') {
      if (S.path.length === 0) {
        const adaptiveHome = Adaptive.getHomeSnapshot(6);
        mount(Renderer.home(adaptiveHome));
      } else if (S.path.length === 1) {
        const unit = DB.units.find(u => u.id === S.path[0]);
        mount(unit ? Renderer.unit(unit) : Renderer.home());
      } else if (S.path.length === 2) {
        const unit = DB.units.find(u => u.id === S.path[0]);
        const sec  = unit?.sections.find(s => s.id === S.path[1]);
        mount(unit && sec ? Renderer.section(unit, sec) : Renderer.home());
      }
    } else if (S.tab === 'organic') {
      mount(Renderer.organic());
    } else if (S.tab === 'periodic') {
      mount(Renderer.periodic(S.periodic));
    } else if (S.tab === 'search') {
      mount(Renderer.search(S.searchQ));
      const si = document.getElementById('si');
      if (si) { si.focus(); si.selectionStart = si.selectionEnd = si.value.length; }
    } else if (S.tab === 'quiz') {
      const route = getActiveQuizRoute();
      mount(Renderer.quiz(S.quiz, route));
    } else if (S.tab === 'flash') {
      const pool = ensureFlashIndexInPool();
      const dueNowIds = new Set(Adaptive.getDueFlashCards());
      mount(Renderer.flash(S.flash, pool, dueNowIds));
    }
  }

  /* Public API */
  return {
    tab(t) {
      S.tab = t;
      if (t !== 'home') S.path = [];
      render();
    },

    back() {
      if (S.path.length > 0) { S.path.pop(); render(); }
    },

    openUnit(id) {
      S.tab = 'home'; S.path = [id]; render();
    },

    openSection(uid, sid) {
      S.tab = 'home'; S.path = [uid, sid]; render();
    },

    jumpTo(uid, sid) {
      S.tab = 'home'; S.path = [uid, sid]; render();
    },

    toggleNode(nid, unitId) {
      const h = document.getElementById('nh_' + nid);
      const b = document.getElementById('nb_' + nid);
      if (!h || !b) return;
      const open = b.classList.contains('open');
      h.classList.toggle('open', !open);
      b.classList.toggle('open', !open);
      if (!open) Progress.markSeen(unitId, nid);
    },

    onSearch(q) {
      S.searchQ = q;
      const results = Search.query(q);
      const container = view();
      if (!container) return;
      // Fast partial re-render
      const existing = container.querySelector('.search-count, .search-hint, .search-result');
      if (!existing) { render(); return; }
      // Rebuild only results section
      mount(Renderer.search(q));
      const si = document.getElementById('si');
      if (si) { si.focus(); si.selectionStart = si.selectionEnd = si.value.length; }
    },

    /* Quiz */
    answerQuiz(i) {
      const current = getCurrentQuizQuestion();
      if (!current) return;
      const q = current.question;
      if (S.quiz.answered) return;
      S.quiz.answered = true;
      S.quiz.chosen = i;
      const correct = i === q.ans;
      if (correct) S.quiz.score++;
      Adaptive.recordQuizResult(q.id, q.topic, correct, Date.now());
      S.quiz.suggestion = correct ? null : Adaptive.buildSuggestionForQuestion(q);
      render();
    },

    nextQ() {
      const route = getActiveQuizRoute();
      S.quiz.idx++;
      S.quiz.answered = false;
      S.quiz.chosen = -1;
      S.quiz.suggestion = null;
      if (S.quiz.idx >= route.length) S.quiz.done = true;
      render();
    },

    restartQuiz() {
      S.quiz = { idx:0, score:0, answered:false, done:false, chosen:-1, mode:'normal', route:null, topic:null, suggestion:null };
      render();
    },

    /* Flashcards */
    flipCard() { flipFlashCard(S); render(); },

    nextCard() {
      const pool = ensureFlashIndexInPool();
      const pos = pool.indexOf(S.flash.idx);
      const nextPos = (pos + 1) % pool.length;
      S.flash.idx = pool[nextPos];
      S.flash.flipped = false;
      render();
    },

    prevCard() {
      const pool = ensureFlashIndexInPool();
      const pos = pool.indexOf(S.flash.idx);
      const prevPos = (pos - 1 + pool.length) % pool.length;
      S.flash.idx = pool[prevPos];
      S.flash.flipped = false;
      render();
    },

    rateCard(level) {
      Progress.setConf(S.flash.idx, level);
      const card = CARDS[S.flash.idx];
      if (card?.id) Adaptive.scheduleFlashReview(card.id, level, Date.now());
      // Auto-advance after rating
      setTimeout(() => {
        const pool = ensureFlashIndexInPool();
        const pos = pool.indexOf(S.flash.idx);
        const nextPos = (pos + 1) % pool.length;
        S.flash.idx = pool[nextPos];
        S.flash.flipped = false;
        render();
      }, 300);
    },

    setFlashTopic(topic) {
      S.flash.topic = topic || 'all';
      const pool = ensureFlashIndexInPool();
      S.flash.idx = pool[0];
      S.flash.flipped = false;
      render();
    },

    setPeriodicFilter(filter) {
      S.periodic.filter = filter || 'all';
      render();
    },

    setPeriodicQuery(query) {
      S.periodic.query = query || '';
      render();
    },

    openPeriodicElement(z) {
      const zn = Number(z);
      if (!Number.isFinite(zn)) return;
      S.periodic.selectedZ = zn;
      render();
    },

    openPeriodicFilter(filter) {
      S.tab = 'periodic';
      S.path = [];
      S.periodic.filter = filter || 'all';
      S.periodic.query = '';
      S.periodic.selectedZ = null;
      render();
    },

    closePeriodicElement() {
      S.periodic.selectedZ = null;
      render();
    },

    openAdaptiveFlash(topicCode) {
      const cards = CARDS.filter(c => c.topicCode === topicCode);
      if (!cards.length) {
        S.tab = 'flash';
        S.flash.topic = 'all';
        render();
        return;
      }
      const dueSet = new Set(Adaptive.getDueFlashCards());
      const dueCard = cards.find(c => c.id && dueSet.has(c.id));
      const startCard = dueCard || cards[0];
      S.tab = 'flash';
      S.flash.topic = startCard.topic || 'all';
      S.flash.idx = CARDS.indexOf(startCard);
      S.flash.flipped = false;
      render();
    },

    startAdaptiveQuiz(topicCode, count = 5) {
      const route = Adaptive.getQuizRouteForTopic(topicCode, count);
      S.tab = 'quiz';
      S.quiz = { idx:0, score:0, answered:false, done:false, chosen:-1, mode:'adaptive-topic', route, topic:topicCode, suggestion:null };
      Adaptive.setAdaptiveState({ mode: 'adaptive-topic', topic: topicCode, count });
      render();
    },

    startRetryQuizFromMistakes(count = 5) {
      const route = Adaptive.getRetryQuizRoute(count);
      S.tab = 'quiz';
      S.quiz = { idx:0, score:0, answered:false, done:false, chosen:-1, mode:'adaptive-retry', route, topic:null, suggestion:null };
      Adaptive.setAdaptiveState({ mode: 'adaptive-retry', count });
      render();
    },

    togglePlanTask(taskId) {
      Adaptive.togglePlanTask(taskId);
      if (S.tab === 'home' && S.path.length === 0) render();
    },

    startPlanTask(taskId) {
      const task = Adaptive.getPlanTask(taskId);
      if (!task) return;
      Adaptive.setPlanTaskStatus(taskId, true);
      switch (task.type) {
        case 'weak_concept':
        case 'short_lesson':
          S.tab = 'home';
          S.path = [task.unitId, task.sectionId];
          break;
        case 'related_question':
        case 'reinforce_question':
          this.startAdaptiveQuiz(task.topic, 5);
          return;
        case 'review_card':
        case 'reinforce_card':
          this.openAdaptiveFlash(task.topic);
          return;
        default:
          break;
      }
      render();
    },

    toggleReactionAnim(animId) {
      const el = document.getElementById(animId);
      if (!el) return;
      el.classList.toggle('is-paused');
    },

    restartReactionAnim(animId) {
      const el = document.getElementById(animId);
      if (!el || !el.parentNode) return;
      const clone = el.cloneNode(true);
      clone.classList.remove('is-paused');
      el.parentNode.replaceChild(clone, el);
    },

    toggleTheme() {
      const body = document.body;
      const isLight = body.getAttribute('data-theme') === 'light';
      body.setAttribute('data-theme', isLight ? 'dark' : 'light');
      document.getElementById('btn-theme').textContent = isLight ? '🌙' : '☀️';
    },
  };

}

export { createApp };
