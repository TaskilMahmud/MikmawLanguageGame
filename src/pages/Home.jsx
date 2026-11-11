
import { useNavigate } from "react-router-dom";

import WoodenButton from "../components/WoodenButton";
import backgroundImage from "../assets/background1.png";

import "../styles/home.css";

/*
==========================================
HOME PAGE

Background: background1.png

PLAY button navigates to the game menu.

==========================================
*/

export default function Home() {
  const navigate = useNavigate();

  return (
    <main
      className="screen home-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <WoodenButton
        className="home-play-button"
        onClick={() => navigate("/menu")}
      >
        PLAY
      </WoodenButton>
    </main>
  );
}
