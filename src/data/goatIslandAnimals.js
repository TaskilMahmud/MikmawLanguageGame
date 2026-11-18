import rabbitImage from "../assets/goat-island/rabbit.png";
import deerImage from "../assets/goat-island/deer.png";
import raccoonImage from "../assets/goat-island/raccoon.png";
import bearImage from "../assets/goat-island/bear.png";
import beaverImage from "../assets/goat-island/beaver.png";
import foxImage from "../assets/goat-island/fox.png";
import mooseImage from "../assets/goat-island/moose.png";
import porcupineImage from "../assets/goat-island/porcupine.png";
import eagleImage from "../assets/goat-island/eagle.png";

// This order controls the counter and the Previous and Next buttons.
// Replace the sample clues with your actual NFC tag locations.
const animals = [
  {
    id: "rabbit",
    name: "Rabbit",
    image: rabbitImage,
    audioFile: "rabbit.mp3",
    clue: "The rabbit is\nunder the tree.",
  },
  {
    id: "deer",
    name: "Deer",
    image: deerImage,
    audioFile: "deer.mp3",
    clue: "The deer is\nnear the trees.",
  },
  {
    id: "raccoon",
    name: "Raccoon",
    image: raccoonImage,
    audioFile: "raccoon.mp3",
    clue: "Look near a hollow log.",
  },
  {
    id: "bear",
    name: "Bear",
    image: bearImage,
    audioFile: "bear.mp3",
    clue: "Look near the berry bushes.",
  },
  {
    id: "beaver",
    name: "Beaver",
    image: beaverImage,
    audioFile: "beaver.mp3",
    clue: "Look near the water.",
  },
  {
    id: "fox",
    name: "Fox",
    image: foxImage,
    audioFile: "fox.mp3",
    clue: "Look near the bend in the trail.",
  },
  {
    id: "moose",
    name: "Moose",
    image: mooseImage,
    audioFile: "moose.mp3",
    clue: "Look near the tall trees.",
  },
  {
    id: "porcupine",
    name: "Porcupine",
    image: porcupineImage,
    audioFile: "porcupine.mp3",
    clue: "Look near the fallen branches.",
  },
  {
    id: "eagle",
    name: "Eagle",
    article: "an",
    image: eagleImage,
    audioFile: "eagle.mp3",
    clue: "Look near the spot where you can see the sky.",
  },
];

export const goatIslandAnimals = animals.map((animal, index) => ({
  ...animal,
  number: index + 1,
  questTitle: `Find ${animal.article ?? "a"} ${animal.name}!`,
  foundTitle: `You found the ${animal.name}!`,
  audioFile: animal.audioFile ?? null,
  questPath: `/game2/${animal.id}`,
  foundPath: `/game2/${animal.id}-found`,
}));

export const GOAT_ISLAND_TOTAL_ANIMALS = goatIslandAnimals.length;

export function getGoatIslandAnimal(id) {
  return goatIslandAnimals.find((animal) => animal.id === id);
}
