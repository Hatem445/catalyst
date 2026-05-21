'use strict';

const ELEMENTS_RAW = [
  { z:1, s:'H', en:'Hydrogen', ar:'الهيدروجين', p:1, g:1, m:'1.008' },
  { z:2, s:'He', en:'Helium', ar:'الهيليوم', p:1, g:18, m:'4.0026' },
  { z:3, s:'Li', en:'Lithium', ar:'الليثيوم', p:2, g:1, m:'6.94' },
  { z:4, s:'Be', en:'Beryllium', ar:'البيريليوم', p:2, g:2, m:'9.0122' },
  { z:5, s:'B', en:'Boron', ar:'البورون', p:2, g:13, m:'10.81' },
  { z:6, s:'C', en:'Carbon', ar:'الكربون', p:2, g:14, m:'12.011' },
  { z:7, s:'N', en:'Nitrogen', ar:'النيتروجين', p:2, g:15, m:'14.007' },
  { z:8, s:'O', en:'Oxygen', ar:'الأكسجين', p:2, g:16, m:'15.999' },
  { z:9, s:'F', en:'Fluorine', ar:'الفلور', p:2, g:17, m:'18.998' },
  { z:10, s:'Ne', en:'Neon', ar:'النيون', p:2, g:18, m:'20.180' },
  { z:11, s:'Na', en:'Sodium', ar:'الصوديوم', p:3, g:1, m:'22.990' },
  { z:12, s:'Mg', en:'Magnesium', ar:'المغنيسيوم', p:3, g:2, m:'24.305' },
  { z:13, s:'Al', en:'Aluminium', ar:'الألومنيوم', p:3, g:13, m:'26.982' },
  { z:14, s:'Si', en:'Silicon', ar:'السيليكون', p:3, g:14, m:'28.085' },
  { z:15, s:'P', en:'Phosphorus', ar:'الفوسفور', p:3, g:15, m:'30.974' },
  { z:16, s:'S', en:'Sulfur', ar:'الكبريت', p:3, g:16, m:'32.06' },
  { z:17, s:'Cl', en:'Chlorine', ar:'الكلور', p:3, g:17, m:'35.45' },
  { z:18, s:'Ar', en:'Argon', ar:'الأرجون', p:3, g:18, m:'39.948' },
  { z:19, s:'K', en:'Potassium', ar:'البوتاسيوم', p:4, g:1, m:'39.098' },
  { z:20, s:'Ca', en:'Calcium', ar:'الكالسيوم', p:4, g:2, m:'40.078' },
  { z:21, s:'Sc', en:'Scandium', ar:'السكانديوم', p:4, g:3, m:'44.956' },
  { z:22, s:'Ti', en:'Titanium', ar:'التيتانيوم', p:4, g:4, m:'47.867' },
  { z:23, s:'V', en:'Vanadium', ar:'الفاناديوم', p:4, g:5, m:'50.942' },
  { z:24, s:'Cr', en:'Chromium', ar:'الكروم', p:4, g:6, m:'51.996' },
  { z:25, s:'Mn', en:'Manganese', ar:'المنجنيز', p:4, g:7, m:'54.938' },
  { z:26, s:'Fe', en:'Iron', ar:'الحديد', p:4, g:8, m:'55.845' },
  { z:27, s:'Co', en:'Cobalt', ar:'الكوبالت', p:4, g:9, m:'58.933' },
  { z:28, s:'Ni', en:'Nickel', ar:'النيكل', p:4, g:10, m:'58.693' },
  { z:29, s:'Cu', en:'Copper', ar:'النحاس', p:4, g:11, m:'63.546' },
  { z:30, s:'Zn', en:'Zinc', ar:'الزنك', p:4, g:12, m:'65.38' },
  { z:31, s:'Ga', en:'Gallium', ar:'الجاليوم', p:4, g:13, m:'69.723' },
  { z:32, s:'Ge', en:'Germanium', ar:'الجرمانيوم', p:4, g:14, m:'72.630' },
  { z:33, s:'As', en:'Arsenic', ar:'الزرنيخ', p:4, g:15, m:'74.922' },
  { z:34, s:'Se', en:'Selenium', ar:'السيلينيوم', p:4, g:16, m:'78.971' },
  { z:35, s:'Br', en:'Bromine', ar:'البروم', p:4, g:17, m:'79.904' },
  { z:36, s:'Kr', en:'Krypton', ar:'الكريبتون', p:4, g:18, m:'83.798' },
  { z:37, s:'Rb', en:'Rubidium', ar:'الروبيديوم', p:5, g:1, m:'85.468' },
  { z:38, s:'Sr', en:'Strontium', ar:'السترونشيوم', p:5, g:2, m:'87.62' },
  { z:39, s:'Y', en:'Yttrium', ar:'الإيتريوم', p:5, g:3, m:'88.906' },
  { z:40, s:'Zr', en:'Zirconium', ar:'الزركونيوم', p:5, g:4, m:'91.224' },
  { z:41, s:'Nb', en:'Niobium', ar:'النيوبيوم', p:5, g:5, m:'92.906' },
  { z:42, s:'Mo', en:'Molybdenum', ar:'الموليبدينوم', p:5, g:6, m:'95.95' },
  { z:43, s:'Tc', en:'Technetium', ar:'التكنيتيوم', p:5, g:7, m:'غير متاح' },
  { z:44, s:'Ru', en:'Ruthenium', ar:'الروثينيوم', p:5, g:8, m:'101.07' },
  { z:45, s:'Rh', en:'Rhodium', ar:'الروديوم', p:5, g:9, m:'102.91' },
  { z:46, s:'Pd', en:'Palladium', ar:'البلاديوم', p:5, g:10, m:'106.42' },
  { z:47, s:'Ag', en:'Silver', ar:'الفضة', p:5, g:11, m:'107.87' },
  { z:48, s:'Cd', en:'Cadmium', ar:'الكادميوم', p:5, g:12, m:'112.41' },
  { z:49, s:'In', en:'Indium', ar:'الإنديوم', p:5, g:13, m:'114.82' },
  { z:50, s:'Sn', en:'Tin', ar:'القصدير', p:5, g:14, m:'118.71' },
  { z:51, s:'Sb', en:'Antimony', ar:'الأنتيمون', p:5, g:15, m:'121.76' },
  { z:52, s:'Te', en:'Tellurium', ar:'التيلوريوم', p:5, g:16, m:'127.60' },
  { z:53, s:'I', en:'Iodine', ar:'اليود', p:5, g:17, m:'126.90' },
  { z:54, s:'Xe', en:'Xenon', ar:'الزينون', p:5, g:18, m:'131.29' },
  { z:55, s:'Cs', en:'Cesium', ar:'السيزيوم', p:6, g:1, m:'132.91' },
  { z:56, s:'Ba', en:'Barium', ar:'الباريوم', p:6, g:2, m:'137.33' },
  { z:57, s:'La', en:'Lanthanum', ar:'اللانثانوم', p:6, g:3, m:'138.91' },
  { z:58, s:'Ce', en:'Cerium', ar:'السيريوم', p:6, g:3, m:'140.12' },
  { z:59, s:'Pr', en:'Praseodymium', ar:'البراسيوديميوم', p:6, g:3, m:'140.91' },
  { z:60, s:'Nd', en:'Neodymium', ar:'النيوديميوم', p:6, g:3, m:'144.24' },
  { z:61, s:'Pm', en:'Promethium', ar:'البروميثيوم', p:6, g:3, m:'غير متاح' },
  { z:62, s:'Sm', en:'Samarium', ar:'الساماريوم', p:6, g:3, m:'150.36' },
  { z:63, s:'Eu', en:'Europium', ar:'اليوروبيوم', p:6, g:3, m:'151.96' },
  { z:64, s:'Gd', en:'Gadolinium', ar:'الجادولينيوم', p:6, g:3, m:'157.25' },
  { z:65, s:'Tb', en:'Terbium', ar:'التيربيوم', p:6, g:3, m:'158.93' },
  { z:66, s:'Dy', en:'Dysprosium', ar:'الديسبروسيوم', p:6, g:3, m:'162.50' },
  { z:67, s:'Ho', en:'Holmium', ar:'الهولميوم', p:6, g:3, m:'164.93' },
  { z:68, s:'Er', en:'Erbium', ar:'الإربيوم', p:6, g:3, m:'167.26' },
  { z:69, s:'Tm', en:'Thulium', ar:'الثوليوم', p:6, g:3, m:'168.93' },
  { z:70, s:'Yb', en:'Ytterbium', ar:'الإيتربيوم', p:6, g:3, m:'173.05' },
  { z:71, s:'Lu', en:'Lutetium', ar:'اللوتيتيوم', p:6, g:3, m:'174.97' },
  { z:72, s:'Hf', en:'Hafnium', ar:'الهافنيوم', p:6, g:4, m:'178.49' },
  { z:73, s:'Ta', en:'Tantalum', ar:'التنتالوم', p:6, g:5, m:'180.95' },
  { z:74, s:'W', en:'Tungsten', ar:'التنجستن', p:6, g:6, m:'183.84' },
  { z:75, s:'Re', en:'Rhenium', ar:'الرينيوم', p:6, g:7, m:'186.21' },
  { z:76, s:'Os', en:'Osmium', ar:'الأوزميوم', p:6, g:8, m:'190.23' },
  { z:77, s:'Ir', en:'Iridium', ar:'الإيريديوم', p:6, g:9, m:'192.22' },
  { z:78, s:'Pt', en:'Platinum', ar:'البلاتين', p:6, g:10, m:'195.08' },
  { z:79, s:'Au', en:'Gold', ar:'الذهب', p:6, g:11, m:'196.97' },
  { z:80, s:'Hg', en:'Mercury', ar:'الزئبق', p:6, g:12, m:'200.59' },
  { z:81, s:'Tl', en:'Thallium', ar:'الثاليوم', p:6, g:13, m:'204.38' },
  { z:82, s:'Pb', en:'Lead', ar:'الرصاص', p:6, g:14, m:'207.2' },
  { z:83, s:'Bi', en:'Bismuth', ar:'البزموت', p:6, g:15, m:'208.98' },
  { z:84, s:'Po', en:'Polonium', ar:'البولونيوم', p:6, g:16, m:'غير متاح' },
  { z:85, s:'At', en:'Astatine', ar:'الأستاتين', p:6, g:17, m:'غير متاح' },
  { z:86, s:'Rn', en:'Radon', ar:'الرادون', p:6, g:18, m:'غير متاح' },
  { z:87, s:'Fr', en:'Francium', ar:'الفرانسيوم', p:7, g:1, m:'غير متاح' },
  { z:88, s:'Ra', en:'Radium', ar:'الراديوم', p:7, g:2, m:'غير متاح' },
  { z:89, s:'Ac', en:'Actinium', ar:'الأكتينيوم', p:7, g:3, m:'غير متاح' },
  { z:90, s:'Th', en:'Thorium', ar:'الثوريوم', p:7, g:3, m:'232.04' },
  { z:91, s:'Pa', en:'Protactinium', ar:'البروتكتينيوم', p:7, g:3, m:'231.04' },
  { z:92, s:'U', en:'Uranium', ar:'اليورانيوم', p:7, g:3, m:'238.03' },
  { z:93, s:'Np', en:'Neptunium', ar:'النبتونيوم', p:7, g:3, m:'غير متاح' },
  { z:94, s:'Pu', en:'Plutonium', ar:'البلوتونيوم', p:7, g:3, m:'غير متاح' },
  { z:95, s:'Am', en:'Americium', ar:'الأمريسيوم', p:7, g:3, m:'غير متاح' },
  { z:96, s:'Cm', en:'Curium', ar:'الكوريوم', p:7, g:3, m:'غير متاح' },
  { z:97, s:'Bk', en:'Berkelium', ar:'البركيليوم', p:7, g:3, m:'غير متاح' },
  { z:98, s:'Cf', en:'Californium', ar:'الكاليفورنيوم', p:7, g:3, m:'غير متاح' },
  { z:99, s:'Es', en:'Einsteinium', ar:'الأينشتينيوم', p:7, g:3, m:'غير متاح' },
  { z:100, s:'Fm', en:'Fermium', ar:'الفرميوم', p:7, g:3, m:'غير متاح' },
  { z:101, s:'Md', en:'Mendelevium', ar:'المندليفيوم', p:7, g:3, m:'غير متاح' },
  { z:102, s:'No', en:'Nobelium', ar:'النوبليوم', p:7, g:3, m:'غير متاح' },
  { z:103, s:'Lr', en:'Lawrencium', ar:'اللورنسيوم', p:7, g:3, m:'غير متاح' },
  { z:104, s:'Rf', en:'Rutherfordium', ar:'الرذرفورديوم', p:7, g:4, m:'غير متاح' },
  { z:105, s:'Db', en:'Dubnium', ar:'الدوبنيوم', p:7, g:5, m:'غير متاح' },
  { z:106, s:'Sg', en:'Seaborgium', ar:'السيبورجيوم', p:7, g:6, m:'غير متاح' },
  { z:107, s:'Bh', en:'Bohrium', ar:'البوريوم', p:7, g:7, m:'غير متاح' },
  { z:108, s:'Hs', en:'Hassium', ar:'الهاسيوم', p:7, g:8, m:'غير متاح' },
  { z:109, s:'Mt', en:'Meitnerium', ar:'الميتنيريوم', p:7, g:9, m:'غير متاح' },
  { z:110, s:'Ds', en:'Darmstadtium', ar:'الدارمشتاتيوم', p:7, g:10, m:'غير متاح' },
  { z:111, s:'Rg', en:'Roentgenium', ar:'الرونتجينيوم', p:7, g:11, m:'غير متاح' },
  { z:112, s:'Cn', en:'Copernicium', ar:'الكوبرنيسيوم', p:7, g:12, m:'غير متاح' },
  { z:113, s:'Nh', en:'Nihonium', ar:'النيهونيوم', p:7, g:13, m:'غير متاح' },
  { z:114, s:'Fl', en:'Flerovium', ar:'الفليروفيوم', p:7, g:14, m:'غير متاح' },
  { z:115, s:'Mc', en:'Moscovium', ar:'الموسكوفيوم', p:7, g:15, m:'غير متاح' },
  { z:116, s:'Lv', en:'Livermorium', ar:'الليفرموريوم', p:7, g:16, m:'غير متاح' },
  { z:117, s:'Ts', en:'Tennessine', ar:'التنيسين', p:7, g:17, m:'غير متاح' },
  { z:118, s:'Og', en:'Oganesson', ar:'الأوجانيسون', p:7, g:18, m:'غير متاح' },
];

