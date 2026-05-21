'use strict';

const PLAY_STEP_MS = 3200;

const REACTION_LESSONS = [
  {
    id: 'rxn_anim_1',
    key: 'alkene-addition',
    titleAr: 'إضافة Br2 على الإيثين',
    equation: 'C2H4 + Br2 → C2H4Br2',
    reactantsAr: 'الإيثين + البروم',
    conditionsAr: 'وسط خامل (مثل CCl4) دون ماء',
    productAr: '1,2-ثنائي بروموإيثان',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'إلكترونات π في الرابطة المزدوجة أسهل في إعادة التوزيع، لذلك تبدأ منها الإضافة.',
    scenes: [
      { title:'المشهد 1: المتفاعلات', explanation:'نبدأ بألكين مع جزيء بروم.', reactants:['C2H4','Br2'], arrowLabel:'+', condition:'قبل بدء التفاعل', products:['لا يوجد ناتج بعد'], takeaway:'التفاعل يبدأ من رابطة C=C.', highlightTarget:'bond' },
      { title:'المشهد 2: تنشيط الرابطة', explanation:'إبراز الرابطة المزدوجة C=C كموقع نشط.', reactants:['C2H4 (π نشطة)','Br2'], arrowLabel:'→', condition:'الرابطة المزدوجة محور التفاعل', products:['بداية استعداد للإضافة'], takeaway:'إبراز π يوضح سبب النشاط.', highlightTarget:'bond' },
      { title:'المشهد 3: اقتراب الكاشف', explanation:'يقترب Br2 من الرابطة المزدوجة.', reactants:['C2H4','Br2 (مقترب)'], arrowLabel:'→', condition:'اصطدام فعّال', products:['حالة انتقال مبسطة'], takeaway:'الكاشف المناسب شرط أساسي.', highlightTarget:'reagent' },
      { title:'المشهد 4: كسر/تكوين روابط', explanation:'تضعف رابطة Br-Br وتبدأ روابط C-Br في التكوّن.', reactants:['C2H4 + Br2'], arrowLabel:'⇒', condition:'إضافة كهربية مبسطة', products:['C2H4Br2 قيد التكوين'], takeaway:'اختفاء π وتكوين روابط جديدة.', highlightTarget:'bond' },
      { title:'المشهد 5: الناتج', explanation:'يتكوّن الناتج النهائي عبر الإضافة.', reactants:['C2H4 + Br2'], arrowLabel:'→', condition:'اكتمال التفاعل', products:['C2H4Br2'], takeaway:'الناتج مشبع ولا يحتوي C=C.', highlightTarget:'product' },
      { title:'المشهد 6: الخلاصة', explanation:'قاعدة مهمة: الرابطة π هي بوابة الإضافة.', reactants:['الرابطة π'], arrowLabel:'⇢', condition:'قاعدة فهم', products:['روابط σ جديدة'], takeaway:'C2H4 + Br2 → C2H4Br2', highlightTarget:'none' },
    ],
  },
  {
    id: 'rxn_anim_2',
    key: 'ethanol-oxidation',
    titleAr: 'أكسدة الإيثانول',
    equation: 'C2H5OH → CH3CHO → CH3COOH',
    reactantsAr: 'إيثانول (كحول أولي)',
    conditionsAr: 'K2Cr2O7 / H2SO4 مع ضبط زمن التسخين',
    productAr: 'إيثانال ثم حمض إيثانويك',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'التحكم في زمن وشدة الأكسدة يحدد التوقف عند الألدهيد أو الاستمرار إلى الحمض.',
    scenes: [
      { title:'المشهد 1: المتفاعل الأساسي', explanation:'نبدأ من الإيثانول ككحول أولي.', reactants:['C2H5OH'], arrowLabel:'→', condition:'قبل الأكسدة', products:['هدف: CH3CHO ثم CH3COOH'], takeaway:'مجموعة -OH هي موضع التغير.', highlightTarget:'bond' },
      { title:'المشهد 2: تمييز المجموعة', explanation:'إبراز -OH قبل إدخال العامل المؤكسد.', reactants:['C2H5OH (-OH)'], arrowLabel:'→', condition:'التركيز على المجموعة الوظيفية', products:['تمهيد الأكسدة'], takeaway:'فهم المجموعة يسهّل تتبع التغير.', highlightTarget:'bond' },
      { title:'المشهد 3: إضافة العامل المؤكسد', explanation:'يظهر [O] مع الوسط الحمضي.', reactants:['C2H5OH','[O]'], arrowLabel:'→', condition:'K2Cr2O7 / H2SO4', products:['بدء التحول'], takeaway:'الشرط الكيميائي هو الأساس.', highlightTarget:'condition' },
      { title:'المشهد 4: ناتج وسيط', explanation:'المرحلة الأولى تعطي الإيثانال CH3CHO.', reactants:['C2H5OH'], arrowLabel:'→', condition:'أكسدة أولى', products:['CH3CHO'], takeaway:'يمكن التوقف هنا بالتقطير المبكر.', highlightTarget:'product' },
      { title:'المشهد 5: أكسدة إضافية', explanation:'استمرار الأكسدة يعطي الحمض CH3COOH.', reactants:['CH3CHO','[O]'], arrowLabel:'→', condition:'تسخين أطول', products:['CH3COOH'], takeaway:'زيادة الأكسدة = حمض كربوكسيلي.', highlightTarget:'product' },
      { title:'المشهد 6: الخلاصة', explanation:'الأكسدة هنا تدريجية على خطوتين.', reactants:['C2H5OH'], arrowLabel:'→', condition:'ضبط الزمن مهم', products:['CH3CHO → CH3COOH'], takeaway:'توقف مبكرًا للألدهيد، واستمر للحصول على الحمض.', highlightTarget:'none' },
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
      { title:'المشهد 1: المتفاعلات', explanation:'حمض كربوكسيلي + كحول كبداية للأسترة.', reactants:['CH3COOH','C2H5OH'], arrowLabel:'+', condition:'قبل التسخين', products:['لا يوجد ناتج بعد'], takeaway:'وجود -COOH و -OH ضروري.', highlightTarget:'reagent' },
      { title:'المشهد 2: تمييز المجموعات', explanation:'إبراز -COOH من الحمض و -OH من الكحول.', reactants:['CH3COOH (-COOH)','C2H5OH (-OH)'], arrowLabel:'→', condition:'المجموعات الفعالة', products:['تهيئة للتفاعل'], takeaway:'هذه المجموعات تُبنى منها رابطة الإستر.', highlightTarget:'bond' },
      { title:'المشهد 3: الشرط والتحفيز', explanation:'يظهر الشرط H2SO4 + Δ.', reactants:['CH3COOH + C2H5OH'], arrowLabel:'⇌', condition:'H2SO4 (حفاز) + تسخين', products:['بدء تكوين النواتج'], takeaway:'الحفاز يزيد السرعة ولا يُستهلك.', highlightTarget:'condition' },
      { title:'المشهد 4: خروج الماء', explanation:'تتكون جزيئة ماء H2O أثناء إعادة ترتيب الروابط.', reactants:['CH3COOH + C2H5OH'], arrowLabel:'⇌', condition:'وسط حمضي', products:['CH3COOC2H5 + H2O'], takeaway:'خروج الماء جزء أساسي من الأسترة.', highlightTarget:'bond' },
      { title:'المشهد 5: تكوين الإستر', explanation:'تظهر رابطة الإستر بوضوح في الناتج.', reactants:['CH3COOH + C2H5OH'], arrowLabel:'⇌', condition:'اتزان', products:['CH3COOC2H5','H2O'], takeaway:'الناتج إستر + ماء في تفاعل عكسي.', highlightTarget:'product' },
      { title:'المشهد 6: الخلاصة', explanation:'الأسترة تفاعل اتزاني محفز حمضيًا.', reactants:['CH3COOH + C2H5OH'], arrowLabel:'⇌', condition:'إزالة الماء تحسن الناتج', products:['CH3COOC2H5 + H2O'], takeaway:'سحب H2O يدعم تكوين الإستر.', highlightTarget:'none' },
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

function renderAlkeneVisual() {
  return `
    <svg class="rxn-visual-svg rxn-v-ltr" viewBox="0 0 340 170" xmlns="http://www.w3.org/2000/svg" aria-label="تصور تعليمي مبسط لإضافة البروم">
      <text class="rxn-v-label" x="18" y="20">تصور تعليمي مبسط</text>

      <g class="rxn-v-core">
        <ellipse class="rxn-v-focus-ring" cx="96" cy="88" rx="56" ry="34"/>
        <text class="rxn-v-formula rxn-v-core-text" x="66" y="94">C = C</text>
        <line class="rxn-v-bond rxn-v-cc-1" x1="84" y1="99" x2="128" y2="99"/>
        <line class="rxn-v-bond rxn-v-cc-2" x1="84" y1="106" x2="128" y2="106"/>
      </g>

      <g class="rxn-v-reagent">
        <text class="rxn-v-formula rxn-v-br2-text" x="272" y="93">Br-Br</text>
        <line class="rxn-v-bond rxn-v-br-link" x1="292" y1="100" x2="324" y2="100"/>
      </g>

      <g class="rxn-v-approach-arrow">
        <line class="rxn-v-arrow-line" x1="155" y1="100" x2="240" y2="100"/>
        <polygon class="rxn-v-arrow-head" points="240,94 252,100 240,106"/>
      </g>

      <g class="rxn-v-attach-left">
        <text class="rxn-v-formula rxn-v-br-left" x="144" y="62">Br</text>
        <line class="rxn-v-bond rxn-v-bond-new" x1="124" y1="94" x2="150" y2="72"/>
      </g>
      <g class="rxn-v-attach-right">
        <text class="rxn-v-formula rxn-v-br-right" x="144" y="136">Br</text>
        <line class="rxn-v-bond rxn-v-bond-new" x1="124" y1="106" x2="150" y2="128"/>
      </g>

      <g class="rxn-v-product">
        <rect class="rxn-v-product-pill" x="186" y="72" width="132" height="44" rx="10"/>
        <text class="rxn-v-formula rxn-v-product-text" x="199" y="99">C2H4Br2</text>
      </g>

      <g class="rxn-v-condition">
        <rect class="rxn-v-cond-pill" x="174" y="128" width="136" height="26" rx="8"/>
        <text class="rxn-v-cond" x="190" y="146">Br2 / CCl4</text>
      </g>
    </svg>
  `;
}

function renderOxidationVisual() {
  return `
    <svg class="rxn-visual-svg rxn-v-ltr" viewBox="0 0 340 170" xmlns="http://www.w3.org/2000/svg" aria-label="تصور تعليمي مبسط لأكسدة الإيثانول">
      <text class="rxn-v-label" x="18" y="20">تصور تعليمي مبسط</text>

      <g class="rxn-v-ethanol">
        <rect class="rxn-v-reactant-pill" x="20" y="72" width="92" height="42" rx="10"/>
        <text class="rxn-v-formula" x="33" y="98">C2H5OH</text>
        <rect class="rxn-v-tag rxn-v-oh-tag" x="75" y="79" width="30" height="24" rx="7"/>
      </g>

      <g class="rxn-v-oxidant-1">
        <rect class="rxn-v-reagent-pill" x="214" y="76" width="46" height="34" rx="9"/>
        <text class="rxn-v-formula" x="224" y="98">[O]</text>
      </g>

      <g class="rxn-v-arrow-1">
        <line class="rxn-v-arrow-line" x1="118" y1="93" x2="176" y2="93"/>
        <polygon class="rxn-v-arrow-head" points="176,87 188,93 176,99"/>
      </g>

      <g class="rxn-v-aldehyde">
        <rect class="rxn-v-product-pill" x="190" y="44" width="100" height="40" rx="10"/>
        <text class="rxn-v-formula rxn-v-product-text" x="204" y="69">CH3CHO</text>
      </g>

      <g class="rxn-v-oxidant-2">
        <rect class="rxn-v-reagent-pill" x="284" y="76" width="46" height="34" rx="9"/>
        <text class="rxn-v-formula" x="294" y="98">[O]</text>
      </g>

      <g class="rxn-v-arrow-2">
        <line class="rxn-v-arrow-line" x1="246" y1="84" x2="286" y2="84"/>
        <polygon class="rxn-v-arrow-head" points="286,78 298,84 286,90"/>
      </g>

      <g class="rxn-v-acid">
        <rect class="rxn-v-product-pill rxn-v-product-final" x="190" y="114" width="124" height="40" rx="10"/>
        <text class="rxn-v-formula rxn-v-product-text" x="204" y="140">CH3COOH</text>
      </g>

      <g class="rxn-v-condition">
        <rect class="rxn-v-cond-pill" x="114" y="128" width="140" height="26" rx="8"/>
        <text class="rxn-v-cond" x="128" y="146">K2Cr2O7 / H2SO4</text>
      </g>
    </svg>
  `;
}

function renderEsterVisual() {
  return `
    <svg class="rxn-visual-svg rxn-v-ltr" viewBox="0 0 340 170" xmlns="http://www.w3.org/2000/svg" aria-label="تصور تعليمي مبسط للأسترة">
      <text class="rxn-v-label" x="18" y="20">تصور تعليمي مبسط</text>

      <g class="rxn-v-acid-reactant">
        <rect class="rxn-v-reactant-pill" x="18" y="68" width="108" height="44" rx="10"/>
        <text class="rxn-v-formula" x="30" y="96">CH3COOH</text>
        <rect class="rxn-v-tag rxn-v-cooh-tag" x="68" y="76" width="46" height="24" rx="7"/>
      </g>

      <g class="rxn-v-alcohol-reactant">
        <rect class="rxn-v-reactant-pill" x="212" y="68" width="108" height="44" rx="10"/>
        <text class="rxn-v-formula" x="226" y="96">C2H5OH</text>
        <rect class="rxn-v-tag rxn-v-oh-tag" x="270" y="76" width="36" height="24" rx="7"/>
      </g>

      <g class="rxn-v-eq-arrow">
        <line class="rxn-v-arrow-line rxn-v-eq-line" x1="136" y1="90" x2="204" y2="90"/>
        <polygon class="rxn-v-arrow-head" points="204,84 216,90 204,96"/>
        <line class="rxn-v-arrow-line rxn-v-eq-line-back" x1="204" y1="100" x2="136" y2="100"/>
        <polygon class="rxn-v-arrow-head rxn-v-eq-head-back" points="136,94 124,100 136,106"/>
      </g>

      <g class="rxn-v-water-leave">
        <rect class="rxn-v-water-pill" x="142" y="126" width="56" height="26" rx="8"/>
        <text class="rxn-v-formula rxn-v-water" x="158" y="144">H2O</text>
      </g>

      <g class="rxn-v-ester-bond">
        <line class="rxn-v-bond rxn-v-bond-new" x1="178" y1="112" x2="210" y2="130"/>
      </g>

      <g class="rxn-v-ester-product">
        <rect class="rxn-v-product-pill rxn-v-product-final" x="158" y="122" width="164" height="36" rx="10"/>
        <text class="rxn-v-formula rxn-v-product-text" x="172" y="145">CH3COOC2H5</text>
      </g>

      <g class="rxn-v-condition">
        <rect class="rxn-v-cond-pill" x="128" y="34" width="92" height="24" rx="8"/>
        <text class="rxn-v-cond" x="145" y="50">H2SO4 + Δ</text>
      </g>
    </svg>
  `;
}

function renderVisualPanel(lesson) {
  let body = '';
  if (lesson.key === 'alkene-addition') body = renderAlkeneVisual();
  if (lesson.key === 'ethanol-oxidation') body = renderOxidationVisual();
  if (lesson.key === 'esterification') body = renderEsterVisual();
  return `<div class="rxn-visual-panel">${body}</div>`;
}

function renderFormulaBoxes(items, highlightMode, activeTarget) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return '<div class="rxn-formula-box"><span class="rxn-ltr">—</span></div>';
  return list.map((item, idx) => {
    const active = activeTarget === highlightMode ? ' rxn-highlight' : '';
    return `<div class="rxn-formula-box${active}"><span class="rxn-ltr">${escapeHtml(item)}</span></div>${idx < list.length - 1 ? '<div class="rxn-inline-sep">+</div>' : ''}`;
  }).join('');
}

function stageClass(lesson, index) {
  return `rxn-stage scene-enter rxn-topic-${lesson.key} rxn-scene-${index + 1}`;
}

function sceneMarkup(lesson, scene, idx, total) {
  const target = scene.highlightTarget || 'none';
  const conditionCls = target === 'condition' ? 'rxn-arrow-box rxn-highlight' : 'rxn-arrow-box';
  const productRowCls = target === 'product' ? 'rxn-equation-grid rxn-highlight-row' : 'rxn-equation-grid';

  return `
    <section class="${stageClass(lesson, idx)}" aria-label="${escapeHtml(scene.title)}">
      <div class="rxn-stage-progress">المشهد ${idx + 1} من ${total}</div>
      <h4 class="rxn-scene-title">${escapeHtml(scene.title)}</h4>

      ${renderVisualPanel(lesson)}

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
          <div class="rxn-condition-text${target === 'condition' ? ' rxn-highlight' : ''}">${escapeHtml(scene.condition)}</div>
        </div>
      </div>

      <div class="${productRowCls}">
        <div class="rxn-row-label">الناتج</div>
        <div class="rxn-row-formulas">
          ${renderFormulaBoxes(scene.products, 'product', target)}
        </div>
      </div>

      <div class="rxn-takeaway${target === 'bond' ? ' rxn-highlight' : ''}"><span>الفكرة:</span> ${escapeHtml(scene.takeaway)}</div>
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

      <div data-rxn-scene-wrap="${lesson.id}">${sceneMarkup(lesson, first, 0, lesson.scenes.length)}</div>

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
