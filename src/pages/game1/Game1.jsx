import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import WoodenButton from "../../components/WoodenButton";
import AnswerButton from "../../components/AnswerButton";
import QuestionBox from "../../components/QuestionBox";
import { questions, audioFiles } from "../../data/game1Questions";

import backgroundImage from "../../assets/background3.png";
import character from "../../assets/game1-girl-pointing.png";
import speakerIcon from "../../assets/goat-island/speaker-icon.png";
import thumbnail from "../../assets/thumbnail.png";

import "../../styles/game1.css";
import "../../styles/game1Landing.css";

export default function Game1() {
  const navigate = useNavigate();

  const availableMonths = [
    ...new Set(questions.map((q) => q.month || "September")),
  ];

  const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const audioRef = useRef(null);

  const filteredQuestions = questions.filter(
    (q) => (q.month || "September") === selectedMonth
  );
  const question = filteredQuestions[currentQuestion];
  const nextMonth = availableMonths[availableMonths.indexOf(selectedMonth) + 1];

  function stopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  function playAudio(filename) {
    stopAudio();

    const audioPath = `${import.meta.env.BASE_URL}audio/${filename}`;
    const audio = new Audio(audioPath);
    audioRef.current = audio;

    audio.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.warn("Unable to play audio:", filename, error);
      }
    });
  }

  function playAnswerAudio(answer) {
    const word = answer.trim().toLowerCase();
    const filename = audioFiles[word];

    if (!filename) {
      stopAudio();
      console.warn("No audio assigned for:", answer);
      return;
    }

    playAudio(filename);
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function startMonth(month) {
    setSelectedMonth(month);
    restartGame();
  }

  function handleAnswerClick(answer) {
    if (feedback === "correct") return;

    if (answer === question.correctAnswer) {
      setSelectedAnswer(answer);
      setFeedback("correct");
      setScore((previousScore) => previousScore + 1);
      playAudio("congratulatory.mp3");
    } else {
      setFeedback("incorrect");
      setIncorrectAttempts((attempts) => attempts + 1);
      setSelectedAnswer(null);
      playAudio("tryagain.mp3");
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
              onChange={(event) => startMonth(event.target.value)}
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
          <div className="game1-landing__welcome">
            <img className="game1-landing__character" src={character} alt="" />

            <section
              className="game1-landing__instructions game1-complete"
              aria-labelledby="game1-complete-title"
            >
              <div>
                <h1 id="game1-complete-title">Game Complete!</h1>
                <p className="game1-complete__praise">🎉🎉 Great Job 🎉🎉</p>
              </div>
              <p>Score: {score}/{filteredQuestions.length}</p>
              <div className="game1-complete__actions">
                <WoodenButton onClick={restartGame}>Play Again</WoodenButton>
                {nextMonth && (
                  <WoodenButton
                    className="game1-landing__play"
                    onClick={() => startMonth(nextMonth)}
                  >
                    Next Month
                  </WoodenButton>
                )}
              </div>
            </section>
          </div>
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
                  incorrectAttempts={incorrectAttempts}
                  onNext={handleNextQuestion}
                  nextLabel={
                    currentQuestion === filteredQuestions.length - 1
                      ? "Finish Game"
                      : "Next Question"
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
                      <div className="game1-answer-row" key={answer}>
                        <AnswerButton
                          answer={answer}
                          selected={selectedAnswer === answer}
                          disabled={feedback === "correct"}
                          onClick={() => handleAnswerClick(answer)}
                        />
                        <button
                          type="button"
                          className="game1-answer-audio"
                          aria-label={`Hear ${answer}`}
                          onClick={() => playAnswerAudio(answer)}
                        >
                          <img src={speakerIcon} alt="" />
                        </button>
                      </div>
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
