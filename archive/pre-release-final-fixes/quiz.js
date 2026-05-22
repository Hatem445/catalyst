'use strict';

function answerQuiz(state, quizData, choice) {
  if (state.quiz.answered) return;
  state.quiz.answered = true;
  state.quiz.chosen = choice;
  if (choice === quizData[state.quiz.idx].ans) state.quiz.score++;
}

function nextQuizQuestion(state, quizData) {
  state.quiz.idx++;
  state.quiz.answered = false;
  state.quiz.chosen = -1;
  if (state.quiz.idx >= quizData.length) state.quiz.done = true;
}

function restartQuiz(state) {
  state.quiz = { idx:0, score:0, answered:false, done:false, chosen:-1 };
}

export { answerQuiz, nextQuizQuestion, restartQuiz };
