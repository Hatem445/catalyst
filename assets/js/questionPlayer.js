'use strict';

function normalizeChoiceIndex(value) {
  const idx = Number(value);
  return Number.isInteger(idx) ? idx : -1;
}

const QuestionPlayer = {
  createSession(questionIds = [], startIndex = 0) {
    const route = Array.isArray(questionIds) && questionIds.length ? questionIds.map(String) : [];
    const idx = Math.max(0, Math.min(Number(startIndex || 0), Math.max(0, route.length - 1)));
    return {
      route,
      index: idx,
      selectedIndex: -1,
      confirmed: false,
      isCorrect: null,
      reviewedLawRef: '',
      startedAt: Date.now(),
      questionId: route[idx] || '',
    };
  },

  moveTo(session, index) {
    if (!session || !Array.isArray(session.route) || !session.route.length) return session;
    const idx = Math.max(0, Math.min(index, session.route.length - 1));
    return {
      ...session,
      index: idx,
      questionId: session.route[idx],
      selectedIndex: -1,
      confirmed: false,
      isCorrect: null,
      startedAt: Date.now(),
    };
  },

  moveNext(session) {
    if (!session || !Array.isArray(session.route) || !session.route.length) return session;
    if (session.index >= session.route.length - 1) return session;
    return this.moveTo(session, session.index + 1);
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
    if (!question.canAutoGrade) {
      return {
        ...session,
        confirmed: true,
        isCorrect: null,
      };
    }
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

  createViewModel(question, session, workedExample, relatedWorked = []) {
    if (!question || !session) return null;
    const choices = (question.choices || []).map((choice, idx) => {
      let status = 'idle';
      if (session.confirmed && question.isAnswerVerified) {
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

    const qNumber = (session.index || 0) + 1;
    const total = (session.route || []).length || 1;

    return {
      questionId: question.id,
      questionNumber: qNumber,
      totalQuestions: total,
      chapter: question.chapter,
      topic: question.topic,
      skill: question.skill,
      marks: question.marks,
      difficulty: question.difficulty,
      question: question.question,
      displayQuestion: question.displayQuestion || question.question,
      choices,
      selectedIndex: session.selectedIndex,
      confirmed: session.confirmed,
      isCorrect: session.isCorrect,
      canGrade: Boolean(question.canAutoGrade),
      needsManualReview: Boolean(question.needsManualReview),
      sourceType: question.sourceType,
      sourceConfidence: question.sourceConfidence,
      sourceRef: question.sourceRef,
      officialStatus: question.officialStatus,
      explanation: question.explanation || '',
      trapTags: question.trapTags || [],
      lawRefs: question.lawRefs || [],
      visualAid: question.visualAid || null,
      workedExample,
      relatedWorked,
      hasNext: qNumber < total,
    };
  },
};

export { QuestionPlayer };
