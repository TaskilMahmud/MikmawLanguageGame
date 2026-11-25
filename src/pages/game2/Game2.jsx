
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ========================================
// GOAT ISLAND BACKGROUND AND LOGO
// ========================================

import background from "../../assets/goat-island/background.webp";
import logo from "../../assets/goat-island/logo.webp";

// ========================================
// HUNGRY ANIMAL PLATES
// ========================================

import rabbitPlate from "../../assets/goat-island/Plates/plate-rabbit.webp";
import beaverPlate from "../../assets/goat-island/Plates/plate-beaver.webp";
import porcupinePlate from "../../assets/goat-island/Plates/plate-porcupine.webp";
import raccoonPlate from "../../assets/goat-island/Plates/plate-raccoon.webp";
import eaglePlate from "../../assets/goat-island/Plates/plate-eagle.webp";
import foxPlate from "../../assets/goat-island/Plates/plate-fox.webp";
import moosePlate from "../../assets/goat-island/Plates/plate-moose.webp";
import bearPlate from "../../assets/goat-island/Plates/plate-bear.webp";
import deerPlate from "../../assets/goat-island/Plates/plate-deer.webp";

// ========================================
// HAPPY ANIMAL PLATES
// ========================================

import rabbitHappyPlate from "../../assets/goat-island/Plates/plate-rabbit-happy.webp";
import beaverHappyPlate from "../../assets/goat-island/Plates/plate-beaver-happy.webp";
import porcupineHappyPlate from "../../assets/goat-island/Plates/plate-porcupine-happy.webp";
import raccoonHappyPlate from "../../assets/goat-island/Plates/plate-raccoon-happy.webp";
import eagleHappyPlate from "../../assets/goat-island/Plates/plate-eagle-happy.webp";
import foxHappyPlate from "../../assets/goat-island/Plates/plate-fox-happy.webp";
import mooseHappyPlate from "../../assets/goat-island/Plates/plate-moose-happy.webp";
import bearHappyPlate from "../../assets/goat-island/Plates/plate-bear-happy.webp";
import deerHappyPlate from "../../assets/goat-island/Plates/plate-deer-happy.webp";

// ========================================
// HUNGRY ANIMAL IMAGES
// ========================================

import rabbitSad from "../../assets/goat-island/Animal-Images/rabbit_sad.webp";
import beaverSad from "../../assets/goat-island/Animal-Images/beaver_sad.webp";
import porcupineSad from "../../assets/goat-island/Animal-Images/porcupine_sad.webp";
import raccoonSad from "../../assets/goat-island/Animal-Images/raccoon_sad.webp";
import eagleSad from "../../assets/goat-island/Animal-Images/eagle_sad.webp";
import foxSad from "../../assets/goat-island/Animal-Images/fox_sad.webp";
import mooseSad from "../../assets/goat-island/Animal-Images/moose_sad.webp";
import bearSad from "../../assets/goat-island/Animal-Images/bear_sad.webp";
import deerSad from "../../assets/goat-island/Animal-Images/deer_sad.webp";

// ========================================
// HAPPY / FOUND ANIMAL IMAGES
// ========================================

import rabbitFound from "../../assets/goat-island/Animal-Images/rabbit_found.webp";
import beaverFound from "../../assets/goat-island/Animal-Images/beaver_found.webp";
import porcupineFound from "../../assets/goat-island/Animal-Images/porcupine_found.webp";
import raccoonFound from "../../assets/goat-island/Animal-Images/raccoon_found.webp";
import eagleFound from "../../assets/goat-island/Animal-Images/eagle_found.webp";
import foxFound from "../../assets/goat-island/Animal-Images/fox_found.webp";
import mooseFound from "../../assets/goat-island/Animal-Images/moose_found.webp";
import bearFound from "../../assets/goat-island/Animal-Images/bear_found.webp";
import deerFound from "../../assets/goat-island/Animal-Images/deer_found.webp";

// ========================================
// STYLING
// ========================================
import "../../styles/game2.css";


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

// Match Game 1's confetti colors, stagger, and falling duration.
// These pieces are fixed so React re-renders don't restart the animation.
const regularConfettiCount = 22;
const confettiDurations = [
  ...Array.from({ length: regularConfettiCount }, (_, index) => 3.2 + (index % 4) * 0.25),
  2.65, 2.8, 2.7, 2.9, 2.75,
  1.85, 2.1, 1.95, 2.15, 1.9,
];
const foundConfetti = confettiDurations.map((duration, index) => ({
  left: `${4 + ((index * 43) % 92)}%`,
  delay: `${(index % 7) * (index < regularConfettiCount ? 0.11 : 0.04)}s`,
  duration: `${duration}s`,
  color: ["#e7b339", "#d86d52", "#4c966d", "#7c9ec7", "#cc87a3"][index % 5],
}));

function FoundConfetti() {
  return (
    <div className="feed2-confetti" aria-hidden="true">
      {foundConfetti.map((piece, index) => (
        <span
          key={index}
          className="feed2-confetti-piece"
          style={{
            "--piece-left": piece.left,
            "--piece-delay": piece.delay,
            "--piece-duration": piece.duration,
            "--piece-color": piece.color,
          }}
        />
      ))}
    </div>
  );
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
            <span className="feed2-tile-status">{isHappy ? "Happy" : "Hungry"}</span>
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
  const [celebrationId, setCelebrationId] = useState(null);
  const [animalWiggle, setAnimalWiggle] = useState({ id: null, count: 0 });
  const handledPathRef = useRef(null);

  useEffect(() => {
    // Handle each URL visit once, including in React StrictMode (which runs
    // effects twice during development). Don't replay confetti on a refresh
    // or when reopening a tag that has already been found.
    if (handledPathRef.current === animalId) return;
    handledPathRef.current = animalId;

    if (isKnownAnimal && isFoundLink) {
      const alreadyFound = getFoundAnimalIds().includes(current.id);
      setStoredFoundIds(saveFoundAnimal(current.id));
      setCelebrationId(alreadyFound ? null : current.id);
    } else {
      setStoredFoundIds(getFoundAnimalIds());
      setCelebrationId(null);
    }
  }, [animalId, isFoundLink, isKnownAnimal, current.id]);

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
    // A new selection returns the previous animal to its resting pose.
    setAnimalWiggle((previous) => ({ ...previous, id: null }));
    // Update the visible animal AND the address bar, but do not unlock anything.
    navigate(`/game2/${id}`);
  }

  function wiggleCurrentAnimal() {
    // Bump the key each time so consecutive clicks replay the CSS animation.
    // Clicking the animal does NOT mark it found or change the URL.
    setAnimalWiggle((previous) => ({ id: current.id, count: previous.count + 1 }));
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

        <button
          key={`${current.id}-${isHappy ? "happy" : "sad"}-${animalWiggle.id === current.id ? animalWiggle.count : "idle"}`}
          type="button"
          className={`feed2-hero${animalWiggle.id === current.id ? " feed2-hero--wiggle" : ""}`}
          onClick={wiggleCurrentAnimal}
          aria-label={`Make the ${current.name} move left and right`}
          title={`Tap to wiggle ${current.name}`}
        >
          <img
            src={isHappy ? current.happy : current.sad}
            alt=""
            draggable={false}
          />
        </button>

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

        {/* Confetti plays ONLY after the first scan of each animal's NFC link. */}
        {isKnownAnimal && isFoundLink && celebrationId === current.id && (
          <FoundConfetti />
        )}
      </section>
    </main>
  );
}

