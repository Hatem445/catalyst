'use strict';

function normalizeChoiceIndex(value) {
  const idx = Number(value);
  return Number.isInteger(idx) ? idx : -1;
}

const QuestionPlayer = {
  createSession(questionId) {
    return {
      questionId: String(questionId || ''),
      selectedIndex: -1,
      confirmed: false,
      isCorrect: null,
      reviewedLawRef: '',
    };
  },

  selectChoice(session, choiceIndex) {
    if (!session || session.confirmed) return session;
    return {
      ...session,
      selectedIndex: normalizeChoiceIndex(choiceIndex),
    };
  },

  confirmChoice(session, question) {
    if (!session || !question || session.confirmed) return session;
    if (session.selectedIndex < 0) return session;
    const isCorrect = session.selectedIndex === Number(question.answerKey);
    return {
      ...session,
      confirmed: true,
      isCorrect,
    };
  },

  markLawReviewed(session, lawRef) {
    if (!session) return session;
    return {
      ...session,
      reviewedLawRef: String(lawRef || ''),
    };
  },

  createViewModel(question, session, workedExample) {
    if (!question || !session) return null;
    const choices = (question.choices || []).map((choice, idx) => {
      let status = 'idle';
      if (session.confirmed) {
        if (idx === Number(question.answerKey)) status = 'correct';
        else if (idx === session.selectedIndex) status = 'wrong';
        else status = 'revealed';
      } else if (idx === session.selectedIndex) {
        status = 'selected';
      }
      return {
        index: idx,
        text: String(choice),
        status,
      };
    });

    return {
      questionId: question.id,
      chapter: question.chapter,
      topic: question.topic,
      skill: question.skill,
      marks: question.marks,
      difficulty: question.difficulty,
      question: question.question,
      choices,
      selectedIndex: session.selectedIndex,
      confirmed: session.confirmed,
      isCorrect: session.isCorrect,
      lawRefs: question.lawRefs || [],
      workedExample,
    };
  },
};

export { QuestionPlayer };
