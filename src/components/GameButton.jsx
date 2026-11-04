function GameButton({ label, onClick }) {
  return (
    <button className="game-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default GameButton;
