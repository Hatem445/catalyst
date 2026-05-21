'use strict';

import { ItemParser, DB, QUIZ, CARDS } from './data.js';
import { Search } from './search.js';
import { Progress } from './progress.js';
import { PeriodicTable } from './periodic-table.js';

const MindMap = {
  // Renders an organic conversion SVG pathway
  renderPathwaySVG(pathway, width) {
    const H = 90; // svg height
    const nodeW = 74, nodeH = 36;
    const arrowW = 50;
    const nodes = pathway.filter(p => p.label);
    const arrows = pathway.filter(p => p.arrow);
    const totalW = nodes.length * nodeW + arrows.length * arrowW;
    const svgW = Math.max(width, totalW + 20);

    let x = 10; let items = [];

    pathway.forEach((p, i) => {
      if (p.label) {
        const cx = x + nodeW / 2;
        const cy = H / 2;
        items.push(`
          <rect x="${x}" y="${cy - nodeH/2}" width="${nodeW}" height="${nodeH}"
            rx="10" fill="${p.clr}18" stroke="${p.clr}" stroke-width="1.5"/>
          <text x="${cx}" y="${cy - 4}" text-anchor="middle"
            font-family="Courier New" font-size="12" font-weight="700" fill="${p.clr}">${p.label}</text>
          <text x="${cx}" y="${cy + 14}" text-anchor="middle"
            font-family="Cairo,sans-serif" font-size="9" fill="#8aaccc">${p.sub || ''}</text>
        `);
        x += nodeW;
      } else if (p.arrow) {
        const cx = x + arrowW / 2;
        const cy = H / 2;
        const lines = p.arrow.split('\n');
        items.push(`
          <line x1="${x + 4}" y1="${cy}" x2="${x + arrowW - 8}" y2="${cy}"
            stroke="#4a6380" stroke-width="1.5" stroke-dasharray="4 3"/>
          <polygon points="${x+arrowW-8},${cy-4} ${x+arrowW-1},${cy} ${x+arrowW-8},${cy+4}"
            fill="#4a6380"/>
          ${lines.map((l, li) => `<text x="${cx}" y="${cy - 8 + li*10}" text-anchor="middle"
            font-family="Courier New" font-size="9" fill="#ffcc44">${l}</text>`).join('')}
        `);
        x += arrowW;
      }
    });

    return `<svg width="${svgW}" height="${H}" xmlns="http://www.w3.org/2000/svg">${items.join('')}</svg>`;
  },

  // Bond formation animation SVG for alkenes
  bondFormationSVG(type) {
    if (type === 'alkene_addition') {
      return `<svg width="300" height="110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px">
        <!-- C=C double bond -->
        <circle cx="90" cy="55" r="18" fill="#00ffb318" stroke="#00ffb3" stroke-width="1.5"/>
        <text x="90" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#00ffb3">C</text>
        <circle cx="180" cy="55" r="18" fill="#00ffb318" stroke="#00ffb3" stroke-width="1.5"/>
        <text x="180" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#00ffb3">C</text>
        <!-- σ bond (solid) -->
        <line x1="108" y1="51" x2="162" y2="51" stroke="#00ffb3" stroke-width="2"/>
        <!-- π bond (animated) -->
        <line x1="108" y1="60" x2="162" y2="60" stroke="#ff6eb4" stroke-width="2" stroke-dasharray="6 3" class="anim-pulse"/>
        <!-- Labels -->
        <text x="135" y="44" text-anchor="middle" font-size="9" fill="#8aaccc" font-family="Cairo,sans-serif">رابطة σ</text>
        <text x="135" y="76" text-anchor="middle" font-size="9" fill="#ff6eb4" font-family="Cairo,sans-serif" class="anim-glow">رابطة π (تنكسر في الإضافة)</text>
        <!-- Br approaching -->
        <circle cx="240" cy="55" r="14" fill="#ffcc4418" stroke="#ffcc44" stroke-width="1.5" class="anim-float" style="animation-delay:0.5s"/>
        <text x="240" y="60" text-anchor="middle" font-family="Courier New" font-size="13" font-weight="700" fill="#ffcc44">Br</text>
        <line x1="198" y1="55" x2="224" y2="55" stroke="#ffcc44" stroke-width="1.5" stroke-dasharray="4 3" class="anim-pulse"/>
        <!-- Annotation -->
        <text x="150" y="100" text-anchor="middle" font-size="9" fill="#4a6380" font-family="Cairo,sans-serif">تفاعل إضافة: π تنكسر → رابطة σ جديدة مع Br</text>
      </svg>`;
    }
    if (type === 'alkyne_triple') {
      return `<svg width="300" height="110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px">
        <circle cx="90" cy="55" r="18" fill="#ff6eb418" stroke="#ff6eb4" stroke-width="1.5"/>
        <text x="90" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#ff6eb4">C</text>
        <circle cx="180" cy="55" r="18" fill="#ff6eb418" stroke="#ff6eb4" stroke-width="1.5"/>
        <text x="180" y="60" text-anchor="middle" font-family="Courier New" font-size="14" font-weight="700" fill="#ff6eb4">C</text>
        <!-- σ bond -->
        <line x1="108" y1="55" x2="162" y2="55" stroke="#ff6eb4" stroke-width="2.5"/>
        <!-- π bond 1 -->
        <line x1="108" y1="46" x2="162" y2="46" stroke="#b97aff" stroke-width="2" stroke-dasharray="5 3" class="anim-pulse"/>
        <!-- π bond 2 -->
        <line x1="108" y1="64" x2="162" y2="64" stroke="#00e5ff" stroke-width="2" stroke-dasharray="5 3" class="anim-pulse" style="animation-delay:0.4s"/>
        <text x="135" y="90" text-anchor="middle" font-size="10" fill="#8aaccc" font-family="Cairo,sans-serif">رابطة ثلاثية: σ + π + π</text>
        <text x="135" y="28" text-anchor="middle" font-size="9" fill="#b97aff" font-family="Cairo,sans-serif">رابطة π</text>
        <text x="135" y="79" text-anchor="middle" font-size="9" fill="#00e5ff" font-family="Cairo,sans-serif">رابطة π</text>
      </svg>`;
    }
    return '';
  }
};


