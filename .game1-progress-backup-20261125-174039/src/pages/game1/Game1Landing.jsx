import { useEffect } from "react";
import { Link } from "react-router-dom";

import backgroundImage from "../../assets/background3.webp";
import character from "../../assets/game1-girl-pointing.webp";
import { questions } from "../../data/game1Questions";
import "../../styles/game1Landing.css";

export default function Game1Landing() {
  useEffect(() => {
    const firstQuestionImage = questions[0]?.image;
    if (!firstQuestionImage) return;

    const firstImage = new Image();
    firstImage.fetchPriority = "low";
    firstImage.src = firstQuestionImage;
  }, []);

  return (
    <main
      className="screen game1-landing"
      style={{ "--game1-landing-background": `url(${backgroundImage})` }}
    >
      <div className="game1-landing__shell">
        <header className="game1-landing__header">
          <Link className="wooden-button game1-landing__back" to="/menu">
            <span aria-hidden="true">←</span> Back
          </Link>
          <h1>Pictionary</h1>
        </header>

        <div className="game1-landing__welcome">
          <img className="game1-landing__character" src={character} alt="" />

          <section className="game1-landing__instructions" aria-labelledby="game1-how-to-play">
            <h2 id="game1-how-to-play">How to play</h2>
            <ol>
              <li>Pick a month.</li>
              <li>Look at the picture and find the blank in the sentence.</li>
              <li>Tap the speaker icon to hear it in Mi’kmaw.</li>
              <li>Click the <strong>Missing Word</strong>.</li>
            </ol>
            <p>Got it right? Tap <strong>Next Question</strong> to keep going.</p>
            <Link className="wooden-button game1-landing__play" to="/game1/play">
              Play
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
