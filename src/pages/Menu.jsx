
import { useNavigate } from "react-router-dom";

import WoodenButton from "../components/WoodenButton";
import backgroundImage from "../assets/background2.webp";
import girl from "../assets/girl.webp";
import boy from "../assets/boy.webp";

import "../styles/menu.css";

/*
==========================================
GAME SELECTION MENU

Pictionary Game -> Game 1
Goat Island Game -> Game 2
Back -> Home

==========================================
*/

export default function Menu() {
  const navigate = useNavigate();

  return (
    <main
      className="screen menu-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <img className="menu-character menu-character--girl" src={girl} alt="" draggable={false} />
      <img className="menu-character menu-character--boy" src={boy} alt="" draggable={false} />

      <nav
        className="menu-buttons"
        aria-label="Game selection"
      >
        <WoodenButton onClick={() => navigate("/game1")}>
          Pictionary Game
        </WoodenButton>

        <WoodenButton onClick={() => navigate("/game2")}>
          Goat Island Game
        </WoodenButton>

        <WoodenButton onClick={() => navigate("/")}>
          Back
        </WoodenButton>
      </nav>
    </main>
  );
}
