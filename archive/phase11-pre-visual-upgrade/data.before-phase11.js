'use strict';

const ItemParser = {
  parse(raw) {
    const map = {
      '[Q]': { type:'law', label:'قانون',   cls:'badge-law',  icon:'⚖️' },
      '[E]': { type:'eq',  label:'معادلة',  cls:'badge-eq',   icon:'⚗️' },
      '[O]': { type:'obs', label:'ملاحظة',  cls:'badge-obs',  icon:'👁️' },
      '[M]': { type:'mem', label:'احفظ',    cls:'badge-mem',  icon:'🔴' },
      '[T]': { type:'tip', label:'تلميح',   cls:'badge-tip',  icon:'💡' },
    };
    for (const [pfx, meta] of Object.entries(map)) {
      if (raw.startsWith(pfx)) {
        return { text: raw.slice(pfx.length).trim(), ...meta, bg: ItemParser.bg(meta.type) };
      }
    }
    return { text: raw, type: 'plain', cls: '', icon: '•', bg: '' };
  },
  bg(t) {
    const m = { law:'rgba(255,204,68,.06)', eq:'rgba(0,255,179,.06)', obs:'rgba(255,110,180,.06)', mem:'rgba(185,122,255,.06)', tip:'rgba(59,158,255,.06)' };
    return m[t] || '';
  },
  render(raw) {
    const p = this.parse(raw);
    const badge = p.cls ? `<span class="item-badge ${p.cls}">${p.icon} ${p.label}</span>` : '';
    return `<div class="node-item" style="background:${p.bg}">
      <span class="item-bullet">${p.cls ? '📌' : '•'}</span>
      <span>${badge}${p.text}</span>
    </div>`;
  }
};


