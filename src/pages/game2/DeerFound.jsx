/* DeerFound page - uses the shared Game 2 layout and styles. */
import AnimalPage from "./AnimalPage";

export default function DeerFound() {
  return <AnimalPage animalId="deer" found={true} />;
}
