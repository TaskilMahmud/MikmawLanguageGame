/* RabbitFound page - uses the shared Game 2 layout and styles. */
import AnimalPage from "./AnimalPage";

export default function RabbitFound() {
  return <AnimalPage animalId="rabbit" found={true} />;
}
