import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ANIMALS,
  getFoundAnimalIds,
  resetFoundAnimals,
} from "./Game2";

import background from "../../assets/goat-island/background.webp";
import logo from "../../assets/goat-island/logo.webp";
import boy from "../../assets/boy.webp";

import "../../styles/game2Landing.css";

/**
 * Goat Island landing page.
 * Progress is read from Game2's existing NFC discovery storage.
 * Toggling the instructions changes only the view, not the saved progress.
 */
export default function GoatIslandLanding() {
  const navigate = useNavigate();
  const [foundCount, setFoundCount] = useState(() => getFoundAnimalIds().length);
  const [showHowTo, setShowHowTo] = useState(false);
  const [notice, setNotice] = useState("");

  function restartGame() {
    resetFoundAnimals();
    setFoundCount(0);
    setNotice("Progress reset! All nine animals are hungry again.");
  }

  function openInstructions() {
    setShowHowTo(true);
  }

  function closeInstructions() {
    setShowHowTo(false);
  }

  return (
    <main className="gi-landing-page">
      <section
        className={`gi-landing-phone${showHowTo ? " gi-landing-phone--instructions" : ""}`}
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
            aria-label="Back to game menu"
          >
            <span aria-hidden="true">←</span> Back
          </button>

          <img
            className="gi-landing-logo"
            src={logo}
            alt="Goat Island"
            draggable={false}
          />

          {/* Outer wrapper fades out; the boy inside keeps his bounce. */}
          <div className="gi-landing-child-wrap" aria-hidden="true">
            <img
              className="gi-landing-child"
              src={boy}
              alt=""
              draggable={false}
            />
          </div>

          {notice && (
            <p className="gi-landing-notice" role="status" aria-live="polite">
              {notice}
            </p>
          )}

          <section
            className="gi-landing-panel"
            aria-label={showHowTo ? "How to play Goat Island" : "Goat Island game controls"}
          >
            {/* Welcome screen: always in the DOM for a smooth crossfade. */}
            <div
              className="gi-landing-view gi-landing-view--welcome"
              aria-hidden={showHowTo}
            >
              <p className="gi-landing-progress" aria-live="polite">
                {foundCount} of {ANIMALS.length} Animals fed
              </p>

              <button
                className="gi-landing-button gi-landing-button--play"
                type="button"
                onClick={() => navigate("/game2/rabbit")}
                tabIndex={showHowTo ? -1 : 0}
              >
                Play
              </button>

              <button
                className="gi-landing-button gi-landing-button--reset"
                type="button"
                onClick={restartGame}
                tabIndex={showHowTo ? -1 : 0}
              >
                Restart
              </button>

              <button
                className="gi-landing-button gi-landing-button--howto"
                type="button"
                onClick={openInstructions}
                tabIndex={showHowTo ? -1 : 0}
              >
                How to Play
                <span aria-hidden="true"> ›</span>
              </button>

            </div>

            {/* Instructions screen: fades in while the cream box expands. */}
            <div
              className="gi-landing-view gi-landing-view--help"
              aria-hidden={!showHowTo}
            >
              <div className="gi-landing-help-heading">
                <span className="gi-landing-help-leaf" aria-hidden="true">🍁</span>
                <h2>How to Play</h2>
                <p>Help all nine animals find their food!</p>
              </div>

              <ol className="gi-landing-steps">
                <li>
                  <strong>Choose an animal.</strong> Tap a wooden plate or use
                  the arrows to explore.
                </li>
                <li>
                  <strong>Find its NFC tag.</strong> Look for the matching tag
                  during the Goat Island activity.
                </li>
                <li>
                  <strong>Scan the tag.</strong> Open its animal-found link on
                  an NFC-enabled phone.
                </li>
                <li>
                  <strong>Feed the animal!</strong> Watch it change from Hungry
                  to Happy, including its wooden plate.
                </li>
                <li>
                  <strong>Feed all nine.</strong> Your discoveries are saved in
                  this browser until you press Restart.
                </li>
              </ol>

              <button
                className="gi-landing-button gi-landing-button--return"
                type="button"
                onClick={closeInstructions}
                tabIndex={showHowTo ? 0 : -1}
              >
                <span aria-hidden="true">← </span>
                Back
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
