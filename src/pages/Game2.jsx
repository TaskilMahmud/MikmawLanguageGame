
import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/background2.png";

import goatIslandMock from "../assets/goatIslandMock.png";
import goatIslandFoundMock from "../assets/goatIslandFoundMock.png";

function Game2() {
  const navigate = useNavigate();

  return (
    <div
      className="game2-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

      <div className="game2-mockups">

        <div className="game2-mockup-container">
          <img
            className="game2-mockup"
            src={goatIslandMock}
            alt="Goat Island Find the Rabbit"
          />
        </div>
     

        <div className="game2-mockup-container">
          <img
            className="game2-mockup"
            src={goatIslandFoundMock}
            alt="Goat Island Rabbit Found"
          />
        </div>

      </div>

      <button
        className="back-button"
        onClick={() => navigate("/menu")}
      >
        Back
      </button>

    </div>
  );
}

export default Game2;
