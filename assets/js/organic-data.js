'use strict';

const OrganicData = {
  build(C, eqArrow, revArrow, shuffle) {
    const families = [
      {
        title: 'الألكانات',
        formula: `C${C.sub('n')}H${C.sub('2n+2')}`,
        branch: 'هيدروكربونات مشبعة',
        notes: 'تتفاعل غالبًا بالإحلال في وجود الضوء.',
        samples: [C.formula('CH4'), C.formula('C2H6')],
      },
      {
        title: 'الألكينات',
        formula: `C${C.sub('n')}H${C.sub('2n')}`,
        branch: `غير مشبعة (رابطة ${C.formula('C=C')})`,
        notes: 'تدخل تفاعلات الإضافة بسهولة.',
        samples: [C.formula('C2H4'), C.formula('C3H6')],
      },
      {
        title: 'الألكاينات',
        formula: `C${C.sub('n')}H${C.sub('2n-2')}`,
        branch: `غير مشبعة (رابطة ${C.formula('C≡C')})`,
        notes: 'تفاعلات الإضافة غالبًا على خطوتين.',
        samples: [C.formula('C2H2')],
      },
      {
        title: 'الكحولات',
        formula: 'R-OH',
        branch: 'أولي / ثانوي / ثالثي',
        notes: 'الأولي والثانوي قابلان للأكسدة، والثالثي غير قابل للأكسدة المعتادة.',
        samples: [C.formula('C2H5OH'), C.formula('C3H8O3')],
      },
      {
        title: 'الفينولات',
        formula: C.formula('C6H5OH'),
        branch: 'مركبات أروماتية',
        notes: 'حامضيتها أعلى من الكحولات وشحيح الذوبان في الماء البارد.',
        samples: [C.formula('C6H6O')],
      },
      {
        title: 'الأحماض الكربوكسيلية',
        formula: 'R-COOH',
        branch: 'أليفاتية / أروماتية',
        notes: 'تتفاعل مع القواعد والكربونات والبيكربونات.',
        samples: [C.formula('CH3COOH'), C.formula('C7H6O2')],
      },
      {
        title: 'الإسترات',
        formula: 'R-COO-R',
        branch: 'أليفاتية / أروماتية',
        notes: 'تُحضَّر بالأسترة وتتحلل مائيًا حمضيًا أو قاعديًا.',
        samples: [C.formula('CH3COOC2H5'), C.formula('C8H8O3')],
      },
      {
        title: 'الأمينات',
        formula: `R-NH${C.sub('2')}`,
        branch: 'قواعد عضوية',
        notes: 'تُكوّن أملاحًا مع الأحماض.',
        samples: [C.formula('C2H5NH2')],
      },
    ];

    const functionalGroups = [
      { name: 'الهيدروكسيل', symbol: 'OH', presentIn: 'الكحولات والفينولات', oxidation: 'يتأثر حسب نوع الكحول' },
      { name: 'الكربوكسيل', symbol: 'COOH', presentIn: 'الأحماض الكربوكسيلية', oxidation: 'غير قابل للأكسدة المعتادة' },
      { name: 'الفورميل', symbol: 'CHO', presentIn: 'الألدهيدات', oxidation: 'يتأكسد إلى COOH' },
      { name: 'الكربونيل', symbol: 'CO', presentIn: 'الكيتونات', oxidation: 'غير قابل للأكسدة المعتادة' },
      { name: 'الأمينو', symbol: `NH${C.sub('2')}`, presentIn: 'الأمينات', oxidation: 'يختلف حسب البنية' },
      { name: 'الإستر', symbol: 'COO', presentIn: 'الإسترات', oxidation: 'يميل للتحلل أكثر من الأكسدة المباشرة' },
      { name: 'الرابطة المزدوجة', symbol: C.formula('C=C'), presentIn: 'الألكينات', oxidation: 'تعطي ثنائيات هيدروكسيل' },
      { name: 'الرابطة الثلاثية', symbol: C.formula('C≡C'), presentIn: 'الألكاينات', oxidation: 'تتأكسد بعوامل قوية' },
    ];

    const generalFormulas = [
      {
        family: 'ألكان O (كحول أو إيثر)',
        formula: `C${C.sub('n')}H${C.sub('2n+2')}O`,
        note: 'قد تمثل كحولًا أو إيثرًا حسب المجموعة الوظيفية.',
      },
      {
        family: 'ألكين O (ألدهيد أو كيتون)',
        formula: `C${C.sub('n')}H${C.sub('2n')}O`,
        note: 'التفريق يكون بوجود CHO أو CO.',
      },
      {
        family: `ألكان O${C.sub('2')} (حمض أو إستر)`,
        formula: `C${C.sub('n')}H${C.sub('2n')}O${C.sub('2')}`,
        note: 'تشمل الأحماض الكربوكسيلية والإسترات.',
      },
      {
        family: `ألكان O${C.sub('3')}`,
        formula: `C${C.sub('n')}H${C.sub('2n')}O${C.sub('3')}`,
        note: `مثال: ${C.formula('C3H6O3')} (حمض اللاكتيك).`,
      },
      {
        family: 'الألكانات الحلقية',
        formula: `C${C.sub('n')}H${C.sub('2n')}`,
        note: 'أيزومرات للألكينات ومركبات مشبعة حلقية.',
      },
    ];

    const conversions = [
      { from: 'ألكان', to: 'ألكين', reagent: 'حفز حراري / نزع H₂', condition: 'Δ + عامل حفاز', type: 'حذف', trap: 'الخلط مع الإضافة.' },
      { from: 'ألكين', to: 'كحول', reagent: C.formula('H2O / H2SO4'), condition: 'وسط حمضي', type: 'إضافة ماء', trap: 'نسيان الوسط الحمضي.' },
      { from: 'كحول', to: 'ألدهيد', reagent: C.formula('K2Cr2O7 / H2SO4'), condition: 'أكسدة أولى', type: 'أكسدة', trap: 'الاستمرار لأكسدة تامة دون قصد.' },
      { from: 'ألدهيد', to: 'حمض كربوكسيلي', reagent: '[O]', condition: 'أكسدة تامة', type: 'أكسدة', trap: 'اعتبار الألدهيد الناتج النهائي.' },
      { from: 'حمض كربوكسيلي + كحول', to: 'إستر + H₂O', reagent: C.formula('H2SO4(conc)'), condition: 'تسخين + سحب ماء', type: 'أسترة', trap: 'نسيان أن التفاعل عكسي.' },
      { from: 'هاليد ألكيل', to: 'كحول', reagent: 'NaOH(aq)', condition: 'تسخين معتدل', type: 'إحلال', trap: 'استخدام NaOH كحولي بدل مائي.' },
      { from: C.formula('C2H4'), to: C.formula('C2H5OH'), reagent: C.formula('H2O / H2SO4'), condition: 'إضافة ماء', type: 'إضافة', trap: 'الخلط مع الهدرجة.' },
      { from: C.formula('C2H5OH'), to: C.formula('CH3COOH'), reagent: C.formula('K2Cr2O7 / H2SO4'), condition: 'أكسدة متدرجة', type: 'أكسدة', trap: `نسيان الوسيط ${C.formula('CH3CHO')}.` },
    ];

    const c2Path = [
      { formula: C.formula('CaC2'), name: 'كربيد الكالسيوم', family: 'مركب غير عضوي', note: 'بداية سلسلة C₂.' },
      { formula: C.formula('C2H2'), name: 'إيثاين', family: 'ألكاين', note: 'ناتج تفاعل كربيد الكالسيوم مع الماء.' },
      { formula: C.formula('C2H4'), name: 'إيثين', family: 'ألكين', note: 'ناتج هدرجة جزئية.' },
      { formula: C.formula('C2H5OH'), name: 'إيثانول', family: 'كحول أولي', note: 'ناتج إضافة الماء للإيثين.' },
      { formula: C.formula('CH3CHO'), name: 'إيثانال', family: 'ألدهيد', note: 'ناتج الأكسدة الأولى.' },
      { formula: C.formula('CH3COOH'), name: 'حمض إيثانويك', family: 'حمض كربوكسيلي', note: 'ناتج الأكسدة الثانية.' },
      { formula: C.formula('CH3COOC2H5'), name: 'إيثيل إيثانوات', family: 'إستر', note: 'ناتج الأسترة مع الإيثانول.' },
    ];

    const c2Arrows = [
      { reagent: C.formula('H2O'), condition: 'إضافة ماء', type: 'CaC₂ → C₂H₂' },
      { reagent: C.formula('H2 / Ni'), condition: 'هدرجة', type: 'C₂H₂ → C₂H₄' },
      { reagent: C.formula('H2O / H2SO4'), condition: 'وسط حمضي', type: 'إضافة ماء: C₂H₄ → C₂H₅OH' },
      { reagent: '[O]', condition: 'أكسدة أولى', type: 'C₂H₅OH → CH₃CHO' },
      { reagent: '[O]', condition: 'أكسدة ثانية', type: 'CH₃CHO → CH₃COOH' },
      { reagent: `+ ${C.formula('C2H5OH / H2SO4 conc')}`, condition: 'تسخين', type: 'CH₃COOH → CH₃COOC₂H₅' },
    ];

    const reagents = [
      { name: C.formula('H2 / Ni'), use: 'هدرجة الروابط غير المشبعة', condition: 'تسخين + حفاز Ni', expected: 'تحويل غير المشبع إلى أكثر تشبعًا', trap: 'نسيان الحفاز.' },
      { name: C.formula('H2O / H2SO4'), use: 'إضافة الماء للألكينات', condition: 'وسط حمضي', expected: 'ألكين → كحول', trap: 'استبدال H₂SO₄ بـ NaOH.' },
      { name: C.formula('Br2'), use: 'اختبار/إضافة على C=C', condition: 'وسط مناسب', expected: 'زوال اللون وتكوين ناتج إضافة', trap: 'تطبيقه على الألكانات بلا شروط.' },
      { name: C.formula('KMnO4'), use: 'أكسدة/اختبار عدم التشبع', condition: 'وسط مناسب', expected: 'تغير اللون ونواتج أكسدة', trap: 'الخلط مع ثنائي كرومات.' },
      { name: C.formula('K2Cr2O7'), use: 'أكسدة الكحولات الأولية/الثانوية', condition: `${C.formula('H2SO4')} + تسخين`, expected: 'ألدهيد/حمض أو كيتون', trap: 'عدم التفرقة بين الأولى والثانية.' },
      { name: C.formula('H2SO4 conc'), use: 'حفز الأسترة ونزع الماء', condition: 'مركز + تسخين', expected: 'إستر أو ألكين', trap: 'نسيان أنه ساحب للماء.' },
      { name: 'NaOH(aq)', use: 'إحلال هاليد الألكيل', condition: 'وسط مائي', expected: 'هاليد ألكيل → كحول', trap: 'استخدام وسط كحولي.' },
      { name: 'ثنائي كرومات مُحمَّض', use: 'أكسدة عضوية قياسية', condition: 'وسط حمضي', expected: 'نواتج أكسدة مناسبة', trap: 'الخلط بينه وبين KMnO₄ في نفس الشرط.' },
    ];

    const comparisonTables = [
      { title: 'ألكان مقابل ألكين', diff: 'الألكان مشبع، الألكين غير مشبع.', test: 'ماء البروم', example: `${C.formula('C2H6')} مقابل ${C.formula('C2H4')}`, trap: 'توقع إضافة للألكان.' },
      { title: 'كحول أولي مقابل كحول ثانوي', diff: 'الأولي يؤكسد إلى ألدهيد/حمض، الثانوي إلى كيتون.', test: 'نواتج الأكسدة', example: `${C.formula('C2H5OH')} مقابل ${C.formula('CH3CHOHCH3')}`, trap: 'اعتبار الناتج واحدًا.' },
      { title: 'ألدهيد مقابل كيتون', diff: 'الألدهيد أسهل أكسدة.', test: 'تجارب الأكسدة العامة', example: `${C.formula('CH3CHO')} مقابل ${C.formula('CH3COCH3')}`, trap: 'مساواة سلوكهما دائمًا.' },
      { title: 'حمض كربوكسيلي مقابل إستر', diff: 'الحمض أكثر حمضية وتفاعلًا مع القواعد.', test: 'التفاعل مع البيكربونات', example: `${C.formula('CH3COOH')} مقابل ${C.formula('CH3COOC2H5')}`, trap: 'اعتبار الإستر حمضًا.' },
      { title: 'إضافة مقابل إحلال', diff: 'الإضافة على روابط غير مشبعة، والإحلال يستبدل مجموعة.', test: 'نوع الركيزة', example: `${C.formula('C2H4 + Br2')} (إضافة)`, trap: 'استخدام نفس القاعدة لكل المركبات.' },
      { title: 'أكسدة مقابل اختزال', diff: 'الأكسدة غالبًا زيادة O أو نقص H، والاختزال العكس.', test: 'تتبع الصيغة', example: `${C.formula('C2H5OH')} ${eqArrow} ${C.formula('CH3CHO')}`, trap: 'عكس المصطلحين.' },
    ];

    const aromaticCompounds = [
      { name: 'البنزين', formula: C.formula('C6H6'), note: 'يحتوي 3 روابط باي.' },
      { name: 'الفينول', formula: C.formula('C6H6O'), note: 'يكشف عنه بماء البروم (راسب أبيض) وكلوريد الحديد الثلاثي (بنفسجي).' },
      { name: 'كلورو بنزين', formula: C.formula('C6H5Cl'), note: 'ناتج إحلال في الحلقة الأروماتية.' },
      { name: 'نترو بنزين', formula: C.formula('C6H5NO2'), note: 'ناتج نترتة البنزين.' },
      { name: 'كلورو تولوين', formula: C.formula('C7H7Cl'), note: 'مشتق من التولوين.' },
      { name: 'أورثو/بارا نترو تولوين', formula: C.formula('C7H7NO2'), note: 'يوجهه CH₃ لأورثو/بارا.' },
      { name: 'حمض بنزين سلفونيك', formula: C.formula('C6H6O3S'), note: 'ناتج سلفنة البنزين.' },
      { name: 'حمض البنزويك', formula: C.formula('C7H6O2'), note: 'حمض أروماتي أحادي القاعدية.' },
      { name: 'حمض السالسليك', formula: C.formula('C7H6O3'), note: 'حمض أروماتي يدخل في تحضير الأسبرين.' },
      { name: 'حمض التري فثاليك', formula: C.formula('C8H6O4'), note: 'يتفاعل مع الإيثيلين جليكول لتكوين الداكرون.' },
      { name: 'كاتيكول', formula: C.formula('C6H6O2'), note: 'من مشتقات الفينول ثنائية الهيدروكسيل.' },
      { name: 'بيروجالول', formula: C.formula('C6H6O3'), note: 'من مشتقات الفينول ثلاثية الهيدروكسيل.' },
    ];

    const polymers = [
      { monomer: 'الإيثين', polymer: 'بولي إيثيلين (PE)', type: 'إضافة', uses: 'الأكياس البلاستيكية والزجاجات.' },
      { monomer: 'البروبين', polymer: 'بولي بروبيلين (PP)', type: 'إضافة', uses: 'المفارش والسجاد والمعلبات.' },
      { monomer: 'كلوروإيثين', polymer: 'بولي فينيل كلوريد (PVC)', type: 'إضافة', uses: 'مواسير الصرف والعوازل.' },
      { monomer: 'رباعي فلوروإيثين', polymer: 'تفلون', type: 'إضافة', uses: 'تبطين أواني الطهي.' },
      { monomer: 'فينول + فورمالدهيد', polymer: 'باكليت', type: 'تكاثف', uses: 'الأدوات الكهربية.' },
      { monomer: 'إيثيلين جليكول + حمض تيرفثاليك', polymer: 'داكرون', type: 'تكاثف', uses: 'الألياف الصناعية وصمامات القلب.' },
    ];

    const preparationMethods = [
      { title: 'تحضير الألكانات', method: 'التقطير الجاف', product: 'ألكانات', note: 'طريقة معملية شائعة.' },
      { title: 'تحضير الألكينات', method: 'نزع الماء من الكحولات', product: 'ألكينات', note: 'عند 180°C يعطي ألكين.' },
      { title: 'تحضير الإيثاين', method: `تقطير الماء على ${C.formula('CaC2')}`, product: C.formula('C2H2'), note: 'من التحضيرات الأساسية.' },
      { title: 'تحضير التولوين', method: 'إعادة التشكيل الحفزي للهبتان أو ألكلة البنزين', product: C.formula('C7H8'), note: 'وردت الطريقتان في المحتوى المرفق.' },
      { title: 'تحضير حمض البنزويك', method: 'أكسدة التولوين', product: C.formula('C7H6O2'), note: 'تحويل طرفي للسلسلة الجانبية.' },
      { title: 'تحضير الإستر', method: 'حمض + كحول بوجود H₂SO₄ مركز', product: 'إستر + ماء', note: 'تفاعل عكسي يحتاج سحب ماء.' },
      { title: 'تحضير الداكرون', method: 'تفاعل حمض التري فثاليك مع الإيثيلين جليكول', product: 'داكرون', note: 'بلمرة تكاثف.' },
      { title: 'تحضير الأسبرين', method: 'تفاعل حمض السالسليك مع حمض الأسيتيك (أنهيدريد/مشتق مناسب)', product: 'أسبرين (أسيتيل ساليسيليك)', note: 'تحويل مجموعة OH الفينولية.' },
      { title: 'تحضير زيت المروج', method: 'تفاعل حمض السالسليك مع الكحول الميثيلي', product: 'ساليسيلات الميثيل', note: 'تفاعل أسترة.' },
    ];

    const reactions = [
      { title: 'هدرجة البنزين', equation: `${C.formula('C6H6')} + 3${C.formula('H2')} ${eqArrow} ${C.formula('C6H12')}`, type: 'إضافة', condition: 'حفاز مناسب' },
      { title: 'هالوجنة البنزين بالإضافة', equation: `${C.formula('C6H6')} + 3${C.formula('Cl2')} ${eqArrow} ${C.formula('C6H6Cl6')}`, type: 'إضافة', condition: 'وجود الضوء' },
      { title: 'هالوجنة البنزين بالإحلال', equation: `${C.formula('C6H6')} + ${C.formula('Cl2')} ${eqArrow} ${C.formula('C6H5Cl')} + HCl`, type: 'إحلال', condition: 'عامل حفاز' },
      { title: 'ألكلة البنزين', equation: `${C.formula('C6H6')} + ${C.formula('CH3Cl')} ${eqArrow} ${C.formula('C7H8')} + HCl`, type: 'إحلال', condition: 'حفاز لويس' },
      { title: 'نترتة البنزين', equation: `${C.formula('C6H6')} + HNO${C.sub('3')} ${eqArrow} ${C.formula('C6H5NO2')} + ${C.formula('H2O')}`, type: 'إحلال', condition: `${C.formula('H2SO4')} مركز` },
      { title: 'أكسدة التولوين', equation: `${C.formula('C7H8')} + [O] ${eqArrow} ${C.formula('C7H6O2')}`, type: 'أكسدة', condition: 'عامل مؤكسد مناسب' },
      { title: 'أسترة حمض الإيثانويك', equation: `${C.formula('CH3COOH')} + ${C.formula('C2H5OH')} ${revArrow} ${C.formula('CH3COOC2H5')} + ${C.formula('H2O')}`, type: 'أسترة عكسية', condition: `${C.formula('H2SO4')} مركز + تسخين` },
      { title: 'نزع الماء من الإيثانول', equation: `${C.formula('C2H5OH')} ${eqArrow} ${C.formula('C2H4')} + ${C.formula('H2O')}↑`, type: 'حذف', condition: 'عند 180°C' },
      { title: 'نزع الماء من الإيثانول (إيثر)', equation: `2${C.formula('C2H5OH')} ${eqArrow} ${C.formula('C2H5OC2H5')} + ${C.formula('H2O')}`, type: 'تكاثف', condition: 'عند 140°C' },
      { title: 'تحلل الإستر مائيًا حمضيًا', equation: `R-COO-R + ${C.formula('H2O')} ${revArrow} حمض + كحول`, type: 'تحلل', condition: 'وسط حمضي' },
      { title: 'تحلل الإستر مائيًا قاعديًا', equation: `R-COO-R + NaOH ${eqArrow} ملح + كحول`, type: 'تصبن', condition: 'وسط قاعدي' },
    ];

    const oxidationReduction = [
      { species: 'كحول أولي', oxidation: 'أكسدة جزئية → ألدهيد، أكسدة تامة → حمض كربوكسيلي', reduction: '—' },
      { species: 'كحول ثانوي', oxidation: 'يتأكسد إلى كيتون', reduction: '—' },
      { species: 'كحول ثالثي', oxidation: 'غير قابل للأكسدة المعتادة', reduction: '—' },
      { species: 'ألدهيد (CHO)', oxidation: 'يتأكسد إلى COOH', reduction: 'يُختزل إلى كحول أولي' },
      { species: 'كيتون (CO)', oxidation: 'غير قابل للأكسدة المعتادة', reduction: 'يُختزل إلى كحول ثانوي' },
      { species: 'الرابطة المزدوجة C=C', oxidation: 'تعطي ثنائي هيدروكسيل', reduction: 'تُختزل بإضافة H₂ إلى ألكان' },
      { species: 'الكربوكسيل COOH', oxidation: 'غير قابل للأكسدة المعتادة', reduction: 'يُختزل بشروط قوية إلى مشتقات أقل أكسدة' },
    ];

    const practicalTests = [
      {
        title: 'التمييز بين الكحول والإيثر',
        rows: [
          { test: 'إضافة قطعة صوديوم', alcohol: 'يتفاعل ويتصاعد H₂', ether: 'لا يتفاعل' },
          { test: `إضافة ${C.formula('KMnO4')} في وسط حمضي`, alcohol: 'يزول اللون البنفسجي (عدا الثالثي)', ether: 'لا يزول اللون البنفسجي' },
          { test: `إضافة ${C.formula('K2Cr2O7')}`, alcohol: 'يتحول البرتقالي إلى أخضر (عدا الثالثي)', ether: 'يبقى اللون كما هو' },
        ],
      },
      {
        title: 'التمييز بين الكحولات (أولي/ثانوي/ثالثي)',
        rows: [
          { test: `إضافة ${C.formula('KMnO4')} في وسط حمضي`, first: 'يزول اللون', second: 'يزول اللون البنفسجي', third: 'لا يزول اللون' },
          { test: `إضافة ${C.formula('K2Cr2O7')}`, first: 'يتحول إلى أخضر', second: 'قد يتحول ويعطي ناتج أكسدة مناسب', third: 'يبقى اللون كما هو' },
        ],
      },
      {
        title: 'التمييز بين الفينول والبنزين',
        rows: [
          { test: 'ماء البروم', first: 'الفينول يعطي راسبًا أبيض', second: 'البنزين لا يتفاعل مباشرة' },
          { test: 'كلوريد الحديد الثلاثي', first: 'الفينول يعطي لونًا بنفسجيًا', second: 'البنزين لا يعطي اللون البنفسجي' },
        ],
      },
    ];

    const commonMistakes = [
      `الخلط بين ${C.formula('C2H2')} و ${C.formula('C2H4')} في مسار C₂.`,
      `نسيان شروط الهدرجة ${C.formula('H2 / Ni')}.`,
      'الخلط بين الأكسدة الأولى والثانية للكحولات الأولية.',
      `نسيان أن الأسترة تفاعل عكسي ${revArrow}.`,
      'اعتبار الكحول الثالثي قابلًا للأكسدة المعتادة.',
      'عكس اتجاه السهم في التحويلات المتسلسلة.',
      'الخلط بين تفاعلات الإضافة والإحلال في البنزين.',
    ];

    const quickFacts = [
      `حمض السالسليك ${C.formula('C7H6O3')} حمض أروماتي ويُستخدم في تحضير الأسبرين.`,
      `حمض اللاكتيك ${C.formula('C3H6O3')} من الأحماض الأليفاتية الوظيفية.`,
      `حمض التري فثاليك ${C.formula('C8H6O4')} يتفاعل مع الإيثيلين جليكول لتكوين الداكرون.`,
      `حمض الستريك ${C.formula('C6H8O7')} حمض ثلاثي القاعدية.`,
      `الأحماض > الفينولات > الكحولات في الحامضية (تقريبًا حسب المنهج).`,
      `ترتيب الغليان (عند تقارب الكتلة): أحماض > كحولات > إسترات.`,
      `البنزين العطري يتفاعل بالإضافة والإحلال تبعًا للظروف.`,
      `تفكك الألكانات حراريًا (تكسير حفزي) يعطي مركبات أخف (ألكان + ألكين).`,
      `احتراق الألكان: مولات بخار الماء = (n + 1) ومولات ${C.formula('CO2')} = n.`,
      `احتراق الألكين: مولات بخار الماء = n ومولات ${C.formula('CO2')} = n.`,
      `احتراق الألكاين: مولات بخار الماء = (n - 1) ومولات ${C.formula('CO2')} = n.`,
    ];

    const aromaticGuide = [
      { name: 'أي مجموعة تحتوي O توجه غالبًا أورثو/بارا (ماعدا OH بحسب الحالة التعليمية)', note: 'قاعدة توجيهية مختصرة للمنهج.' },
      { name: 'مجموعة CH₃ على الحلقة توجه أورثو/بارا', note: 'مثال: نترتة التولوين تعطي أورثو/بارا نترو تولوين.' },
      { name: 'سلفنة البنزين', note: 'تفاعل البنزين مع حمض الكبريتيك لإنتاج حمض بنزين سلفونيك.' },
    ];

    const lessons = [
      {
        title: 'إضافة البروم إلى الإيثين',
        equation: `${C.formula('C2H4')} + ${C.formula('Br2')} ${eqArrow} ${C.formula('C2H4Br2')}`,
        reagent: C.formula('Br2'),
        steps: [
          { t: 'المتفاعلات', d: 'إيثين + بروم', ch: 'الرابطة المزدوجة هي الموقع النشط.' },
          { t: 'ما الذي يتغير؟', d: 'تنكسر π وتتكون روابط C-Br', ch: 'الناتج يصبح مشبعًا.' },
          { t: 'الخلاصة', d: 'تفاعل إضافة', ch: 'يُستخدم في تفسير زوال لون البروم.' },
        ],
        trap: 'تطبيق نفس السلوك على الألكان دون شروط.',
      },
      {
        title: 'أكسدة الإيثانول إلى إيثانال ثم حمض إيثانويك',
        equation: `${C.formula('C2H5OH')} ${eqArrow} ${C.formula('CH3CHO')} ${eqArrow} ${C.formula('CH3COOH')}`,
        reagent: C.formula('K2Cr2O7 / H2SO4'),
        steps: [
          { t: 'الأكسدة الأولى', d: 'كحول أولي → ألدهيد', ch: 'يتكون CH₃CHO كوسيط.' },
          { t: 'الأكسدة الثانية', d: 'ألدهيد → حمض', ch: 'يتكون CH₃COOH.' },
          { t: 'الخلاصة', d: 'مدة التسخين مهمة', ch: 'الإيقاف المبكر يحافظ على الألدهيد.' },
        ],
        trap: 'الخلط بين الناتج الوسيط والنهائي.',
      },
      {
        title: 'الأسترة: حمض + كحول',
        equation: `${C.formula('CH3COOH')} + ${C.formula('C2H5OH')} ${revArrow} ${C.formula('CH3COOC2H5')} + ${C.formula('H2O')}`,
        reagent: `${C.formula('H2SO4 conc')} + تسخين`,
        steps: [
          { t: 'تجهيز المجموعات', d: 'COOH مع OH', ch: 'تتكون رابطة الإستر.' },
          { t: 'تكوّن الماء', d: 'خروج H₂O', ch: 'سحب الماء يدفع الاتزان للنواتج.' },
          { t: 'الخلاصة', d: 'تفاعل عكسي', ch: 'يرمز له بـ ⇌.' },
        ],
        trap: 'نسيان الطبيعة العكسية للتفاعل.',
      },
      {
        title: 'إضافة الماء إلى الإيثين',
        equation: `${C.formula('C2H4')} + ${C.formula('H2O')} ${eqArrow} ${C.formula('C2H5OH')}`,
        reagent: C.formula('H2SO4 (aq)'),
        steps: [
          { t: 'المتفاعلات', d: 'إيثين + ماء', ch: 'الإضافة تتم على C=C.' },
          { t: 'الشرط', d: 'وسط حمضي', ch: 'أساسي لتمام التحويل.' },
          { t: 'الخلاصة', d: 'يتكون الإيثانول', ch: 'تحويل أساسي متكرر في الامتحان.' },
        ],
        trap: `الخلط مع الهدرجة بـ ${C.formula('H2 / Ni')}.`,
      },
    ];

    const reagentChoices = [
      { key: 'a', label: C.formula('H2/Ni') },
      { key: 'b', label: C.formula('H2O/H2SO4') },
      { key: 'c', label: C.formula('Br2') },
      { key: 'd', label: 'NaOH(aq)' },
    ];

    const groups = functionalGroups.map(item => ({
      name: item.name,
      formula: item.symbol,
      example: item.presentIn,
      key: item.oxidation,
      trap: 'راجع المجموعة الوظيفية قبل اختيار التفاعل.',
    }));

    const comparisons = comparisonTables;
    const mistakes = commonMistakes;

    return {
      groups,
      conversions,
      c2Path,
      c2Arrows,
      reagents,
      comparisons,
      mistakes,
      lessons,
      reagentChoices,

      families,
      functionalGroups,
      generalFormulas,
      reactions,
      preparationMethods,
      comparisonTables,
      aromaticCompounds,
      polymers,
      oxidationReduction,
      practicalTests,
      aromaticGuide,
      commonMistakes,
      quickFacts,
    };
  },
};

export { OrganicData };