const NONMETAL_Z = new Set([1, 6, 7, 8, 15, 16, 34]);

const FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'metals', label: 'فلزات' },
  { key: 'nonmetals', label: 'لافلزات' },
  { key: 'noble', label: 'غازات نبيلة' },
  { key: 'halogen', label: 'هالوجينات' },
  { key: 'alkali', label: 'فلزات قلوية' },
  { key: 'alkaline-earth', label: 'فلزات قلوية أرضية' },
  { key: 'transition', label: 'السلسلة الانتقالية' },
];

function resolveCategory(element) {
  if (element.g === 18) return { key: 'noble', ar: 'غاز نبيل' };
  if (element.g === 17) return { key: 'halogen', ar: 'هالوجين' };
  if (element.g === 1 && element.z !== 1) return { key: 'alkali', ar: 'فلز قلوي' };
  if (element.g === 2) return { key: 'alkaline-earth', ar: 'فلز قلوي أرضي' };
  if (NONMETAL_Z.has(element.z)) return { key: 'nonmetals', ar: 'لافلز' };
  if ((element.g >= 3 && element.g <= 12 && element.p >= 4) || element.z === 57 || element.z === 89) {
    return { key: 'transition', ar: 'عنصر انتقالي' };
  }
  if ((element.z >= 58 && element.z <= 71) || (element.z >= 90 && element.z <= 103)) {
    return { key: 'metals', ar: 'فلز انتقالي داخلي' };
  }
  return { key: 'metals', ar: 'فلز' };
}

