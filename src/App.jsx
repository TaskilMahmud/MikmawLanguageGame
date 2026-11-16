import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Game1 from "./pages/game1/Game1";
import GoatIslandLanding from "./pages/game2/GoatIslandLanding";
import AnimalPage from "./pages/game2/AnimalPage";
import { goatIslandAnimals } from "./data/goatIslandAnimals";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/game1" element={<Game1 />} />

      <Route path="/game2" element={<GoatIslandLanding />} />

      {goatIslandAnimals.map((animal) => (
        <Fragment key={animal.id}>
          <Route
            path={animal.questPath}
            element={<AnimalPage key={animal.questPath} animalId={animal.id} />}
          />
          <Route
            path={animal.foundPath}
            element={
              <AnimalPage key={animal.foundPath} animalId={animal.id} found />
            }
          />
        </Fragment>
      ))}

      <Route
        path="/rabbit-found"
        element={<Navigate to="/game2/rabbit-found" replace />}
      />
    </Routes>
  );
}
