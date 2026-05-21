'use strict';

const PLAY_STEP_MS = 3200;

const REACTION_LESSONS = [
  {
    id: 'rxn_anim_1',
    key: 'alkene_addition',
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
        title: 'المشهد 2: تنشيط الرابطة',
        explanation: 'يتم إبراز الرابطة المزدوجة C=C كموقع نشط.',
        reactants: ['C2H4 (π نشطة)', 'Br2'],
        arrowLabel: '→',
        condition: 'الرابطة المزدوجة محور التفاعل',
        products: ['بداية استعداد للإضافة'],
        takeaway: 'إبراز π يوضح سبب النشاط.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 3: اقتراب الكاشف',
        explanation: 'يقترب Br2 من الرابطة المزدوجة.',
        reactants: ['C2H4', 'Br2 (مقترب)'],
        arrowLabel: '→',
        condition: 'اصطدام فعّال',
        products: ['حالة انتقال مبسطة'],
        takeaway: 'الكاشف المناسب شرط أساسي.',
        highlightTarget: 'reagent',
      },
      {
        title: 'المشهد 4: كسر/تكوين روابط',
        explanation: 'تضعف رابطة Br-Br وتبدأ روابط C-Br في التكوّن.',
        reactants: ['C2H4 + Br2'],
        arrowLabel: '⇒',
        condition: 'إضافة كهربية مبسطة',
        products: ['C2H4Br2 قيد التكوين'],
        takeaway: 'اختفاء π وتكوين روابط جديدة.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 5: الناتج',
        explanation: 'يتكوّن الناتج النهائي عبر الإضافة على الرابطة المزدوجة.',
        reactants: ['C2H4 + Br2'],
        arrowLabel: '→',
        condition: 'اكتمال التفاعل',
        products: ['C2H4Br2'],
        takeaway: 'الناتج مشبع ولا يحتوي C=C.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 6: الخلاصة',
        explanation: 'قاعدة مهمة: الرابطة π هي بوابة تفاعلات الإضافة في الألكينات.',
        reactants: ['الرابطة π'],
        arrowLabel: '⇢',
        condition: 'قاعدة فهم',
        products: ['روابط σ جديدة'],
        takeaway: 'C2H4 + Br2 → C2H4Br2',
        highlightTarget: 'none',
      },
    ],
  },
  {
    id: 'rxn_anim_2',
    key: 'ethanol_oxidation',
    titleAr: 'أكسدة الإيثانول',
    equation: 'C2H5OH → CH3CHO → CH3COOH',
    reactantsAr: 'إيثانول (كحول أولي)',
    conditionsAr: 'K2Cr2O7 / H2SO4 مع ضبط زمن التسخين',
    productAr: 'إيثانال ثم حمض إيثانويك',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'التحكم في زمن وشدة الأكسدة يحدد التوقف عند الألدهيد أو الاستمرار إلى الحمض.',
    scenes: [
      {
        title: 'المشهد 1: المتفاعل الأساسي',
        explanation: 'نبدأ من الإيثانول ككحول أولي.',
        reactants: ['C2H5OH'],
        arrowLabel: '→',
        condition: 'قبل الأكسدة',
        products: ['هدف: CH3CHO ثم CH3COOH'],
        takeaway: 'مجموعة -OH هي موضع التغير.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 2: تمييز المجموعة',
        explanation: 'إبراز -OH قبل إدخال العامل المؤكسد.',
        reactants: ['C2H5OH (-OH)'],
        arrowLabel: '→',
        condition: 'التركيز على المجموعة الوظيفية',
        products: ['تمهيد الأكسدة'],
        takeaway: 'فهم المجموعة يسهّل تتبع التغير.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 3: إضافة العامل المؤكسد',
        explanation: 'يظهر [O] مع الوسط الحمضي.',
        reactants: ['C2H5OH', '[O]'],
        arrowLabel: '→',
        condition: 'K2Cr2O7 / H2SO4',
        products: ['بدء التحول'],
        takeaway: 'الشرط الكيميائي هو الأساس.',
        highlightTarget: 'condition',
      },
      {
        title: 'المشهد 4: ناتج وسيط',
        explanation: 'المرحلة الأولى تعطي الإيثانال CH3CHO.',
        reactants: ['C2H5OH'],
        arrowLabel: '→',
        condition: 'أكسدة أولى',
        products: ['CH3CHO'],
        takeaway: 'يمكن التوقف هنا بالتقطير المبكر.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 5: أكسدة إضافية',
        explanation: 'استمرار الأكسدة يعطي الحمض CH3COOH.',
        reactants: ['CH3CHO', '[O]'],
        arrowLabel: '→',
        condition: 'تسخين أطول',
        products: ['CH3COOH'],
        takeaway: 'زيادة الأكسدة = حمض كربوكسيلي.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 6: الخلاصة',
        explanation: 'الأكسدة هنا تدريجية على خطوتين.',
        reactants: ['C2H5OH'],
        arrowLabel: '→',
        condition: 'ضبط الزمن مهم',
        products: ['CH3CHO → CH3COOH'],
        takeaway: 'توقف مبكرًا للألدهيد، واستمر للحصول على الحمض.',
        highlightTarget: 'none',
      },
    ],
  },
  {
    id: 'rxn_anim_3',
    key: 'esterification',
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
        explanation: 'حمض كربوكسيلي + كحول كبداية للأسترة.',
        reactants: ['CH3COOH', 'C2H5OH'],
        arrowLabel: '+',
        condition: 'قبل التسخين',
        products: ['لا يوجد ناتج بعد'],
        takeaway: 'وجود -COOH و -OH ضروري.',
        highlightTarget: 'reagent',
      },
      {
        title: 'المشهد 2: تمييز المجموعات',
        explanation: 'إبراز -COOH من الحمض و -OH من الكحول.',
        reactants: ['CH3COOH (-COOH)', 'C2H5OH (-OH)'],
        arrowLabel: '→',
        condition: 'المجموعات الفعالة',
        products: ['تهيئة للتفاعل'],
        takeaway: 'هذه المجموعات تُبنى منها رابطة الإستر.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 3: الشرط والتحفيز',
        explanation: 'يظهر الشرط H2SO4 + Δ.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '⇌',
        condition: 'H2SO4 (حفاز) + تسخين',
        products: ['بدء تكوين النواتج'],
        takeaway: 'الحفاز يزيد السرعة ولا يُستهلك.',
        highlightTarget: 'condition',
      },
      {
        title: 'المشهد 4: خروج الماء',
        explanation: 'تتكون جزيئة ماء H2O أثناء إعادة ترتيب الروابط.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '⇌',
        condition: 'وسط حمضي',
        products: ['CH3COOC2H5 + H2O'],
        takeaway: 'خروج الماء جزء أساسي من الأسترة.',
        highlightTarget: 'bond',
      },
      {
        title: 'المشهد 5: تكوين الإستر',
        explanation: 'تظهر رابطة الإستر بوضوح في الناتج.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '⇌',
        condition: 'اتزان',
        products: ['CH3COOC2H5', 'H2O'],
        takeaway: 'الناتج إستر + ماء في تفاعل عكسي.',
        highlightTarget: 'product',
      },
      {
        title: 'المشهد 6: الخلاصة',
        explanation: 'الأسترة تفاعل اتزاني محفز حمضيًا.',
        reactants: ['CH3COOH + C2H5OH'],
        arrowLabel: '⇌',
        condition: 'إزالة الماء تحسن الناتج',
        products: ['CH3COOC2H5 + H2O'],
        takeaway: 'سحب H2O يدعم تكوين الإستر.',
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

function stopTimer(state) {
  if (!state.timerId) return;
  clearTimeout(state.timerId);
  state.timerId = null;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderAlkeneVisual(step) {
  const s = step + 1;
  const showApproach = s >= 3;
  const showBreak = s >= 4;
  const showProduct = s >= 5;
  const bondCls = s === 2 || s === 4 ? 'rxn-v-bond rxn-v-active' : 'rxn-v-bond';
  const brBondCls = showBreak ? 'rxn-v-bond rxn-v-fade' : 'rxn-v-bond';

  return `
    <svg class="rxn-visual-svg" viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" aria-label="تصور تعليمي مبسط لإضافة البروم">
      <text class="rxn-v-label" x="18" y="18">تصور تعليمي مبسط</text>
      <text class="rxn-v-formula" x="52" y="84">C=C</text>
      <line class="${bondCls}" x1="68" y1="90" x2="106" y2="90"/>
      <line class="${bondCls}" x1="68" y1="96" x2="106" y2="96"/>

      <g class="${showApproach ? 'rxn-v-move-in' : ''}">
        <text class="rxn-v-formula" x="${showApproach ? '144' : '210'}" y="84">Br-Br</text>
        <line class="${brBondCls}" x1="${showApproach ? '158' : '224'}" y1="90" x2="${showApproach ? '188' : '254'}" y2="90"/>
      </g>

      <line class="rxn-v-arrow ${s >= 3 ? 'rxn-v-draw' : ''}" x1="112" y1="92" x2="142" y2="92"/>

      ${showBreak ? `<line class="rxn-v-bond rxn-v-new" x1="92" y1="86" x2="128" y2="70"/><line class="rxn-v-bond rxn-v-new" x1="82" y1="101" x2="118" y2="117"/>` : ''}
      ${showProduct ? '<text class="rxn-v-formula rxn-v-product" x="198" y="84">C2H4Br2</text>' : ''}
    </svg>
  `;
}

function renderOxidationVisual(step) {
  const s = step + 1;
  const showO = s >= 3;
  const showAldehyde = s >= 4;
  const showAcid = s >= 5;
  const ohCls = s === 2 ? 'rxn-v-tag rxn-v-active' : 'rxn-v-tag';

  return `
    <svg class="rxn-visual-svg" viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" aria-label="تصور تعليمي مبسط لأكسدة الإيثانول">
      <text class="rxn-v-label" x="18" y="18">تصور تعليمي مبسط</text>
      <text class="rxn-v-formula" x="24" y="78">C2H5OH</text>
      <rect class="${ohCls}" x="82" y="58" width="28" height="24" rx="6"/>

      ${showO ? '<text class="rxn-v-formula rxn-v-move-in" x="128" y="78">[O]</text>' : ''}
      <line class="rxn-v-arrow ${s >= 3 ? 'rxn-v-draw' : ''}" x1="112" y1="74" x2="156" y2="74"/>
      ${showAldehyde ? '<text class="rxn-v-formula rxn-v-product" x="164" y="78">CH3CHO</text>' : ''}

      <line class="rxn-v-arrow ${s >= 5 ? 'rxn-v-draw' : ''}" x1="226" y1="74" x2="270" y2="74"/>
      ${showAcid ? '<text class="rxn-v-formula rxn-v-product" x="278" y="78">CH3COOH</text>' : ''}
    </svg>
  `;
}

function renderEsterVisual(step) {
  const s = step + 1;
  const showGroups = s >= 2;
  const showCond = s >= 3;
  const showWater = s >= 4;
  const showProduct = s >= 5;

  return `
    <svg class="rxn-visual-svg" viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg" aria-label="تصور تعليمي مبسط للأسترة">
      <text class="rxn-v-label" x="18" y="18">تصور تعليمي مبسط</text>
      <text class="rxn-v-formula" x="20" y="78">CH3COOH</text>
      <text class="rxn-v-formula" x="108" y="78">+</text>
      <text class="rxn-v-formula" x="126" y="78">C2H5OH</text>

      ${showGroups ? '<rect class="rxn-v-tag rxn-v-active" x="62" y="58" width="42" height="24" rx="6"/><rect class="rxn-v-tag rxn-v-active" x="168" y="58" width="30" height="24" rx="6"/>' : ''}
      <line class="rxn-v-arrow ${s >= 3 ? 'rxn-v-draw' : ''}" x1="208" y1="74" x2="248" y2="74"/>
      ${showCond ? '<text class="rxn-v-cond rxn-v-pulse" x="202" y="102">H2SO4 + Δ</text>' : ''}

      ${showProduct ? '<text class="rxn-v-formula rxn-v-product" x="256" y="78">CH3COOC2H5</text>' : ''}
      ${showWater ? '<text class="rxn-v-formula rxn-v-water" x="276" y="112">+ H2O</text>' : ''}
      ${s >= 4 ? '<text class="rxn-v-eq" x="230" y="78">⇌</text>' : ''}
    </svg>
  `;
}

function renderVisualPanel(lessonKey, step) {
  let content = '';
  if (lessonKey === 'alkene_addition') content = renderAlkeneVisual(step);
  if (lessonKey === 'ethanol_oxidation') content = renderOxidationVisual(step);
  if (lessonKey === 'esterification') content = renderEsterVisual(step);
  return `<div class="rxn-visual-panel">${content}</div>`;
}

function renderFormulaBoxes(items, highlightMode, activeTarget) {
  const arr = Array.isArray(items) ? items : [];
  if (!arr.length) return '<div class="rxn-formula-box"><span class="rxn-ltr">—</span></div>';
  return arr.map((item, idx) => {
    const isActive = activeTarget && highlightMode === activeTarget;
    const cls = isActive ? 'rxn-formula-box rxn-highlight' : 'rxn-formula-box';
    return `<div class="${cls}"><span class="rxn-ltr">${escapeHtml(item)}</span></div>${idx < arr.length - 1 ? '<div class="rxn-inline-sep">+</div>' : ''}`;
  }).join('');
}

function sceneMarkup(lesson, scene, idx, total) {
  const target = scene.highlightTarget || 'none';
  const conditionCls = target === 'condition' ? 'rxn-arrow-box rxn-highlight' : 'rxn-arrow-box';
  const productRowCls = target === 'product' ? 'rxn-equation-grid rxn-highlight-row' : 'rxn-equation-grid';

  return `
    <section class="rxn-stage scene-enter" aria-label="${escapeHtml(scene.title)}">
      <div class="rxn-stage-progress">المشهد ${idx + 1} من ${total}</div>
      <h4 class="rxn-scene-title">${escapeHtml(scene.title)}</h4>

      ${renderVisualPanel(lesson.key, idx)}

      <p class="rxn-explanation">${escapeHtml(scene.explanation)}</p>

      <div class="rxn-equation-grid">
        <div class="rxn-row-label">المتفاعلات</div>
        <div class="rxn-row-formulas">
          ${renderFormulaBoxes(scene.reactants, 'reagent', target)}
        </div>
      </div>

      <div class="rxn-equation-grid">
        <div class="rxn-row-label">الشرط</div>
        <div class="rxn-row-formulas">
          <div class="${conditionCls}"><span class="rxn-ltr">${escapeHtml(scene.arrowLabel || '→')}</span></div>
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
        <span>الفكرة:</span> ${escapeHtml(scene.takeaway)}
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
          <p class="rxn-card-equation"><span class="rxn-ltr">${escapeHtml(lesson.equation)}</span></p>
        </div>
        <span class="rxn-card-note">${escapeHtml(lesson.simplifiedNoteAr)}</span>
      </header>

      <div class="rxn-card-meta">
        <div><strong>المتفاعلات:</strong> <span class="rxn-ltr">${escapeHtml(lesson.reactantsAr)}</span></div>
        <div><strong>الشرط:</strong> ${escapeHtml(lesson.conditionsAr)}</div>
        <div><strong>الناتج:</strong> <span class="rxn-ltr">${escapeHtml(lesson.productAr)}</span></div>
      </div>

      <div data-rxn-scene-wrap="${lesson.id}">
        ${sceneMarkup(lesson, first, 0, lesson.scenes.length)}
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
  wrap.innerHTML = sceneMarkup(lesson, scene, state.currentScene, lesson.scenes.length);
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
