import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/background1.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="game-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button
        className="play-button"
        onClick={() => navigate("/menu")}
      >
        PLAY
      </button>
    </div>
  );
}

export default Home;