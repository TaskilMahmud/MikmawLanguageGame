import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ANIMALS, getFoundAnimalIds, resetFoundAnimals } from "./Game2";

import background from "../../assets/goat-island/background.png";
import logo from "../../assets/goat-island/logo.png";
import "../../styles/goatIslandAnimalImages.css";

// Separate landing page: easy to redesign later. Restart lives here.
export default function GoatIslandLanding() {
  const navigate = useNavigate();
  const [foundCount, setFoundCount] = useState(() => getFoundAnimalIds().length);
  const [notice, setNotice] = useState("");

  function restart() {
    resetFoundAnimals();
    setFoundCount(0);
    setNotice("All animals reset to sad. Ready to play again!");
  }

  return (
    <main className="feed2-page">
      <section className="feed2-phone" aria-label="Goat Island landing page">
        <img className="feed2-background" src={background} alt="" draggable={false} />
        <div className="gi-landing-content">
          <button className="gi-landing-back" type="button" onClick={() => navigate("/menu")}>← Back</button>
          <img className="gi-landing-logo" src={logo} alt="Goat Island" />
          <section className="gi-landing-panel">
            <h1 className="gi-landing-heading">Feed the animal</h1>
            <p className="gi-landing-progress" role="status">{foundCount} of {ANIMALS.length} animals found</p>
            <button className="gi-landing-button" type="button" onClick={() => navigate("/game2/rabbit")}>Play</button>
            <button className="gi-landing-button gi-landing-button--reset" type="button" onClick={restart}>Restart progress</button>
            <p className="gi-landing-notice" aria-live="polite">{notice}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
