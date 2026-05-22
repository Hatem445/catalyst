'use strict';

import { DB, QUIZ, CARDS } from './data.js';
import { EXAM_CENTER_PUBLIC_ENABLED, TABS } from './state.js';
import { Renderer } from './render.js';
import { Progress } from './progress.js';
import { Search } from './search.js';
import { Adaptive } from './adaptive.js';
import { flipFlashCard } from './flashcards.js';
import { ReactionPlayer } from './reaction-player.js';
import { ExamDB } from './db.js';
import { ExamCenter } from './examCenter.js';
import { QuestionPlayer } from './questionPlayer.js';
import { MockEngine } from './mockEngine.js';
import { ExamAnalytics } from './analytics.js';
import { WorkedExamples } from './workedExamples.js';

function createApp(S) {
  let examDataPromise = null;
  const isExamCenterBlocked = () => !EXAM_CENTER_PUBLIC_ENABLED;

  const view = () => document.getElementById('view');
  const nav = (id) => document.getElementById('nav-' + id);

  function mount(html) {
    const v = view();
    if (!v) return;
    v.innerHTML = html;
    v.scrollTop = 0;
    v.classList.remove('fade-in');
    void v.offsetWidth;
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

  function shuffleIndices(len) {
    const arr = Array.from({ length: len }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function getQuizChoiceOrderForQuestion(qIdx, q) {
    if (!S.quiz.choiceOrders || typeof S.quiz.choiceOrders !== 'object') {
      S.quiz.choiceOrders = {};
    }
    const key = String(qIdx);
    const existing = S.quiz.choiceOrders[key];
    if (Array.isArray(existing) && existing.length === q.opts.length) return existing;
    const order = shuffleIndices(q.opts.length);
    S.quiz.choiceOrders[key] = order;
    return order;
  }

  function getCurrentExamQuestion() {
    const session = S.exam.session;
    if (!session || !Array.isArray(session.route) || !session.route.length) return null;
    const qid = session.route[session.index] || session.questionId;
    const question = ExamDB.getQuestionById(qid);
    return question ? { question, qid } : null;
  }

  async function ensureExamData() {
    if (isExamCenterBlocked()) return false;
    if (ExamDB.isReady() && Search.examHydrated) return true;
    if (examDataPromise) return examDataPromise;
    S.exam.loading = true;
    S.exam.error = '';
    if (S.tab === 'exam-center') render();

    examDataPromise = (async () => {
      try {
        await ExamDB.init();
        await Search.hydrateExamEntries();
        S.exam.loading = false;
        S.exam.error = '';
        return true;
      } catch (_) {
        S.exam.loading = false;
        S.exam.error = 'تعذر تحميل بيانات الامتحانات حالياً. حاول إعادة المحاولة.';
        return false;
      } finally {
        examDataPromise = null;
      }
    })();

    return examDataPromise;
  }

  function buildExamCenterModel() {
    const all = ExamDB.getQuestions();
    const official = all.filter(q => q.sourceType === 'official').length;
    const synthetic = all.filter(q => q.sourceType !== 'official').length;
    const safeAutoGraded = all.filter(q => q.canAutoGrade).length;
    const needsManualReview = all.filter(q => q.needsManualReview).length;
    const readiness = all.length ? Math.round((safeAutoGraded / all.length) * 100) : 0;
    const sourceFiles = (ExamDB.getSourceMap()?.files || []).map(file => ({
      file: file.file,
      extracted: file.extractedQuestions,
      unreadablePages: file.unreadablePages || [],
      unreadableQuestions: file.unreadableQuestions || [],
    }));
    return ExamCenter.buildCenterModel({
      totalQuestions: all.length,
      officialQuestions: official,
      syntheticQuestions: synthetic,
      safeAutoGraded,
      needsManualReview,
      readiness,
      analyticsSummary: ExamAnalytics.getSummary(),
      sourceFiles,
    });
  }

  function renderExamView() {
    if (isExamCenterBlocked()) {
      mount(Renderer.examCenterBlocked());
      return;
    }
    const viewMode = S.exam.view || 'center';
    if (viewMode === 'question') {
      const current = getCurrentExamQuestion();
      if (!current || !S.exam.session) {
        mount(Renderer.questionPlayer(null));
        return;
      }
      const q = current.question;
      const primaryWorked = q.workedExampleRef ? ExamDB.getWorkedExample(q.workedExampleRef) : null;
      const relatedWorked = ExamDB.getWorkedExamplesByQuestionId(q.id);
      const vm = QuestionPlayer.createViewModel(q, S.exam.session, primaryWorked, relatedWorked);
      mount(Renderer.questionPlayer(vm));
      return;
    }

    if (viewMode === 'training') {
      const questions = ExamDB.getQuestions({
        chapter: S.exam.chapter || '',
        skill: S.exam.skill || '',
        difficulty: S.exam.difficulty || '',
        trapTag: S.exam.trapTag || '',
        safeOnly: true,
        hideManualReview: true,
      });
      const chapters = ExamCenter.getTrainingChapters();
      const skills = S.exam.chapter ? ExamDB.getSkillNames(S.exam.chapter) : ExamDB.getSkillNames();
      const difficulties = S.exam.chapter ? ExamDB.getDifficultyNames(S.exam.chapter) : ExamDB.getDifficultyNames();
      const traps = S.exam.chapter ? ExamDB.getTrapTags(S.exam.chapter) : ExamDB.getTrapTags();
      mount(Renderer.examTraining({
        chapter: S.exam.chapter,
        chapters,
        skills,
        difficulties,
        traps,
        selectedSkill: S.exam.skill,
        selectedDifficulty: S.exam.difficulty,
        selectedTrap: S.exam.trapTag,
        matchedCount: questions.length,
      }));
      return;
    }

    if (viewMode === 'worked') {
      const worked = ExamDB.getWorkedExamples();
      mount(Renderer.examWorkedExamples({
        items: worked,
        focusedId: S.exam.focusedWorkedExampleId || '',
      }));
      return;
    }

    if (viewMode === 'mistakes') {
      const mistakes = ExamAnalytics.getCommonMistakes(100).map(item => {
        const q = ExamDB.getQuestionById(item.questionId);
        return {
          ...item,
          lawRefs: q?.lawRefs || [],
          workedExampleRef: q?.workedExampleRef || '',
          questionText: q?.question || '',
        };
      });
      mount(Renderer.examMistakes({ mistakes }));
      return;
    }

    if (viewMode === 'analytics') {
      const summary = ExamAnalytics.getSummary();
      const recent = ExamAnalytics.getRecent(12);
      mount(Renderer.examAnalytics({ summary, recent }));
      return;
    }

    if (viewMode === 'mock-result') {
      mount(Renderer.examMockResult({
        summary: ExamAnalytics.getSummary(),
        note: S.exam.mockNote || '',
      }));
      return;
    }

    const centerModel = buildExamCenterModel();
    const officialList = ExamDB.getQuestions({ sourceType: 'official' }).slice(0, 20);
    centerModel.officialList = officialList;
    centerModel.loading = S.exam.loading;
    centerModel.error = S.exam.error;
    centerModel.mistakes = ExamAnalytics.getCommonMistakes(5);
    centerModel.section = S.exam.section || 'official';
    mount(Renderer.examCenter(centerModel));
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
        const sec = unit?.sections.find(s => s.id === S.path[1]);
        mount(unit && sec ? Renderer.section(unit, sec) : Renderer.home());
      }
      return;
    }

    if (S.tab === 'organic') {
      mount(Renderer.organic());
      return;
    }

    if (S.tab === 'periodic') {
      mount(Renderer.periodic(S.periodic));
      return;
    }

    if (S.tab === 'laws') {
      mount(Renderer.laws(S.laws));
      if (S.laws.focusLawId) {
        const focusId = S.laws.focusLawId;
        setTimeout(() => {
          const target = document.querySelector(`[data-law-id="${focusId}"]`);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 40);
      }
      return;
    }

    if (S.tab === 'search') {
      mount(Renderer.search(S.searchQ));
      const si = document.getElementById('si');
      if (si) { si.focus(); si.selectionStart = si.selectionEnd = si.value.length; }
      return;
    }

    if (S.tab === 'quiz') {
      const current = getCurrentQuizQuestion();
      if (current && current.question && Array.isArray(current.question.opts)) {
        getQuizChoiceOrderForQuestion(current.qIdx, current.question);
      }
      const route = getActiveQuizRoute();
      mount(Renderer.quiz(S.quiz, route));
      return;
    }

    if (S.tab === 'flash') {
      const pool = ensureFlashIndexInPool();
      const dueNowIds = new Set(Adaptive.getDueFlashCards());
      mount(Renderer.flash(S.flash, pool, dueNowIds));
      return;
    }

    if (S.tab === 'exam-center') {
      renderExamView();
    }
  }

  function startQuestionRoute(questionIds, index = 0, mode = 'training') {
    if (!Array.isArray(questionIds) || !questionIds.length) {
      S.exam.error = 'لا توجد أسئلة مطابقة حالياً.';
      S.exam.view = 'center';
      render();
      return;
    }
    const session = QuestionPlayer.createSession(questionIds, index);
    S.exam.mode = mode;
    S.exam.view = 'question';
    S.exam.questionRouteIds = questionIds.slice();
    S.exam.questionId = session.questionId;
    S.exam.session = session;
    render();
  }

  return {
    tab(t) {
      if (t === 'exam-center') {
        this.openExamCenter();
        return;
      }
      if (S.tab === 'organic' && t !== 'organic') ReactionPlayer.stopAll();
      S.tab = t;
      if (t !== 'home') S.path = [];
      if (t !== 'laws') S.laws.focusLawId = null;
      render();
    },

    back() {
      if (S.path.length > 0) {
        S.path.pop();
        render();
      }
    },

    openUnit(id) {
      S.tab = 'home';
      S.path = [id];
      render();
    },

    openSection(uid, sid) {
      S.tab = 'home';
      S.path = [uid, sid];
      render();
    },

    jumpTo(uid, sid) {
      S.tab = 'home';
      S.path = [uid, sid];
      render();
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
      const container = view();
      if (!container) return;
      mount(Renderer.search(q));
      const si = document.getElementById('si');
      if (si) { si.focus(); si.selectionStart = si.selectionEnd = si.value.length; }
    },

    setLawsQuery(query) {
      S.laws.query = query || '';
      S.laws.focusLawId = null;
      if (S.tab !== 'laws') S.tab = 'laws';
      render();
    },

    clearLawsSearch() {
      S.laws.query = '';
      S.laws.focusLawId = null;
      if (S.tab !== 'laws') S.tab = 'laws';
      render();
    },

    setLawsCategory(category) {
      S.laws.category = category || 'all';
      S.laws.focusLawId = null;
      if (S.tab !== 'laws') S.tab = 'laws';
      render();
    },

    openLawEntry(lawId, category) {
      S.tab = 'laws';
      S.path = [];
      if (category) S.laws.category = category;
      S.laws.focusLawId = lawId || null;
      render();
    },

    openLawFocus(focusKey) {
      const mapped = WorkedExamples.getLawFocusState(focusKey);
      S.tab = 'laws';
      S.path = [];
      if (mapped) {
        S.laws.category = mapped.category;
        S.laws.focusLawId = mapped.lawId;
      } else {
        S.laws.category = 'all';
        S.laws.focusLawId = null;
      }
      render();
    },

    async initExamData() {
      if (isExamCenterBlocked()) return;
      await ensureExamData();
      if (S.tab === 'exam-center') render();
    },

    openExamBlocked() {
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.view = 'blocked';
      S.exam.mode = 'blocked';
      render();
    },

    async openExamCenter(section = '') {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.view = 'center';
      S.exam.mode = 'center';
      S.exam.section = section || S.exam.section || 'official';
      await ensureExamData();
      render();
    },

    async openExamTraining(chapter = '') {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.view = 'training';
      S.exam.mode = 'training';
      S.exam.section = 'training';
      S.exam.chapter = chapter || '';
      await ensureExamData();
      render();
    },

    setExamFilter(key, value) {
      if (isExamCenterBlocked()) return;
      if (!key) return;
      if (key === 'chapter') S.exam.chapter = value || '';
      if (key === 'skill') S.exam.skill = value || '';
      if (key === 'difficulty') S.exam.difficulty = value || '';
      if (key === 'trap') S.exam.trapTag = value || '';
      render();
    },

    clearExamFilters() {
      if (isExamCenterBlocked()) return;
      S.exam.skill = '';
      S.exam.difficulty = '';
      S.exam.trapTag = '';
      render();
    },

    startExamTraining() {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      const ids = MockEngine.generateChapterTraining(
        S.exam.chapter || '',
        {
          skill: S.exam.skill,
          difficulty: S.exam.difficulty,
          trapTag: S.exam.trapTag,
          verifiedOnly: false,
          safeOnly: true,
        },
        40
      );
      startQuestionRoute(ids, 0, 'training');
    },

    async openQuickMock() {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.view = 'question';
      S.exam.mode = 'mock-quick';
      S.exam.section = 'mock';
      S.exam.mockMode = 'quick';
      await ensureExamData();
      const ids = MockEngine.generateQuickMock({ count: 15 });
      startQuestionRoute(ids, 0, 'mock-quick');
    },

    async openFullMock() {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.section = 'mock';
      S.exam.mockMode = 'full';
      await ensureExamData();
      const full = MockEngine.generateFullMock();
      S.exam.mockComplete = full.complete;
      S.exam.mockEssayPlaceholders = full.essayPlaceholders;
      S.exam.mockNote = full.note || '';
      startQuestionRoute(full.mcqQuestionIds || [], 0, 'mock-full');
    },

    async openWorkedExamples(focusId = '') {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.view = 'worked';
      S.exam.mode = 'worked';
      S.exam.focusedWorkedExampleId = focusId || '';
      await ensureExamData();
      render();
    },

    async openExamMistakes() {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.view = 'mistakes';
      S.exam.mode = 'mistakes';
      await ensureExamData();
      render();
    },

    async openExamAnalytics() {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      S.exam.view = 'analytics';
      S.exam.mode = 'analytics';
      await ensureExamData();
      render();
    },

    openExamSection(section) {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      const sec = section || 'official';
      if (sec === 'official' || sec === 'official-2026') {
        this.openExamCenter('official');
        return;
      }
      if (sec === 'by-chapter') {
        this.openExamTraining(S.exam.chapter || '');
        return;
      }
      if (sec === 'worked') {
        this.openWorkedExamples();
        return;
      }
      if (sec === 'mistakes') {
        this.openExamMistakes();
        return;
      }
      if (sec === 'analytics') {
        this.openExamAnalytics();
        return;
      }
      if (sec === 'mock') {
        this.openQuickMock();
        return;
      }
      this.openExamCenter(sec);
    },

    setExamTopic(topic) {
      if (isExamCenterBlocked()) return;
      S.exam.topic = topic || '';
      render();
    },

    async openQuestionById(questionId) {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      if (S.tab === 'organic') ReactionPlayer.stopAll();
      S.tab = 'exam-center';
      S.path = [];
      await ensureExamData();
      const qid = String(questionId || '');
      const q = ExamDB.getQuestionById(qid);
      if (!q) {
        S.exam.error = 'السؤال المطلوب غير متاح.';
        S.exam.view = 'center';
        S.exam.mode = 'center';
        render();
        return;
      }

      const route = [qid];
      const session = QuestionPlayer.createSession(route, 0);
      S.exam.view = 'question';
      S.exam.mode = 'direct';
      S.exam.questionRouteIds = route;
      S.exam.questionId = qid;
      S.exam.session = session;
      render();
    },

    async openWorkedExample(exampleId, questionId) {
      if (isExamCenterBlocked()) {
        this.openExamBlocked();
        return;
      }
      await ensureExamData();
      const ex = ExamDB.getWorkedExample(exampleId);
      if (questionId) {
        await this.openQuestionById(questionId);
        return;
      }
      if (ex?.questionId) {
        await this.openQuestionById(ex.questionId);
        return;
      }
      if (ex?.relatedQuestionIds?.length) {
        await this.openQuestionById(ex.relatedQuestionIds[0]);
        return;
      }
      await this.openWorkedExamples(exampleId);
    },

    selectExamChoice(choiceIndex) {
      if (isExamCenterBlocked()) return;
      if (S.exam.view !== 'question' || !S.exam.session) return;
      S.exam.session = QuestionPlayer.selectChoice(S.exam.session, Number(choiceIndex));
      render();
    },

    confirmExamAnswer() {
      if (isExamCenterBlocked()) return;
      if (S.exam.view !== 'question' || !S.exam.session) return;
      const current = getCurrentExamQuestion();
      if (!current) return;
      const q = current.question;

      const prev = S.exam.session;
      const nextSession = QuestionPlayer.confirmChoice(prev, q);
      S.exam.session = nextSession;
      S.exam.questionId = nextSession.questionId || q.id;

      if (q.canAutoGrade && nextSession.confirmed && prev !== nextSession && nextSession.selectedIndex >= 0) {
        const elapsedSec = Math.max(1, Math.round((Date.now() - (prev.startedAt || Date.now())) / 1000));
        ExamAnalytics.recordAnswer({
          questionId: q.id,
          selected: nextSession.selectedIndex,
          answerKey: q.answerKey,
          correct: nextSession.isCorrect,
          chapter: q.chapter,
          topic: q.topic,
          trapTags: q.trapTags || [],
          sourceType: q.sourceType,
          timeSpentSec: elapsedSec,
          confidence: '',
          timestamp: Date.now(),
        });
      }
      render();
    },

    nextExamQuestion() {
      if (isExamCenterBlocked()) return;
      if (S.exam.view !== 'question' || !S.exam.session) return;
      const moved = QuestionPlayer.moveNext(S.exam.session);
      if (moved === S.exam.session) {
        S.exam.view = 'mock-result';
        if (S.exam.mode === 'mock-full' && !S.exam.mockComplete) {
          S.exam.mockNote = 'قيد الاكتمال: لم يكتمل بنك الأسئلة الموثقة للإصدار الكامل بعد.';
        }
        render();
        return;
      }
      S.exam.session = moved;
      S.exam.questionId = moved.questionId;
      render();
    },

    trainSameChapter() {
      if (isExamCenterBlocked()) return;
      const current = getCurrentExamQuestion();
      if (!current) return;
      S.exam.chapter = current.question.chapter || '';
      S.exam.skill = '';
      S.exam.difficulty = '';
      S.exam.trapTag = '';
      const ids = MockEngine.generateChapterTraining(S.exam.chapter, { safeOnly: true }, 30);
      startQuestionRoute(ids, 0, 'training');
    },

    reviewExamLaw(lawRef) {
      if (isExamCenterBlocked()) return;
      if (!lawRef) return;
      S.exam.session = QuestionPlayer.markLawReviewed(S.exam.session, lawRef);
      this.openLawFocus(lawRef);
    },

    /* Quiz */
    answerQuiz(i) {
      const current = getCurrentQuizQuestion();
      if (!current) return;
      const q = current.question;
      if (S.quiz.answered) return;
      const order = getQuizChoiceOrderForQuestion(current.qIdx, q);
      const visibleIdx = Number(i);
      const originalIdx = order[visibleIdx];
      if (!Number.isInteger(originalIdx)) return;
      S.quiz.answered = true;
      S.quiz.chosen = originalIdx;
      const correct = originalIdx === q.ans;
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
      S.quiz = { idx: 0, score: 0, answered: false, done: false, chosen: -1, mode: 'normal', route: null, topic: null, suggestion: null, choiceOrders: {} };
      render();
    },

    /* Flashcards */
    flipCard() {
      flipFlashCard(S);
      render();
    },

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

    setPeriodicSearchDraft(query) {
      S.periodic.searchDraft = query || '';
    },

    submitPeriodicSearch() {
      S.periodic.query = (S.periodic.searchDraft || '').trim();
      render();
    },

    clearPeriodicSearch() {
      S.periodic.searchDraft = '';
      S.periodic.query = '';
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
      S.periodic.searchDraft = '';
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
      S.quiz = { idx: 0, score: 0, answered: false, done: false, chosen: -1, mode: 'adaptive-topic', route, topic: topicCode, suggestion: null, choiceOrders: {} };
      Adaptive.setAdaptiveState({ mode: 'adaptive-topic', topic: topicCode, count });
      render();
    },

    startRetryQuizFromMistakes(count = 5) {
      const route = Adaptive.getRetryQuizRoute(count);
      S.tab = 'quiz';
      S.quiz = { idx: 0, score: 0, answered: false, done: false, chosen: -1, mode: 'adaptive-retry', route, topic: null, suggestion: null, choiceOrders: {} };
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

    playReaction(animId) {
      ReactionPlayer.playReaction(animId);
    },

    pauseReaction(animId) {
      ReactionPlayer.pauseReaction(animId);
    },

    nextReactionStep(animId) {
      ReactionPlayer.nextReactionStep(animId);
    },

    restartReaction(animId) {
      ReactionPlayer.restartReaction(animId);
    },

    toggleReactionAnim(animId) {
      ReactionPlayer.playReaction(animId);
    },

    restartReactionAnim(animId) {
      ReactionPlayer.restartReaction(animId);
    },

    toggleTheme() {
      const body = document.body;
      const isLight = body.getAttribute('data-theme') === 'light';
      body.setAttribute('data-theme', isLight ? 'dark' : 'light');
      const btn = document.getElementById('btn-theme');
      if (btn) btn.textContent = isLight ? '🌙' : '☀️';
    },
  };
}

export { createApp };
