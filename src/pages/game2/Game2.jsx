import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Game 2 uses only this JSX file and goatIslandAnimalImages.css.
import background from "../../assets/goat-island/background.png";
import logo from "../../assets/goat-island/logo.png";

import rabbitPlate from "../../assets/goat-island/Plates/plate-rabbit.png";
import beaverPlate from "../../assets/goat-island/Plates/plate-beaver.png";
import porcupinePlate from "../../assets/goat-island/Plates/plate-porcupine.png";
import raccoonPlate from "../../assets/goat-island/Plates/plate-raccoon.png";
import eaglePlate from "../../assets/goat-island/Plates/plate-eagle.png";
import foxPlate from "../../assets/goat-island/Plates/plate-fox.png";
import moosePlate from "../../assets/goat-island/Plates/plate-moose.png";
import bearPlate from "../../assets/goat-island/Plates/plate-bear.png";
import deerPlate from "../../assets/goat-island/Plates/plate-deer.png";

import rabbitHappyPlate from "../../assets/goat-island/Plates/plate-rabbit-happy.png";
import beaverHappyPlate from "../../assets/goat-island/Plates/plate-beaver-happy.png";
import porcupineHappyPlate from "../../assets/goat-island/Plates/plate-porcupine-happy.png";
import raccoonHappyPlate from "../../assets/goat-island/Plates/plate-raccoon-happy.png";
import eagleHappyPlate from "../../assets/goat-island/Plates/plate-eagle-happy.png";
import foxHappyPlate from "../../assets/goat-island/Plates/plate-fox-happy.png";
import mooseHappyPlate from "../../assets/goat-island/Plates/plate-moose-happy.png";
import bearHappyPlate from "../../assets/goat-island/Plates/plate-bear-happy.png";
import deerHappyPlate from "../../assets/goat-island/Plates/plate-deer-happy.png";

import rabbitSad from "../../assets/goat-island/Animal-Images/rabbit_sad.png";
import beaverSad from "../../assets/goat-island/Animal-Images/beaver_sad.png";
import porcupineSad from "../../assets/goat-island/Animal-Images/porcupine_sad.png";
import raccoonSad from "../../assets/goat-island/Animal-Images/raccoon_sad.png";
import eagleSad from "../../assets/goat-island/Animal-Images/eagle_sad.png";
import foxSad from "../../assets/goat-island/Animal-Images/fox_sad.png";
import mooseSad from "../../assets/goat-island/Animal-Images/moose_sad.png";
import bearSad from "../../assets/goat-island/Animal-Images/bear_sad.png";
import deerSad from "../../assets/goat-island/Animal-Images/deer_sad.png";

import rabbitFound from "../../assets/goat-island/Animal-Images/rabbit_found.png";
import beaverFound from "../../assets/goat-island/Animal-Images/beaver_found.png";
import porcupineFound from "../../assets/goat-island/Animal-Images/porcupine_found.png";
import raccoonFound from "../../assets/goat-island/Animal-Images/raccoon_found.png";
import eagleFound from "../../assets/goat-island/Animal-Images/eagle_found.png";
import foxFound from "../../assets/goat-island/Animal-Images/fox_found.png";
import mooseFound from "../../assets/goat-island/Animal-Images/moose_found.png";
import bearFound from "../../assets/goat-island/Animal-Images/bear_found.png";
import deerFound from "../../assets/goat-island/Animal-Images/deer_found.png";

import "../../styles/goatIslandAnimalImages.css";

