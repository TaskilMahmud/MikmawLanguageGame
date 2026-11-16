import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import WoodenButton from "../../components/WoodenButton";
import AnswerButton from "../../components/AnswerButton";
import QuestionBox from "../../components/QuestionBox";
import { questions, audioFiles } from "../../data/game1Questions";

import backgroundImage from "../../assets/background3.png";
import thumbnail from "../../assets/thumbnail.png";

import "../../styles/game1.css";

export default function Game1() {
  const navigate = useNavigate();

  const availableMonths = [
    ...new Set(questions.map((q) => q.month || "September")),
  ];

  const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const audioRef = useRef(null);

  const filteredQuestions = questions.filter(
    (q) => (q.month || "September") === selectedMonth
  );
  const question = filteredQuestions[currentQuestion];

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

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

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function handleMonthChange(e) {
    stopAudio();
    setSelectedMonth(e.target.value);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setIsComplete(false);
  }

  function handleAnswerClick(answer) {
    if (feedback === "correct") return;

    setSelectedAnswer(answer);
    setFeedback(null);
    playAnswerAudio(answer);
  }

  function handleSelectAnswer() {
    if (selectedAnswer === null || feedback === "correct") return;

    stopAudio();

    if (selectedAnswer === question.correctAnswer) {
      setFeedback("correct");
      setScore((previousScore) => previousScore + 1);
    } else {
      setFeedback("incorrect");
      setSelectedAnswer(null);
    }
  }

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

  function restartGame() {
    stopAudio();
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setIsComplete(false);
  }

  function handleBack() {
    stopAudio();
    navigate("/game1");
  }

  return (
    <main
      className="screen game1-screen"
      style={{ "--game1-background": `url(${backgroundImage})` }}
    >
      <div className="game1-shell">
        <header className="game1-header">
          <WoodenButton onClick={handleBack}>Back</WoodenButton>

          <p className="game1-title">Pictionary</p>

          <div className="game1-month">
            <label htmlFor="month-select">Month</label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </header>

        {isComplete ? (
          <section className="game1-complete" aria-label="Game complete">
            <img src={thumbnail} alt="Game character" />
            <h1>Game Complete!</h1>
            <p>Score: {score}/{filteredQuestions.length}</p>
            <WoodenButton onClick={restartGame}>Play Again</WoodenButton>
          </section>
        ) : (
          <section className="game1-layout" aria-label="Pictionary game">
            {!question ? (
              <p className="game1-empty">
                No questions available for {selectedMonth}.
              </p>
            ) : (
              <>
                <img
                  className="game1-image"
                  src={question.image}
                  alt="Question illustration"
                />

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
                      ? currentQuestion === filteredQuestions.length - 1
                        ? "Finish Game"
                        : "Next Question"
                      : "Select Answer"
                  }
                  actionDisabled={
                    feedback !== "correct" && selectedAnswer === null
                  }
                  dictionaryQuestions={filteredQuestions}
                  progress={`Question ${currentQuestion + 1} of ${filteredQuestions.length}`}
                >
                  <div
                    className="game1-answers"
                    role="group"
                    aria-label="Answer choices"
                  >
                    {question.answers.map((answer) => (
                      <AnswerButton
                        key={answer}
                        answer={answer}
                        selected={selectedAnswer === answer}
                        disabled={feedback === "correct"}
                        onClick={() => handleAnswerClick(answer)}
                      />
                    ))}
                  </div>
                </QuestionBox>
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
