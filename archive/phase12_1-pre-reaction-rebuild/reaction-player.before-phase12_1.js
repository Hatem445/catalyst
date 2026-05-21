'use strict';

const REACTION_LESSONS = [
  {
    id: 'rxn_anim_1',
    titleAr: 'إضافة البروم على الإيثين',
    equation: 'CH2=CH2 + Br2 → BrCH2-CH2Br',
    reactantsAr: 'الإيثين + البروم (Br2)',
    conditionsAr: 'مذيب خامل مثل CCl4، دون ماء',
    productAr: '1,2-ثنائي بروموإيثان',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'لأن إلكترونات π أعلى طاقة وأسهل في إعادة التوزيع من رابطة σ، فتبدأ منها الإضافة الكهربية.',
    scenes: [
      {
        stepLabel: '1/6',
        title: 'المشهد 1: المتفاعلات',
        desc: 'نضع المتفاعلات في لوحة واحدة: ألكين + بروم جزيئي.',
        leftTitle: 'الألكين',
        leftFormula: 'CH2=CH2',
        centerLabel: 'خليط التفاعل',
        arrow: '+',
        rightTitle: 'الكاشف',
        rightFormula: 'Br-Br',
        condition: 'درجة حرارة الغرفة',
        focus: 'الرابطة المزدوجة ستكون محور التفاعل.',
        takeaway: 'بداية الإضافة تتطلب رابطة π نشطة.',
        highlight: 'left',
      },
      {
        stepLabel: '2/6',
        title: 'المشهد 2: تحديد الموقع النشط',
        desc: 'نبرز أن رابطة π في C=C هي الأكثر قابلية للهجوم.',
        leftTitle: 'الموقع النشط',
        leftFormula: 'C=C (π)',
        centerLabel: 'إلكترونات متاحة',
        arrow: '⟶',
        rightTitle: 'Br2',
        rightFormula: 'δ+Br-Brδ-',
        condition: 'استقطاب لحظي',
        focus: 'الرابطة π تنجذب للطرف الموجب نسبيًا من Br2.',
        takeaway: 'تنشيط Br2 خطوة أساسية قبل تكوين الروابط الجديدة.',
        highlight: 'both',
      },
      {
        stepLabel: '3/6',
        title: 'المشهد 3: اقتراب الكاشف',
        desc: 'البروم يقترب من الرابطة المزدوجة استعدادًا لإعادة توزيع الإلكترونات.',
        leftTitle: 'الألكين',
        leftFormula: 'CH2=CH2',
        centerLabel: 'اقتراب Br2',
        arrow: '→',
        rightTitle: 'الكاشف النشط',
        rightFormula: 'Br2*',
        condition: 'وسط غير قطبي',
        focus: 'تبدأ كثافة إلكترونية π في الانخفاض.',
        takeaway: 'الاقتراب يسبق كسر π وتكوين روابط C-Br.',
        highlight: 'center',
      },
      {
        stepLabel: '4/6',
        title: 'المشهد 4: كسر/تكوين روابط',
        desc: 'تضعف π بينما تتكون رابطتا C-Br بالتتابع.',
        leftTitle: 'قبل',
        leftFormula: 'CH2=CH2 + Br2',
        centerLabel: 'π تنكسر',
        arrow: '⇒',
        rightTitle: 'أثناء التكوين',
        rightFormula: 'Br-CH2-CH2-Br',
        condition: 'إضافة كهربية',
        focus: 'هذه ليست آلية تفصيلية كاملة، بل مسار مبسط للفهم.',
        takeaway: 'اختفاء π وظهور روابط σ جديدة.',
        highlight: 'right',
      },
      {
        stepLabel: '5/6',
        title: 'المشهد 5: الناتج',
        desc: 'الناتج النهائي مشبع بدون رابطة مزدوجة.',
        leftTitle: 'الناتج',
        leftFormula: 'BrCH2-CH2Br',
        centerLabel: 'إضافة كاملة',
        arrow: '✓',
        rightTitle: 'الملاحظة',
        rightFormula: 'اختفاء C=C',
        condition: 'تفاعل الإضافة تم',
        focus: 'يمكن استخدام زوال لون البروم كمؤشر عملي.',
        takeaway: 'الألكين يتحول إلى ثنائي هاليد مشبع.',
        highlight: 'left',
      },
      {
        summary: true,
        stepLabel: '6/6',
        title: 'المشهد 6: الخلاصة التعليمية',
        desc: 'قاعدة الفهم: الرابطة π هي بوابة تفاعلات الإضافة في الألكينات.',
        bullets: [
          'الفاعل الحقيقي في البداية: إلكترونات π.',
          'Br2 يُستهلك لتكوين رابطتين C-Br.',
          'الناتج النهائي لا يحتوي رابطة مزدوجة.'
        ],
      },
    ],
  },
  {
    id: 'rxn_anim_2',
    titleAr: 'أكسدة الإيثانول (كحول أولي)',
    equation: 'CH3CH2OH → CH3CHO → CH3COOH',
    reactantsAr: 'إيثانول (كحول أولي)',
    conditionsAr: 'K2Cr2O7 / H2SO4 مع التحكم في الزمن والتقطير',
    productAr: 'إيثانال ثم حمض إيثانويك',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'زيادة زمن/شدة الأكسدة تنقل المركب من كحول أولي إلى ألدهيد ثم إلى حمض كربوكسيلي.',
    scenes: [
      {
        stepLabel: '1/6',
        title: 'المشهد 1: نقطة البداية',
        desc: 'الإيثانول هو كحول أولي قابل للأكسدة.',
        leftTitle: 'المتفاعل',
        leftFormula: 'CH3CH2OH',
        centerLabel: 'قبل الأكسدة',
        arrow: '→',
        rightTitle: 'التصنيف',
        rightFormula: 'كحول أولي',
        condition: 'تحضير المزيج',
        focus: 'وجود مجموعة -OH على كربون طرفي.',
        takeaway: 'المجموعة الوظيفية تحدد مسار التفاعل.',
        highlight: 'left',
      },
      {
        stepLabel: '2/6',
        title: 'المشهد 2: العامل المؤكسد',
        desc: 'نضيف ثنائي كرومات البوتاسيوم الحمضي.',
        leftTitle: 'الإيثانول',
        leftFormula: 'CH3CH2OH',
        centerLabel: '+ [O]',
        arrow: '→',
        rightTitle: 'الشرط',
        rightFormula: 'K2Cr2O7/H2SO4',
        condition: 'تسخين مضبوط',
        focus: 'العامل المؤكسد يوفر الأكسجين الفعّال.',
        takeaway: 'الشرط الكيميائي أهم من شكل المعادلة فقط.',
        highlight: 'right',
      },
      {
        stepLabel: '3/6',
        title: 'المشهد 3: المرحلة الأولى',
        desc: 'التحول الأول يعطي الإيثانال.',
        leftTitle: 'قبل',
        leftFormula: 'CH3CH2OH',
        centerLabel: 'أكسدة 1',
        arrow: '⇒',
        rightTitle: 'بعد',
        rightFormula: 'CH3CHO',
        condition: 'تقطير مبكر',
        focus: 'إذا أوقفت التفاعل مبكرًا تستطيع عزل الألدهيد.',
        takeaway: 'CH3CHO ناتج وسيط مهم.',
        highlight: 'right',
      },
      {
        stepLabel: '4/6',
        title: 'المشهد 4: استمرار الأكسدة',
        desc: 'في وجود أكسدة إضافية يتحول الألدهيد إلى حمض.',
        leftTitle: 'الوسيط',
        leftFormula: 'CH3CHO',
        centerLabel: '+ [O]',
        arrow: '→',
        rightTitle: 'الناتج النهائي',
        rightFormula: 'CH3COOH',
        condition: 'تسخين أطول',
        focus: 'زيادة التعرض للأكسدة تغيّر نوع المجموعة الوظيفية.',
        takeaway: 'ألدهيد → حمض كربوكسيلي.',
        highlight: 'both',
      },
      {
        stepLabel: '5/6',
        title: 'المشهد 5: قرار التحكم',
        desc: 'اختيار ناتجك يعتمد على التحكم في ظروف التشغيل.',
        leftTitle: 'ناتج مطلوب 1',
        leftFormula: 'CH3CHO',
        centerLabel: 'زمن أقل',
        arrow: '↔',
        rightTitle: 'ناتج مطلوب 2',
        rightFormula: 'CH3COOH',
        condition: 'زمن/حرارة أعلى',
        focus: 'الظروف العملية = اختيار المنتج.',
        takeaway: 'ليس كل أكسدة تعطي نفس المنتج دائمًا.',
        highlight: 'center',
      },
      {
        summary: true,
        stepLabel: '6/6',
        title: 'المشهد 6: الخلاصة التعليمية',
        desc: 'الأكسدة هنا مسار تدريجي وليس قفزة واحدة.',
        bullets: [
          'كحول أولي ⟶ ألدهيد ⟶ حمض.',
          'التقطير المبكر يحفظ الألدهيد.',
          'استمرار التسخين يدفع نحو الحمض.'
        ],
      },
    ],
  },
  {
    id: 'rxn_anim_3',
    titleAr: 'الأسترة: حمض إيثانويك + إيثانول',
    equation: 'CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O',
    reactantsAr: 'حمض إيثانويك + إيثانول',
    conditionsAr: 'H2SO4 مركز (عامل حفاز) + تسخين لطيف',
    productAr: 'إيثيل إيثانوات + ماء',
    simplifiedNoteAr: 'تصور تعليمي مبسط',
    whyAr: 'التفاعل اتزاني؛ إزالة الماء أو زيادة أحد المتفاعلات تدفع الاتزان نحو تكوين الإستر.',
    scenes: [
      {
        stepLabel: '1/6',
        title: 'المشهد 1: المتفاعلات',
        desc: 'حمض كربوكسيلي مع كحول كخط بداية للأسترة.',
        leftTitle: 'الحمض',
        leftFormula: 'CH3COOH',
        centerLabel: '+',
        arrow: '→',
        rightTitle: 'الكحول',
        rightFormula: 'C2H5OH',
        condition: 'مزج المتفاعلات',
        focus: 'نحتاج مجموعتي -COOH و-OH.',
        takeaway: 'اختيار الزوج الصحيح شرط أساسي.',
        highlight: 'both',
      },
      {
        stepLabel: '2/6',
        title: 'المشهد 2: دور الحفاز',
        desc: 'الحمض المركز يحفز إعادة ترتيب الروابط.',
        leftTitle: 'النظام التفاعلي',
        leftFormula: 'CH3COOH + C2H5OH',
        centerLabel: 'H2SO4 (cat.)',
        arrow: '⇒',
        rightTitle: 'تنشيط',
        rightFormula: 'Δ',
        condition: 'تسخين لطيف',
        focus: 'H2SO4 حفاز وليس ناتجًا نهائيًا.',
        takeaway: 'الحفاز يقلل طاقة التنشيط.',
        highlight: 'center',
      },
      {
        stepLabel: '3/6',
        title: 'المشهد 3: تكوين رابطة الإستر',
        desc: 'يبدأ الجزء الحمضي بالاتصال بمجموعة الألكوكسي.',
        leftTitle: 'قبل',
        leftFormula: 'CH3COOH + C2H5OH',
        centerLabel: 'إعادة ترتيب',
        arrow: '→',
        rightTitle: 'أثناء',
        rightFormula: 'CH3COO-C2H5 + H2O*',
        condition: 'وسط حمضي',
        focus: 'تكوين رابطة C-O الجديدة هو قلب الأسترة.',
        takeaway: 'الماء يتكوّن بالتزامن مع الإستر.',
        highlight: 'right',
      },
      {
        stepLabel: '4/6',
        title: 'المشهد 4: الاتزان الكيميائي',
        desc: 'التفاعل عكسي؛ النواتج يمكن أن تعود لمتفاعلات.',
        leftTitle: 'متفاعلات',
        leftFormula: 'CH3COOH + C2H5OH',
        centerLabel: '⇌',
        arrow: '⇌',
        rightTitle: 'نواتج',
        rightFormula: 'CH3COOC2H5 + H2O',
        condition: 'اتزان ديناميكي',
        focus: 'لا يفنى أي جانب كليًا في الظروف العادية.',
        takeaway: 'الاتزان مفهوم أساسي لفهم العائد.',
        highlight: 'center',
      },
      {
        stepLabel: '5/6',
        title: 'المشهد 5: رفع المحصول',
        desc: 'سحب الماء أو زيادة المتفاعلات يدفع التفاعل للأمام.',
        leftTitle: 'الإجراء',
        leftFormula: 'إزالة H2O',
        centerLabel: 'Le Chatelier',
        arrow: '→',
        rightTitle: 'النتيجة',
        rightFormula: 'إستر أكثر',
        condition: 'تحسين العائد',
        focus: 'التحكم الاتزاني أهم من الحفظ النظري فقط.',
        takeaway: 'إدارة الاتزان ترفع الناتج عمليًا.',
        highlight: 'left',
      },
      {
        summary: true,
        stepLabel: '6/6',
        title: 'المشهد 6: الخلاصة التعليمية',
        desc: 'الأسترة تفاعل اتزاني محفز بحمض قوي.',
        bullets: [
          'الشرط: H2SO4 + تسخين لطيف.',
          'التفاعل عكسي بطبيعته.',
          'إزالة الماء تدفع الاتزان نحو الإستر.'
        ],
      },
    ],
  },
];