function withDisplayPosition(element) {
  if (element.z >= 58 && element.z <= 71) {
    return { ...element, displayPeriod: 8, displayGroup: element.z - 54 };
  }
  if (element.z >= 90 && element.z <= 103) {
    return { ...element, displayPeriod: 9, displayGroup: element.z - 86 };
  }
  return { ...element, displayPeriod: element.p, displayGroup: element.g };
}

const ELEMENTS = ELEMENTS_RAW
  .map(withDisplayPosition)
  .map(el => {
    const cat = resolveCategory(el);
    return {
      ...el,
      category: cat.ar,
      categoryKey: cat.key,
      mass: el.m || 'غير متاح',
    };
  });

function filterElements(filterKey, query) {
  const q = (query || '').trim().toLowerCase();
  return ELEMENTS.filter(el => {
    if (filterKey && filterKey !== 'all') {
      if (filterKey === 'metals') {
        if (el.categoryKey === 'nonmetals' || el.categoryKey === 'noble' || el.categoryKey === 'halogen') return false;
      } else if (el.categoryKey !== filterKey) {
        return false;
      }
    }

    if (!q) return true;
    return [String(el.z), el.s, el.en.toLowerCase(), el.ar.toLowerCase()].some(v => String(v).includes(q));
  });
}

function classByCategory(el) {
  if (el.categoryKey === 'noble') return 'is-noble';
  if (el.categoryKey === 'halogen') return 'is-halogen';
  if (el.categoryKey === 'alkali') return 'is-alkali';
  if (el.categoryKey === 'alkaline-earth') return 'is-alkaline';
  if (el.categoryKey === 'transition') return 'is-transition';
  if (el.categoryKey === 'nonmetals') return 'is-nonmetal';
  return 'is-metal';
}

