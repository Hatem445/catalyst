'use strict';

const PLAY_STEP_MS = 3200;

const REACTION_LESSONS = [
  {
    id: 'rxn_anim_1',
    titleAr: 'إضافة Br2 على الإيثين',
    equation: 'C2H4 + Br2 → C2H4Br2',
    reactantsAr: 'الإيثين + البروم',
    conditionsAr: 'وسط خامل (مثل CCl4) دون ماء',
    productAr: '1,2-ثنائي بروموإيثان',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'إلكترونات π في الرابطة المزدوجة أسهل في إعادة التوزيع، لذلك تبدأ منها الإضافة.',
    scenes: [
      {
        title: 'المشهد 1: المتفاعلات',
        explanation: 'نبدأ بألكين ورابطة مزدوجة مع جزيء بروم.',
        reactants: ['C2H4', 'Br2'],
        arrowLabel: '+',
        condition: 'قبل بدء التفاعل',
        products: ['لا يوجد ناتج بعد'],
        takeaway: 'التفاعل يبدأ من رابطة C=C.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 2: تنشيط الكاشف',
        explanation: 'الرابطة π تنجذب للبروم وتُسهل استقطابه.',
        reactants: ['C2H4 (π نشطة)', 'Br2 (قابل للاستقطاب)'],
        arrowLabel: '→',
        condition: 'اصطدام فعّال',
        products: ['بداية كسر π'],
        takeaway: 'التركيز هنا على الرابطة π.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 3: اقتراب البروم',
        explanation: 'يقترب Br2 من الرابطة المزدوجة في مسار الإضافة.',
        reactants: ['C2H4', 'Br2 (الكاشف)'],
        arrowLabel: '→',
        condition: 'وسط غير قطبي',
        products: ['حالة انتقال مبسطة'],
        takeaway: 'الكاشف المناسب شرط أساسي.',
        highlightTarget: 'reagent',
      },
      {
        title: 'المشهد 4: تكوين روابط جديدة',
        explanation: 'تختفي π تدريجيًا وتتكوّن روابط C-Br.',
        reactants: ['C2H4 + Br2'],
        arrowLabel: '⇒',
        condition: 'إضافة كهربية مبسطة',
        products: ['C2H4Br2 (قيد التكوين)'],
        takeaway: 'إضافة كاملة على الرابطة المزدوجة.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 5: الناتج',
        explanation: 'الناتج النهائي مشبع ولا يحتوي C=C.',
        reactants: ['C2H4 + Br2'],
        arrowLabel: '→',
        condition: 'اكتمال التفاعل',
        products: ['C2H4Br2'],
        takeaway: 'اختفاء عدم الإشباع علامة مهمة.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 6: الخلاصة',
        explanation: 'ملخص: الرابطة π هي بوابة تفاعلات الإضافة في الألكينات.',
        reactants: ['الرابطة π'],
        arrowLabel: '⇢',
        condition: 'قاعدة فهم',
        products: ['تكوين روابط σ جديدة'],
        takeaway: 'C2H4 + Br2 → C2H4Br2',
        highlightTarget: 'none',
      },
    ],
  },
  {
    id: 'rxn_anim_2',
    titleAr: 'أكسدة الإيثانول',
    equation: 'C2H5OH → CH3CHO → CH3COOH',
    reactantsAr: 'إيثانول (كحول أولي)',
    conditionsAr: 'K2Cr2O7 / H2SO4 مع ضبط زمن التسخين',
    productAr: 'إيثانال ثم حمض إيثانويك',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'التحكم في زمن وشدة الأكسدة يحدد التوقف عند الألدهيد أو الاستمرار إلى الحمض.',
    scenes: [
      {
        title: 'المشهد 1: البداية',
        explanation: 'الإيثانول كحول أولي قابل للأكسدة التدريجية.',
        reactants: ['C2H5OH'],
        arrowLabel: '→',
        condition: 'قبل الأكسدة',
        products: ['هدف: CH3CHO ثم CH3COOH'],
        takeaway: 'نوع الكحول يحدد المسار.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 2: إضافة العامل المؤكسد',
        explanation: 'نضيف العامل المؤكسد في وسط حمضي.',
        reactants: ['C2H5OH', '[O]'],
        arrowLabel: '→',
        condition: 'K2Cr2O7/H2SO4',
        products: ['بدء التحول'],
        takeaway: 'الشرط الكيميائي هو الأساس.',
        highlightTarget: 'condition',
      },
      {
        title: 'المشهد 3: التوقف عند الألدهيد',
        explanation: 'بالتقطير المبكر نحصل على الإيثانال.',
        reactants: ['C2H5OH'],
        arrowLabel: '→',
        condition: 'تقطير سريع',
        products: ['CH3CHO'],
        takeaway: 'التحكم الزمني يحمي الألدهيد.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 4: أكسدة إضافية',
        explanation: 'استمرار الأكسدة يحول الألدهيد إلى حمض.',
        reactants: ['CH3CHO', '[O]'],
        arrowLabel: '→',
        condition: 'تسخين أطول',
        products: ['CH3COOH'],
        takeaway: 'زيادة الأكسدة = حمض كربوكسيلي.',
        highlightTarget: 'condition',
      },
      {
        title: 'المشهد 5: المقارنة',
        explanation: 'نفس البداية ولكن الناتج يعتمد على ظروف التشغيل.',
        reactants: ['C2H5OH'],
        arrowLabel: '↔',
        condition: 'زمن أقل / زمن أكبر',
        products: ['CH3CHO أو CH3COOH'],
        takeaway: 'الظروف العملية تحدد المنتج.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 6: الخلاصة',
        explanation: 'المسار تدريجي وليس خطوة واحدة.',
        reactants: ['C2H5OH'],
        arrowLabel: '→',
        condition: 'أكسدة على مرحلتين',
        products: ['CH3CHO → CH3COOH'],
        takeaway: 'توقف مبكرًا للألدهيد واستمر للحصول على الحمض.',
        highlightTarget: 'none',
      },
    ],
  },
  {
    id: 'rxn_anim_3',
    titleAr: 'الأسترة (حمض + كحول)',
    equation: 'CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O',
    reactantsAr: 'حمض إيثانويك + إيثانول',
    conditionsAr: 'H2SO4 مركز (حفاز) مع تسخين لطيف',
    productAr: 'إيثيل إيثانوات + ماء',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'الأسترة تفاعل اتزاني؛ إزالة الماء تدفع الاتجاه نحو تكوين الإستر.',
    scenes: [
      {
        title: 'المشهد 1: المتفاعلات',
        explanation: 'حمض كربوكسيلي + كحول هما قاعدة الأسترة.',
        reactants: ['CH3COOH', 'C2H5OH'],
        arrowLabel: '+',
        condition: 'قبل التسخين',
        products: ['لا يوجد ناتج بعد'],
        takeaway: 'وجود -COOH و -OH ضروري.',
        highlightTarget: 'reagent',
      },
      {
        title: 'المشهد 2: دور الحفاز',
        explanation: 'الحمض المركز يسرّع إعادة ترتيب الروابط.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '→',
        condition: 'H2SO4 (حفاز) + Δ',
        products: ['تفاعل أسرع'],
        takeaway: 'الحفاز يسرّع ولا يُستهلك.',
        highlightTarget: 'condition',
      },
      {
        title: 'المشهد 3: تكوين الإستر',
        explanation: 'تتكوّن رابطة الإستر ويخرج ماء.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '⇌',
        condition: 'وسط حمضي',
        products: ['CH3COOC2H5', 'H2O'],
        takeaway: 'النواتج تظهر معًا (إستر + ماء).',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 4: الاتزان',
        explanation: 'التفاعل قابل للعكس في الاتجاهين.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '⇌',
        condition: 'اتزان ديناميكي',
        products: ['CH3COOC2H5 + H2O'],
        takeaway: 'العائد لا يصل 100% تلقائيًا.',
        highlightTarget: 'condition',
      },
      {
        title: 'المشهد 5: رفع المحصول',
        explanation: 'إزالة الماء تدفع الاتزان للأمام.',
        reactants: ['سحب H2O'],
        arrowLabel: '→',
        condition: 'مبدأ لوشاتيليه',
        products: ['زيادة CH3COOC2H5'],
        takeaway: 'التحكم الاتزاني مهارة تطبيقية.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 6: الخلاصة',
        explanation: 'الأسترة تفاعل اتزاني محفز حمضيًا.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '⇌',
        condition: 'H2SO4 + تسخين',
        products: ['CH3COOC2H5 + H2O'],
        takeaway: 'إزالة الماء تدعم تكوين الإستر.',
        highlightTarget: 'none',
      },
    ],
  },
];

