import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Game1 from "./pages/Game1";
import Rabbit from "./pages/game2/Rabbit";
import RabbitFound from "./pages/game2/RabbitFound";
import Deer from "./pages/game2/Deer";
import DeerFound from "./pages/game2/DeerFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/game1" element={<Game1 />} />

      <Route path="/game2" element={<Navigate to="/game2/rabbit" replace />} />
      <Route path="/game2/rabbit" element={<Rabbit />} />
      <Route path="/game2/rabbit-found" element={<RabbitFound />} />
      <Route path="/game2/deer" element={<Deer />} />
      <Route path="/game2/deer-found" element={<DeerFound />} />

      <Route path="/rabbit-found" element={<Navigate to="/game2/rabbit-found" replace />} />
    </Routes>
  );
}
