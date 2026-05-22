'use strict';

const OrganicData = {
  build(C, eqArrow, revArrow, shuffle) {
    const groups = [
      { name: 'الهيدروكربونات', formula: 'C' + C.sub('n') + 'H' + C.sub('2n+2 / 2n / 2n-2'), example: C.formula('C2H4') + ' (إيثين)', key: 'إضافة/استبدال حسب نوع الرابطة', trap: 'الخلط بين المشبع وغير المشبع.' },
      { name: 'هاليدات الألكيل', formula: 'R-X', example: C.formula('C2H5Cl'), key: 'إحلال نوكليوفيلي إلى كحولات', trap: 'نسيان أن الوسط المائي يختلف عن الكحولي.' },
      { name: 'الكحولات', formula: 'R-OH', example: C.formula('C2H5OH'), key: 'أكسدة أو نزع ماء', trap: 'عدم التمييز بين أولي/ثانوي/ثالثي.' },
      { name: 'الألدهيدات', formula: 'R-CHO', example: C.formula('CH3CHO'), key: 'تتأكسد إلى أحماض كربوكسيلية', trap: 'اعتبارها كيتونات في كل التفاعلات.' },
      { name: 'الكيتونات', formula: 'R-CO-R', example: C.formula('CH3COCH3'), key: 'إضافة على مجموعة الكربونيل', trap: 'الخلط بينها وبين الألدهيدات في الأكسدة.' },
      { name: 'الأحماض الكربوكسيلية', formula: 'R-COOH', example: C.formula('CH3COOH'), key: 'أسترة وتكوين أملاح', trap: 'نسيان أن الأسترة غالبًا عكسية.' },
      { name: 'الإسترات', formula: 'R-COO-R', example: C.formula('CH3COOC2H5'), key: 'تحلل مائي/تصبن', trap: 'اعتبار الإستر حمضيًا مثل الحمض.' },
      { name: 'الأمينات', formula: 'R-NH' + C.sub('2'), example: C.formula('C2H5NH2'), key: 'خواص قاعدية وتكوين أملاح', trap: 'الخلط بين الأمين والأميد.' },
    ];

    const families = [
      {
        title: 'الألكانات',
        formula: 'C' + C.sub('n') + 'H' + C.sub('2n+2'),
        branch: 'مشبعة',
        notes: 'تتفاعل غالبًا بالاستبدال في وجود الضوء.',
        samples: [C.formula('CH4'), C.formula('C2H6')],
      },
      {
        title: 'الألكينات',
        formula: 'C' + C.sub('n') + 'H' + C.sub('2n'),
        branch: 'غير مشبعة (رابطة ' + 'C=C' + ')',
        notes: 'تتفاعل بالإضافة ويمكن أكسدتها.',
        samples: [C.formula('C2H4'), C.formula('C3H6')],
      },
      {
        title: 'الألكاينات',
        formula: 'C' + C.sub('n') + 'H' + C.sub('2n-2'),
        branch: 'غير مشبعة (رابطة ' + 'C≡C' + ')',
        notes: 'تتفاعل بالإضافة غالبًا على خطوتين.',
        samples: [C.formula('C2H2')],
      },
      {
        title: 'الكحولات',
        formula: 'R-OH',
        branch: 'أولي/ثانوي/ثالثي',
        notes: 'تتفاعل مع الصوديوم وتدخل في الأكسدة حسب النوع.',
        samples: [C.formula('C2H5OH'), C.formula('C3H8O3')],
      },
      {
        title: 'الفينولات',
        formula: C.formula('C6H5OH'),
        branch: 'أروماتية',
        notes: 'أعلى حامضية من الكحولات وشحيحة الذوبان في الماء البارد.',
        samples: [C.formula('C6H6O')],
      },
      {
        title: 'الأحماض الكربوكسيلية',
        formula: 'R-COOH',
        branch: 'أليفاتية/أروماتية',
        notes: 'تعطي أملاحًا مع القواعد والكربونات والبيكربونات.',
        samples: [C.formula('CH3COOH'), C.formula('C7H6O2')],
      },
      {
        title: 'الإسترات',
        formula: 'R-COO-R',
        branch: 'عطرية وأليفاتية',
        notes: 'تتحلل مائيًا حمضيًا أو قاعديًا.',
        samples: [C.formula('CH3COOC2H5'), C.formula('C8H8O3')],
      },
      {
        title: 'المركبات الأروماتية',
        formula: C.formula('C6H6') + ' ومشتقاته',
        branch: 'بنزين ومشتقاته',
        notes: 'تدخل تفاعلات إحلال، وقد تدخل إضافة في ظروف خاصة.',
        samples: [C.formula('C6H6'), C.formula('C7H8')],
      },
    ];

    const functionalGroups = [
      { name: 'الهيدروكسيل', symbol: 'OH', presentIn: 'الكحولات والفينولات', oxidation: 'يتأثر حسب نوع الكحول', notes: 'يزيد القطبية والذوبان في أول السلسلة.' },
      { name: 'الكربوكسيل', symbol: 'COOH', presentIn: 'الأحماض الكربوكسيلية', oxidation: 'غير قابل للأكسدة غالبًا', notes: 'يعطي أملاحًا ويتفاعل مع القواعد.' },
      { name: 'الكربونيل (ألدهيد)', symbol: 'CHO', presentIn: 'الألدهيدات', oxidation: 'يتأكسد إلى حمض', notes: 'يمكن اختزاله إلى كحول أولي.' },
      { name: 'الكربونيل (كيتون)', symbol: 'CO', presentIn: 'الكيتونات', oxidation: 'غير قابل للأكسدة في الظروف المعتادة', notes: 'يُختزل إلى كحول ثانوي.' },
      { name: 'الأمينو', symbol: 'NH' + C.sub('2'), presentIn: 'الأمينات', oxidation: 'يختلف حسب البنية', notes: 'مجموعة قاعدية.' },
      { name: 'الإستر', symbol: 'COO', presentIn: 'الإسترات', oxidation: 'يتحلل أكثر من أن يتأكسد مباشرة', notes: 'يتكون من حمض + كحول.' },
      { name: 'الرابطة المزدوجة', symbol: 'C=C', presentIn: 'الألكينات', oxidation: 'تتأكسد إلى ثنائيات هيدروكسيل', notes: 'تدخل تفاعلات إضافة.' },
      { name: 'الرابطة الثلاثية', symbol: 'C≡C', presentIn: 'الألكاينات', oxidation: 'تتأكسد بمواد مؤكسدة قوية', notes: 'تتفاعل بالإضافة غالبًا على خطوتين.' },
    ];

    const generalFormulas = [
      { family: 'الألكان O (كحول أو إيثر)', formula: 'C' + C.sub('n') + 'H' + C.sub('2n+2') + 'O', note: 'يتشابه مع الإيثر في الصيغة الجزيئية.' },
      { family: 'الألكين O (ألدهيد أو كيتون)', formula: 'C' + C.sub('n') + 'H' + C.sub('2n') + 'O', note: 'يتحدد النوع بالمجموعة الوظيفية (CHO أو CO).' },
      { family: 'الألكان O' + C.sub('2') + ' (حمض أو إستر)', formula: 'C' + C.sub('n') + 'H' + C.sub('2n') + 'O' + C.sub('2'), note: 'يشمل الأحماض والإسترات.' },
      { family: 'الألكان O' + C.sub('3') + ' (مثل اللاكتيك)', formula: 'C' + C.sub('n') + 'H' + C.sub('2n') + 'O' + C.sub('3'), note: 'مثال واضح: ' + C.formula('C3H6O3') + '.' },
      { family: 'الألكانات الحلقية', formula: 'C' + C.sub('n') + 'H' + C.sub('2n'), note: 'أيزومرات للألكينات ومركبات مشبعة حلقية.' },
    ];

    const conversions = [
      { from: 'Alkane', to: 'Alkene', reagent: 'حفز حراري / نزع H' + C.sub('2'), condition: 'Δ + عامل حفاز مناسب', type: 'حذف', trap: 'اعتبارها إضافة.' },
      { from: 'Alkene', to: 'Alcohol', reagent: C.formula('H2O / H2SO4'), condition: 'وسط حمضي', type: 'إضافة', trap: 'نسيان شرط الحمض.' },
      { from: 'Alcohol', to: 'Aldehyde', reagent: C.formula('K2Cr2O7 / H2SO4'), condition: 'أكسدة أولية', type: 'أكسدة', trap: 'الاستمرار للأكسدة الثانية دون قصد.' },
      { from: 'Aldehyde', to: 'Carboxylic acid', reagent: '[O]', condition: 'تسخين أطول', type: 'أكسدة', trap: 'الخلط بين الناتج الوسيط والنهائي.' },
      { from: 'Carboxylic acid + Alcohol', to: 'Ester + H' + C.sub('2') + 'O', reagent: C.formula('H2SO4(conc)'), condition: 'تسخين + سحب ماء', type: 'أسترة', trap: 'نسيان أنها عكسية (⇌).' },
      { from: 'Haloalkane', to: 'Alcohol', reagent: 'NaOH(aq)', condition: 'تسخين معتدل', type: 'إحلال', trap: 'استخدام NaOH كحولي بالخطأ.' },
      { from: C.formula('C2H4'), to: C.formula('C2H5OH'), reagent: C.formula('H2O / H2SO4'), condition: 'Hydration', type: 'إضافة ماء', trap: 'الخلط مع الهدرجة.' },
      { from: C.formula('C2H5OH'), to: C.formula('CH3COOH'), reagent: C.formula('K2Cr2O7 / H2SO4'), condition: 'أكسدة متدرجة', type: 'أكسدة', trap: 'نسيان خطوة CH' + C.sub('3') + 'CHO الوسيطة.' },
      { from: 'Benzene', to: 'مشتقات بنزين', reagent: 'Cl' + C.sub('2') + ' / FeCl' + C.sub('3'), condition: 'استبدال عطري', type: 'إحلال', trap: 'اعتبار البنزين يدخل إضافة مباشرة دائمًا.' },
    ];

    const reactions = [
      {
        title: 'هدرجة البنزين',
        equation: C.formula('C6H6') + ' + 3' + C.formula('H2') + ' ' + eqArrow + ' ' + C.formula('C6H12'),
        type: 'إضافة (تحت ظروف خاصة)',
        condition: 'حفاز مناسب',
      },
      {
        title: 'هالوجنة البنزين بالإضافة',
        equation: C.formula('C6H6') + ' + 3' + C.formula('Cl2') + ' ' + eqArrow + ' ' + C.formula('C6H6Cl6'),
        type: 'إضافة',
        condition: 'وجود الضوء',
      },
      {
        title: 'هالوجنة البنزين بالاستبدال',
        equation: C.formula('C6H6') + ' + ' + C.formula('Cl2') + ' ' + eqArrow + ' ' + C.formula('C6H5Cl') + ' + HCl',
        type: 'استبدال',
        condition: 'وجود عامل حفاز',
      },
      {
        title: 'أكسدة التولوين',
        equation: C.formula('C7H8') + ' + [O] ' + eqArrow + ' ' + C.formula('C7H6O2'),
        type: 'أكسدة',
        condition: 'عامل مؤكسد مناسب',
      },
      {
        title: 'أسترة حمض الإيثانويك مع الإيثانول',
        equation: C.formula('CH3COOH') + ' + ' + C.formula('C2H5OH') + ' ' + revArrow + ' ' + C.formula('CH3COOC2H5') + ' + ' + C.formula('H2O'),
        type: 'أسترة عكسية',
        condition: C.formula('H2SO4') + ' مركز + تسخين',
      },
      {
        title: 'نزع الماء من الكحول',
        equation: C.formula('C2H5OH') + ' ' + eqArrow + ' ' + C.formula('C2H4') + ' + ' + C.formula('H2O') + '↑',
        type: 'حذف',
        condition: 'عند ' + C.sub('180') + '°C',
      },
      {
        title: 'تحلل الإستر تحللًا مائيًا حمضيًا',
        equation: 'R-COO-R + ' + C.formula('H2O') + ' ' + revArrow + ' حمض + كحول',
        type: 'تحلل',
        condition: 'وسط حمضي',
      },
      {
        title: 'تحلل الإستر تحللًا مائيًا قاعديًا',
        equation: 'R-COO-R + NaOH ' + eqArrow + ' ملح + كحول',
        type: 'تصبن',
        condition: 'وسط قاعدي',
      },
    ];

    const oxidationReduction = [
      {
        species: 'كحول أولي',
        oxidation: 'أكسدة جزئية ' + eqArrow + ' ألدهيد، أكسدة تامة ' + eqArrow + ' حمض كربوكسيلي',
        reduction: 'غير مطبق عادة',
      },
      {
        species: 'كحول ثانوي',
        oxidation: 'يتأكسد إلى كيتون',
        reduction: 'غير مطبق عادة',
      },
      {
        species: 'كحول ثالثي',
        oxidation: 'غير قابل للأكسدة في الظروف المعتادة',
        reduction: 'غير مطبق عادة',
      },
      {
        species: 'ألدهيد (CHO)',
        oxidation: 'يتأكسد إلى حمض كربوكسيلي',
        reduction: 'يُختزل إلى كحول أولي',
      },
      {
        species: 'كيتون (CO)',
        oxidation: 'غير قابل للأكسدة المعتادة',
        reduction: 'يُختزل إلى كحول ثانوي',
      },
      {
        species: 'الرابطة المزدوجة (C=C)',
        oxidation: 'تعطي ثنائي هيدروكسيل',
        reduction: 'تعطي ألكان بإضافة ' + C.formula('H2'),
      },
      {
        species: 'الكربوكسيل (COOH)',
        oxidation: 'غير قابل للأكسدة المعتادة',
        reduction: 'يُختزل بشدة إلى مشتقات أقل أكسدة',
      },
    ];

    const c2Path = [
      { formula: C.formula('CaC2'), name: 'كربيد الكالسيوم', family: 'مركب غير عضوي', note: 'بداية سلسلة C' + C.sub('2') + '.' },
      { formula: C.formula('C2H2'), name: 'إيثاين', family: 'ألكاين', note: 'يتكون بإضافة الماء إلى الكربيد.' },
      { formula: C.formula('C2H4'), name: 'إيثين', family: 'ألكين', note: 'ناتج هدرجة أولى.' },
      { formula: C.formula('C2H5OH'), name: 'إيثانول', family: 'كحول أولي', note: 'ناتج إضافة الماء للإيثين.' },
      { formula: C.formula('CH3CHO'), name: 'إيثانال', family: 'ألدهيد', note: 'ناتج الأكسدة الأولى.' },
      { formula: C.formula('CH3COOH'), name: 'حمض إيثانويك', family: 'حمض كربوكسيلي', note: 'ناتج الأكسدة الثانية.' },
      { formula: C.formula('CH3COOC2H5'), name: 'إيثيل إيثانوات', family: 'إستر', note: 'ناتج الأسترة مع الإيثانول.' },
    ];

    const c2Arrows = [
      { reagent: C.formula('H2O'), condition: 'وسط مائي', type: 'تحلل مائي للكربيد' },
      { reagent: C.formula('H2 / Ni'), condition: 'هدرجة', type: 'اختزال جزئي' },
      { reagent: C.formula('H2O / H2SO4'), condition: 'إضافة ماء', type: 'Hydration' },
      { reagent: '[O]', condition: 'أكسدة أولى', type: 'إلى ألدهيد' },
      { reagent: '[O]', condition: 'أكسدة ثانية', type: 'إلى حمض' },
      { reagent: '+' + C.formula(' C2H5OH / H2SO4 conc'), condition: 'تسخين', type: 'أسترة عكسية' },
    ];

    const preparationMethods = [
      { title: 'تحضير الألكانات', method: 'التقطير الجاف لأملاح مناسبة', product: 'ألكانات', note: 'طريقة معملية شائعة.' },
      { title: 'تحضير الألكينات', method: 'نزع الماء من الكحولات', product: 'ألكينات', note: 'درجة الحرارة تؤثر في الناتج.' },
      { title: 'تحضير الإيثاين', method: 'إضافة الماء إلى ' + C.formula('CaC2'), product: C.formula('C2H2'), note: 'من مصادر التحضير التعليمية الأساسية.' },
      { title: 'تحضير التولوين', method: 'إعادة التشكيل الحفزي للهبتان أو ألكلة البنزين', product: C.formula('C7H8'), note: 'وردت الطريقتان بوضوح في الصور.' },
      { title: 'تحضير الفينول', method: 'التحلل المائي القاعدي لهاليد الأريل', product: C.formula('C6H5OH'), note: 'تحتاج ظروفًا حرارية مناسبة.' },
      { title: 'تحضير الباكليت', method: C.formula('CH2O') + ' + الفينول (بلمرة تكاثف)', product: 'باكليت', note: 'لدائن حرارية متصلدة.' },
      { title: 'تحضير حمض البنزويك', method: 'أكسدة التولوين', product: C.formula('C7H6O2'), note: 'مثال مباشر للأكسدة في المركبات الأروماتية.' },
      { title: 'تحضير الإستر', method: 'حمض + كحول', product: 'إستر + ماء', note: 'تفاعل عكسي غالبًا.' },
      { title: 'تحضير الداكرون', method: 'تفاعل حمض التريفثاليك مع الإيثيلين جليكول', product: 'داكرون', note: 'بلمرة تكاثف.' },
      { title: 'تحضير الأسبرين', method: 'تفاعل حمض الساليسيليك مع مشتق أسيتيلي', product: 'أسبرين', note: 'إحلال في مجموعة ' + 'OH' + '.' },
      { title: 'تحضير زيت الروح', method: 'تفاعل حمض الساليسيليك مع الكحول الإيثيلي', product: 'ساليسيلات الإيثيل', note: 'إحلال في مجموعة ' + 'COOH' + '.' },
    ];

    const aromaticCompounds = [
      { name: 'حمض الساليسيليك', formula: C.formula('C7H6O3'), note: 'حمض أروماتي، يدخل في صناعة الأسبرين ومستحضرات جلدية.' },
      { name: 'حمض اللاكتيك', formula: C.formula('C3H6O3'), note: 'حمض أليفاتي، ينتج ملحه إيثانول بالتقطير الجاف.' },
      { name: 'حمض التريفثاليك', formula: C.formula('C8H6O4'), note: 'يتفاعل مع الإيثيلين جليكول ليعطي ألياف الداكرون.' },
      { name: 'حمض الستريك', formula: C.formula('C6H8O7'), note: 'حمض ثلاثي القاعدية.' },
      { name: 'الفينول', formula: C.formula('C6H6O'), note: 'يكشف عنه بماء البروم (راسب) أو كلوريد الحديد الثلاثي (لون بنفسجي).' },
      { name: 'التولوين', formula: C.formula('C7H8'), note: 'أكسدته تعطي حمض البنزويك.' },
      { name: 'حمض بنزين سلفونيك', formula: C.formula('C6H6O3S'), note: 'يستخدم في تحضير منظفات صناعية.' },
      { name: 'ثلاثي نيترو تولوين (T.N.T)', formula: C.formula('C7H5N3O6'), note: 'مادة متفجرة.' },
      { name: 'بنزوات الصوديوم', formula: C.formula('C7H5O2Na'), note: 'شحيح الذوبان، ويستخدم كمادة حافظة.' },
      { name: 'نيتروبنزين', formula: C.formula('C6H5NO2'), note: 'مشتق عطري مهم.' },
      { name: 'كلوروبنزين', formula: C.formula('C6H5Cl'), note: 'ناتج إحلال هالوجيني.' },
      { name: 'كلورو تولوين', formula: C.formula('C7H7Cl'), note: 'من مشتقات التولوين.' },
      { name: 'أورثو نيترو تولوين', formula: C.formula('C7H7NO2'), note: 'يوضح تأثير المجموعة الموجهة.' },
      { name: 'كاتيكول', formula: C.formula('C6H6O2'), note: 'مركب ثنائي الهيدروكسيل.' },
      { name: 'بيروجالول', formula: C.formula('C6H6O3'), note: 'مركب ثلاثي الهيدروكسيل.' },
    ];

    const polymers = [
      { monomer: 'الإيثين', polymer: 'بولي إيثيلين (PE)', type: 'إضافة', uses: 'الرقائق، الأكياس، الخراطيم، الزجاجات.' },
      { monomer: 'البروبين', polymer: 'بولي بروبيلين (PP)', type: 'إضافة', uses: 'السجاد، المفارش، الشكائر البلاستيك.' },
      { monomer: 'كلورو إيثين', polymer: 'بولي فينيل كلوريد (PVC)', type: 'إضافة', uses: 'مواسير الصرف والري، عوازل أرضيات.' },
      { monomer: 'رباعي فلورو إيثين', polymer: 'تفلون', type: 'إضافة', uses: 'تبطين أواني الطهي والخيوط الجراحية.' },
      { monomer: 'فورمالدهيد + فينول', polymer: 'باكليت', type: 'تكاثف', uses: 'الأدوات الكهربائية وطبقات السجائر.' },
      { monomer: 'إيثيلين جليكول + حمض التريفثاليك', polymer: 'نسيج الداكرون', type: 'تكاثف', uses: 'أنابيب استبدال الشرايين وصمامات القلب.' },
    ];

    const comparisonTables = [
      {
        title: 'التمييز بين الكحولات والإيثرات',
        rows: [
          { test: 'إضافة قطعة صوديوم', alcohol: 'يتفاعل ويتصاعد غاز الهيدروجين', ether: 'لا يتفاعل' },
          { test: 'برمنجنات البوتاسيوم في وسط حمضي', alcohol: 'يزول اللون البنفسجي (عدا الثالثي)', ether: 'لا يزول اللون البنفسجي' },
          { test: 'ثنائي كرومات البوتاسيوم', alcohol: 'يتحول إلى اللون الأخضر (عدا الثالثي)', ether: 'يظل اللون كما هو' },
        ],
      },
      {
        title: 'التمييز بين الكحول الأولي والثالثي',
        rows: [
          { test: 'برمنجنات البوتاسيوم في وسط حمضي', first: 'يزول اللون', third: 'لا يزول اللون' },
          { test: 'ثنائي كرومات البوتاسيوم', first: 'يتحول إلى اللون الأخضر', third: 'يظل اللون كما هو' },
        ],
      },
      {
        title: 'التمييز بين الكحول الثانوي والثالثي',
        rows: [
          { test: 'برمنجنات البوتاسيوم في وسط حمضي', second: 'يزول اللون', third: 'لا يزول اللون' },
          { test: 'ثنائي كرومات البوتاسيوم', second: 'يتحول إلى اللون الأخضر', third: 'يظل اللون كما هو' },
        ],
      },
    ];

    const quickFacts = [
      'ترتيب الحامضية: الأحماض المعدنية > الأحماض الأروماتية > الأحماض الأليفاتية > الفينولات > الكحولات.',
      'الأحماض الأروماتية أقل ذوبانًا من الأحماض الأليفاتية.',
      'نزع الماء من الكحول عند ' + C.sub('180') + '°C يعطي ألكين، وعند ' + C.sub('140') + '°C يعطي إيثر.',
      'الكحولات الثلاثية والأحماض الكربوكسيلية تعد غالبًا غير قابلة للأكسدة في الشروط المعتادة.',
      'في البنزين: مجموعة ' + 'OH' + ' توجه أورثو وبارا، بينما المجموعات الأخرى قد تكون موجهة ميتا.',
    ];

    const commonMistakes = [
      'الخلط بين ' + C.formula('C2H2') + ' و ' + C.formula('C2H4') + ' في مسارات التحويل.',
      'نسيان شرط الضوء في استبدال الألكانات.',
      'الخلط بين أكسدة الكحول الأولي (ألدهيد ثم حمض) والكحول الثانوي (كيتون).',
      'كتابة سهم ' + revArrow + ' كتفاعل تام في الأسترة.',
      'عكس المتفاعل والناتج في تحولات البنزين.',
      'اعتبار الإيثر يتفاعل مع الصوديوم مثل الكحول.',
      'إهمال اختلاف الذوبان بين الفينولات والأحماض والكحولات.',
    ];

    const reagents = [
      { name: C.formula('H2 / Ni'), use: 'هدرجة الروابط المزدوجة/الثلاثية', condition: 'تسخين معتدل + حفاز نيكل', expected: 'ألكين/ألكاين ' + eqArrow + ' ألكان', trap: 'نسيان الحفاز Ni.' },
      { name: C.formula('H2O / H2SO4'), use: 'إضافة ماء للألكينات', condition: 'وسط حمضي', expected: 'ألكين ' + eqArrow + ' كحول', trap: 'كتابة NaOH بدل الحمض.' },
      { name: C.formula('Br2'), use: 'اختبار/إضافة على C=C', condition: 'وسط خامل', expected: 'زوال لون البروم + ناتج إضافة', trap: 'تطبيقه على الألكان دون شروط.' },
      { name: C.formula('KMnO4'), use: 'أكسدة لطيفة أو اختبار عدم التشبع', condition: 'ظروف مناسبة', expected: 'نواتج مؤكسدة/زوال لون', trap: 'الخلط مع الديكرومات.' },
      { name: C.formula('K2Cr2O7'), use: 'أكسدة كحولات أولية/ثانوية', condition: C.formula('H2SO4') + ' + تسخين', expected: 'كحول ' + eqArrow + ' ألدهيد/كيتون/حمض', trap: 'عدم التفرقة بين الأكسدة الأولى والثانية.' },
      { name: C.formula('H2SO4 conc'), use: 'حفز الأسترة/نزع ماء', condition: 'مركز + تسخين', expected: 'إستر أو ألكين', trap: 'نسيان دوره كساحب ماء.' },
      { name: 'NaOH(aq)', use: 'إحلال هاليد الألكيل', condition: 'وسط مائي', expected: 'هاليد ألكيل ' + eqArrow + ' كحول', trap: 'استخدام وسط كحولي بدل المائي.' },
      { name: 'Acidified dichromate', use: 'أكسدة عضوية قياسية', condition: 'وسط حمضي', expected: 'نتائج أكسدة متوقعة', trap: 'الخلط مع ' + C.formula('KMnO4') + '.' },
    ];

    const comparisons = [
      { title: 'ألكان vs ألكين', diff: 'الألكان مشبع (σ فقط) بينما الألكين يحتوي رابطة π.', test: 'Br' + C.sub('2') + ' يزول لونه مع الألكين.', example: C.formula('C2H6') + ' مقابل ' + C.formula('C2H4'), trap: 'توقع إضافة مباشرة للألكان.' },
      { title: 'كحول أولي vs كحول ثانوي', diff: 'الأولي يتأكسد إلى ألدهيد ثم حمض، والثانوي إلى كيتون.', test: 'ناتج الأكسدة يحدد النوع.', example: C.formula('C2H5OH') + ' مقابل ' + C.formula('CH3CHOHCH3'), trap: 'اعتبار الناتج النهائي واحدًا.' },
      { title: 'ألدهيد vs كيتون', diff: 'الألدهيد طرفي أسهل أكسدة.', test: 'تولنز موجب للألدهيد غالبًا.', example: C.formula('CH3CHO') + ' مقابل ' + C.formula('CH3COCH3'), trap: 'إعطاء الكيتون نفس اختبار الألدهيد.' },
      { title: 'حمض كربوكسيلي vs إستر', diff: 'الحمض أعلى حامضية، والإستر أقل قطبية نسبيًا.', test: 'الحمض يتفاعل مع البيكربونات.', example: C.formula('CH3COOH') + ' مقابل ' + C.formula('CH3COOC2H5'), trap: 'الخلط بين خواص الرائحة والحموضة.' },
      { title: 'إضافة vs إحلال', diff: 'الإضافة تفتح π، والإحلال يستبدل مجموعة.', test: 'نوع الركيزة يحدد النمط.', example: 'ألكين + Br' + C.sub('2') + ' (إضافة) / ' + C.formula('CH4 + Cl2') + ' (إحلال)', trap: 'تطبيق نفس القاعدة على كل العائلات.' },
      { title: 'أكسدة vs اختزال', diff: 'الأكسدة زيادة O أو نقص H، والاختزال عكس ذلك.', test: 'تتبع روابط C-H/C-O.', example: C.formula('C2H5OH') + ' ' + eqArrow + ' ' + C.formula('CH3CHO'), trap: 'عكس المصطلحين في الكتابة.' },
    ];

    const mistakes = [
      'الخلط بين ' + C.formula('C2H2') + ' و ' + C.formula('C2H4') + ' في مسار C' + C.sub('2') + '.',
      'نسيان شروط الهدرجة ' + C.formula('H2 / Ni') + '.',
      'الخلط بين الأكسدة الأولى والثانية للكحولات الأولية.',
      'نسيان أن الأسترة تفاعل عكسي ' + revArrow + '.',
      'كتابة الشحنات بصيغة غير صحيحة مثل Fe' + C.sup('3+'),
    ];

    const lessons = [
      {
        title: 'إضافة البروم إلى الإيثين',
        equation: C.formula('C2H4') + ' + ' + C.formula('Br2') + ' ' + eqArrow + ' ' + C.formula('C2H4Br2'),
        reagent: C.formula('Br2') + ' في وسط خامل',
        steps: [
          { t: 'المتفاعلات', d: 'إيثين + بروم', ch: 'الرابطة المزدوجة هي الموقع النشط.' },
          { t: 'إبراز التغير', d: 'كسر π وتكوين روابط C-Br', ch: 'الناتج يصبح مشبعًا.' },
          { t: 'الخلاصة', d: 'إضافة عبر الرابطة المزدوجة', ch: 'اختبار زوال لون البروم.' },
        ],
        trap: 'نسيان أن الألكانات لا تعطي نفس السلوك دون شروط خاصة.',
      },
      {
        title: 'أكسدة الإيثانول إلى إيثانال ثم حمض إيثانويك',
        equation: C.formula('C2H5OH') + ' ' + eqArrow + ' ' + C.formula('CH3CHO') + ' ' + eqArrow + ' ' + C.formula('CH3COOH'),
        reagent: C.formula('K2Cr2O7 / H2SO4'),
        steps: [
          { t: 'خطوة 1', d: 'أكسدة الكحول الأولي', ch: 'يتكوّن الإيثانال كوسيط.' },
          { t: 'خطوة 2', d: 'أكسدة إضافية', ch: 'الإيثانال يتحول إلى حمض.' },
          { t: 'فهم الشرط', d: 'زمن التسخين يتحكم في النتيجة', ch: 'تقطير مبكر للتوقف عند الألدهيد.' },
        ],
        trap: 'الخلط بين الناتج الوسيط والنهائي.',
      },
      {
        title: 'الأسترة: حمض + كحول',
        equation: C.formula('CH3COOH') + ' + ' + C.formula('C2H5OH') + ' ' + revArrow + ' ' + C.formula('CH3COOC2H5') + ' + ' + C.formula('H2O'),
        reagent: C.formula('H2SO4 conc') + ' + تسخين',
        steps: [
          { t: 'تجهيز المجموعات', d: '-COOH و -OH', ch: 'التحام وظيفي لتكوين الإستر.' },
          { t: 'تكون الماء', d: C.formula('H2O') + '↓', ch: 'سحب الماء يوجه الاتزان للنواتج.' },
          { t: 'الخلاصة', d: 'تفاعل عكسي محفز', ch: 'يرمز له بسهم اتزان.' },
        ],
        trap: 'اعتبار الأسترة تفاعلًا غير عكسي.',
      },
      {
        title: 'إضافة الماء إلى الإيثين',
        equation: C.formula('C2H4') + ' + ' + C.formula('H2O') + ' ' + eqArrow + ' ' + C.formula('C2H5OH'),
        reagent: C.formula('H2SO4') + ' (وسط حمضي)',
        steps: [
          { t: 'المتفاعلات', d: 'إيثين + ماء', ch: 'الرابطة المزدوجة تستقبل الإضافة.' },
          { t: 'الشرط', d: 'وجود حفز حمضي', ch: 'بدونه لا يتم التحويل بكفاءة.' },
          { t: 'الناتج', d: 'إيثانول', ch: 'تطبيق أساسي في أسئلة التحويل.' },
        ],
        trap: 'الخلط بينها وبين الهدرجة بـ ' + C.formula('H2 / Ni') + '.',
      },
    ];

    const reagentChoices = shuffle([
      { key: 'a', label: C.formula('H2/Ni') },
      { key: 'b', label: C.formula('H2O/H2SO4') },
      { key: 'c', label: C.formula('Br2') },
      { key: 'd', label: 'NaOH(aq)' },
    ]);

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
      commonMistakes,
      quickFacts,
    };
  },
};

export { OrganicData };
