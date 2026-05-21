'use strict';

function flipFlashCard(state) {
  state.flash.flipped = !state.flash.flipped;
}

function nextFlashCard(state, cards) {
  state.flash.idx = (state.flash.idx + 1) % cards.length;
  state.flash.flipped = false;
}

function prevFlashCard(state, cards) {
  state.flash.idx = (state.flash.idx - 1 + cards.length) % cards.length;
  state.flash.flipped = false;
}

function rateFlashCard(state, cards, progress, level, onAfterRate) {
  progress.setConf(state.flash.idx, level);
  setTimeout(() => {
    state.flash.idx = (state.flash.idx + 1) % cards.length;
    state.flash.flipped = false;
    if (typeof onAfterRate === 'function') onAfterRate();
  }, 300);
}

export { flipFlashCard, nextFlashCard, prevFlashCard, rateFlashCard };
