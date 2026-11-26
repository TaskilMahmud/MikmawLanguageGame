
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

const months = [
  ...new Set(questions.map((q) => q.month || "September")),
];

export default function Game1Landing() {
  const [savedProgress, setSavedProgress] = useState(() =>
    readGame1Progress(questions)
  );

  const [resetMessage, setResetMessage] = useState("");

  const canResume =
    Boolean(savedProgress) &&
    (
      savedProgress.month !== months[0] ||
      savedProgress.questionIndex > 0 ||
      savedProgress.score > 0 ||
      savedProgress.feedback !== null ||
      savedProgress.isComplete
    );

  const monthLabel =
    savedProgress?.month.match(/\(([^)]+)\)/)?.[1] ||
    savedProgress?.month;

  const questionCount = savedProgress
    ? questions.filter(
        (q) =>
          (q.month || "September") === savedProgress.month
      ).length
    : 0;

  // Preload the image for the saved question.
  useEffect(() => {
    const month = savedProgress?.month ?? months[0];

    const monthQuestions = questions.filter(
      (q) => (q.month || "September") === month
    );

    const questionImage =
      monthQuestions[savedProgress?.questionIndex ?? 0]?.image;

    if (!questionImage) return;

    const preloadImage = new Image();
    preloadImage.fetchPriority = "low";
    preloadImage.src = questionImage;
  }, [savedProgress]);

  // Restart immediately without a browser popup.
  function handleRestart() {
    clearGame1Progress();

    // Remove the saved progress displayed on screen.
    setSavedProgress(null);

    // Show a confirmation inside the How to Play box.
    setResetMessage("✓ Progress has been reset!");
  }

  return (
    <main
      className="screen game1-landing"
      style={{
        "--game1-landing-background": `url(${backgroundImage})`,
      }}
    >
      <div className="game1-landing__shell">

        {/* Header */}
        <header className="game1-landing__header">
          <Link
            className="wooden-button game1-landing__back"
            to="/menu"
          >
            <span aria-hidden="true">←</span> Back
          </Link>

          <h1>Pictionary</h1>
        </header>

        {/* Main Content */}
        <div className="game1-landing__welcome">

          <img
            className="game1-landing__character"
            src={character}
            alt=""
          />

          <section
            className="game1-landing__instructions"
            aria-labelledby="game1-how-to-play"
          >
            <h2 id="game1-how-to-play">
              How to play
            </h2>

            <ol>
              <li>Pick a month.</li>

              <li>
                Look at the picture and find the blank
                in the sentence.
              </li>

              <li>
                Tap a word to hear it in Mi’kmaw.
              </li>

              <li>
                Pick the missing word, then tap{" "}
                <strong>Select Answer</strong>.
              </li>
            </ol>

            <p>
              Got it right? Tap{" "}
              <strong>Next Question</strong>{" "}
              to keep going.
            </p>

            {/* Show saved progress */}
            {canResume && (
              <p
                className="game1-landing__saved"
                role="status"
              >
                {savedProgress.isComplete
                  ? `${monthLabel} completed — pick up at the celebration!`
                  : `Saved progress: ${monthLabel} · Question ${
                      savedProgress.questionIndex + 1
                    } of ${questionCount}`}
              </p>
            )}

            {/* Reset success message */}
            {resetMessage && (
              <p
                className="game1-landing__reset-message"
                role="status"
                aria-live="polite"
              >
                {resetMessage}
              </p>
            )}

            {/* Side-by-side buttons */}
            <div className="game1-landing__actions">

              <Link
                className="wooden-button game1-landing__play"
                to="/game1/play"
              >
                Play
              </Link>

              <button
                className="wooden-button game1-landing__reset"
                type="button"
                onClick={handleRestart}
              >
                Restart
              </button>

            </div>

          </section>
        </div>
      </div>
    </main>
  );
}
