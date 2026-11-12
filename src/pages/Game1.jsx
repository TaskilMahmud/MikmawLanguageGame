
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

export default function Game1() {
  const navigate = useNavigate();

  // ========================================
  // GAME STATE
  // ========================================

  // Extract unique months dynamically from questions
  const availableMonths = [...new Set(questions.map((q) => q.month || "September"))];

  const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const audioRef = useRef(null);

  // Filter questions for the selected month
  const filteredQuestions = questions.filter(
    (q) => (q.month || "September") === selectedMonth
  );

  const question = filteredQuestions[currentQuestion];

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
    stopAudio();

    const word = answer.trim().toLowerCase();
    const filename = audioFiles[word];

    if (!filename) {
      console.warn("No audio assigned for:", answer);
      return;
    }

    const audioPath = `${import.meta.env.BASE_URL}audio/${filename}`;
    const audio = new Audio(audioPath);

    audioRef.current = audio;

    audio.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.warn("Unable to play audio:", filename, error);
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
  // HANDLE MONTH CHANGE
  // ========================================

  function handleMonthChange(e) {
    stopAudio();
    setSelectedMonth(e.target.value);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setIsComplete(false);
  }

  // ========================================
  // SELECT ANSWER
  // ========================================

  function handleAnswerClick(answer) {
    if (feedback === "correct") return;

    setSelectedAnswer(answer);
    setFeedback(null);
    playAnswerAudio(answer);
  }

  // ========================================
  // CHECK ANSWER
  // ========================================

  function handleSelectAnswer() {
    if (selectedAnswer === null || feedback === "correct") {
      return;
    }

    stopAudio();

    if (selectedAnswer === question.correctAnswer) {
      setFeedback("correct");
      setScore((previousScore) => previousScore + 1);
    } else {
      setFeedback("incorrect");
      setSelectedAnswer(null);
    }
  }

  // ========================================
  // NEXT QUESTION
  // ========================================

  function handleNextQuestion() {
    if (feedback !== "correct") return;

    stopAudio();

    if (currentQuestion < filteredQuestions.length - 1) {
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

        {/* HEADER & MONTH SELECTOR */}

        <header className="game1-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <WoodenButton onClick={handleBack}>
            Back
          </WoodenButton>

          {/* Month Dropdown Selector */}
          <div className="month-selector" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label htmlFor="month-select" style={{ fontWeight: "bold", color: "#fff" }}>
              Month:
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{ padding: "6px 12px", borderRadius: "6px", fontWeight: "bold" }}
            >
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
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
              Score: {score}/{filteredQuestions.length}
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
            {/* SAFETY CHECK IF MONTH IS EMPTY */}
            {filteredQuestions.length === 0 ? (
              <p style={{ textAlign: "center", color: "#fff" }}>
                No questions available for {selectedMonth}.
              </p>
            ) : (
              <>
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
                          currentQuestion === filteredQuestions.length - 1
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
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