const DB = {
  units: [

    /* ══════════════ ORGANIC: HYDROCARBONS ══════════════ */
    {
      id: 'hydrocarbons',
      title: 'الهيدروكربونات',
      icon: '🧪',
      color: '--clr-alkene',
      clr: '#00ffb3',
      priority: 'high',
      description: 'الكانات • الكينات • الكاينات • البنزين',
      sections: [
        {
          id: 'hc_overview',
          title: 'مقارنة الهيدروكربونات',
          nodes: [
            {
              id: 'hc_compare_table',
              title: 'جدول المقارنة الشامل',
              isTable: true,
              tableData: {
                headers: ['الخاصية','الكانات','الكينات','الكاينات'],
                rows: [
                  ['الصيغة العامة','CₙH₂ₙ₊₂','CₙH₂ₙ','CₙH₂ₙ₋₂'],
                  ['الرابطة','σ واحدة','σ + π','σ + 2π'],
                  ['النشاط','أقل','متوسط','الأعلى'],
                  ['نوع التفاعل','إحلال','إضافة','إضافة'],
                  ['Br₂/CCl₄ بدون ضوء','لا يفاعل','يزيل اللون','يزيل اللون'],
                  ['مثال','CH₄','C₂H₄','C₂H₂'],
                ]
              },
              items: []
            }
          ]
        },
        {
          id: 'alkanes',
          title: 'الكانات — Alkanes',
          nodes: [
            {
              id: 'methane_rxns',
              title: 'الميثان CH₄ — التفاعلات',
              color: '--clr-alkane', clr: '#3b9eff',
              items: [
                '[E] CH₄ + 2O₂ →(Δ) CO₂ + 2H₂O — احتراق كامل',
                '[E] 2CH₄ + 3O₂ →(هواء محدود) 2CO + 4H₂O — احتراق ناقص',
                '[E] CH₄ + Cl₂ →(UV) CH₃Cl + HCl — كلورة: المرحلة 1',
                '[E] CH₃Cl + Cl₂ →(UV) CH₂Cl₂ + HCl — المرحلة 2',
                '[E] CH₂Cl₂ + Cl₂ →(UV) CHCl₃ + HCl — كلوروفورم',
                '[E] CHCl₃ + Cl₂ →(UV) CCl₄ + HCl — رابع كلوريد الكربون',
                '[E] CH₄ →(1000°C, بدون هواء) C + 2H₂ — أسود الكربون',
                '[O] الكانات لا تتفاعل مع Br₂/CCl₄ بدون UV — كاشف سلبي',
                '[Q] قاعدة الإحلال: يستبدل H بـ Cl تدريجياً مع UV',
              ]
            },
            {
              id: 'alkane_props',
              title: 'خواص الكانات',
              clr: '#3b9eff',
              items: [
                '[Q] الكانات مشبعة — لا روابط π',
                '[M] CH₄ غاز طبيعي، C₄H₁₀ غاز البوتاجاز',
                '[T] ترتيب الكانات: ميثان < إيثان < بروبان < بيوتان',
                'نقطة الغليان تزداد بزيادة الكتلة الجزيئية',
              ]
            }
          ]
        },
        {
          id: 'alkenes',
          title: 'الكينات — Alkenes',
          nodes: [
            {
              id: 'ethene_rxns',
              title: 'الإيثين C₂H₄ — التفاعلات',
              clr: '#00ffb3',
              items: [
                '[E] C₂H₄ + 3O₂ →(Δ) 2CO₂ + 2H₂O — احتراق',
                '[E] C₂H₄ + H₂ →(Ni, 150°-300°) C₂H₆ — هدرجة',
                '[E] C₂H₄ + Br₂ →(CCl₄) BrCH₂-CH₂Br — هلجنة (يزيل اللون 🔴)',
                '[E] C₂H₄ + HBr → CH₃CH₂Br — هيدرو-هلجنة',
                '[E] C₂H₄ + H₂O →(H₂SO₄, 110°) C₂H₅OH — هدرة',
                '[E] C₂H₄ + KMnO₄ →(قلوي) HOCH₂CH₂OH — إيثيلين جلايكول',
                '[E] nC₂H₄ →(Δ, مُحفِّز) (C₂H₄)ₙ — بلمرة PE',
                '[O] يزيل لون KMnO₄ البنفسجي → يتحول لعديم اللون (كاشف)',
                '[Q] قاعدة ماركوفنيكوف: H يتصل بـ C الأكثر هيدروجيناً',
              ]
            },
            {
              id: 'alkene_polymers',
              title: 'بوليمرات الكينات',
              clr: '#00e5ff',
              items: [
                'بولي إيثيلين PE: أكياس وزجاجات بلاستيكية',
                'بولي بروبين PP: سجاد وحبال',
                'PVC: مواسير وعوازل أسلاك',
                'تفلون PTFE: أواني الطهي اللاصقة',
                '[M] البلمرة: n جزيء صغير → جزيء ضخم (بوليمر)',
              ]
            }
          ]
        },
        {
          id: 'alkynes',
          title: 'الكاينات — Alkynes',
          nodes: [
            {
              id: 'ethyne_rxns',
              title: 'الإيثاين C₂H₂ — التفاعلات',
              clr: '#ff6eb4',
              items: [
                '[E] 2C₂H₂ + 5O₂ →(Δ) 4CO₂ + 2H₂O — احتراق (لهب 3500°C)',
                '[E] C₂H₂ + H₂ →(Ni) C₂H₄ — هدرجة إلى إيثين',
                '[E] C₂H₄ + H₂ →(Ni) C₂H₆ — هدرجة إلى إيثان',
                '[E] C₂H₂ + Br₂ →(CCl₄) CHBr=CHBr →+Br₂ CHBr₂-CHBr₂',
                '[E] C₂H₂ + H₂O →(HgSO₄, H₂SO₄) CH₃CHO — أسيتالدهيد',
                '[E] 3C₂H₂ →(Ni, 200°) C₆H₆ — بنزين (بلمرة دورية)',
                '[E] CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂ — تحضير من كربيد الكالسيوم',
                '[O] لهب أكسي-أسيتيلين 3500°C — أشد أنواع اللحام',
                '[M] CaC₂ هو نقطة البداية في معظم سلاسل C₂',
              ]
            },
            {
              id: 'alkyne_prep',
              title: 'سلسلة تحويلات C₂ — الكاملة',
              clr: '#b97aff',
              isPathway: true,
              pathway: [
                { label:'CaC₂',    clr:'#b97aff', sub:'كربيد كالسيوم' },
                { arrow:'+ 2H₂O' },
                { label:'C₂H₂',    clr:'#ff6eb4', sub:'إيثاين' },
                { arrow:'+ H₂\nNi' },
                { label:'C₂H₄',    clr:'#00ffb3', sub:'إيثين' },
                { arrow:'+ H₂\nNi' },
                { label:'C₂H₆',    clr:'#3b9eff', sub:'إيثان' },
              ]
            }
          ]
        },
        {
          id: 'benzene',
          title: 'البنزين C₆H₆',
          nodes: [
            {
              id: 'benzene_rxns',
              title: 'البنزين — التفاعلات',
              clr: '#ffcc44',
              items: [
                '[E] C₆H₆ + HNO₃ →(H₂SO₄ مركز) نيتروبنزين + H₂O — نترة',
                '[E] C₆H₆ + Cl₂ →(FeCl₃) كلوروبنزين + HCl — هلجنة إحلال',
                '[E] C₆H₆ + CH₃Cl →(AlCl₃) تولوين + HCl — ألكلة فريدل-كرافتس',
                '[E] C₆H₆ + 3H₂ →(Ni, Δ) C₆H₁₂ — هدرجة (سيكلوهكسان)',
                '[E] C₆H₆ + 3Cl₂ →(UV) C₆H₆Cl₆ — إضافة (ليندان)',
                '[O] البنزين يتفاعل بالإحلال لا الإضافة في الظروف العادية',
                '[Q] استقرار حلقة البنزين: إلكترونات π مشتركة عبر الحلقة كلها',
                '[M] البنزين لا يزيل لون Br₂/CCl₄ بدون عامل — يفرقه عن الكينات',
              ]
            },
            {
              id: 'phenol_rxns',
              title: 'الفينول C₆H₅OH',
              clr: '#ff7c35',
              items: [
                '[E] C₆H₅OH + Na → C₆H₅ONa + ½H₂',
                '[E] C₆H₅OH + NaOH → C₆H₅ONa + H₂O (الفينول حمض أقوى من الكحول)',
                '[E] C₆H₅OH + 3Br₂ →(ماء) 3HBr + 2,4,6-تريبروموفينول↓ أبيض',
                '[O] FeCl₃ → لون بنفسجي مميز مع الفينول',
                '[Q] الفينول أحمض من الكحول: يتفاعل مع NaOH والفينوكسيد مستقر',
              ]
            }
          ]
        },
        {
          id: 'organic_expected',
          title: 'الأسئلة المتوقعة — هيدروكربونات',
          nodes: [
            {
              id: 'hc_questions',
              title: 'أسئلة متوقعة في الامتحانات',
              isExpected: true,
              items: [
                'لماذا يتفاعل البنزين بالإحلال لا الإضافة؟',
                'كيف تفرق كيميائياً بين كانات وكينات وكاينات؟',
                'اكتب سلسلة: CaC₂ → حمض الأسيتيك (5 خطوات)',
                'ما ناتج C₂H₄ مع KMnO₄ القلوي؟',
                'لماذا لهب الأسيتيلين أشد من الميثان؟',
                'ما الفرق بين تفاعل الإحلال والإضافة؟',
                'ما ناتج بلمرة الإيثين؟ وما استخداماته؟',
              ]
            }
          ]
        }
      ]
    },

    /* ══════════════ ORGANIC: DERIVATIVES ══════════════ */
    {
      id: 'org_derivatives',
      title: 'مشتقات الهيدروكربونات',
      icon: '⚗️',
      clr: '#ec4899',
      description: 'كحولات • فينول • أحماض • استرات',
      sections: [
        {
          id: 'func_groups',
          title: 'المجموعات الوظيفية',
          nodes: [
            {
              id: 'fg_table',
              title: 'جدول المجموعات الوظيفية',
              isTable: true,
              tableData: {
                headers: ['المجموعة','الصيغة','اللاحقة','مثال'],
                rows: [
                  ['هيدروكسيل','-OH',  'ول',   'C₂H₅OH إيثانول'],
                  ['ألدهيد',   '-CHO', 'ال',   'CH₃CHO إيثانال'],
                  ['كيتون',    '-CO-', 'ون',   'CH₃COCH₃ بروبانون'],
                  ['كربوكسيل','-COOH','ويك',  'CH₃COOH حمض إيثانويك'],
                  ['استر',     '-COO-','وات',  'CH₃COOC₂H₅'],
                  ['أمين',     '-NH₂', 'أمين', 'C₂H₅NH₂'],
                ]
              },
              items: []
            }
          ]
        },
        {
          id: 'alcohols_sec',
          title: 'الكحولات — Alcohols',
          nodes: [
            {
              id: 'ethanol_rxns',
              title: 'الإيثانول C₂H₅OH — التفاعلات',
              clr: '#b97aff',
              items: [
                '[E] C₂H₅OH + Na → C₂H₅ONa + ½H₂',
                '[E] C₂H₅OH + HBr → C₂H₅Br + H₂O',
                '[E] C₂H₅OH →(H₂SO₄, 110°) C₂H₄ + H₂O — نزع ماء → إيثين',
                '[E] 2C₂H₅OH →(H₂SO₄, 140°) C₂H₅-O-C₂H₅ + H₂O — إيثر',
                '[E] C₂H₅OH →(K₂Cr₂O₇/H₂SO₄) CH₃CHO → CH₃COOH — أكسدة',
                '[E] C₂H₅OH + CH₃COOH →(H₂SO₄) CH₃COOC₂H₅ + H₂O — استرة',
                '[Q] 110°C → إيثين / 140°C → إيثر — درجة الحرارة تحدد الناتج',
                '[O] الكحولات لا تتفاعل مع NaOH (يفرقها عن الفينول)',
              ]
            }
          ]
        },
        {
          id: 'carbonyl_sec',
          title: 'الألدهيدات والكيتونات',
          nodes: [
            {
              id: 'carbonyl_compare',
              title: 'مقارنة سريعة: ألدهيد vs كيتون',
              isTable: true,
              tableData: {
                headers: ['الخاصية','ألدهيد R-CHO','كيتون R-CO-R`'],
                rows: [
                  ['موضع المجموعة','طرف السلسلة','وسط السلسلة'],
                  ['الأكسدة','يتأكسد بسهولة إلى حمض','يصعب أكسدته في الظروف العادية'],
                  ['اختبار تولنز','مرآة فضية (+)','سلبي'],
                  ['اختبار فهلنج','راسب أحمر آجري (+)','سلبي غالباً'],
                  ['مثال','CH₃CHO إيثانال','CH₃COCH₃ بروبانون'],
                ]
              },
              items: []
            },
            {
              id: 'aldehyde_reactivity',
              title: 'الإيثانال CH₃CHO — تفاعلات الفهم',
              clr: '#ffcc44',
              items: [
                '[E] CH₃CHO + [O] → CH₃COOH — الألدهيد يتأكسد بسهولة',
                '[E] CH₃CHO + H₂ →(Ni) C₂H₅OH — اختزال إلى كحول أولي',
                '[E] CH₃CHO + 2[Ag(NH₃)₂]OH → CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
                '[O] فكرة الآلية: كربون مجموعة C=O موجب جزئياً → يهاجمه النيوكليوفيل بسهولة',
                '[Q] لماذا الألدهيد أنشط من الكيتون؟ لأن حول C=O عائق فراغي أقل وتأثير دافع للإلكترون أقل',
              ]
            },
            {
              id: 'ketone_reactivity',
              title: 'البروبانون CH₃COCH₃ — تفاعلات أساسية',
              clr: '#ff7c35',
              items: [
                '[E] CH₃COCH₃ + H₂ →(Ni) CH₃CHOHCH₃ — اختزال إلى كحول ثانوي',
                '[O] لا يعطي مرآة فضية مع تولنز ولا راسب فهلنج في منهج المدرسة',
                '[O] مجموعة C=O في الكيتون أقل نشاطاً من الألدهيد بسبب مجموعتين ألكيل دافعتين للإلكترون',
                '[T] سؤال امتحاني شائع: التمييز بين الإيثانال والبروبانون باختبار تولنز',
              ]
            }
          ]
        },
        {
          id: 'acids_esters_sec',
          title: 'الأحماض والاسترات',
          nodes: [
            {
              id: 'acetic_rxns',
              title: 'حمض الأسيتيك CH₃COOH',
              clr: '#ff4d6d',
              items: [
                '[E] CH₃COOH + NaOH → CH₃COONa + H₂O',
                '[E] 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑',
                '[E] CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑',
                '[E] CH₃COOH + C₂H₅OH →(H₂SO₄) CH₃COOC₂H₅ + H₂O',
                '[O] تفاعل مع Na₂CO₃ وNaHCO₃ يفرقه عن الفينول',
              ]
            },
            {
              id: 'ester_hydrolysis',
              title: 'الاسترات — التحلل',
              clr: '#00e5ff',
              items: [
                '[E] CH₃COOC₂H₅ + H₂O →(Δ) CH₃COOH + C₂H₅OH — تحلل مائي (عكسي)',
                '[E] CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH — صابرة (لا رجعة)',
                '[M] الصابرة = تحلل قلوي = غير عكسية (تختلف عن الاسترة)',
              ]
            }
          ]
        },
        {
          id: 'organic_conversions_sec',
          title: 'تحويلات عضوية مركزة',
          nodes: [
            {
              id: 'c2_master_route',
              title: 'مسار C₂ من الكربيد إلى الاستر',
              clr: '#6ab8d1',
              items: [
                '[E] CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂',
                '[E] C₂H₂ + H₂ →(Ni) C₂H₄ ثم +H₂ → C₂H₆',
                '[E] C₂H₄ + H₂O →(H₂SO₄, 110°C) C₂H₅OH',
                '[E] C₂H₅OH →[O] CH₃CHO →[O] CH₃COOH',
                '[E] CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
                '[O] الفكرة: تتبع تغير المجموعة الوظيفية في كل خطوة وليس حفظ المعادلة منفردة',
              ]
            },
            {
              id: 'conditions_logic',
              title: 'منطق شروط التفاعل (Exam Logic)',
              clr: '#d5b063',
              items: [
                '[Q] درجة الحرارة تحدد مسار نزع الماء من الكحول: 110°C (ألكين) مقابل 140°C (إيثر)',
                '[Q] وجود حفاز معدني Ni/Pt غالباً يعني اختزال/هدرجة للرابطة',
                '[Q] H₂SO₄ المركز قد يعمل حفازاً أو عامل نزع ماء حسب الظروف',
                '[T] في التحويلات: اكتب أولاً نوع التفاعل (أكسدة/اختزال/إضافة/إحلال) ثم المادة المطلوبة',
              ]
            },
            {
              id: 'mini_mechanism',
              title: 'تصور آلي مبسط (مستوى ثانوي)',
              clr: '#9a86c5',
              items: [
                '[O] في الإضافة: رابطة π تنكسر أولاً لأنها الأضعف فتسمح بتكوين رابطتين σ جديدتين',
                '[O] في الكربونيل: كربون C=O موجب جزئياً لذلك ينجذب للنيوكليوفيل',
                '[O] في الاسترة: التفاعل عكسي لذلك التسخين وإزالة الماء يدفعان الاتزان للناتج',
              ]
            }
          ]
        }
      ]
    },

    /* ══════════════ IRON ══════════════ */
    {
      id: 'iron',
      title: 'الحديد (Fe) — المعادلات',
      icon: '🔩',
      clr: '#f97316',
      description: 'أكاسيد الحديد • أملاحه • كواشفه',
      sections: [
        {
          id: 'fe_basic',
          title: 'تفاعلات الحديد الأساسية',
          nodes: [
            {
              id: 'fe_o2_h2o',
              title: 'Fe مع O₂ والماء',
              clr: '#ea580c',
              items: [
                '[E] 3Fe + 2O₂ →(Δ) Fe₃O₄ — يحترق في O₂',
                '[E] 3Fe + 4H₂O →(500°C) Fe₃O₄ + 4H₂↑',
                '[O] الحديد لا يتفاعل مع الماء البارد',
              ]
            },
            {
              id: 'fe_acid',
              title: 'Fe مع الأحماض',
              clr: '#b45309',
              items: [
                '[E] Fe + 2HCl →(مخفف) FeCl₂ + H₂↑ — ينتج Fe²⁺',
                '[E] Fe + H₂SO₄ →(مخفف) FeSO₄ + H₂↑',
                '[M] Fe + HNO₃ مركز → خمول كيميائي (طبقة Fe₂O₃ غير مسامية)',
                '[M] الأحماض المخففة دائماً تعطي Fe²⁺ وليس Fe³⁺',
              ]
            },
            {
              id: 'fe_halogens',
              title: 'Fe مع الهالوجينات',
              clr: '#92400e',
              items: [
                '[E] 2Fe + 3Cl₂ →(Δ) 2FeCl₃ — ينتج Fe³⁺',
                '[E] Fe + S →(Δ) FeS — كبريتيد الحديد II',
                '[M] الهالوجينات → Fe³⁺ / الأحماض المخففة → Fe²⁺',
              ]
            }
          ]
        },
        {
          id: 'fe_compare',
          title: 'مقارنة Fe²⁺ و Fe³⁺',
          nodes: [
            {
              id: 'fe_ions_table',
              title: 'الكواشف الكيميائية',
              isTable: true,
              tableData: {
                headers: ['الكاشف', 'Fe²⁺ (حديد II)', 'Fe³⁺ (حديد III)'],
                rows: [
                  ['NaOH','أخضر مبلل Fe(OH)₂↓','بني-أحمر Fe(OH)₃↓'],
                  ['NH₄OH','أخضر مبلل','بني محمر'],
                  ['K₄[Fe(CN)₆]','أبيض','أزرق برلين'],
                  ['KSCN','لا لون','أحمر دموي 🔴 (كاشف مميز)'],
                  ['مصدره','Fe + حمض مخفف','Fe + هالوجين أو مؤكسد'],
                ]
              },
              items: []
            }
          ]
        }
      ]
    },

    /* ══════════════ TRANSITION METALS ══════════════ */
    {
      id: 'transition',
      title: 'السلسلة الانتقالية',
      icon: '⚛️',
      clr: '#a0c4ff',
      description: 'Sc → Zn • حالات التأكسد • الخصائص',
      sections: [
        {
          id: 'trans_general',
          title: 'الخصائص العامة',
          nodes: [
            {
              id: 'trans_props',
              title: 'خواص عامة مميزة',
              clr: '#a0c4ff',
              items: [
                '[Q] معظم أيوناتها ملونة — سبب: إلكترونات مفردة في 3d تمتص فوتونات مرئية',
                '[Q] بارامغناطيسية: تحتوي إلكترونات مفردة في 3d',
                '[Q] دايامغناطيسية: لا إلكترونات مفردة (مثل Zn²⁺, Cu⁺)',
                '[Q] النشاط الحفازي: بسبب الإلكترونات الحرة في 4s و 3d',
                '[M] Cr [Ar]4s¹3d⁵ — Cu [Ar]4s¹3d¹⁰ (يشذان للاستقرار)',
                '[M] Zn ليس انتقالياً حقيقياً: 3d¹⁰ في أيونه لا يحتوي مفردة',
              ]
            },
            {
              id: 'trans_oxidation',
              title: 'حالات التأكسد',
              isTable: true,
              tableData: {
                headers: ['العنصر','Z','التركيب','حالات التأكسد'],
                rows: [
                  ['Sc','21','4s²3d¹','+3 فقط'],
                  ['Ti','22','4s²3d²','+2,+3,+4'],
                  ['V', '23','4s²3d³','+2,+3,+4,+5'],
                  ['Cr','24','4s¹3d⁵','+2,+3,+6 (يشذ)'],
                  ['Mn','25','4s²3d⁵','+2,+3,+4,+6,+7 (الأكثر)'],
                  ['Fe','26','4s²3d⁶','+2,+3'],
                  ['Co','27','4s²3d⁷','+2,+3'],
                  ['Ni','28','4s²3d⁸','+2,+3'],
                  ['Cu','29','4s¹3d¹⁰','+1,+2 (يشذ)'],
                  ['Zn','30','4s²3d¹⁰','+2 فقط'],
                ]
              },
              items: []
            }
          ]
        }
      ]
    },

    /* ══════════════ QUALITATIVE ANALYSIS ══════════════ */
    {
      id: 'qualitative',
      title: 'التحليل النوعي',
      icon: '🔬',
      clr: '#10b981',
      description: 'كواشف الأيونات • قواعد الذوبان',
      sections: [
        {
          id: 'anion_tests',
          title: 'كواشف الأنيونات',
          nodes: [
            {
              id: 'anions_table',
              title: 'جدول الأنيونات الشامل',
              isTable: true,
              tableData: {
                headers: ['الأيون','الكاشف','الناتج','الملاحظة'],
                rows: [
                  ['Cl⁻','AgNO₃','AgCl↓ أبيض','يذوب في NH₃'],
                  ['Br⁻','AgNO₃','AgBr↓ أصفر فاتح','يذوب ببطء في NH₃'],
                  ['I⁻','AgNO₃','AgI↓ أصفر غامق','لا يذوب في NH₃'],
                  ['CO₃²⁻','HCl مخفف','CO₂ يعكر ماء الجير','الراسب يذوب في الحمض'],
                  ['SO₄²⁻','BaCl₂ + HCl','BaSO₄↓ أبيض','لا يذوب في الحمض (تأكيدي)'],
                  ['NO₃⁻','FeSO₄ + H₂SO₄','حلقة بنية','اختبار الحلقة البنية'],
                ]
              },
              items: []
            }
          ]
        },
        {
          id: 'cation_tests',
          title: 'كواشف الكاتيونات',
          nodes: [
            {
              id: 'g3_cations',
              title: 'المجموعة 3: Fe²⁺, Fe³⁺, Al³⁺',
              clr: '#10b981',
              items: [
                '[E] Fe²⁺ + 2NH₄OH → Fe(OH)₂↓ أخضر مبلل',
                '[E] Fe³⁺ + 3NH₄OH → Fe(OH)₃↓ بني-أحمر',
                '[E] Al³⁺ + 3NH₄OH → Al(OH)₃↓ أبيض جيلاتيني',
                '[O] Al(OH)₃ يذوب في NaOH الزائد (مذبذب)',
                '[O] KSCN → أحمر دموي مع Fe³⁺ فقط (كاشف مميز)',
              ]
            },
            {
              id: 'flame_tests',
              title: 'اختبارات اللهب',
              isTable: true,
              tableData: {
                headers: ['الأيون','لون اللهب'],
                rows: [
                  ['Ca²⁺','أحمر آجور (طوبي)'],
                  ['Ba²⁺','أخضر'],
                  ['Sr²⁺','أحمر قرمزي (كرزي)'],
                  ['Na⁺','أصفر مميز'],
                  ['K⁺','بنفسجي (خلال زجاج كوبالت)'],
                  ['Cu²⁺','أزرق-أخضر'],
                ]
              },
              items: []
            }
          ]
        }
      ]
    }
  ]
};


