import { useState } from "react";
import WoodenButton from "./WoodenButton";
import FeedbackMessage from "./FeedbackMessage";
import { mikmawWords } from "../data/game1Questions";
import "../styles/game1CorrectSentence.css";

/**
 * Displays the full English sentence after a correct answer.
 * The phrase to highlight is defined in game1Questions.js, not hardcoded here.
 * On incorrect attempts we continue showing the blank question as before.
 */
function CompletedSentence({ sentence, highlightedText }) {
  if (!sentence) return null;
  if (!highlightedText) return sentence;

  const start = sentence.toLocaleLowerCase().indexOf(highlightedText.toLocaleLowerCase());
  if (start === -1) return sentence;

  const end = start + highlightedText.length;
  return (
    <>
      {sentence.slice(0, start)}
      <span className="game1-correct-word">{sentence.slice(start, end)}</span>
      {sentence.slice(end)}
    </>
  );
}

export default function QuestionBox({
  thumbnail,
  questionText,
  correctSentence,
  highlightedText,
  feedback,
  incorrectAttempts,
  onNext,
  nextLabel,
  dictionaryQuestions = [],
  progress,
  children,
}) {
  const [showDictionary, setShowDictionary] = useState(false);
  const answeredCorrectly = feedback === "correct";

  const entries = dictionaryQuestions.map((q) => ({
    english: q.correctAnswer,
    mikmaw: mikmawWords[q.correctAnswer.toLowerCase()] || "add word",
    image: q.image,
  }));

  return (
    <>
      <section className="question-box" aria-label="Current question">
        <div className="question-toolbar">
          <p className="question-progress">{progress}</p>
          <WoodenButton
            className="question-dictionary"
            onClick={() => setShowDictionary(true)}
          >
            Dictionary
          </WoodenButton>
        </div>

        <div className="question-prompt">
          <div className="question-picture">
            <img src={thumbnail} alt="" />
          </div>
          <h2 className="question-text" aria-live="polite" aria-atomic="true">
            {answeredCorrectly && correctSentence ? (
              <CompletedSentence
                sentence={correctSentence}
                highlightedText={highlightedText}
              />
            ) : (
              questionText
            )}
          </h2>
        </div>

        <div className="question-choices">
          <p className="question-instruction">
            Tap a word to answer. Tap its speaker to listen.
          </p>
          {children}
        </div>

        <div className="question-result">
          <div className="question-feedback">
            <FeedbackMessage
              key={feedback === "incorrect" ? incorrectAttempts : feedback}
              feedback={feedback}
            />
          </div>

          <div className="question-next-slot">
            {answeredCorrectly && (
              <WoodenButton className="question-next" onClick={onNext}>
                {nextLabel}
              </WoodenButton>
            )}
          </div>
        </div>
      </section>

      {showDictionary && (
        <Dictionary entries={entries} onClose={() => setShowDictionary(false)} />
      )}
    </>
  );
}

function Dictionary({ entries, onClose }) {
  return (
    <div className="dict-overlay" onClick={onClose}>
      <div className="dict-panel" onClick={(event) => event.stopPropagation()}>
        <button className="dict-close" onClick={onClose}>
          Close
        </button>
        <h2 className="dict-title">Dictionary</h2>
        <p className="dict-hint">Tap a picture to see the word</p>

        <div className="dict-grid">
          {entries.map((entry, index) => (
            <DictionaryCard key={`${entry.english}-${index}`} entry={entry} />
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
