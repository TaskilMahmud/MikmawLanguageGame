import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import backgroundImage from "../../assets/background3.webp";
import character from "../../assets/game1-girl-pointing.webp";
import { questions } from "../../data/game1Questions";
import {
  clearGame1Progress,
  readGame1Progress,
} from "../../data/game1Progress";

import "../../styles/game1Landing.css";

const months = [...new Set(questions.map((q) => q.month || "September"))];

function monthName(month) {
  return month.match(/\(([^)]+)\)/)?.[1] || month;
}

// Uses the four-colour star artwork already used in the Game 1 score display.
function ProgressStar({ filled }) {
  return (
    <svg className={`game1-landing__star${filled ? " game1-landing__star--earned" : ""}`}
      viewBox="0 0 100 100" aria-hidden="true">
      {filled ? (
        <>
          <polygon points="50,50 17.5,17.5 41.2,28.75 50,4 58.8,28.75 82.5,17.5" fill="#fff" />
          <polygon points="50,50 82.5,17.5 71.25,41.2 96,50 71.25,58.8 82.5,82.5" fill="#fec701" />
          <polygon points="50,50 82.5,82.5 58.8,71.25 50,96 41.2,71.25 17.5,82.5" fill="#df0113" />
          <polygon points="50,50 17.5,82.5 28.75,58.8 4,50 28.75,41.2 17.5,17.5 41.2,28.75" fill="#161615" />
        </>
      ) : null}
      <polygon
        points="50,4 58.8,28.75 82.5,17.5 71.25,41.2 96,50 71.25,58.8 82.5,82.5 58.8,71.25 50,96 41.2,71.25 17.5,82.5 28.75,58.8 4,50 28.75,41.2 17.5,17.5 41.2,28.75"
        fill={filled ? "none" : "#a7aaa6"} stroke="#25221d"
        strokeWidth="4" strokeLinejoin="round"
      />
    </svg>
  );
}

function MonthProgress({ savedProgress }) {
  const completedMonths = savedProgress?.completedMonths ?? [];
  const monthScores = savedProgress?.monthScores ?? {};

  const rows = months.map((month) => {
    const questionCount = questions.filter((q) => (q.month || "September") === month).length;
    const done = completedMonths.includes(month);
    const earned = done ? questionCount : Math.min(questionCount, monthScores[month] ?? 0);
    return { month, name: monthName(month), done, earned, questionCount };
  });
  const earnedTotal = rows.reduce((sum, row) => sum + row.earned, 0);
  const questionTotal = rows.reduce((sum, row) => sum + row.questionCount, 0);

  return (
    <div className="game1-landing__journey game1-landing__panel-body">
      <div className="game1-landing__journey-head">
        <h3>Your learning journey</h3>
        <span className="game1-landing__star-total">{earnedTotal} / {questionTotal} stars</span>
      </div>
      <div className="game1-landing__month-list" aria-label="Monthly Pictionary progress">
        {rows.map(({ month, name, done, earned, questionCount }) => (
          <div key={month}
            className={`game1-landing__month${done ? " game1-landing__month--complete" : ""}${savedProgress?.month === month ? " game1-landing__month--current" : ""}`}>
            <span className="game1-landing__month-name">{name}</span>
            <div className="game1-landing__month-stars" role="img"
              aria-label={`${name}: ${earned} of ${questionCount} stars${done ? ", completed" : ""}`}>
              {Array.from({ length: questionCount }, (_, index) => (
                <ProgressStar key={index} filled={index < earned} />
              ))}
            </div>
            <span className={`game1-landing__month-check${done ? " game1-landing__month-check--done" : ""}`}
              aria-label={done ? "Completed" : "Not completed"}>
              {done ? "✓" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Game1Landing() {
  const [savedProgress, setSavedProgress] = useState(() => readGame1Progress(questions));
  const [showInstructions, setShowInstructions] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const canResume = Boolean(savedProgress) && (
    savedProgress.month !== months[0] ||
    savedProgress.questionIndex > 0 ||
    savedProgress.score > 0 ||
    savedProgress.feedback !== null ||
    savedProgress.isComplete
  );

  const currentMonth = savedProgress ? monthName(savedProgress.month) : null;
  const questionCount = savedProgress
    ? questions.filter((q) => (q.month || "September") === savedProgress.month).length
    : 0;

  useEffect(() => {
    // Preload the question the player will actually resume.
    const month = savedProgress?.month ?? months[0];
    const monthQuestions = questions.filter((q) => (q.month || "September") === month);
    const questionImage = monthQuestions[savedProgress?.questionIndex ?? 0]?.image;
    if (!questionImage) return;

    const preload = new Image();
    preload.fetchPriority = "low";
    preload.src = questionImage;
  }, [savedProgress]);

  function restartProgress() {
    clearGame1Progress();
    setSavedProgress(null);
    setResetMessage("Progress has been reset! You can start again from September.");
    setShowInstructions(false);
  }

  return (
    <main className="screen game1-landing"
      style={{ "--game1-landing-background": `url(${backgroundImage})` }}>
      <div className="game1-landing__shell">
        <header className="game1-landing__header">
          <Link className="wooden-button game1-landing__back" to="/menu">
            <span aria-hidden="true">←</span> Back
          </Link>
          <h1>Pictionary</h1>
        </header>

        <div className="game1-landing__welcome">
          <img className="game1-landing__character" src={character} alt="" />

          <section className={`game1-landing__instructions game1-landing__panel${showInstructions ? " game1-landing__panel--howto" : ""}`}
            aria-labelledby="game1-landing-title">
            <h2 id="game1-landing-title" key={showInstructions ? "title-help" : "title-progress"}>
              {showInstructions ? "How to play" : "Welcome!"}
            </h2>

            {showInstructions ? (
              <div className="game1-landing__howto game1-landing__panel-body" key="instructions">
                <ol>
                  <li>Pick a month.</li>
                  <li>Look at the picture and find the blank in the sentence.</li>
                  <li>Tap the speaker beside a word to hear it in Mi’kmaw.</li>
                  <li>Choose the missing word to complete the sentence.</li>
                </ol>
                <p>Got it right? Tap <strong>Next Question</strong> to keep going.
                  Finish all the questions in a month to earn its completion tick!</p>
              </div>
            ) : (
              <MonthProgress key="progress" savedProgress={savedProgress} />
            )}

            {canResume && !showInstructions && !resetMessage && (
              <p className="game1-landing__saved" role="status">
                {savedProgress.isComplete
                  ? `${currentMonth} complete`
                  : `Continue: ${currentMonth} · Question ${savedProgress.questionIndex + 1} of ${questionCount}`}
              </p>
            )}

            {resetMessage && (
              <p className="game1-landing__reset-message" role="status" aria-live="polite">
                <span aria-hidden="true">✓</span> {resetMessage}
              </p>
            )}

            <div className="game1-landing__actions">
              <Link className="wooden-button game1-landing__play" to="/game1/play">Play</Link>
              <button className="wooden-button game1-landing__reset"
                type="button" onClick={restartProgress}>Restart</button>
            </div>

            <button type="button" className="game1-landing__toggle"
              aria-expanded={showInstructions}
              onClick={() => setShowInstructions((previous) => !previous)}
              aria-label={showInstructions ? "Return to monthly progress" : "Show how to play instructions"}>
              {showInstructions ? "← Progress" : "How to play →"}
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}