const QUIZ_RAW = [
  { level:'سهل', q:'ما الصيغة العامة للكينات (Alkenes)؟', opts:['CₙH₂ₙ₊₂','CₙH₂ₙ₋₂','CₙH₂ₙ','CₙHₙ'], ans:2, explain:'الكينات تحتوي رابطة ثنائية واحدة؛ لذلك صيغتها CₙH₂ₙ.' },
  { level:'سهل', q:'ما لون راسب Fe(OH)₂؟', opts:['بني-أحمر','أصفر','أخضر مبلل','أبيض'], ans:2, explain:'Fe(OH)₂ أخضر مبلل ثم يتأكسد بالهواء إلى Fe(OH)₃ البني.' },
  { level:'سهل', q:'ما الكاشف المميز لـ Fe³⁺؟', opts:['NaOH','KSCN → أحمر دموي','H₂S','BaCl₂'], ans:1, explain:'KSCN يكوّن معقداً أحمر دموياً واضحاً مع Fe³⁺.' },
  { level:'متوسط', q:'لماذا يشذ الكروم في تركيبه الإلكتروني؟', opts:['لأن 4s² أكثر استقراراً','لأن نصف امتلاء 3d⁵ مع 4s¹ أكثر استقراراً','خطأ في الجدول الدوري','لأن عدده الذري 24'], ans:1, explain:'نصف الامتلاء 3d⁵ يعطي استقراراً إضافياً لذلك يصبح [Ar]4s¹3d⁵.' },
  { level:'متوسط', q:'ما ناتج تفاعل الإيثين مع KMnO₄ القلوي البارد؟', opts:['إيثانول','ثاني أكسيد الكربون','إيثيلين جلايكول HOCH₂CH₂OH','حمض الأسيتيك'], ans:2, explain:'تُضاف مجموعتا OH على الرابطة الثنائية فيتكون الجلايكول.' },
  { level:'متوسط', q:'ما السبب في خمول الحديد مع HNO₃ المركز؟', opts:['فلز نبيل','تكوين طبقة Fe₂O₃ غير مسامية','الحمض ضعيف','قلة الحرارة'], ans:1, explain:'طبقة الأكسيد السطحية تمنع تلامس الحمض مع الفلز.' },
  { level:'متوسط', q:'أي مركب يعطي مرآة فضية مع تولنز؟', opts:['CH₃COCH₃','CH₃CHO','C₂H₅OH','CH₃COOH'], ans:1, explain:'الألدهيدات تختزل أيون الفضة فتظهر المرآة الفضية.' },
  { level:'متوسط', q:'عند تسخين الإيثانول مع H₂SO₄ عند 140°C يكون الناتج الغالب:', opts:['إيثين','إيثر ثنائي إيثيل','حمض أسيتيك','ميثان'], ans:1, explain:'140°C يفضّل نزع ماء بين جزيئين كحول لتكوين الإيثر.' },
  { level:'متوسط', q:'لماذا الكينات أنشط من الكانات؟', opts:['كتلتها أقل','وجود رابطة π سهلة الكسر','ذوبانها أعلى','لونها أغمق'], ans:1, explain:'الرابطة π أقل ثباتاً من σ فتدخل بسهولة في تفاعلات الإضافة.' },
  { level:'صعب', q:'أي العبارات تشرح اختلاف الألدهيد عن الكيتون في الأكسدة؟', opts:['كلاهما يتأكسد بنفس السهولة','الألدهيد يتأكسد لحمض بينما الكيتون مقاوم نسبياً','الكيتون يتأكسد لحمض أسرع','لا علاقة بالتركيب'], ans:1, explain:'وجود H على كربون الكربونيل في الألدهيد يسهل أكسدته.' },
  { level:'صعب', q:'في تفاعل إضافة HBr إلى بروبين CH₃-CH=CH₂ (بدون بيروكسيد) الناتج الرئيسي هو:', opts:['1-برومو بروبان','2-برومو بروبان','بروبان','لا تفاعل'], ans:1, explain:'طبقاً لقاعدة ماركوفنيكوف يرتبط H بالكربون الأكثر هيدروجيناً.' },
  { level:'صعب', q:'أي خطوة تحول الإيثانال إلى إيثانول؟', opts:['أكسدة بـ KMnO₄','اختزال بـ H₂/Ni','نترتة','كلورة'], ans:1, explain:'الهدرجة/الاختزال تحول مجموعة الألدهيد إلى كحول أولي.' },
  { level:'صعب', q:'ما ناتج الصابرة لأسيتات الإيثيل CH₃COOC₂H₅ مع NaOH؟', opts:['CH₃COOH + C₂H₅OH','CH₃COONa + C₂H₅OH','CH₃CHO + C₂H₅ONa','CH₄ + CO₂'], ans:1, explain:'التحلل القلوي يعطي ملح الحمض + كحول وهو تفاعل غير عكسي.' },
  { level:'صعب', q:'لماذا لا يتفاعل البنزين عادة بتفاعلات الإضافة مثل الكينات؟', opts:['لعدم وجود π','لا يذوب في المذيبات','استقرار أروماتي بسبب الإلكترونات المنتشرة على الحلقة','كتلته كبيرة'], ans:2, explain:'حلقة البنزين مستقرة أروماتياً فتفضّل الإحلال للحفاظ على الاستقرار.' },
  { level:'صعب', q:'أي اختيار يحقق التحويل: C₂H₅OH → CH₃CHO؟', opts:['اختزال H₂/Ni','أكسدة K₂Cr₂O₇/H₂SO₄','إضافة HBr','صبغ برمنجنات'], ans:1, explain:'ثنائي كرومات في وسط حمضي يؤكسد الكحول الأولي أولاً إلى ألدهيد.' },
  { level:'صعب', q:'عند مقارنة CH₃CHO وCH₃COCH₃ أيهما أسرع في تفاعل الإضافة النيوكليوفيلية؟', opts:['الكيتون','الألدهيد','متساويان','لا يحدث إضافة'], ans:1, explain:'الألدهيد أقل إعاقـة فراغية وأقل دفعاً إلكترونياً من الكيتون.' },
  { level:'متوسط', q:'أي تفاعل يؤكد وجود مجموعة -COOH وليس فينول؟', opts:['تفاعل مع FeCl₃','تفاعل مع NaOH فقط','فوران CO₂ مع NaHCO₃','تفاعل مع Br₂/ماء'], ans:2, explain:'الأحماض الكربوكسيلية تتفاعل مع البيكربونات مطلقة CO₂ بوضوح.' },
  { level:'متوسط', q:'ما أفضل تفسير لإزالة لون البروم بواسطة الكينات؟', opts:['تكوين راسب','حدوث إحلال على الرابطة الأحادية','إضافة على الرابطة الثنائية π','تكوين معقد لوني'], ans:2, explain:'البروم يضاف على الرابطة المزدوجة فتختفي لونه المميز في المذيب.' },
];


