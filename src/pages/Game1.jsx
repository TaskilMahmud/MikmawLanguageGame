
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import thumbnail from "../assets/thumbnail.png";
import backgroundImage from "../assets/background3.png";
import questionImage1 from "../assets/questionImage1.png";
import questionImage2 from "../assets/questionImage2.png";
import questionImage3 from "../assets/questionImage3.png";
import questionImage4 from "../assets/questionImage4.png";

function Game1() {
  const navigate = useNavigate();

  const questions = [
    {
      text: "I ____ meat",
      image: questionImage1,
      answers: ["and", "eat", "you"],
      correctAnswer: "eat",
    },
    {
      text: "Mali ____",
      image: questionImage2,
      answers: ["is my name", "eat", "and"],
      correctAnswer: "is my name",
    },
        {
      text: "Pointing at _____",
      image: questionImage3,
      answers: ["and", "eat", "you"],
      correctAnswer: "you",
    },
    {
      text: "____ am a student .",
      image: questionImage4,
      answers: ["eat", "I", "you"],
      correctAnswer: "I",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentQuestion];

  // Select an answer
  function handleAnswerClick(answer) {
    if (feedback !== null) return;

    setSelectedAnswer(answer);
  }

  // Check the selected answer
  function handleSelectAnswer() {
    if (selectedAnswer === null || feedback !== null) return;

    if (selectedAnswer === question.correctAnswer) {
      setFeedback("correct");
      setScore((previousScore) => previousScore + 1);
    } else {
      setFeedback("incorrect");
    }
  }

  // Move to the next question
  function handleNextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setIsComplete(true);
    }
  }

  // Restart the game
  function restartGame() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setIsComplete(false);
  }

  return (
    <div
      className="game1-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button
        className="game1-back-button"
        onClick={() => navigate("/menu")}
      >
        Back
      </button>

      <div className="question-box">

        <div className="question-picture">
          <img src={thumbnail} alt="Question character" />
        </div>

        <div className="question-content">

          {isComplete ? (
            <>
              <div className="question-text">
                Game Complete! Score: {score}/{questions.length}
              </div>

              <button
                className="select-answer-button"
                onClick={restartGame}
              >
                Play Again
              </button>
            </>
          ) : (
            <>
              <div className="question-text">
                {question.text}
              </div>

              {feedback === null ? (
                <button
                  className="select-answer-button"
                  onClick={handleSelectAnswer}
                  disabled={selectedAnswer === null}
                >
                  Select Answer
                </button>
              ) : (
                <>
                  <div
                    className={
                      feedback === "correct"
                        ? "feedback-message correct"
                        : "feedback-message incorrect"
                    }
                    role="status"
                  >
                    {feedback === "correct"
                      ? "Correct! Great job!"
                      : `Incorrect! The answer is ${question.correctAnswer}.`}
                  </div>

                  <button
                    className="select-answer-button"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestion === questions.length - 1
                      ? "Finish Game"
                      : "Next Question"}
                  </button>
                </>
              )}
            </>
          )}

        </div>
      </div>

      {!isComplete && (
        <>
          <img
            className="questionImage"
            src={question.image}
            alt="Question illustration"
          />

          <div className="game1-answer-buttons">
            {question.answers.map((answer) => (
              <button
                key={answer}
                type="button"
                disabled={feedback !== null}
                className={
                  selectedAnswer === answer
                    ? "selected-answer"
                    : ""
                }
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Game1;
