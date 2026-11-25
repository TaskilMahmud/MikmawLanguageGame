
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ANIMALS,
  getFoundAnimalIds,
  resetFoundAnimals,
} from "./Game2";

// Updated WebP assets
import background from "../../assets/goat-island/background.webp";
import logo from "../../assets/goat-island/logo.webp";
import boy from "../../assets/boy.webp";

import "../../styles/game2Landing.css";

export default function GoatIslandLanding() {
  const navigate = useNavigate();

  const [foundCount, setFoundCount] = useState(
    () => getFoundAnimalIds().length
  );

  const [notice, setNotice] = useState("");

  function restart() {
    resetFoundAnimals();
    setFoundCount(0);
    setNotice("All animals reset. Ready to play again!");
  }

  return (
    <main className="gi-landing-page">
      <section
        className="gi-landing-phone"
        aria-label="Goat Island landing page"
      >
        <img
          className="gi-landing-background"
          src={background}
          alt=""
          draggable={false}
        />

        <div className="gi-landing-content">
          <button
            className="gi-landing-back"
            type="button"
            onClick={() => navigate("/menu")}
          >
            ← Back
          </button>

          <img
            className="gi-landing-logo"
            src={logo}
            alt="Goat Island"
            draggable={false}
          />

          {/* Animated child behind the panel */}
          <img
            className="gi-landing-child"
            src={boy}
            alt=""
            aria-hidden="true"
            draggable={false}
          />

          <section
            className="gi-landing-panel"
            aria-label="Goat Island game controls"
          >
            <p
              className="gi-landing-progress"
              role="status"
            >
              {foundCount} of {ANIMALS.length} Animals fed
            </p>

            <button
              className="gi-landing-button"
              type="button"
              onClick={() => navigate("/game2/rabbit")}
            >
              Play
            </button>

            <button
              className="gi-landing-button gi-landing-button--reset"
              type="button"
              onClick={restart}
            >
              Restart
            </button>

            <p
              className="gi-landing-notice"
              aria-live="polite"
            >
              {notice}
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