const CARDS_RAW = [
  { topic:'انتقالية', f:'لماذا يشذ Cr وCu؟', b:'Cr: [Ar]4s¹3d⁵ وCu: [Ar]4s¹3d¹⁰\nالسبب: استقرار نصف الامتلاء/الامتلاء الكامل', unit:'transition' },
  { topic:'انتقالية', f:'بارامغناطيسي أم دايامغناطيسي؟', b:'وجود إلكترونات مفردة = بارامغناطيسي\nعدم وجود مفردة = دايامغناطيسي', unit:'transition' },
  { topic:'هيدروكربونات', f:'الصيغ العامة بسرعة', b:'كانات: CₙH₂ₙ₊₂\nكينات: CₙH₂ₙ\nكاينات: CₙH₂ₙ₋₂', unit:'hydrocarbons' },
  { topic:'هيدروكربونات', f:'كيف تفرق الكان عن الكين؟', b:'Br₂/CCl₄: الكين يزيل اللون سريعاً\nالكان لا يزيل اللون بدون UV', unit:'hydrocarbons' },
  { topic:'عضوية', f:'110°C مقابل 140°C في نزع ماء الإيثانول', b:'110°C: إيثين CH₂=CH₂\n140°C: إيثر ثنائي إيثيل C₂H₅-O-C₂H₅', unit:'org_derivatives' },
  { topic:'عضوية', f:'ألدهيد أم كيتون؟', b:'الألدهيد يعطي تولنز (+)\nالكيتون غالباً تولنز (-)', unit:'org_derivatives' },
  { topic:'عضوية', f:'مفهوم الصابرة', b:'RCOOR + NaOH → RCOONa + ROH\nتفاعل تحلل قلوي غير عكسي', unit:'org_derivatives' },
  { topic:'حديد', f:'معادلة Fe مع بخار الماء', b:'3Fe + 4H₂O →(500°C) Fe₃O₄ + 4H₂↑', unit:'iron' },
  { topic:'حديد', f:'الكاشف المميز لـ Fe³⁺', b:'KSCN يعطي لوناً أحمر دموياً واضحاً', unit:'iron' },
  { topic:'نوعي', f:'تمييز Cl⁻ / Br⁻ / I⁻', b:'AgNO₃: Cl⁻ أبيض، Br⁻ أصفر فاتح، I⁻ أصفر غامق', unit:'qualitative' },
  { topic:'عضوية', f:'مسار C₂ المختصر', b:'CaC₂ → C₂H₂ → C₂H₄ → C₂H₆\nمع H₂/Ni يتم الاختزال تدريجياً', unit:'hydrocarbons' },
  { topic:'عضوية', f:'استرة الإيثانول مع حمض الأسيتيك', b:'CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O\nحفاز: H₂SO₄ مركز', unit:'org_derivatives' },
  { topic:'عضوية', f:'كيف تفرق ألدهيد عن كيتون عملياً؟', b:'اختبار تولنز: الألدهيد (+) مرآة فضية\nالكيتون غالباً (-)', unit:'org_derivatives' },
  { topic:'عضوية', f:'قاعدة ذكية في الشروط', b:'Ni/Pt + H₂ غالباً اختزال\nH₂SO₄ مركز + تسخين غالباً نزع ماء/حفز', unit:'org_derivatives' },
  { topic:'عضوية', f:'لماذا البنزين يفضّل الإحلال؟', b:'للحفاظ على الاستقرار الأروماتي للحلقة\nالإضافة تكسر هذا الاستقرار', unit:'hydrocarbons' },
  { topic:'حديد', f:'لماذا الحديد يخمل مع HNO₃ المركز؟', b:'طبقة Fe₂O₃ غير مسامية تمنع استمرار التفاعل', unit:'iron' },
];

