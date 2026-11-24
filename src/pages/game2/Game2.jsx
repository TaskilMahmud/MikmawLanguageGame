import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Game 2 uses only this JSX file and goatIslandAnimalImages.css.
import background from "../../assets/goat-island/feed-ui/background.png";
import logo from "../../assets/goat-island/feed-ui/logo.png";

import rabbitPlate from "../../assets/goat-island/feed-ui/plate-rabbit.png";
import beaverPlate from "../../assets/goat-island/feed-ui/plate-beaver.png";
import porcupinePlate from "../../assets/goat-island/feed-ui/plate-porcupine.png";
import raccoonPlate from "../../assets/goat-island/feed-ui/plate-raccoon.png";
import eaglePlate from "../../assets/goat-island/feed-ui/plate-eagle.png";
import foxPlate from "../../assets/goat-island/feed-ui/plate-fox.png";
import moosePlate from "../../assets/goat-island/feed-ui/plate-moose.png";
import bearPlate from "../../assets/goat-island/feed-ui/plate-bear.png";
import deerPlate from "../../assets/goat-island/feed-ui/plate-deer.png";

import rabbitHappyPlate from "../../assets/goat-island/feed-ui/plate-rabbit-happy.png";
import beaverHappyPlate from "../../assets/goat-island/feed-ui/plate-beaver-happy.png";
import porcupineHappyPlate from "../../assets/goat-island/feed-ui/plate-porcupine-happy.png";
import raccoonHappyPlate from "../../assets/goat-island/feed-ui/plate-raccoon-happy.png";
import eagleHappyPlate from "../../assets/goat-island/feed-ui/plate-eagle-happy.png";
import foxHappyPlate from "../../assets/goat-island/feed-ui/plate-fox-happy.png";
import mooseHappyPlate from "../../assets/goat-island/feed-ui/plate-moose-happy.png";
import bearHappyPlate from "../../assets/goat-island/feed-ui/plate-bear-happy.png";
import deerHappyPlate from "../../assets/goat-island/feed-ui/plate-deer-happy.png";

import rabbitSad from "../../assets/goat-island/rabbit_sad.png";
import beaverSad from "../../assets/goat-island/beaver_sad.png";
import porcupineSad from "../../assets/goat-island/porcupine_sad.png";
import raccoonSad from "../../assets/goat-island/raccoon_sad.png";
import eagleSad from "../../assets/goat-island/eagle_sad.png";
import foxSad from "../../assets/goat-island/fox_sad.png";
import mooseSad from "../../assets/goat-island/moose_sad.png";
import bearSad from "../../assets/goat-island/bear_sad.png";
import deerSad from "../../assets/goat-island/deer_sad.png";

import rabbitFound from "../../assets/goat-island/rabbit_found.png";
import beaverFound from "../../assets/goat-island/beaver_found.png";
import porcupineFound from "../../assets/goat-island/porcupine_found.png";
import raccoonFound from "../../assets/goat-island/raccoon_found.png";
import eagleFound from "../../assets/goat-island/eagle_found.png";
import foxFound from "../../assets/goat-island/fox_found.png";
import mooseFound from "../../assets/goat-island/moose_found.png";
import bearFound from "../../assets/goat-island/bear_found.png";
import deerFound from "../../assets/goat-island/deer_found.png";

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

// Reuse the original game's storage key, preserving any discoveries already saved.
const STORAGE_KEY = "goat-island-found-animal-ids";
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
  const { animalId } = useParams();

  // NFC paths use /game2/rabbit-found, /game2/deer-found, etc.
  const routeId = animalId || "rabbit";
  const isFoundLink = routeId.endsWith("-found");
  const requestedId = isFoundLink ? routeId.slice(0, -"-found".length) : routeId;
  const validRoute = validIds.has(requestedId);
  const initialId = validRoute ? requestedId : "rabbit";

  const [selectedId, setSelectedId] = useState(initialId);
  const [storedFoundIds, setStoredFoundIds] = useState(getFoundAnimalIds);

  // A scanned NFC URL unlocks ONLY the animal named in that URL.
  // Visiting an ordinary animal page or clicking a plate does NOT unlock it.
  useEffect(() => {
    setSelectedId(initialId);
    if (validRoute && isFoundLink) {
      setStoredFoundIds(saveFoundAnimal(initialId));
    } else {
      setStoredFoundIds(getFoundAnimalIds());
    }
  }, [initialId, validRoute, isFoundLink]);

  // Update the UI if a different tab on the same device scans an NFC link.
  useEffect(() => {
    const syncProgress = () => setStoredFoundIds(getFoundAnimalIds());
    window.addEventListener("storage", syncProgress);
    return () => window.removeEventListener("storage", syncProgress);
  }, []);

  // Include this NFC discovery immediately on the first render, before effects run.
  const foundIds = new Set(storedFoundIds);
  if (validRoute && isFoundLink) foundIds.add(initialId);

  const selectedIndex = ANIMALS.findIndex((animal) => animal.id === selectedId);
  const current = ANIMALS[selectedIndex] || ANIMALS[0];
  const isHappy = foundIds.has(current.id);

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

        <div className="feed2-pronunciation" aria-label={`${current.name} pronunciation (audio not connected yet)`}>
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

        {/* These arrows are decorative, as in the last version. */}
        <span className="feed2-arrow feed2-arrow--left" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m15 4-8 8 8 8" /></svg>
        </span>
        <span className="feed2-arrow feed2-arrow--right" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="m9 4 8 8-8 8" /></svg>
        </span>

        <img className="feed2-logo" src={logo} alt="Goat Island" draggable={false} />

        <AnimalRow animals={ANIMALS.slice(0, 5)} selectedId={current.id} foundIds={foundIds} onSelect={setSelectedId} row="first" />
        <AnimalRow animals={ANIMALS.slice(5)} selectedId={current.id} foundIds={foundIds} onSelect={setSelectedId} row="second" />

        <p className="feed2-footer">{foundIds.size} / {ANIMALS.length} animals found — find the NFC tag</p>
      </section>
    </main>
  );
}
