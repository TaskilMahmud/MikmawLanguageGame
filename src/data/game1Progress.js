/*
 * Game 1 progress storage.
 * Saves progress only on this device/browser (localStorage).
 * Stored question positions and answers are checked against the live curriculum
 * so changes to the questions won't crash a returning player.
 */

const STORAGE_KEY = "mikmaw-game1-progress-v1";

export function defaultGame1Progress(questions) {
  const firstMonth = questions[0]?.month || "September";
  return {
    month: firstMonth,
    questionIndex: 0,
    selectedAnswer: null,
    feedback: null,
    incorrectAttempts: 0,
    score: 0,
    isComplete: false,
    completedMonths: [],
    monthScores: {},
  };
}

/** Returns null when the player has no valid saved progress. */
export function readGame1Progress(questions) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return null;

    const months = [...new Set(questions.map((q) => q.month || "September"))];
    if (!months.includes(saved.month)) return null;

    const monthQuestions = questions.filter((q) => (q.month || "September") === saved.month);
    if (!monthQuestions.length) return null;

    // Clamp positions in case the curriculum changed after a save.
    const questionIndex = Number.isInteger(saved.questionIndex)
      ? Math.max(0, Math.min(saved.questionIndex, monthQuestions.length - 1))
      : 0;
    const question = monthQuestions[questionIndex];

    const isComplete = saved.isComplete === true && questionIndex === monthQuestions.length - 1;

    // Record every completed month, not just the currently selected month.
    // Older saves had only isComplete, so migrate those automatically.
    const completedMonths = Array.isArray(saved.completedMonths)
      ? [...new Set(saved.completedMonths.filter((month) => months.includes(month)))]
      : [];
    if (isComplete && !completedMonths.includes(saved.month)) {
      completedMonths.push(saved.month);
    }
    let feedback = saved.feedback === "correct" || saved.feedback === "incorrect"
      ? saved.feedback
      : null;
    let selectedAnswer = saved.selectedAnswer;

    // Prevent a stale/invalid answer from locking a question.
    if (feedback === "correct" && selectedAnswer !== question.correctAnswer) {
      feedback = null;
      selectedAnswer = null;
    } else if (feedback !== "correct") {
      selectedAnswer = null;
    }

    const incorrectAttempts = Number.isInteger(saved.incorrectAttempts)
      ? Math.max(0, saved.incorrectAttempts)
      : 0;
    const score = Number.isInteger(saved.score)
      ? Math.max(0, Math.min(saved.score, monthQuestions.length, questionIndex + 1))
      : 0;

    // Keep a high-water mark for each month. This also migrates older saved
    // progress, which only held the active month's score and completion ticks.
    const monthScores = {};
    for (const month of months) {
      const total = questions.filter((q) => (q.month || "September") === month).length;
      const rawStars = saved.monthScores?.[month];
      const storedStars = Number.isInteger(rawStars) && rawStars >= 0
        ? Math.min(rawStars, total)
        : 0;
      const currentStars = month === saved.month ? score : 0;
      const completedStars = completedMonths.includes(month) ? total : 0;
      monthScores[month] = Math.max(storedStars, currentStars, completedStars);
    }

    return {
      month: saved.month,
      questionIndex,
      selectedAnswer,
      feedback,
      incorrectAttempts,
      score,
      isComplete,
      completedMonths,
      monthScores,
    };
  } catch {
    // Storage can be unavailable in private mode or restricted browsers.
    return null;
  }
}

export function loadGame1Progress(questions) {
  return readGame1Progress(questions) ?? defaultGame1Progress(questions);
}

export function saveGame1Progress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The game still works without storage, but won't resume after leaving.
  }
}

export function clearGame1Progress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // No saved entry to remove if storage is blocked.
  }
}
