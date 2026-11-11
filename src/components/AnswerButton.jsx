
/*
==========================================
ANSWER BUTTON COMPONENT
==========================================

Each answer can:
- Be clicked
- Be highlighted when selected
- Be disabled after a correct answer

Styling: styles/components.css

==========================================
*/

export default function AnswerButton({
  answer,
  selected,
  disabled,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`answer-button${selected ? " is-selected" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {answer}
    </button>
  );
}
