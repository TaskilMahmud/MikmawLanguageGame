
import WoodenButton from "./WoodenButton";
import FeedbackMessage from "./FeedbackMessage";

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
}) {
  return (
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

      <div className="question-content">
        <h2 className="question-text">
          {questionText}
        </h2>

        <FeedbackMessage feedback={feedback} />

        <WoodenButton
          disabled={actionDisabled}
          onClick={onAction}
        >
          {actionLabel}
        </WoodenButton>
      </div>
    </section>
  );
}