const Renderer = {

  /* — HOME — */
  home() {
    const totalSeen = Progress.totalSeen();
    const totalNodes = Progress.totalNodes();
    const pct = totalNodes > 0 ? Math.round(totalSeen / totalNodes * 100) : 0;

    const hero = `
      <div class="home-hero fade-in">
        <svg class="hero-molecules" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice">
          <circle cx="20" cy="20" r="6" fill="#00ffb3" class="anim-float"/>
          <circle cx="280" cy="90" r="8" fill="#3b9eff" class="anim-float" style="animation-delay:1s"/>
          <circle cx="150" cy="10" r="5" fill="#b97aff" class="anim-float" style="animation-delay:0.5s"/>
          <line x1="20" y1="20" x2="150" y2="10" stroke="#00ffb3" stroke-width="0.8" opacity="0.5"/>
          <line x1="150" y1="10" x2="280" y2="90" stroke="#3b9eff" stroke-width="0.8" opacity="0.5"/>
          <circle cx="60" cy="100" r="4" fill="#ffcc44" class="anim-float" style="animation-delay:1.5s"/>
          <circle cx="240" cy="30" r="7" fill="#ff6eb4" class="anim-float" style="animation-delay:0.8s"/>
          <line x1="60" y1="100" x2="240" y2="30" stroke="#ff6eb4" stroke-width="0.8" opacity="0.4"/>
        </svg>
        <div class="hero-title">⚗️ Chemistry<br>MindMap Pro</div>
        <div class="hero-sub">كيمياء الثانوية — الطريقة الذكية</div>
      </div>`;

    const stats = `
      <div class="stats-row fade-in fade-in-delay-1">
        <div class="stat-chip">
          <div class="stat-val" style="color:var(--neon-cyan)">${totalSeen}</div>
          <div class="stat-label">موضوع تمت مراجعته</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val" style="color:var(--neon-green)">${pct}%</div>
          <div class="stat-label">الإنجاز الكلي</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val" style="color:var(--neon-amber)">${CARDS.length}</div>
          <div class="stat-label">بطاقات تذكر</div>
        </div>
      </div>`;

    const unitsHtml = DB.units.map((u, i) => {
      const totalN = u.sections.reduce((a, s) => a + s.nodes.length, 0);
      const pct = Progress.getPct(u.id, totalN);
      const delay = i === 0 ? '' : `fade-in-delay-${Math.min(i, 3)}`;
      return `
        <div class="glass-card unit-card fade-in ${delay}" onclick="App.openUnit('${u.id}')" style="border-color:${u.clr}30">
          <div class="unit-card-icon" style="background:${u.clr}15">${u.icon}</div>
          <div class="unit-card-body">
            <div class="unit-card-title" style="color:${u.clr}">${u.title}</div>
            <div class="unit-card-meta">${u.description}</div>
            <div class="prog-bar"><div class="prog-fill" style="width:${pct}%;background:${u.clr}"></div></div>
          </div>
          <div class="unit-card-arrow">←</div>
        </div>`;
    }).join('');

    return hero + stats + `<div class="section-label">الوحدات الدراسية</div><div class="units-grid">${unitsHtml}</div>`;
  },

  /* — UNIT — */
  unit(unit) {
    const sectionsHtml = unit.sections.map(s => `
      <div class="glass-card section-item fade-in" onclick="App.openSection('${unit.id}','${s.id}')" style="border-color:${unit.clr}25">
        <div class="section-dot" style="background:${unit.clr}"></div>
        <div class="section-item-title">${s.title}</div>
        <div class="section-item-count">${s.nodes.length} موضوع ←</div>
      </div>`).join('');

    return `
      <div class="breadcrumb">
        <span onclick="App.tab('home')">🏠 الرئيسية</span>
        <span class="breadcrumb-sep">←</span>
        <span style="color:${unit.clr}">${unit.icon} ${unit.title}</span>
      </div>
      <div class="section-list">${sectionsHtml}</div>`;
  },

  /* — SECTION — */
  section(unit, sec) {
    const html = sec.nodes.map(node => this._renderNode(unit, node)).join('');
    return `
      <div class="breadcrumb">
        <span onclick="App.tab('home')">🏠</span>
        <span class="breadcrumb-sep">←</span>
        <span onclick="App.openUnit('${unit.id}')" style="color:${unit.clr}">${unit.title}</span>
        <span class="breadcrumb-sep">←</span>
        <span>${sec.title}</span>
      </div>
      ${html}`;
  },

  _renderNode(unit, node) {
    /* TABLE */
    if (node.isTable && node.tableData) {
      const td = node.tableData;
      return `
        <div class="glass-card compare-block fade-in" style="padding:14px;margin-bottom:10px;border-color:${(node.clr||unit.clr)}25">
          <h4 style="color:${node.clr||unit.clr};margin-bottom:10px;font-size:13px">${node.title}</h4>
          <div class="table-scroll">
            <table class="chem-table">
              <tr>${td.headers.map(h => `<th style="color:${node.clr||unit.clr}">${h}</th>`).join('')}</tr>
              ${td.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
            </table>
          </div>
        </div>`;
    }

    /* EXPECTED QUESTIONS */
    if (node.isExpected) {
      return `
        <div class="expected-block fade-in">
          <div class="expected-header">❓ ${node.title}</div>
          ${node.items.map((q, i) => `
            <div class="expected-item">
              <span class="expected-num">س${i+1}</span>
              <span>${q}</span>
            </div>`).join('')}
        </div>`;
    }

    /* PATHWAY */
    if (node.isPathway && node.pathway) {
      const w = document.getElementById('view')?.clientWidth || 320;
      const svgHtml = MindMap.renderPathwaySVG(node.pathway, w - 28);
      return `
        <div class="glass-card fade-in" style="padding:12px;margin-bottom:8px;border-color:${(node.clr||unit.clr)}25">
          <div class="node-title" style="color:${node.clr||unit.clr};margin-bottom:10px;font-size:13px;font-weight:800">${node.title}</div>
          <div class="pathway-scroll">${svgHtml}</div>
        </div>`;
    }

    /* ACCORDION NODE */
    const clr = node.clr || unit.clr;
    const nid = node.id;
    const itemsHtml = (node.items || []).map(item => ItemParser.render(item)).join('');

    return `
      <div class="node-wrap fade-in">
        <div class="node-header" id="nh_${nid}" onclick="App.toggleNode('${nid}','${unit.id}')"
          style="border-color:${clr}35">
          <div class="node-title" style="color:${clr}">${node.title}</div>
          <span class="node-count">${(node.items||[]).length}</span>
          <span class="node-chevron">▼</span>
        </div>
        <div class="node-body" id="nb_${nid}" style="border-color:${clr}25;background:${clr}08">
          ${itemsHtml}
          ${this._bondDemo(node)}
        </div>
      </div>`;
  },

  _bondDemo(node) {
    if (node.id === 'ethene_rxns') {
      return `<div class="bond-demo" style="margin-top:12px">
        <div class="bond-demo-label">🔬 آلية تفاعل الإضافة</div>
        ${MindMap.bondFormationSVG('alkene_addition')}
      </div>`;
    }
    if (node.id === 'ethyne_rxns') {
      return `<div class="bond-demo" style="margin-top:12px">
        <div class="bond-demo-label">🔬 الرابطة الثلاثية</div>
        ${MindMap.bondFormationSVG('alkyne_triple')}
      </div>`;
    }
    return '';
  },

  /* — ORGANIC TAB (special visual) — */
  organic() {
    const hc = DB.units.find(u => u.id === 'hydrocarbons');
    const der = DB.units.find(u => u.id === 'org_derivatives');

    // Organic conversion pathway: C₂ complete chain
    const pw = DB.units[0].sections.find(s=>s.id==='alkynes')?.nodes.find(n=>n.isPathway);
    const w = document.getElementById('view')?.clientWidth || 320;
    const pwSVG = pw ? MindMap.renderPathwaySVG(pw.pathway, w - 28) : '';

    // Functional group chips
    const fgChips = [
      { fg:'-OH',   clr:'#b97aff', name:'هيدروكسيل' },
      { fg:'-CHO',  clr:'#ffcc44', name:'ألدهيد' },
      { fg:'-COOH', clr:'#ff4d6d', name:'كربوكسيل' },
      { fg:'-COO-', clr:'#00e5ff', name:'استر' },
      { fg:'-CO-',  clr:'#ff7c35', name:'كيتون' },
      { fg:'-NH₂',  clr:'#00ffb3', name:'أمين' },
    ].map(c => `<span class="fg-chip" style="color:${c.clr};border-color:${c.clr}55;background:${c.clr}10">${c.fg} ${c.name}</span>`).join('');

    return `
      <div class="section-label">الكيمياء العضوية — نظرة عامة</div>

      <div class="glass-card glow-green fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-green);margin-bottom:8px">🔗 المجموعات الوظيفية</div>
        <div>${fgChips}</div>
      </div>

      <div class="glass-card fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-pink);margin-bottom:10px">↔️ سلسلة تحويلات C₂</div>
        <div class="pathway-scroll">${pwSVG}</div>
      </div>

      <div class="glass-card fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-blue);margin-bottom:10px">🔬 آلية الإضافة على الكينات</div>
        ${MindMap.bondFormationSVG('alkene_addition')}
      </div>

      <div class="glass-card fade-in" style="padding:14px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:800;color:var(--neon-pink);margin-bottom:10px">⚡ الرابطة الثلاثية — الكاينات</div>
        ${MindMap.bondFormationSVG('alkyne_triple')}
      </div>

      <div class="section-label" style="margin-top:10px">الوحدات العضوية</div>
      <div class="glass-card unit-card fade-in" onclick="App.openUnit('hydrocarbons')" style="border-color:#00ffb330">
        <div class="unit-card-icon" style="background:#00ffb315">🧪</div>
        <div class="unit-card-body">
          <div class="unit-card-title" style="color:var(--neon-green)">الهيدروكربونات</div>
          <div class="unit-card-meta">كانات • كينات • كاينات • بنزين</div>
        </div>
        <div class="unit-card-arrow">←</div>
      </div>
      <div class="glass-card unit-card fade-in fade-in-delay-1" onclick="App.openUnit('org_derivatives')" style="border-color:#ec489930">
        <div class="unit-card-icon" style="background:#ec489915">⚗️</div>
        <div class="unit-card-body">
          <div class="unit-card-title" style="color:#ec4899">مشتقات الهيدروكربونات</div>
          <div class="unit-card-meta">كحولات • أحماض • استرات</div>
        </div>
        <div class="unit-card-arrow">←</div>
      </div>
    `;
  },

  /* — SEARCH — */
  search(q) {
    const results = Search.query(q);
    if (!q || q.length < 2) {
      return `<div class="search-box">
        <input class="search-input" type="search" id="si" placeholder="ابحث: معادلة، عنصر، تفاعل..." value="${q||''}"
          oninput="App.onSearch(this.value)" autocomplete="off" autofocus/>
        <span class="search-icon">🔍</span>
      </div>
      <div class="search-hint">🔍<br>اكتب كلمتين على الأقل<br>للبحث في كل المحتوى</div>`;
    }
    const resHtml = results.length === 0
      ? '<div class="search-hint">😕 لا نتائج — جرب كلمة مختلفة</div>'
      : results.map(r => `
          <div class="search-result" onclick="App.jumpTo('${r.uid}','${r.sid}')">
            <div class="sr-title" style="color:${r.clr}">${r.nodeTitle}</div>
            <div class="sr-path">${r.unitTitle} ← ${r.secTitle}</div>
            ${r.matchItems.map(it => {
              const ql = q.toLowerCase();
              const safe = it.replace(/</g,'&lt;');
              const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
              return `<div class="sr-preview">${safe.replace(re,'<mark>$1</mark>')}</div>`;
            }).join('')}
          </div>`).join('');

    return `<div class="search-box">
      <input class="search-input" type="search" id="si" placeholder="ابحث..." value="${q}"
        oninput="App.onSearch(this.value)" autocomplete="off"/>
      <span class="search-icon">🔍</span>
    </div>
    ${results.length > 0 ? `<div class="search-count">${results.length} نتيجة</div>` : ''}
    ${resHtml}`;
  },

  /* — QUIZ — */
  quiz(S) {
    if (S.done) {
      const pct = Math.round(S.score / QUIZ.length * 100);
      const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚';
      const msg = pct >= 80 ? 'ممتاز! أنت جاهز للامتحان' : pct >= 60 ? 'جيد، راجع المحتوى ثم أعد' : 'راجع المحتوى وأعد المحاولة';
      return `
        <div class="quiz-result glass-card" style="padding:28px">
          <div class="quiz-result-score" style="color:${pct>=80?'var(--neon-green)':pct>=60?'var(--neon-amber)':'var(--neon-red)'}">${emoji}</div>
          <div class="quiz-result-label">${S.score} / ${QUIZ.length}</div>
          <div class="quiz-result-sub">${pct}% صحيح — ${msg}</div>
          <div class="quiz-result-bar-wrap">
            <div class="quiz-prog-bar"><div class="quiz-prog-fill" style="width:${pct}%"></div></div>
          </div>
          <button class="btn-primary" onclick="App.restartQuiz()">🔄 إعادة الاختبار</button>
          <button class="btn-ghost" onclick="App.tab('flash')">🃏 مراجعة بالبطاقات</button>
        </div>`;
    }

    const q = QUIZ[S.idx];
    const pct = Math.round(S.idx / QUIZ.length * 100);
    const optsHtml = q.opts.map((o, i) => {
      let cls = '';
      if (S.answered) {
        if (i === q.ans) cls = 'correct';
        else if (i === S.chosen && i !== q.ans) cls = 'wrong';
        else cls = 'revealed';
      }
      return `<button class="quiz-opt ${cls}" onclick="App.answerQuiz(${i})" ${S.answered?'disabled':''}>${o}</button>`;
    }).join('');

    return `
      <div class="quiz-progress-wrap">
        <div class="quiz-prog-bar"><div class="quiz-prog-fill" style="width:${pct}%"></div></div>
        <div class="quiz-prog-label">السؤال ${S.idx+1} من ${QUIZ.length}</div>
      </div>
      <div class="glass-card quiz-card">
        <div class="quiz-q">${q.q}</div>
        <div class="quiz-opts">${optsHtml}</div>
        ${S.answered && q.explain ? `<div class="quiz-explain">💡 ${q.explain}</div>` : ''}
        ${S.answered ? `<button class="btn-primary" style="margin-top:14px" onclick="App.nextQ()">التالي ←</button>` : ''}
      </div>`;
  },

  /* — FLASHCARDS — */
  flash(S) {
    const card = CARDS[S.idx];
    const unit = DB.units.find(u => u.id === card.unit);
    const clr = unit ? unit.clr : '#3b9eff';
    const conf = Progress.getConf(S.idx);

    return `
      <div class="fc-counter">${S.idx + 1} / ${CARDS.length} — ${unit ? unit.title : ''}</div>
      <div class="fc-scene" onclick="App.flipCard()">
        <div class="fc-card ${S.flipped ? 'flipped' : ''}" style="min-height:200px;position:relative">
          <div class="fc-face" style="border-color:${clr}30;min-height:200px">
            <div class="fc-face-label">السؤال — انقر للإجابة</div>
            <div class="fc-face-text">${card.f}</div>
          </div>
          <div class="fc-face fc-face-back" style="border-color:${clr};min-height:200px">
            <div class="fc-face-label" style="color:${clr}">الإجابة ✓</div>
            <div class="fc-face-text">${card.b}</div>
          </div>
        </div>
      </div>
      <div class="fc-hint">${S.flipped ? 'كيف كانت درجة صعوبتها؟' : '👆 انقر على البطاقة لرؤية الإجابة'}</div>
      ${S.flipped ? `
        <div class="fc-confidence" style="margin-bottom:12px">
          <button class="fc-conf-btn fc-conf-hard" onclick="App.rateCard('hard')">😓 صعب</button>
          <button class="fc-conf-btn fc-conf-ok"   onclick="App.rateCard('ok')">🤔 تقريباً</button>
          <button class="fc-conf-btn fc-conf-easy" onclick="App.rateCard('easy')">✅ سهل</button>
        </div>` : ''}
      <div class="fc-nav">
        <button class="fc-nav-btn" onclick="App.prevCard()">← السابق</button>
        <div style="color:var(--text-muted);font-size:11px;text-align:center">
          ${conf === 'easy' ? '✅ سهل' : conf === 'ok' ? '🤔 تقريباً' : conf === 'hard' ? '😓 صعب' : '⬜ لم تُقيَّم'}
        </div>
        <button class="fc-nav-btn" onclick="App.nextCard()">التالي →</button>
      </div>`;
  }
};


void PeriodicTable;

export { MindMap, Renderer };
