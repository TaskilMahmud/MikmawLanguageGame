/*
 * Goat Island animal data. Add new animals here as you create them.
 * Keep animal IDs / URLs stable after programming physical NFC tags.
 * Audio files belong in public/audio/ (or leave audioFile: null).
 */
import rabbitImage from "../assets/goat-island/rabbit.png";
import deerImage from "../assets/goat-island/deer.png";

export const GOAT_ISLAND_TOTAL_ANIMALS = 10;

export const goatIslandAnimals = [
  {
    id: "rabbit",
    number: 1,
    name: "Rabbit",
    questTitle: "Find a Rabbit!",
    foundTitle: "You found the Rabbit!",
    clue: "the rabbit is\nunder the tree",
    image: rabbitImage,
    audioFile: null, // e.g. "rabbit.mp3"
    questPath: "/game2/rabbit",
    foundPath: "/game2/rabbit-found",
  },
  {
    id: "deer",
    number: 2,
    name: "Deer",
    questTitle: "Find a Deer!",
    foundTitle: "You found the Deer!",
    // Placeholder clue: change to the actual location of your deer NFC tag.
    clue: "the deer is\nnear the trees",
    image: deerImage,
    audioFile: null, // e.g. "deer.mp3"
    questPath: "/game2/deer",
    foundPath: "/game2/deer-found",
  },
];

export function getGoatIslandAnimal(id) {
  return goatIslandAnimals.find((animal) => animal.id === id);
}
