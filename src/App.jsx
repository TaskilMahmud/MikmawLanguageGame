import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Game1 from "./pages/game1/Game1";
import Game1Landing from "./pages/game1/Game1Landing";
import GoatIslandLanding from "./pages/game2/GoatIslandLanding";
import Game2, { ANIMALS } from "./pages/game2/Game2";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/game1" element={<Game1Landing />} />
      <Route path="/game1/play" element={<Game1 />} />

      <Route path="/game2" element={<GoatIslandLanding />} />
      <Route path="/game2/:animalId" element={<Game2 />} />

      {/* Keep older NFC tags such as /#/rabbit-found working. */}
      {ANIMALS.map((animal) => (
        <Route
          key={animal.id}
          path={`/${animal.id}-found`}
          element={<Navigate to={`/game2/${animal.id}-found`} replace />}
        />
      ))}
    </Routes>
  );
}
