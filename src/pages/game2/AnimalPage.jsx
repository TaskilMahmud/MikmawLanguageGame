import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import goatLogo from "../../assets/goat-island/goat-logo.webp";
import forestScene from "../../assets/goat-island/forest-scene.webp";
import scrollBlank from "../../assets/goat-island/scroll-blank.webp";
import speakerIcon from "../../assets/goat-island/speaker-icon.webp";

import {
  getGoatIslandAnimal,
  goatIslandAnimals,
  GOAT_ISLAND_TOTAL_ANIMALS,
} from "../../data/goatIslandAnimals";
import { getFoundAnimalIds, saveFoundAnimal } from "../../data/goatIslandProgress";
import "../../styles/game2.css";
import "../../styles/goatIslandAnimalImages.css";

export default function AnimalPage({ animalId, found = false }) {
  const navigate = useNavigate();
  const animal = getGoatIslandAnimal(animalId);

  const [notice, setNotice] = useState("");
  const [dictionaryOpen, setDictionaryOpen] = useState(false);
  const [foundIds, setFoundIds] = useState(getFoundAnimalIds);
  const audioRef = useRef(null);

  const discoveredAnimalId = found ? animal?.id : undefined;

  useEffect(() => {
    if (discoveredAnimalId) {
      setFoundIds(saveFoundAnimal(discoveredAnimalId));
    }
  }, [discoveredAnimalId]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  if (!animal) return <p>Unknown Goat Island animal.</p>;

  const currentIndex = goatIslandAnimals.findIndex((entry) => entry.id === animal.id);

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

    const audio = new Audio(`${import.meta.env.BASE_URL}audio/${animal.audioFile}`);
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
      setNotice(change < 0 ? "This is the first animal!" : "More animals coming soon!");
      return;
    }
    stopAudio();
    // Never reveal a found animal by simply pressing Next or Previous.
    navigate(destination.questPath);
  }

  function leaveAnimalPage(path) {
    stopAudio();
    navigate(path);
  }

  return (
    <main className="goat2-page">
      <section className="goat2-phone" aria-label={`${animal.name} game`}>
        <header className="goat2-header">
          <button
            type="button"
            className="goat2-game-button goat2-back-button"
            onClick={() => leaveAnimalPage("/game2")}
            aria-label="Back to Goat Island landing page"
          >
            <span aria-hidden="true">â†</span> Back
          </button>

          <button
            type="button"
            className="goat2-logo-button"
            onClick={() => leaveAnimalPage("/menu")}
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
              <img src={animal.foundImage} alt={`Happy ${animal.name}`} />
              <span className="goat2-sparkles" aria-hidden="true">âœ¦ âœ¦</span>
            </div>
          ) : (
            <>
              <div className="goat2-sad-picture">
                <img src={animal.sadImage} alt={`Sad ${animal.name}`} />
              </div>
              <div className="goat2-scroll goat2-scroll--with-animal">
                <img src={scrollBlank} alt="" aria-hidden="true" />
                <div className="goat2-scroll-writing">
                  <p>{animal.clue}</p>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="goat2-controls" aria-label="Animal controls">
          {notice && (
            <div className="goat2-notice" role="status">
              <span>{notice}</span>
              <button type="button" onClick={() => setNotice("")} aria-label="Close message">Ã—</button>
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
                setFoundIds(getFoundAnimalIds());
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
                        <img src={entry.foundImage} alt="" />
                      ) : (
                        <div className="goat2-dictionary-locked" aria-hidden="true">?</div>
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
