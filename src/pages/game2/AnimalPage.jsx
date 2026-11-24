import {
  getGoatIslandAnimal,
  goatIslandAnimals,
  GOAT_ISLAND_TOTAL_ANIMALS,
} from "../../data/goatIslandAnimals";

// These images are included in the ZIP, so you don't need to rename the
// images you already have in src/assets/goat-island/.
import background from "../../assets/goat-island/feed-ui/background.png";
import goatIslandLogo from "../../assets/goat-island/feed-ui/logo.png";
import rabbitPlate from "../../assets/goat-island/feed-ui/plate-rabbit.png";
import beaverPlate from "../../assets/goat-island/feed-ui/plate-beaver.png";
import porcupinePlate from "../../assets/goat-island/feed-ui/plate-porcupine.png";
import raccoonPlate from "../../assets/goat-island/feed-ui/plate-raccoon.png";
import eaglePlate from "../../assets/goat-island/feed-ui/plate-eagle.png";
import foxPlate from "../../assets/goat-island/feed-ui/plate-fox.png";
import moosePlate from "../../assets/goat-island/feed-ui/plate-moose.png";
import bearPlate from "../../assets/goat-island/feed-ui/plate-bear.png";
import deerPlate from "../../assets/goat-island/feed-ui/plate-deer.png";

// This stylesheet affects ONLY the new Game 2 screen.
import "../../styles/feedTheAnimal.css";

// Exactly the 5 + 4 arrangement in your screenshot.
const firstRow = [
  { id: "rabbit", image: rabbitPlate, name: "Rabbit" },
  { id: "beaver", image: beaverPlate, name: "Beaver" },
  { id: "porcupine", image: porcupinePlate, name: "Porcupine" },
  { id: "raccoon", image: raccoonPlate, name: "Raccoon" },
  { id: "eagle", image: eaglePlate, name: "Eagle" },
];

const secondRow = [
  { id: "fox", image: foxPlate, name: "Fox" },
  { id: "moose", image: moosePlate, name: "Moose" },
  { id: "bear", image: bearPlate, name: "Bear" },
  { id: "deer", image: deerPlate, name: "Deer" },
];

function WoodenRow({ animals, selectedId, rowNumber }) {
  return (
    <div className={`feed2-tiles feed2-tiles--${rowNumber}`}>
      {animals.map((animal) => (
        <div
          className={`feed2-tile ${animal.id === selectedId ? "feed2-tile--selected" : ""}`}
          key={animal.id}
        >
          <span className="feed2-tile-status">Sad</span>
          <img
            className="feed2-tile-image"
            src={animal.image}
            alt={`${animal.name} wooden plate with its Mi’kmaw name`}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

// The sound icon, Back, and arrows are visuals only in this first version.
// No click handlers or NFC functionality yet, as requested.
export default function AnimalPage({ animalId = "rabbit", found = false }) {
  const animal = getGoatIslandAnimal(animalId) || goatIslandAnimals[0];
  const allAnimals = [...firstRow, ...secondRow];
  const animalNumber = allAnimals.findIndex((item) => item.id === animal.id) + 1;
  const heroImage = found ? animal.foundImage : animal.sadImage;

  return (
    <main className="feed2-page">
      <section className="feed2-phone" aria-label="Feed the animal game UI">
        {/* The full screen background you approved: forest above, cream below. */}
        <img className="feed2-background" src={background} alt="" draggable={false} />

        <header className="feed2-header">
          <span className="feed2-back" aria-label="Back (visual only)">← Back</span>
          <h1>Feed the animal</h1>
          <span className="feed2-progress">
            {animalNumber} / {GOAT_ISLAND_TOTAL_ANIMALS}
          </span>
        </header>

        <div className="feed2-pronunciation" aria-label={`${animal.name} pronunciation (visual only)`}>
          <svg className="feed2-sound-icon" viewBox="0 0 40 40" aria-hidden="true">
            <path fill="currentColor" d="M6 14h8l10-8v28l-10-8H6z" />
            <path d="M28 13c4 4 4 10 0 14M32 9c7 6 7 16 0 22" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
          <span>{animal.name}</span>
        </div>

        <img className="feed2-hero" src={heroImage} alt={`${found ? "Found" : "Sad"} ${animal.name}`} draggable={false} />

        <span className="feed2-arrow feed2-arrow--left" aria-label="Previous (visual only)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4-8 8 8 8" /></svg>
        </span>
        <span className="feed2-arrow feed2-arrow--right" aria-label="Next (visual only)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4 8 8-8 8" /></svg>
        </span>

        <img className="feed2-logo" src={goatIslandLogo} alt="Goat Island" draggable={false} />

        <WoodenRow animals={firstRow} selectedId={animal.id} rowNumber="first" />
        <WoodenRow animals={secondRow} selectedId={animal.id} rowNumber="second" />

        <p className="feed2-footer">find the NFC tag</p>
      </section>
    </main>
  );
}
