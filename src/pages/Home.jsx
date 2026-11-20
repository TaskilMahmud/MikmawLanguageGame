import { useNavigate } from "react-router-dom";

import WoodenButton from "../components/WoodenButton";
import backgroundImage from "../assets/background1.webp";

import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main
      className="screen home-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="home-title">
        Mi’kmaw
        <span>Language Games</span>
      </h1>
      <WoodenButton
        className="home-play-button"
        onClick={() => navigate("/menu")}
      >
        PLAY
      </WoodenButton>
      <p className="home-credit">made by Agile AANTS</p>
    </main>
  );
}