// Plate order: 5 in the top row, 4 in the bottom row.
export const ANIMALS = [
  { id: "rabbit", name: "Rabbit", mikmaw: "apli’kmuj", sadPlate: rabbitPlate, happyPlate: rabbitHappyPlate, sad: rabbitSad, happy: rabbitFound },
  { id: "beaver", name: "Beaver", mikmaw: "kopit", sadPlate: beaverPlate, happyPlate: beaverHappyPlate, sad: beaverSad, happy: beaverFound },
  { id: "porcupine", name: "Porcupine", mikmaw: "matues", sadPlate: porcupinePlate, happyPlate: porcupineHappyPlate, sad: porcupineSad, happy: porcupineFound },
  { id: "raccoon", name: "Raccoon", mikmaw: "amaljikwej", sadPlate: raccoonPlate, happyPlate: raccoonHappyPlate, sad: raccoonSad, happy: raccoonFound },
  { id: "eagle", name: "Eagle", mikmaw: "kiptu", sadPlate: eaglePlate, happyPlate: eagleHappyPlate, sad: eagleSad, happy: eagleFound },
  { id: "fox", name: "Fox", mikmaw: "wowkwis", sadPlate: foxPlate, happyPlate: foxHappyPlate, sad: foxSad, happy: foxFound },
  { id: "moose", name: "Moose", mikmaw: "tia’m", sadPlate: moosePlate, happyPlate: mooseHappyPlate, sad: mooseSad, happy: mooseFound },
  { id: "bear", name: "Bear", mikmaw: "muin", sadPlate: bearPlate, happyPlate: bearHappyPlate, sad: bearSad, happy: bearFound },
  { id: "deer", name: "Deer", mikmaw: "lentuk", sadPlate: deerPlate, happyPlate: deerHappyPlate, sad: deerSad, happy: deerFound },
];

// This version starts with every animal sad on its first visit.
// Thereafter, only scanned NFC links unlock animals, and the progress persists.
// Using a fresh key avoids importing discoveries from the older prototype.
const STORAGE_KEY = "goat-island-found-animal-ids-v2";
const validIds = new Set(ANIMALS.map((animal) => animal.id));

export function getFoundAnimalIds() {
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value)
      ? [...new Set(value.filter((id) => typeof id === "string" && validIds.has(id)))]
      : [];
  } catch {
    return [];
  }
}

export function saveFoundAnimal(id) {
  const current = getFoundAnimalIds();
  if (!validIds.has(id) || current.includes(id)) return current;
  const updated = [...current, id];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Browsers without localStorage still show the animal as found in this view.
  }
  return updated;
}

export function resetFoundAnimals() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    // Also clear discoveries from the old prototype if they exist.
    window.localStorage.removeItem("goat-island-found-animal-ids");
  } catch {
    // Storage may be disabled in private browsing.
  }
}

function AnimalRow({ animals, selectedId, foundIds, onSelect, row }) {
  return (
    <div className={`feed2-tiles feed2-tiles--${row}`} role="group" aria-label={`Animal selection row ${row}`}>
      {animals.map((animal) => {
        const isHappy = foundIds.has(animal.id);
        return (
          <button
            key={animal.id}
            type="button"
            className={`feed2-tile${selectedId === animal.id ? " feed2-tile--selected" : ""}${isHappy ? " feed2-tile--found" : ""}`}
            aria-label={`${animal.name}, ${isHappy ? "happy" : "sad"}. Show this animal`}
            aria-pressed={selectedId === animal.id}
            onClick={() => onSelect(animal.id)}
          >
            <span className="feed2-tile-status">{isHappy ? "Happy" : "Sad"}</span>
            <img className="feed2-tile-image" src={isHappy ? animal.happyPlate : animal.sadPlate} alt="" draggable={false} />
          </button>
        );
      })}
    </div>
  );
}

