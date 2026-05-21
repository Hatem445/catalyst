'use strict';

import { DB, QUIZ, CARDS } from './data.js';
import { TABS } from './state.js';
import { Renderer } from './render.js';
import { Progress } from './progress.js';
import { Search } from './search.js';
import { answerQuiz, nextQuizQuestion, restartQuiz as resetQuiz } from './quiz.js';
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

  function render() {
    updateNav();
    updateBack();

    if (S.tab === 'home') {
      if (S.path.length === 0) {
        mount(Renderer.home());
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
    } else if (S.tab === 'search') {
      mount(Renderer.search(S.searchQ));
      const si = document.getElementById('si');
      if (si) { si.focus(); si.selectionStart = si.selectionEnd = si.value.length; }
    } else if (S.tab === 'quiz') {
      mount(Renderer.quiz(S.quiz));
    } else if (S.tab === 'flash') {
      const pool = ensureFlashIndexInPool();
      mount(Renderer.flash(S.flash, pool));
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
      answerQuiz(S, QUIZ, i);
      render();
    },

    nextQ() {
      nextQuizQuestion(S, QUIZ);
      render();
    },

    restartQuiz() {
      resetQuiz(S);
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

    toggleTheme() {
      const body = document.body;
      const isLight = body.getAttribute('data-theme') === 'light';
      body.setAttribute('data-theme', isLight ? 'dark' : 'light');
      document.getElementById('btn-theme').textContent = isLight ? '🌙' : '☀️';
    },
  };

}

export { createApp };
