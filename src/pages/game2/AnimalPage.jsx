import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import goatLogo from "../../assets/goat-island/goat-logo.png";
import forestScene from "../../assets/goat-island/forest-scene.png";
import scrollBlank from "../../assets/goat-island/scroll-blank.png";
import speakerIcon from "../../assets/goat-island/speaker-icon.png";

import {
  getGoatIslandAnimal,
  goatIslandAnimals,
  GOAT_ISLAND_TOTAL_ANIMALS,
} from "../../data/goatIslandAnimals";
import { getFoundAnimalIds, saveFoundAnimal } from "../../data/goatIslandProgress";
import "../../styles/game2.css";

/*
 * Shared page for the rabbit and deer clue and found screens.
 * Each NFC tag can open its animal's found route directly.
 */
export default function AnimalPage({ animalId, found = false }) {
  const navigate = useNavigate();
  const animal = getGoatIslandAnimal(animalId);
  const [notice, setNotice] = useState("");
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [foundIds, setFoundIds] = useState(getFoundAnimalIds);
  const audioRef = useRef(null);

  // Record a discovery when its found page opens.
  useEffect(() => {
    if (found && animal) {
      setFoundIds(saveFoundAnimal(animal.id));
    }
  }, [animal?.id, found]);

  // Stop audio when leaving this page.
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  if (!animal) {
    return <p>Unknown Goat Island animal.</p>;
  }

  const currentIndex = goatIslandAnimals.findIndex(
    (item) => item.id === animal.id
  );

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  function playPronunciation() {
    stopAudio();
    setNotice("");

    if (!animal.audioFile) {
      setNotice(`Pronunciation for ${animal.name} has not been added yet.`);
      return;
    }

    // BASE_URL keeps the correct audio path on GitHub Pages.
    const audio = new Audio(
      `${import.meta.env.BASE_URL}audio/${animal.audioFile}`
    );
    audioRef.current = audio;

    audio.play().catch((error) => {
      if (error.name !== "AbortError") {
        setNotice("Audio could not play. Check the MP3 filename.");
      }
    });
  }

  function moveAnimal(change) {
    const destination = goatIslandAnimals[currentIndex + change];

    if (!destination) {
      setNotice(
        change < 0 ? "This is the first animal!" : "More animals coming soon!"
      );
      return;
    }

    stopAudio();
    navigate(destination.questPath);
  }

  function backToMenu() {
    stopAudio();
    navigate("/menu");
  }

  return (
    <main className="goat2-page">
      <section className="goat2-phone" aria-label={`${animal.name} game`}>
        <header className="goat2-header">
          <button
            type="button"
            className="goat2-game-button goat2-back-button"
            onClick={backToMenu}
            aria-label="Back to game menu"
          >
            <span aria-hidden="true">←</span> Back
          </button>

          <button
            type="button"
            className="goat2-logo-button"
            onClick={backToMenu}
            aria-label="Back to game menu"
            title="Back to menu"
          >
            <img src={goatLogo} alt="Goat Island" />
          </button>

          <div
            className="goat2-counter"
            aria-label={`Animal ${animal.number} of ${GOAT_ISLAND_TOTAL_ANIMALS}`}
          >
            {animal.number}/{GOAT_ISLAND_TOTAL_ANIMALS}
          </div>
        </header>

        <section
          className="goat2-scene"
          aria-label={found ? animal.foundTitle : animal.questTitle}
        >
          <img
            className="goat2-forest"
            src={forestScene}
            alt=""
            aria-hidden="true"
            draggable={false}
          />

          <h1 className="goat2-title">
            {found ? animal.foundTitle : animal.questTitle}
          </h1>

          {found ? (
            <div className={`goat2-found-picture goat2-found-picture--${animal.id}`}>
              <img src={animal.image} alt={animal.name} />
              <span className="goat2-sparkles" aria-hidden="true">
                ✦ ✦
              </span>
            </div>
          ) : (
            <>
              <div className="goat2-scroll">
                <img src={scrollBlank} alt="" aria-hidden="true" />
                <div className="goat2-scroll-writing">
                  <span className="goat2-paw" aria-hidden="true">✿</span>
                  <p>{animal.clue}</p>
                  <span className="goat2-paw" aria-hidden="true">✿</span>
                </div>
              </div>

              {/* Tap the tree to simulate finding the animal during a demo. */}
              <button
                type="button"
                className="goat2-tree-hotspot"
                onClick={() => navigate(animal.foundPath)}
                aria-label={`Demo: discover the ${animal.name} by touching the tree`}
                title="Demo: tap to discover"
              />
            </>
          )}
        </section>

        <section className="goat2-controls" aria-label="Animal controls">
          {notice && (
            <div className="goat2-notice" role="status">
              <span>{notice}</span>
              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Close message"
              >
                ×
              </button>
            </div>
          )}

          <button
            type="button"
            className="goat2-game-button goat2-button-red"
            onClick={playPronunciation}
            aria-label={`Play ${animal.name} pronunciation`}
          >
            <img className="goat2-sound-icon" src={speakerIcon} alt="" />
            <span>{animal.name}</span>
          </button>

          <div className="goat2-nav-buttons">
            <button
              type="button"
              className="goat2-game-button goat2-button-yellow"
              onClick={() => moveAnimal(-1)}
            >
              <span>Previous<br />Animal</span>
            </button>

            <button
              type="button"
              className="goat2-game-button goat2-button-blue"
              onClick={() => {
                setNotice("");
                setDictionaryOpen(true);
              }}
            >
              Dictionary
            </button>

            <button
              type="button"
              className="goat2-game-button goat2-button-green"
              onClick={() => moveAnimal(1)}
            >
              <span>Next<br />Animal</span>
            </button>
          </div>
        </section>

        {dictionaryOpen && (
          <div className="goat2-modal-backdrop">
            <section
              className="goat2-dictionary"
              role="dialog"
              aria-modal="true"
              aria-labelledby="goat-dictionary-heading"
            >
              <h2 id="goat-dictionary-heading">Animal Dictionary</h2>
              <p>Discovered: {foundIds.length}/{GOAT_ISLAND_TOTAL_ANIMALS}</p>

              <div className="goat2-dictionary-list">
                {goatIslandAnimals.map((entry) => {
                  const unlocked = foundIds.includes(entry.id);

                  return (
                    <div className="goat2-dictionary-entry" key={entry.id}>
                      {unlocked ? (
                        <img src={entry.image} alt="" />
                      ) : (
                        <div className="goat2-dictionary-locked" aria-hidden="true">
                          ?
                        </div>
                      )}

                      <div>
                        <strong>{unlocked ? entry.name : "Unknown animal"}</strong>
                        <p>{unlocked ? "Discovered!" : "Not discovered yet"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                className="goat2-game-button goat2-button-blue goat2-modal-close"
                onClick={() => setDictionaryOpen(false)}
              >
                Close
              </button>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}