
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Game1 from "./pages/Game1";
import Game2 from "./pages/Game2";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/game1" element={<Game1 />} />
      <Route path="/game2" element={<Game2 />} />
    </Routes>
  );
}
