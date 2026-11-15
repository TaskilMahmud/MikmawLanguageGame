import { useState } from "react";
import WoodenButton from "./WoodenButton";
import FeedbackMessage from "./FeedbackMessage";
import { mikmawWords } from "../data/game1Questions";
/*
==========================================
QUESTION BOX COMPONENT
==========================================

Displays:
- Character thumbnail
- Current question
- Correct/incorrect feedback
- Select Answer / Next Question button

The game logic stays in Game1.jsx.

==========================================
*/

export default function QuestionBox({
  thumbnail,
  questionText,
  feedback,
  onAction,
  actionLabel,
  actionDisabled = false,
  dictionaryQuestions =[],
}) {
  const [showDictionary, setShowDictionary] = useState(false);

  // One card per question in the selected month.
  const entries = dictionaryQuestions.map((q) => ({
    english: q.correctAnswer,
    mikmaw:
      mikmawWords[q.correctAnswer.toLowerCase()] || "add word",
    image: q.image,
  }));

  return (
    <>
    <section
      className="question-box"
      aria-label="Current question"
    >
      {/* CHARACTER THUMBNAIL */}

      <div className="question-picture">
        <img
          src={thumbnail}
          alt="Question character"
        />
      </div>

      {/* QUESTION AND FEEDBACK */}
      <div className="question-actions">
        <h2 className="question-text">
          {questionText}
        </h2>

        <FeedbackMessage feedback={feedback} />

        <div className="question-actions">
        <WoodenButton
          disabled={actionDisabled}
          onClick={onAction}
        >
          {actionLabel}
        </WoodenButton>

        <WoodenButton onClick ={() => setShowDictionary(true)}>
          Dictionary
        </WoodenButton>
        </div>
      </div>
    </section>

    {showDictionary && (
      <Dictionary
       entries={entries}
       onClose={() => setShowDictionary(false)}
       />
    )}
    </>
  );
}

/* Dictionary */
function Dictionary({ entries, onClose }) {
  return (
    <div className="dict-overlay" onClick={onClose}>
      <div
        className="dict-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="dict-close" onClick={onClose}>
          ✕
        </button>
        <h2 className="dict-title">Dictionary</h2>
        <p className="dict-hint">Tap a picture to see the word</p>

        <div className="dict-grid">
          {entries.map((entry, index) => (
            <DictionaryCard
              key={`${entry.english}-${index}`}
              entry={entry}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function DictionaryCard({ entry }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`dict-card ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="dict-inner">
        <div className="dict-face dict-front">
          <img src={entry.image} alt={entry.english} />
        </div>
        <div className="dict-face dict-back">
          <strong>{entry.mikmaw}</strong>
          <span>({entry.english})</span>
        </div>
      </div>
    </div>
  );
}