const runtime = new Map();

function ensureRuntime(id) {
  if (!runtime.has(id)) runtime.set(id, { currentScene: 0, isPlaying: false, timerId: null });
  return runtime.get(id);
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stopTimer(state) {
  if (!state.timerId) return;
  clearTimeout(state.timerId);
  state.timerId = null;
}

function renderFormulaBoxes(items, highlightMode, activeTarget) {
  const arr = Array.isArray(items) ? items : [];
  if (!arr.length) return '<div class="rxn-formula-box">—</div>';
  return arr.map((item, idx) => {
    const isActive = activeTarget && highlightMode === activeTarget;
    const cls = isActive ? 'rxn-formula-box rxn-highlight' : 'rxn-formula-box';
    return `<div class="${cls}">${escapeHtml(item)}</div>${idx < arr.length - 1 ? '<div class="rxn-inline-sep">+</div>' : ''}`;
  }).join('');
}

function sceneMarkup(scene, idx, total) {
  const target = scene.highlightTarget || 'none';
  const conditionCls = target === 'condition' ? 'rxn-arrow-box rxn-highlight' : 'rxn-arrow-box';
  const productRowCls = target === 'product' ? 'rxn-equation-grid rxn-highlight-row' : 'rxn-equation-grid';

  return `
    <section class="rxn-stage scene-enter" aria-label="${escapeHtml(scene.title)}">
      <div class="rxn-stage-progress">المشهد ${idx + 1} من ${total}</div>
      <h4 class="rxn-scene-title">${escapeHtml(scene.title)}</h4>
      <p class="rxn-explanation">${escapeHtml(scene.explanation)}</p>

      <div class="rxn-equation-grid">
        <div class="rxn-row-label">المتفاعلات</div>
        <div class="rxn-row-formulas">
          ${renderFormulaBoxes(scene.reactants, 'reagent', target)}
        </div>
      </div>

      <div class="rxn-equation-grid">
        <div class="rxn-row-label">السهم والشرط</div>
        <div class="rxn-row-formulas">
          <div class="${conditionCls}">${escapeHtml(scene.arrowLabel || '→')}</div>
          <div class="rxn-condition-text ${target === 'condition' ? 'rxn-highlight' : ''}">${escapeHtml(scene.condition)}</div>
        </div>
      </div>

      <div class="${productRowCls}">
        <div class="rxn-row-label">الناتج</div>
        <div class="rxn-row-formulas">
          ${renderFormulaBoxes(scene.products, 'product', target)}
        </div>
      </div>

      <div class="rxn-takeaway ${target === 'bond' ? 'rxn-highlight' : ''}">
        <span>الخلاصة:</span> ${escapeHtml(scene.takeaway)}
      </div>
    </section>
  `;
}

function renderLessonCard(lesson) {
  const state = ensureRuntime(lesson.id);
  state.isPlaying = false;
  stopTimer(state);
  state.currentScene = 0;

  const first = lesson.scenes[0];
  return `
    <article class="glass-card rxn-card fade-in" id="${lesson.id}" data-rxn-id="${lesson.id}">
      <header class="rxn-card-head">
        <div class="rxn-card-title-wrap">
          <h3 class="rxn-card-title">${escapeHtml(lesson.titleAr)}</h3>
          <p class="rxn-card-equation">${escapeHtml(lesson.equation)}</p>
        </div>
        <span class="rxn-card-note">${escapeHtml(lesson.simplifiedNoteAr)}</span>
      </header>

      <div class="rxn-card-meta">
        <div><strong>المتفاعلات:</strong> ${escapeHtml(lesson.reactantsAr)}</div>
        <div><strong>الشرط:</strong> ${escapeHtml(lesson.conditionsAr)}</div>
        <div><strong>الناتج:</strong> ${escapeHtml(lesson.productAr)}</div>
      </div>

      <div data-rxn-scene-wrap="${lesson.id}">
        ${sceneMarkup(first, 0, lesson.scenes.length)}
      </div>

      <div class="rxn-controls">
        <button class="rxn-ctrl-btn" data-action="rxn-play" data-anim-id="${lesson.id}">تشغيل</button>
        <button class="rxn-ctrl-btn" data-action="rxn-pause" data-anim-id="${lesson.id}">إيقاف مؤقت</button>
        <button class="rxn-ctrl-btn" data-action="rxn-next-step" data-anim-id="${lesson.id}">خطوة تالية</button>
        <button class="rxn-ctrl-btn" data-action="rxn-restart" data-anim-id="${lesson.id}">إعادة</button>
      </div>

      <p class="rxn-why"><strong>لماذا يحدث هذا؟</strong> ${escapeHtml(lesson.whyAr)}</p>
    </article>
  `;
}

function renderScene(lessonId) {
  const lesson = REACTION_LESSONS.find(x => x.id === lessonId);
  if (!lesson) return;
  const state = ensureRuntime(lessonId);
  const scene = lesson.scenes[state.currentScene];
  const wrap = document.querySelector(`[data-rxn-scene-wrap="${lessonId}"]`);
  if (!wrap || !scene) return;
  wrap.innerHTML = sceneMarkup(scene, state.currentScene, lesson.scenes.length);
}

function queueNext(lessonId) {
  const lesson = REACTION_LESSONS.find(x => x.id === lessonId);
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
  const lesson = REACTION_LESSONS.find(x => x.id === lessonId);
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
  getLessons() { return REACTION_LESSONS; },
  renderLessonCard,
  playReaction,
  pauseReaction,
  nextReactionStep,
  restartReaction,
  stopAll,
};

export { ReactionPlayer };
