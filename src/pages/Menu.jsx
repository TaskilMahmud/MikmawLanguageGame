import { useNavigate } from "react-router-dom";
import "../App.css";
import backgroundImage from "../assets/background2.png";

function Menu() {
  const navigate = useNavigate();

  return (

    <div
      className="game-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    
    
    <div className="menu-screen">
      <div className="menu-buttons">
        <button onClick={() => navigate("/game1")}>Pictionary Game</button>
        <button onClick={() => navigate("/game2")}>Goat Island Game</button>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    </div></div>
  );
}

export default Menu;