function renderElementTile(el, selectedZ) {
  const cls = classByCategory(el);
  const active = selectedZ === el.z ? ' active' : '';
  return `<button class="periodic-el ${cls}${active}" data-action="periodic-open" data-z="${el.z}" style="grid-column:${el.displayGroup};grid-row:${el.displayPeriod}">
    <span class="periodic-z">${el.z}</span>
    <span class="periodic-sym">${el.s}</span>
    <span class="periodic-ar">${el.ar}</span>
  </button>`;
}

function renderDetail(selectedZ) {
  const el = ELEMENTS.find(x => x.z === selectedZ);
  if (!el) {
    return `<div class="periodic-detail empty">اختر عنصرًا لعرض التفاصيل.</div>`;
  }

  return `<div class="periodic-detail">
    <div class="periodic-detail-head">
      <div class="periodic-detail-main">
        <div class="periodic-detail-symbol">${el.s}</div>
        <div>
          <div class="periodic-detail-name">${el.ar}</div>
          <div class="periodic-detail-en">${el.en}</div>
        </div>
      </div>
      <button class="periodic-close" data-action="periodic-close-detail">✕</button>
    </div>
    <div class="periodic-detail-grid">
      <div><span>العدد الذري:</span><strong>${el.z}</strong></div>
      <div><span>الكتلة الذرية:</span><strong>${el.mass || 'غير متاح'}</strong></div>
      <div><span>التصنيف:</span><strong>${el.category || 'غير متاح'}</strong></div>
      <div><span>المجموعة:</span><strong>${el.g || 'غير متاح'}</strong></div>
      <div><span>الدورة:</span><strong>${el.p || 'غير متاح'}</strong></div>
    </div>
  </div>`;
}