export default function Game2() {
  const navigate = useNavigate();
  const { animalId = "rabbit" } = useParams();

  // The NFC path /game2/rabbit-found unlocks rabbit only.
  // A normal page /game2/rabbit simply selects rabbit without unlocking it.
  const isFoundLink = animalId.endsWith("-found");
  const requestedId = isFoundLink ? animalId.slice(0, -"-found".length) : animalId;
  const isKnownAnimal = validIds.has(requestedId);
  const current = ANIMALS.find((animal) => animal.id === requestedId) || ANIMALS[0];
  const selectedIndex = ANIMALS.findIndex((animal) => animal.id === current.id);

  const [storedFoundIds, setStoredFoundIds] = useState(getFoundAnimalIds);

  useEffect(() => {
    if (isKnownAnimal && isFoundLink) {
      setStoredFoundIds(saveFoundAnimal(current.id));
    } else {
      setStoredFoundIds(getFoundAnimalIds());
    }
  }, [isFoundLink, isKnownAnimal, current.id]);

  // Keep progress in sync if another tab in this browser opens an NFC link.
  useEffect(() => {
    const refreshProgress = () => setStoredFoundIds(getFoundAnimalIds());
    window.addEventListener("storage", refreshProgress);
    return () => window.removeEventListener("storage", refreshProgress);
  }, []);

  const foundIds = new Set(storedFoundIds);
  // Immediately show the happy image on an NFC URL, even before the effect runs.
  if (isKnownAnimal && isFoundLink) foundIds.add(current.id);
  const isHappy = foundIds.has(current.id);

  function selectAnimal(id) {
    // Update the visible animal AND the address bar, but do not unlock anything.
    navigate(`/game2/${id}`);
  }

  function moveAnimal(offset) {
    // Wrap around at the first and last animal, like a carousel.
    const nextIndex = (selectedIndex + offset + ANIMALS.length) % ANIMALS.length;
    selectAnimal(ANIMALS[nextIndex].id);
  }

  const previous = ANIMALS[(selectedIndex - 1 + ANIMALS.length) % ANIMALS.length];
  const next = ANIMALS[(selectedIndex + 1) % ANIMALS.length];

  return (
    <main className="feed2-page">
      <section className="feed2-phone" aria-label="Feed the animal game">
        <img className="feed2-background" src={background} alt="" draggable={false} />

        <header className="feed2-header">
          <button type="button" className="feed2-back" onClick={() => navigate("/game2")}>← Back</button>
          <h1>Feed the animal</h1>
          <span className="feed2-progress" aria-label={`Selected animal ${selectedIndex + 1} of ${ANIMALS.length}`}>
            {selectedIndex + 1} / {ANIMALS.length}
          </span>
        </header>

        <div className="feed2-pronunciation" aria-label={`${current.name} name (audio not connected yet)`}>
          <svg className="feed2-sound-icon" viewBox="0 0 40 40" aria-hidden="true">
            <path fill="currentColor" d="M6 14h8l10-8v28l-10-8H6z" />
            <path d="M28 13c4 4 4 10 0 14M32 9c7 6 7 16 0 22" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
          <span>{current.name}</span>
        </div>

        <img
          key={`${current.id}-${isHappy ? "happy" : "sad"}`}
          className="feed2-hero"
          src={isHappy ? current.happy : current.sad}
          alt={`${isHappy ? "Happy" : "Sad"} ${current.name}`}
          draggable={false}
        />

        <button
          type="button"
          className="feed2-arrow feed2-arrow--left"
          onClick={() => moveAnimal(-1)}
          aria-label={`Previous animal: ${previous.name}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4-8 8 8 8" /></svg>
        </button>
        <button
          type="button"
          className="feed2-arrow feed2-arrow--right"
          onClick={() => moveAnimal(1)}
          aria-label={`Next animal: ${next.name}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" /></svg>
        </button>

        <img className="feed2-logo" src={logo} alt="Goat Island" draggable={false} />

        <AnimalRow animals={ANIMALS.slice(0, 5)} selectedId={current.id} foundIds={foundIds} onSelect={selectAnimal} row="first" />
        <AnimalRow animals={ANIMALS.slice(5)} selectedId={current.id} foundIds={foundIds} onSelect={selectAnimal} row="second" />

        <p className="feed2-footer" aria-live="polite">{foundIds.size} / {ANIMALS.length} animals found — find the NFC tag</p>
      </section>
    </main>
  );
}
