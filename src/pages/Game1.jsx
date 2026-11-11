
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import WoodenButton from "../components/WoodenButton";
import AnswerButton from "../components/AnswerButton";
import QuestionBox from "../components/QuestionBox";

import {
  questions,
  audioFiles,
} from "../data/game1Questions";

import backgroundImage from "../assets/background3.png";
import thumbnail from "../assets/thumbnail.png";

import "../styles/game1.css";

/*
==========================================
GAME 1 - PICTIONARY
==========================================

Game logic:
1. Player selects an answer.
2. Audio pronunciation plays.
3. Player clicks Select Answer.
4. Wrong answer -> Try Again.
5. Correct answer -> Next Question.
6. After question 21 -> Game Complete.

Game data: data/game1Questions.js
Styles: styles/game1.css

==========================================
*/

export default function Game1() {
  const navigate = useNavigate();

  // ========================================
  // GAME STATE
  // ========================================

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const audioRef = useRef(null);

  const question = questions[currentQuestion];

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
  // PLAY AUDIO PRONUNCIATION
  // ========================================

  function playAnswerAudio(answer) {
    // Stop any previous recording.
    stopAudio();

    // Ignore capitalization differences.
    const word = answer.trim().toLowerCase();

    const filename = audioFiles[word];

    if (!filename) {
      console.warn("No audio assigned for:", answer);
      return;
    }

    // Compatible with localhost and GitHub Pages.
    const audioPath =
      `${import.meta.env.BASE_URL}audio/${filename}`;

    const audio = new Audio(audioPath);

    audioRef.current = audio;

    audio.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.warn(
          "Unable to play audio:",
          filename,
          error
        );
      }
    });
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
  // SELECT ANSWER
  // ========================================

  function handleAnswerClick(answer) {
    // Once correct, answer choices are locked.
    if (feedback === "correct") return;

    // Highlight the choice.
    setSelectedAnswer(answer);

    // Clear old incorrect feedback.
    setFeedback(null);

    // Play its pronunciation.
    playAnswerAudio(answer);
  }

  // ========================================
  // CHECK ANSWER
  // ========================================

  function handleSelectAnswer() {
    if (
      selectedAnswer === null ||
      feedback === "correct"
    ) {
      return;
    }

    stopAudio();

    if (selectedAnswer === question.correctAnswer) {
      // Correct: increase score and allow Next.
      setFeedback("correct");

      setScore((previousScore) => previousScore + 1);
    } else {
      // Wrong: keep the child on this question.
      setFeedback("incorrect");

      // Clear the choice so they can try again.
      setSelectedAnswer(null);
    }
  }

  // ========================================
  // NEXT QUESTION
  // ========================================

  function handleNextQuestion() {
    if (feedback !== "correct") return;

    stopAudio();

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);

      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setIsComplete(true);
    }
  }

  // ========================================
  // RESTART GAME
  // ========================================

  function restartGame() {
    stopAudio();

    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setIsComplete(false);
  }

  // ========================================
  // BACK TO MENU
  // ========================================

  function handleBack() {
    stopAudio();
    navigate("/menu");
  }

  // ========================================
  // GAME DISPLAY
  // ========================================

  return (
    <main
      className="screen game1-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="game1-shell">

        {/* BACK BUTTON */}

        <header className="game1-header">
          <WoodenButton onClick={handleBack}>
            Back
          </WoodenButton>
        </header>

        {/* ==================================
            GAME COMPLETE
            ================================== */}

        {isComplete ? (
          <section
            className="game1-complete"
            aria-label="Game complete"
          >
            <img
              src={thumbnail}
              alt="Game character"
            />

            <h1>Game Complete!</h1>

            <p>
              Score: {score}/{questions.length}
            </p>

            <WoodenButton onClick={restartGame}>
              Play Again
            </WoodenButton>
          </section>
        ) : (

          /* ==================================
             MAIN GAME LAYOUT
             ================================== */

          <section
            className="game1-layout"
            aria-label="Pictionary game"
          >
            {/* QUESTION IMAGE */}

            <img
              className="game1-image"
              src={question.image}
              alt="Question illustration"
            />

            {/* QUESTION AND FEEDBACK BOX */}

            <QuestionBox
              thumbnail={thumbnail}
              questionText={question.text}
              feedback={feedback}

              onAction={
                feedback === "correct"
                  ? handleNextQuestion
                  : handleSelectAnswer
              }

              actionLabel={
                feedback === "correct"
                  ? (
                    currentQuestion === questions.length - 1
                      ? "Finish Game"
                      : "Next Question"
                  )
                  : "Select Answer"
              }

              actionDisabled={
                feedback !== "correct" &&
                selectedAnswer === null
              }
            />

            {/* ANSWER BUTTON BOX */}

            <div
              className="game1-answers"
              role="group"
              aria-label="Answer choices"
            >
              {question.answers.map((answer) => (
                <AnswerButton
                  key={answer}
                  answer={answer}

                  selected={
                    selectedAnswer === answer
                  }

                  disabled={feedback === "correct"}

                  onClick={() =>
                    handleAnswerClick(answer)
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