const TOPIC_DEFS = {
  organic_hc: { code: 'organic_hc', labelAr: 'الهيدروكربونات', unitId: 'hydrocarbons', sectionId: 'hc_overview' },
  organic_derivatives: { code: 'organic_derivatives', labelAr: 'المشتقات العضوية', unitId: 'org_derivatives', sectionId: 'func_groups' },
  transition: { code: 'transition', labelAr: 'السلسلة الانتقالية', unitId: 'transition', sectionId: 'trans_general' },
  iron: { code: 'iron', labelAr: 'الحديد', unitId: 'iron', sectionId: 'fe_basic' },
  qualitative: { code: 'qualitative', labelAr: 'التحليل النوعي', unitId: 'qualitative', sectionId: 'anion_tests' },
};

const QUIZ_TOPIC_MAP = [
  { topic: 'organic_hc', unitId: 'hydrocarbons' },
  { topic: 'iron', unitId: 'iron' },
  { topic: 'iron', unitId: 'iron' },
  { topic: 'transition', unitId: 'transition' },
  { topic: 'organic_hc', unitId: 'hydrocarbons' },
  { topic: 'iron', unitId: 'iron' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
  { topic: 'organic_hc', unitId: 'hydrocarbons' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
  { topic: 'organic_hc', unitId: 'hydrocarbons' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
  { topic: 'organic_hc', unitId: 'hydrocarbons' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
  { topic: 'organic_hc', unitId: 'hydrocarbons' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
  { topic: 'organic_derivatives', unitId: 'org_derivatives' },
];

const QUIZ = QUIZ_RAW.map((q, idx) => {
  const map = QUIZ_TOPIC_MAP[idx] || { topic: 'organic_hc', unitId: 'hydrocarbons' };
  return {
    ...q,
    id: q.id || `q_${idx + 1}`,
    topic: q.topic || map.topic,
    unitId: q.unitId || map.unitId,
    difficulty: q.difficulty || q.level || 'متوسط',
  };
});

const UNIT_TO_TOPIC = {
  hydrocarbons: 'organic_hc',
  org_derivatives: 'organic_derivatives',
  transition: 'transition',
  iron: 'iron',
  qualitative: 'qualitative',
};

const CARDS = CARDS_RAW.map((card, idx) => ({
  ...card,
  id: card.id || `fc_${idx + 1}`,
  unitId: card.unitId || card.unit,
  topicCode: card.topicCode || UNIT_TO_TOPIC[card.unitId || card.unit] || 'organic_hc',
}));

export { ItemParser, DB, QUIZ, CARDS, TOPIC_DEFS };
