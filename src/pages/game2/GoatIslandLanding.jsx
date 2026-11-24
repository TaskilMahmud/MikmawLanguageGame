import AnimalPage from "./AnimalPage";

// Game 2 now opens straight to the designed Rabbit screen.
// No App.jsx or routing changes are required.
export default function GoatIslandLanding() {
  return <AnimalPage animalId="rabbit" />;
}
