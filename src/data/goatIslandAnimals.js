// All animal assets are PNG files in src/assets/goat-island/.
// _sad is used on the hint page; _found is used on the discovery page
// and in the Dictionary after the animal has been discovered.
import rabbitSad from "../assets/goat-island/rabbit_sad.png";
import rabbitFound from "../assets/goat-island/rabbit_found.png";
import deerSad from "../assets/goat-island/deer_sad.png";
import deerFound from "../assets/goat-island/deer_found.png";
import raccoonSad from "../assets/goat-island/raccoon_sad.png";
import raccoonFound from "../assets/goat-island/raccoon_found.png";
import bearSad from "../assets/goat-island/bear_sad.png";
import bearFound from "../assets/goat-island/bear_found.png";
import beaverSad from "../assets/goat-island/beaver_sad.png";
import beaverFound from "../assets/goat-island/beaver_found.png";
import foxSad from "../assets/goat-island/fox_sad.png";
import foxFound from "../assets/goat-island/fox_found.png";
import mooseSad from "../assets/goat-island/moose_sad.png";
import mooseFound from "../assets/goat-island/moose_found.png";
import porcupineSad from "../assets/goat-island/porcupine_sad.png";
import porcupineFound from "../assets/goat-island/porcupine_found.png";
import eagleSad from "../assets/goat-island/eagle_sad.png";
import eagleFound from "../assets/goat-island/eagle_found.png";

const animals = [
  {
    id: "rabbit", name: "Rabbit",
    sadImage: rabbitSad, foundImage: rabbitFound,
    audioFile: "rabbit.mp3",
    clue: "The rabbit is\nunder the tree.",
  },
  {
    id: "deer", name: "Deer",
    sadImage: deerSad, foundImage: deerFound,
    audioFile: "deer.mp3",
    clue: "The deer is\nnear the trees.",
  },
  {
    id: "raccoon", name: "Raccoon",
    sadImage: raccoonSad, foundImage: raccoonFound,
    audioFile: "raccoon.mp3",
    clue: "Look near a hollow log.",
  },
  {
    id: "bear", name: "Bear",
    sadImage: bearSad, foundImage: bearFound,
    audioFile: "bear.mp3",
    clue: "Look near the berry bushes.",
  },
  {
    id: "beaver", name: "Beaver",
    sadImage: beaverSad, foundImage: beaverFound,
    audioFile: "beaver.mp3",
    clue: "Look near the water.",
  },
  {
    id: "fox", name: "Fox",
    sadImage: foxSad, foundImage: foxFound,
    audioFile: "fox.mp3",
    clue: "Look near the bend in the trail.",
  },
  {
    id: "moose", name: "Moose",
    sadImage: mooseSad, foundImage: mooseFound,
    audioFile: "moose.mp3",
    clue: "Look near the tall trees.",
  },
  {
    id: "porcupine", name: "Porcupine",
    sadImage: porcupineSad, foundImage: porcupineFound,
    audioFile: "porcupine.mp3",
    clue: "Look near the fallen branches.",
  },
  {
    id: "eagle", name: "Eagle", article: "an",
    sadImage: eagleSad, foundImage: eagleFound,
    audioFile: "eagle.mp3",
    clue: "Look near the spot where you can see the sky.",
  },
];

export const goatIslandAnimals = animals.map((animal, index) => ({
  ...animal,
  // Compatibility for other components that already read animal.image:
  image: animal.foundImage,
  number: index + 1,
  questTitle: `Find ${animal.article ?? "a"} ${animal.name}!`,
  foundTitle: `You found the ${animal.name}!`,
  questPath: `/game2/${animal.id}`,
  foundPath: `/game2/${animal.id}-found`,
}));

export const GOAT_ISLAND_TOTAL_ANIMALS = goatIslandAnimals.length;

export function getGoatIslandAnimal(id) {
  return goatIslandAnimals.find((animal) => animal.id === id);
}
