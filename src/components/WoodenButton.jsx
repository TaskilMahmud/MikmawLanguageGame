
/*
==========================================
SHARED WOODEN BUTTON
==========================================

Used for:
- Back
- PLAY
- Select Answer
- Next Question
- Play Again

Styling: styles/components.css

==========================================
*/

export default function WoodenButton({
  children,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`wooden-button ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
