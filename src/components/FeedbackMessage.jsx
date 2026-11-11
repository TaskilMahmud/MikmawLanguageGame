
/*
==========================================
FEEDBACK MESSAGE COMPONENT
==========================================

Displays:
- Correct! Great job!
- Not quite! Try again!

Styling: styles/components.css

==========================================
*/

export default function FeedbackMessage({ feedback }) {
  if (!feedback) return null;

  return (
    <div
      className={`feedback-message feedback-message--${feedback}`}
      role="status"
    >
      {feedback === "correct"
        ? "Correct! Great job!"
        : "Not quite! Try again!"}
    </div>
  );
}
