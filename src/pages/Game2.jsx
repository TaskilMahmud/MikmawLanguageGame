
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import WoodenButton from "../components/WoodenButton";

import backgroundImage from "../assets/background2.png";
import goatIslandMock from "../assets/goatIslandMock.png";
import goatIslandFoundMock from "../assets/goatIslandFoundMock.png";

import "../styles/game2.css";

/*
==========================================
GAME 2 - GOAT ISLAND
==========================================

Current prototype:
1. Find Rabbit on the forest screen.
2. Click Rabbit to discover it.
3. Show Rabbit Found screen.
4. Play audio when available.
5. Next Word is a placeholder.

Styles: styles/game2.css

The illustrated buttons are part of the
mockup images. We place invisible clickable
areas over those parts of the pictures.

==========================================
*/

// Change this when the Rabbit recording exists.
const rabbitAudioFile = "";

export default function Game2() {
  const navigate = useNavigate();

  // ========================================
  // GAME STATE
  // ========================================

  const [gameStage, setGameStage] = useState("quest");
  const [message, setMessage] = useState("");

  const audioRef = useRef(null);

  // ========================================
  // STOP AUDIO
  // ========================================

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  // ========================================
  // AUDIO CLEANUP
  // ========================================

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ========================================
  // BACK TO MENU
  // ========================================

  function handleBack() {
    stopAudio();
    navigate("/menu");
  }

  // ========================================
  // FIND RABBIT
  // ========================================

  function handleFindRabbit() {
    stopAudio();

    setGameStage("found");
    setMessage("");
  }

  // ========================================
  // PLAY RABBIT PRONUNCIATION
  // ========================================

  function playRabbitAudio() {
    stopAudio();

    if (!rabbitAudioFile) {
      setMessage(
        "Rabbit pronunciation audio has not been added yet."
      );
      return;
    }

    setMessage("");

    const audioPath =
      `${import.meta.env.BASE_URL}audio/${rabbitAudioFile}`;

    const audio = new Audio(audioPath);

    audioRef.current = audio;

    audio.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.warn(
          "Unable to play Rabbit audio:",
          error
        );

        setMessage(
          "Unable to play the pronunciation recording."
        );
      }
    });
  }

  // ========================================
  // NEXT WORD PLACEHOLDER
  // ========================================

  function handleNextWord() {
    stopAudio();

    setMessage(
      "Next word coming soon! Rabbit is the first available quest."
    );
  }

  // ========================================
  // RESTART RABBIT QUEST
  // ========================================

  function restartQuest() {
    stopAudio();

    setGameStage("quest");
    setMessage("");
  }

  // ========================================
  // GAME DISPLAY
  // ========================================

  return (
    <main
      className="screen game2-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* RESPONSIVE GAME IMAGE */}

      <div className="game2-frame">

        {/* ==================================
            FIND RABBIT SCREEN
            ================================== */}

        {gameStage === "quest" ? (
          <>
            <img
              className="game2-artwork"
              src={goatIslandMock}
              alt="Goat Island forest: find the rabbit"
              draggable={false}
            />

            {/* BACK BUTTON AREA */}

            <button
              type="button"
              aria-label="Back to menu"
              className="
                game2-hotspot
                game2-hotspot--quest-back
              "
              onClick={handleBack}
            />

            {/* AUDIO BUTTON AREA */}

            <button
              type="button"
              aria-label="Play Rabbit pronunciation"
              className="
                game2-hotspot
                game2-hotspot--quest-audio
              "
              onClick={playRabbitAudio}
            />

            {/* RABBIT CLICK AREA */}

            <button
              type="button"
              aria-label="Find the rabbit"
              className="
                game2-hotspot
                game2-hotspot--rabbit
              "
              onClick={handleFindRabbit}
            />
          </>
        ) : (

          /* ==================================
             RABBIT FOUND SCREEN
             ================================== */

          <>
            <img
              className="game2-artwork"
              src={goatIslandFoundMock}
              alt="Rabbit found! Goat Island success screen"
              draggable={false}
            />

            {/* BACK BUTTON AREA */}

            <button
              type="button"
              aria-label="Back to menu"
              className="
                game2-hotspot
                game2-hotspot--found-back
              "
              onClick={handleBack}
            />

            {/* PRONUNCIATION BUTTON AREA */}

            <button
              type="button"
              aria-label="Play Rabbit pronunciation"
              className="
                game2-hotspot
                game2-hotspot--found-audio
              "
              onClick={playRabbitAudio}
            />

            {/* NEXT WORD BUTTON AREA */}

            <button
              type="button"
              aria-label="Next word"
              className="
                game2-hotspot
                game2-hotspot--next
              "
              onClick={handleNextWord}
            />
          </>
        )}
      </div>

      {/* FEEDBACK MESSAGE */}

      {message && (
        <p
          className="game2-message"
          role="status"
        >
          {message}
        </p>
      )}

      {/* ADDITIONAL NAVIGATION BUTTONS */}

      <div className="game2-actions">
        <WoodenButton onClick={handleBack}>
          Back to Menu
        </WoodenButton>

        {gameStage === "quest" ? (
          <WoodenButton onClick={handleFindRabbit}>
            Found the Rabbit
          </WoodenButton>
        ) : (
          <WoodenButton onClick={restartQuest}>
            Find Rabbit Again
          </WoodenButton>
        )}
      </div>
    </main>
  );
}