function render(state = {}) {
  const filterKey = state.filter || 'all';
  const query = state.query || '';
  const searchDraft = state.searchDraft ?? query;
  const selectedZ = state.selectedZ || null;
  const items = filterElements(filterKey, query);
  const transitionBadge = filterKey === 'transition'
    ? '<div class="periodic-focus-badge">عرض مخصص: السلسلة الانتقالية</div>'
    : '';

  return `
    <div class="section-label">الجدول الدوري التفاعلي</div>

    <div class="glass-card periodic-head fade-in">
      <div class="search-box periodic-search-box" style="margin-bottom:10px">
        <input class="search-input" type="search" data-action="periodic-search-input" placeholder="ابحث: رمز، اسم عربي/English، عدد ذري" value="${searchDraft}" autocomplete="off" />
        <span class="search-icon">🔎</span>
        <div class="periodic-search-actions">
          <button class="periodic-filter-btn periodic-search-btn" data-action="periodic-search-submit">بحث</button>
          <button class="periodic-filter-btn periodic-search-btn" data-action="periodic-search-clear">مسح</button>
        </div>
      </div>
      <div class="periodic-filter-row">
        ${FILTERS.map(f => `<button class="periodic-filter-btn ${filterKey === f.key ? 'active' : ''}" data-action="periodic-filter" data-filter="${f.key}">${f.label}</button>`).join('')}
      </div>
      ${transitionBadge}
      <div class="periodic-count">العناصر المعروضة: ${items.length} / 118</div>
    </div>

    <div class="glass-card periodic-stage fade-in fade-in-delay-1">
      <div class="periodic-grid">
        <div class="periodic-row-note ln">سلسلة اللانثانيدات</div>
        <div class="periodic-row-note ac">سلسلة الأكتينيدات</div>
        ${items.map(el => renderElementTile(el, selectedZ)).join('')}
      </div>
    </div>

    ${renderDetail(selectedZ)}
  `;
}

const PeriodicTable = {
  enabled: true,
  ELEMENTS,
  FILTERS,
  render,
  getByZ(z) {
    return ELEMENTS.find(x => x.z === z) || null;
  },
};

export { PeriodicTable };
