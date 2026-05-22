'use strict';

const LAW_REF_MAP = {
  ksp: { focus: 'ksp', category: 'ksp', lawId: 'law_ksp_general' },
  ph: { focus: 'ph-poh', category: 'ph-poh', lawId: 'law_ph_poh_kw' },
  poh: { focus: 'ph-poh', category: 'ph-poh', lawId: 'law_ph_poh_kw' },
  'ph-poh': { focus: 'ph-poh', category: 'ph-poh', lawId: 'law_ph_poh_kw' },
  faraday: { focus: 'electrolysis', category: 'electrolysis', lawId: 'law_faraday_electrolysis' },
  electrolysis: { focus: 'electrolysis', category: 'electrolysis', lawId: 'law_faraday_electrolysis' },
  e_cell: { focus: 'e_cell', category: 'electrochemical-cells', lawId: 'law_ecell' },
  ecell: { focus: 'e_cell', category: 'electrochemical-cells', lawId: 'law_ecell' },
  titration: { focus: 'titration', category: 'titration', lawId: 'law_titration' },
  moles: { focus: 'moles', category: 'moles', lawId: 'law_moles' },
  mol: { focus: 'moles', category: 'moles', lawId: 'law_moles' },
  ka: { focus: 'acids-bases', category: 'acids-bases', lawId: 'law_strong_weak_electrolytes' },
  kb: { focus: 'acids-bases', category: 'acids-bases', lawId: 'law_strong_weak_electrolytes' },
  'acids-bases': { focus: 'acids-bases', category: 'acids-bases', lawId: 'law_strong_weak_electrolytes' },
  'mass-percent': { focus: 'mass-percent', category: 'mass-percent', lawId: 'law_mass_percent' },
};

function normalizeLawRef(raw) {
  const key = String(raw || '').trim().toLowerCase();
  return LAW_REF_MAP[key] || null;
}

const WorkedExamples = {
  normalizeLawRef,

  getLawFocusHash(raw) {
    const mapped = normalizeLawRef(raw);
    if (!mapped) return '#laws';
    return `#laws?focus=${encodeURIComponent(mapped.focus)}`;
  },

  getLawFocusState(raw) {
    return normalizeLawRef(raw);
  },
};

export { WorkedExamples };