const PLAY_STEP_MS = 3000;
const runtime = new Map();

function ensureRuntime(id) {
  if (!runtime.has(id)) {
    runtime.set(id, { currentScene: 0, isPlaying: false, timerId: null });
  }
  return runtime.get(id);
}

function stopTimer(state) {
  if (state.timerId) {
    clearTimeout(state.timerId);
    state.timerId = null;
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightClass(side, target) {
  if (side === 'both') return ' storyboard-box-focus';
  if (side === target) return ' storyboard-box-focus';
  return '';
}

function renderStoryboardScene(scene) {
  const leftFocus = highlightClass(scene.highlight, 'left');
  const rightFocus = highlightClass(scene.highlight, 'right');
  const centerFocus = scene.highlight === 'center' ? ' storyboard-center-focus' : '';
  return `<svg class="rxn-scene-svg" viewBox="0 0 380 210" xmlns="http://www.w3.org/2000/svg" aria-label="${escapeHtml(scene.title)}">
    <rect x="10" y="10" width="360" height="190" rx="14" class="storyboard-bg"/>
    <rect x="24" y="22" width="64" height="24" rx="12" class="storyboard-step-pill"/>
    <text x="56" y="38" text-anchor="middle" class="storyboard-step-text">${escapeHtml(scene.stepLabel)}</text>

    <rect x="24" y="56" width="136" height="76" rx="10" class="storyboard-box${leftFocus}"/>
    <text x="34" y="76" class="storyboard-box-title">${escapeHtml(scene.leftTitle)}</text>
    <text x="34" y="101" class="storyboard-formula">${escapeHtml(scene.leftFormula)}</text>

    <rect x="220" y="56" width="136" height="76" rx="10" class="storyboard-box${rightFocus}"/>
    <text x="230" y="76" class="storyboard-box-title">${escapeHtml(scene.rightTitle)}</text>
    <text x="230" y="101" class="storyboard-formula">${escapeHtml(scene.rightFormula)}</text>

    <rect x="164" y="70" width="52" height="48" rx="10" class="storyboard-center-box${centerFocus}"/>
    <text x="190" y="89" text-anchor="middle" class="storyboard-center-label">${escapeHtml(scene.centerLabel)}</text>
    <text x="190" y="108" text-anchor="middle" class="storyboard-center-arrow">${escapeHtml(scene.arrow)}</text>

    <rect x="24" y="140" width="332" height="22" rx="8" class="storyboard-condition"/>
    <text x="34" y="155" class="storyboard-condition-text">الشرط: ${escapeHtml(scene.condition)}</text>

    <rect x="24" y="168" width="332" height="22" rx="8" class="storyboard-focus"/>
    <text x="34" y="183" class="storyboard-focus-text">الفكرة: ${escapeHtml(scene.focus)}</text>

    <text x="190" y="202" text-anchor="middle" class="storyboard-takeaway">${escapeHtml(scene.takeaway)}</text>
  </svg>`;
}

function renderSummaryScene(scene) {
  return `<svg class="rxn-scene-svg" viewBox="0 0 380 210" xmlns="http://www.w3.org/2000/svg" aria-label="${escapeHtml(scene.title)}">
    <rect x="10" y="10" width="360" height="190" rx="14" class="storyboard-bg"/>
    <rect x="24" y="22" width="64" height="24" rx="12" class="storyboard-step-pill"/>
    <text x="56" y="38" text-anchor="middle" class="storyboard-step-text">${escapeHtml(scene.stepLabel)}</text>

    <rect x="24" y="56" width="332" height="118" rx="12" class="storyboard-summary-panel"/>
    <text x="190" y="78" text-anchor="middle" class="storyboard-summary-title">خلاصة الدرس</text>
    <text x="34" y="104" class="storyboard-summary-line">• ${escapeHtml(scene.bullets[0] || '')}</text>
    <text x="34" y="126" class="storyboard-summary-line">• ${escapeHtml(scene.bullets[1] || '')}</text>
    <text x="34" y="148" class="storyboard-summary-line">• ${escapeHtml(scene.bullets[2] || '')}</text>
    <text x="190" y="190" text-anchor="middle" class="storyboard-takeaway">${escapeHtml(scene.desc)}</text>
  </svg>`;
}

function renderSceneSvg(scene) {
  if (scene.summary) return renderSummaryScene(scene);
  return renderStoryboardScene(scene);
}

function getLessons() {
  return REACTION_LESSONS;
}

function getLessonById(id) {
  return REACTION_LESSONS.find(item => item.id === id) || null;
}

function renderLessonCard(lesson) {
  const state = ensureRuntime(lesson.id);
  state.isPlaying = false;
  stopTimer(state);
  state.currentScene = 0;

  const scene = lesson.scenes[0];
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

      <div class="rxn-scene-wrap" data-rxn-scene-wrap="${lesson.id}">${renderSceneSvg(scene)}</div>
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
  wrap.innerHTML = renderSceneSvg(scene);
  title.textContent = scene.title;
  desc.textContent = scene.desc;
  progress.textContent = `المشهد ${state.currentScene + 1} من ${lesson.scenes.length}`;
  void wrap.offsetWidth;
  wrap.classList.add('scene-enter');
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
  if (state.currentScene < lesson.scenes.length - 1) {
    state.currentScene += 1;
  }
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
