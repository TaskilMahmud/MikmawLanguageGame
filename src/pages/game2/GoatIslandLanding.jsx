import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import goatLogo from "../../assets/goat-island/goat-logo.webp";
import landingScene from "../../assets/goat-island/landing-scene-red.webp";
import { goatIslandAnimals } from "../../data/goatIslandAnimals";
import { getFoundAnimalIds, resetFoundAnimals } from "../../data/goatIslandProgress";
import "../../styles/game2.css";
import "../../styles/goatIslandLanding.css";

export default function GoatIslandLanding() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState("");
  const firstAnimal = goatIslandAnimals[0];
  const playPath = getFoundAnimalIds().includes(firstAnimal.id)
    ? firstAnimal.foundPath
    : firstAnimal.questPath;

  function restartGame() {
    if (
      getFoundAnimalIds().length > 0 &&
      !window.confirm("Restart Goat Island and clear the animals you found?")
    ) {
      return;
    }

    try {
      resetFoundAnimals();
    } catch {
      setNotice("Could not reset your saved animals.");
      return;
    }

    navigate(firstAnimal.questPath);
  }

  return (
    <main className="goat2-page">
      <section className="goat2-phone goat-landing" aria-label="Goat Island start screen">
        <header className="goat2-header goat-landing__header">
          <Link className="goat2-game-button goat2-back-button" to="/menu">
            <span aria-hidden="true">←</span> Back
          </Link>
          <h1 className="goat-landing__logo">
            <img src={goatLogo} alt="Goat Island" />
          </h1>
        </header>

        <div className="goat-landing__scene">
          <img src={landingScene} alt="" width="914" height="998" />
        </div>

        <div className="goat-landing__footer">
          <div className="goat-landing__panel">
            <div className="goat-landing__instructions">
              <p>Follow the clues.</p>
              <p>Scan the NFC tags to find animals.</p>
              {notice && <p className="goat-landing__notice" role="status">{notice}</p>}
            </div>
            <div className="goat-landing__actions">
              <Link className="goat2-game-button goat2-button-green" to={playPath}>
                Play
              </Link>
              <button className="goat2-game-button goat2-button-yellow" type="button" onClick={restartGame}>
                Restart
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
