'use strict';

const REACTION_LESSONS = [
  {
    id: 'rxn_anim_1',
    titleAr: 'إضافة البروم على الإيثين',
    equation: 'CH2=CH2 + Br2 → BrCH2-CH2Br',
    reactantsAr: 'الإيثين + البروم',
    conditionsAr: 'CCl4 أو مذيب خامل، درجة حرارة الغرفة',
    productAr: '1,2-ثنائي بروموإيثان',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'الإلكترونات في رابطة π أكثر تعرضًا للهجوم، لذلك تنكسر أولًا ثم تتكوّن رابطتا C-Br جديدتان.',
    scenes: [
      {
        title: 'المشهد 1: المتفاعلات',
        desc: 'نبدأ بجزيء الإيثين ورابطة مزدوجة مع جزيء Br2.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="70" y="42" class="rxn-formula">CH2=CH2</text>
          <text x="165" y="44" class="rxn-op">+</text>
          <text x="210" y="42" class="rxn-formula">Br-Br</text>
          <line x1="82" y1="60" x2="130" y2="60" class="rxn-bond sigma"/>
          <line x1="82" y1="68" x2="130" y2="68" class="rxn-bond pi"/>
          <text x="94" y="96" class="rxn-caption">الرابطة المزدوجة = σ + π</text>
        </svg>`
      },
      {
        title: 'المشهد 2: الموقع النشط',
        desc: 'نُبرز رابطة π لأنها الأكثر قابلية للتفاعل.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="70" y="42" class="rxn-formula">CH2=CH2</text>
          <line x1="82" y1="60" x2="130" y2="60" class="rxn-bond sigma"/>
          <line x1="82" y1="68" x2="130" y2="68" class="rxn-bond pi pulse"/>
          <rect x="74" y="52" width="64" height="24" rx="8" class="rxn-highlight"/>
          <text x="76" y="104" class="rxn-caption">هذه الإلكترونات هي التي تبدأ الإضافة</text>
        </svg>`
      },
      {
        title: 'المشهد 3: اقتراب الكاشف',
        desc: 'جزيء البروم يقترب من الرابطة المزدوجة.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="62" y="44" class="rxn-formula">CH2=CH2</text>
          <text x="208" y="44" class="rxn-formula move-left">Br-Br</text>
          <line x1="168" y1="62" x2="202" y2="62" class="rxn-bond dashed"/>
          <text x="148" y="96" class="rxn-caption">اقتراب الكاشف من منطقة π</text>
        </svg>`
      },
      {
        title: 'المشهد 4: كسر وتكوين روابط',
        desc: 'تنكسر رابطة π وتبدأ روابط C-Br الجديدة في التكوّن.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="52" y="42" class="rxn-formula">CH2-CH2</text>
          <line x1="82" y1="62" x2="130" y2="62" class="rxn-bond sigma"/>
          <line x1="82" y1="70" x2="130" y2="70" class="rxn-bond pi fade-out"/>
          <line x1="72" y1="58" x2="42" y2="42" class="rxn-bond form"/>
          <line x1="140" y1="58" x2="170" y2="42" class="rxn-bond form"/>
          <text x="28" y="40" class="rxn-formula">Br</text>
          <text x="174" y="40" class="rxn-formula">Br</text>
        </svg>`
      },
      {
        title: 'المشهد 5: الناتج',
        desc: 'الناتج هو 1,2-ثنائي بروموإيثان.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="66" y="42" class="rxn-formula">BrCH2-CH2Br</text>
          <line x1="110" y1="60" x2="158" y2="60" class="rxn-bond sigma"/>
          <line x1="98" y1="56" x2="70" y2="42" class="rxn-bond sigma"/>
          <line x1="170" y1="56" x2="198" y2="42" class="rxn-bond sigma"/>
          <text x="78" y="98" class="rxn-caption">إضافة كاملة على الرابطة المزدوجة</text>
        </svg>`
      },
      {
        title: 'المشهد 6: الخلاصة',
        desc: 'الكينات تتفاعل بالإضافة لأن رابطة π أضعف من σ.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="26" width="280" height="88" rx="12" class="rxn-summary-box"/>
          <text x="170" y="54" text-anchor="middle" class="rxn-summary">الرابطة π هي بوابة التفاعل</text>
          <text x="170" y="76" text-anchor="middle" class="rxn-summary-sub">ولهذا تفاعلات الإضافة مميزة للكينات</text>
        </svg>`
      }
    ]
  },
  {
    id: 'rxn_anim_2',
    titleAr: 'أكسدة كحول أولي: الإيثانول',
    equation: 'CH3CH2OH → CH3CHO → CH3COOH',
    reactantsAr: 'إيثانول',
    conditionsAr: 'K2Cr2O7/H2SO4 مع التحكم في التسخين',
    productAr: 'إيثانال ثم حمض إيثانويك',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'زيادة شدة/زمن الأكسدة تؤدي لاستمرار التحول من ألدهيد إلى حمض كربوكسيلي.',
    scenes: [
      {
        title: 'المشهد 1: المتفاعل',
        desc: 'نبدأ بالإيثانول كمثال على الكحول الأولي.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="68" y="54" class="rxn-formula">CH3CH2OH</text>
          <text x="70" y="92" class="rxn-caption">كحول أولي</text>
        </svg>`
      },
      {
        title: 'المشهد 2: المجموعة الفعالة',
        desc: 'نُبرز مجموعة -OH لأنها مركز التغير.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="62" y="54" class="rxn-formula">CH3CH2OH</text>
          <rect x="130" y="34" width="42" height="28" rx="8" class="rxn-highlight"/>
          <text x="66" y="94" class="rxn-caption">مجموعة الكحول تُستبدل تدريجيًا إلى C=O</text>
        </svg>`
      },
      {
        title: 'المشهد 3: إضافة العامل المؤكسد',
        desc: 'ثنائي الكرومات الحمضي يبدأ الأكسدة.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="40" y="54" class="rxn-formula">CH3CH2OH</text>
          <text x="150" y="54" class="rxn-op">+</text>
          <text x="178" y="54" class="rxn-formula move-left">[O]</text>
          <text x="46" y="92" class="rxn-caption">K2Cr2O7/H2SO4</text>
        </svg>`
      },
      {
        title: 'المشهد 4: ناتج وسيط',
        desc: 'الخطوة الأولى تعطي الإيثانال إذا أوقفنا الأكسدة مبكرًا.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="48" y="54" class="rxn-formula">CH3CHO</text>
          <text x="122" y="54" class="rxn-op">(تقطير سريع)</text>
          <text x="50" y="92" class="rxn-caption">يمكن عزل الألدهيد هنا</text>
        </svg>`
      },
      {
        title: 'المشهد 5: أكسدة مستمرة',
        desc: 'مع استمرار الأكسدة يتحول الألدهيد إلى حمض.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="42" y="54" class="rxn-formula">CH3CHO</text>
          <text x="118" y="54" class="rxn-op">→</text>
          <text x="144" y="54" class="rxn-formula">CH3COOH</text>
          <line x1="120" y1="60" x2="140" y2="60" class="rxn-bond form"/>
          <text x="44" y="92" class="rxn-caption">أكسدة أعمق = حمض كربوكسيلي</text>
        </svg>`
      },
      {
        title: 'المشهد 6: الخلاصة',
        desc: 'التحكم في الظروف هو المفتاح لاختيار الناتج.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <rect x="26" y="26" width="288" height="88" rx="12" class="rxn-summary-box"/>
          <text x="170" y="54" text-anchor="middle" class="rxn-summary">التقطير المبكر يحفظ الألدهيد</text>
          <text x="170" y="76" text-anchor="middle" class="rxn-summary-sub">والتسخين الأطول يعطي الحمض</text>
        </svg>`
      }
    ]
  },
  {
    id: 'rxn_anim_3',
    titleAr: 'الأسترة: حمض إيثانويك + إيثانول',
    equation: 'CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O',
    reactantsAr: 'حمض إيثانويك + إيثانول',
    conditionsAr: 'H2SO4 مركز + تسخين لطيف',
    productAr: 'إيثيل إيثانوات + ماء',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'وجود الحمض يساعد التفاعل، وسحب الماء يدفع الاتزان نحو تكوين الإستر.',
    scenes: [
      {
        title: 'المشهد 1: المتفاعلات',
        desc: 'حمض كربوكسيلي مع كحول في تفاعل عكسي.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="36" y="54" class="rxn-formula">CH3COOH</text>
          <text x="126" y="54" class="rxn-op">+</text>
          <text x="154" y="54" class="rxn-formula">C2H5OH</text>
          <text x="42" y="92" class="rxn-caption">تفاعل اتزاني</text>
        </svg>`
      },
      {
        title: 'المشهد 2: المجموعات النشطة',
        desc: 'نتابع -COOH من الحمض و-OH من الكحول.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="28" y="54" class="rxn-formula">CH3COOH</text>
          <rect x="88" y="34" width="46" height="28" rx="8" class="rxn-highlight"/>
          <text x="170" y="54" class="rxn-formula">C2H5OH</text>
          <rect x="238" y="34" width="44" height="28" rx="8" class="rxn-highlight"/>
        </svg>`
      },
      {
        title: 'المشهد 3: دور الحمض والحرارة',
        desc: 'الشرط يساعد على إعادة ترتيب الروابط.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="66" y="54" class="rxn-formula">CH3COOH + C2H5OH</text>
          <rect x="72" y="74" width="190" height="28" rx="10" class="rxn-summary-box"/>
          <text x="166" y="92" text-anchor="middle" class="rxn-summary-sub">H2SO4 (cat.) + Δ</text>
        </svg>`
      },
      {
        title: 'المشهد 4: تكوين رابطة جديدة',
        desc: 'يتكوّن جزء الإستر وتنفصل جزيئة ماء.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="36" y="54" class="rxn-formula">CH3COO-C2H5</text>
          <line x1="124" y1="60" x2="154" y2="60" class="rxn-bond form"/>
          <text x="198" y="54" class="rxn-op">+</text>
          <text x="220" y="54" class="rxn-formula">H2O</text>
          <circle cx="232" cy="86" r="5" class="rxn-water-drop"/>
        </svg>`
      },
      {
        title: 'المشهد 5: النواتج والاتزان',
        desc: 'النواتج تتكون لكن التفاعل عكسي.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <text x="28" y="54" class="rxn-formula">CH3COOH + C2H5OH</text>
          <text x="170" y="54" class="rxn-op">⇌</text>
          <text x="198" y="54" class="rxn-formula">CH3COOC2H5 + H2O</text>
          <text x="32" y="92" class="rxn-caption">سحب الماء يدعم الاتجاه نحو اليمين</text>
        </svg>`
      },
      {
        title: 'المشهد 6: الخلاصة',
        desc: 'الأسترة تعتمد على الاتزان والشرط التحفيزي.',
        svg: `<svg class="rxn-scene-svg" viewBox="0 0 340 150" xmlns="http://www.w3.org/2000/svg">
          <rect x="24" y="26" width="292" height="88" rx="12" class="rxn-summary-box"/>
          <text x="170" y="54" text-anchor="middle" class="rxn-summary">الحمض محفز وليس متفاعلًا أساسيًا</text>
          <text x="170" y="76" text-anchor="middle" class="rxn-summary-sub">والتحكم في الماء يحسن المحصول</text>
        </svg>`
      }
    ]
  }
];

const PLAY_STEP_MS = 2600;

const runtime = new Map();

function ensureRuntime(id) {
  if (!runtime.has(id)) {
    runtime.set(id, { currentScene: 0, isPlaying: false, timerId: null });
  }
  return runtime.get(id);
}

function getLessons() {
  return REACTION_LESSONS;
}

function getLessonById(id) {
  return REACTION_LESSONS.find(item => item.id === id) || null;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderLessonCard(lesson) {
  const scene = lesson.scenes[0];
  ensureRuntime(lesson.id);
  return `
    <article class="glass-card rxn-lesson-card fade-in" id="${lesson.id}" data-rxn-id="${lesson.id}">
      <header class="rxn-lesson-head">
        <div>
          <h3 class="rxn-lesson-title">${escapeHtml(lesson.titleAr)}</h3>
          <p class="rxn-lesson-eq">${escapeHtml(lesson.equation)}</p>
        </div>
        <span class="rxn-simplified-tag">${escapeHtml(lesson.simplifiedNoteAr)}</span>
      </header>

      <div class="rxn-lesson-meta">
        <div><strong>المتفاعلات:</strong> ${escapeHtml(lesson.reactantsAr)}</div>
        <div><strong>الشرط:</strong> ${escapeHtml(lesson.conditionsAr)}</div>
        <div><strong>الناتج:</strong> ${escapeHtml(lesson.productAr)}</div>
      </div>

      <div class="rxn-scene-wrap" data-rxn-scene-wrap="${lesson.id}">${scene.svg}</div>
      <div class="rxn-scene-info">
        <div class="rxn-scene-title" data-rxn-scene-title="${lesson.id}">${escapeHtml(scene.title)}</div>
        <div class="rxn-scene-desc" data-rxn-scene-desc="${lesson.id}">${escapeHtml(scene.desc)}</div>
      </div>
      <div class="rxn-scene-progress" data-rxn-scene-progress="${lesson.id}">المشهد 1 من ${lesson.scenes.length}</div>

      <div class="rxn-lesson-controls">
        <button class="rxn-ctrl-btn" data-action="rxn-play" data-anim-id="${lesson.id}">تشغيل</button>
        <button class="rxn-ctrl-btn" data-action="rxn-pause" data-anim-id="${lesson.id}">إيقاف مؤقت</button>
        <button class="rxn-ctrl-btn" data-action="rxn-next-step" data-anim-id="${lesson.id}">خطوة تالية</button>
        <button class="rxn-ctrl-btn" data-action="rxn-restart" data-anim-id="${lesson.id}">إعادة</button>
      </div>

      <div class="rxn-lesson-why"><strong>لماذا يحدث هذا؟</strong> ${escapeHtml(lesson.whyAr)}</div>
    </article>
  `;
}

function renderScene(lessonId) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return;
  const state = ensureRuntime(lessonId);
  const scene = lesson.scenes[state.currentScene];
  const wrap = document.querySelector(`[data-rxn-scene-wrap="${lessonId}"]`);
  const title = document.querySelector(`[data-rxn-scene-title="${lessonId}"]`);
  const desc = document.querySelector(`[data-rxn-scene-desc="${lessonId}"]`);
  const progress = document.querySelector(`[data-rxn-scene-progress="${lessonId}"]`);
  if (!wrap || !title || !desc || !progress) return;

  wrap.classList.remove('scene-enter');
  wrap.innerHTML = scene.svg;
  title.textContent = scene.title;
  desc.textContent = scene.desc;
  progress.textContent = `المشهد ${state.currentScene + 1} من ${lesson.scenes.length}`;
  void wrap.offsetWidth;
  wrap.classList.add('scene-enter');
}

function stopTimer(state) {
  if (state.timerId) {
    clearTimeout(state.timerId);
    state.timerId = null;
  }
}

function queueNext(lessonId) {
  const lesson = getLessonById(lessonId);
  const state = ensureRuntime(lessonId);
  if (!lesson || !state.isPlaying) return;

  state.timerId = setTimeout(() => {
    if (!state.isPlaying) return;
    if (state.currentScene >= lesson.scenes.length - 1) {
      state.isPlaying = false;
      state.timerId = null;
      return;
    }
    state.currentScene += 1;
    renderScene(lessonId);
    queueNext(lessonId);
  }, PLAY_STEP_MS);
}

function playReaction(lessonId) {
  const state = ensureRuntime(lessonId);
  stopTimer(state);
  state.isPlaying = true;
  queueNext(lessonId);
}

function pauseReaction(lessonId) {
  const state = ensureRuntime(lessonId);
  state.isPlaying = false;
  stopTimer(state);
}

function nextReactionStep(lessonId) {
  const lesson = getLessonById(lessonId);
  const state = ensureRuntime(lessonId);
  if (!lesson) return;
  pauseReaction(lessonId);
  if (state.currentScene < lesson.scenes.length - 1) state.currentScene += 1;
  renderScene(lessonId);
}

function restartReaction(lessonId) {
  const state = ensureRuntime(lessonId);
  pauseReaction(lessonId);
  state.currentScene = 0;
  renderScene(lessonId);
}

function stopAll() {
  runtime.forEach(state => {
    state.isPlaying = false;
    stopTimer(state);
  });
}

const ReactionPlayer = {
  getLessons,
  renderLessonCard,
  playReaction,
  pauseReaction,
  nextReactionStep,
  restartReaction,
  stopAll,
};

export { ReactionPlayer };
