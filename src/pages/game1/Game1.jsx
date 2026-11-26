import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import WoodenButton from "../../components/WoodenButton";
import AnswerButton from "../../components/AnswerButton";
import QuestionBox from "../../components/QuestionBox";
import { questions, audioFiles } from "../../data/game1Questions";
import { loadGame1Progress, saveGame1Progress } from "../../data/game1Progress";

import backgroundImage from "../../assets/background3.webp";
import happyGirl from "../../assets/game1-happy-girl.webp";
import speakerIcon from "../../assets/goat-island/speaker-icon.webp";
import thumbnail from "../../assets/thumbnail.webp";

import "../../styles/game1.css";
import "../../styles/game1Landing.css";

const regularConfettiCount = 22;
const confettiDurations = [
  ...Array.from({ length: regularConfettiCount }, (_, index) => 3.2 + (index % 4) * 0.25),
  2.65, 2.8, 2.7, 2.9, 2.75,
  1.85, 2.1, 1.95, 2.15, 1.9,
];

// Fixed positions keep the celebration consistent and avoid a new animation on re-render.
const confetti = confettiDurations.map((duration, index) => ({
  left: `${4 + ((index * 43) % 92)}%`,
  delay: `${(index % 7) * (index < regularConfettiCount ? 0.11 : 0.04)}s`,
  duration: `${duration}s`,
  color: ["#e7b339", "#d86d52", "#4c966d", "#7c9ec7", "#cc87a3"][index % 5],
}));

function Confetti() {
  return (
    <div className="game1-complete-confetti" aria-hidden="true">
      {confetti.map((piece, index) => (
        <span
          key={index}
          className="game1-complete-confetti-piece"
          style={{
            "--piece-left": piece.left,
            "--piece-delay": piece.delay,
            "--piece-duration": piece.duration,
            "--piece-color": piece.color,
          }}
        />
      ))}
    </div>
  );
}

function MikmawStar({ filled, index, celebrate = false, size = 34 }) {
  const popDelayMs = celebrate ? 140 + index * 170 : 0;

  return (
    <svg
      className={[
        "game1-star",
        filled ? "game1-star--filled" : "game1-star--empty",
        celebrate ? "game1-star--celebrate" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={celebrate ? { "--star-pop-delay": `${popDelayMs}ms` } : undefined}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
    >
      {filled && (
        <g>
          <polygon
            points="50,50 17.5,17.5 41.2,28.75 50,4 58.8,28.75 82.5,17.5"
            fill="#fefefe"
          />
          <polygon
            points="50,50 82.5,17.5 71.25,41.2 96,50 71.25,58.8 82.5,82.5"
            fill="#fec701"
          />
          <polygon
            points="50,50 82.5,82.5 58.8,71.25 50,96 41.2,71.25 17.5,82.5"
            fill="#df0113"
          />
          <polygon
            points="50,50 17.5,82.5 28.75,58.8 4,50 28.75,41.2 17.5,17.5 41.2,28.75"
            fill="#161615"
          />
        </g>
      )}
      <polygon
        points="50,4 58.8,28.75 82.5,17.5 71.25,41.2 96,50 71.25,58.8 82.5,82.5 58.8,71.25 50,96 41.2,71.25 17.5,82.5 28.75,58.8 4,50 28.75,41.2 17.5,17.5 41.2,28.75"
        fill={filled ? "none" : "#9e9e9e"}
        stroke="#0b0b0b"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <title>{`Star ${index + 1}`}</title>
    </svg>
  );
}

function MikmawStarsTracker({ score, total = 3, variant = "header", celebrate = false }) {
  const safeTotal = Math.max(1, total);
  const starSize = variant === "complete" ? 48 : 34;

  return (
    <div
      className={`game1-stars game1-stars--${variant}`}
      role="img"
      aria-label={`${Math.min(score, safeTotal)} of ${safeTotal} stars earned`}
    >
      {Array.from({ length: safeTotal }, (_, index) => (
        <MikmawStar
          key={index}
          index={index}
          filled={index < score}
          celebrate={celebrate}
          size={starSize}
        />
      ))}
    </div>
  );
}

export default function Game1() {
  const navigate = useNavigate();

  const availableMonths = [
    ...new Set(questions.map((q) => q.month || "September")),
  ];

  // Read saved progress ONCE when entering Game 1. Restores the same month,
  // question, score, and feedback even after leaving or refreshing the page.
  const [initialProgress] = useState(() => loadGame1Progress(questions));
  const [selectedMonth, setSelectedMonth] = useState(initialProgress.month);
  const [currentQuestion, setCurrentQuestion] = useState(initialProgress.questionIndex);
  const [selectedAnswer, setSelectedAnswer] = useState(initialProgress.selectedAnswer);
  const [feedback, setFeedback] = useState(initialProgress.feedback);
  const [incorrectAttempts, setIncorrectAttempts] = useState(initialProgress.incorrectAttempts);
  const [score, setScore] = useState(initialProgress.score);
  const [isComplete, setIsComplete] = useState(initialProgress.isComplete);
  const [completedMonths, setCompletedMonths] = useState(initialProgress.completedMonths);
  // Best stars earned in each month survive switching months or replaying.
  const [monthScores, setMonthScores] = useState(initialProgress.monthScores ?? {});

  const audioRef = useRef(null);

  const filteredQuestions = questions.filter(
    (q) => (q.month || "September") === selectedMonth
  );

  // Questions from the selected month and all earlier months (for the dictionary)
  const selectedMonthIndex = availableMonths.indexOf(selectedMonth);

  const unlockedQuestions = questions.filter((q) => {
    const monthIndex = availableMonths.indexOf(q.month || "September");
    return monthIndex <= selectedMonthIndex;
  });

  const question = filteredQuestions[currentQuestion];
  const nextQuestionImage = filteredQuestions[currentQuestion + 1]?.image;
  const nextMonth = availableMonths[availableMonths.indexOf(selectedMonth) + 1];
  const nextMonthName = nextMonth?.match(/\(([^)]+)\)/)?.[1] ?? nextMonth;
  const selectedMonthName = selectedMonth?.match(/\(([^)]+)\)/)?.[1] ?? selectedMonth;

  // Save the full active state whenever it changes. This includes clicking
  // Next Question, changing month, submitting answers, and completing a month.
  useEffect(() => {
    saveGame1Progress({
      month: selectedMonth,
      questionIndex: currentQuestion,
      selectedAnswer,
      feedback,
      incorrectAttempts,
      score,
      isComplete,
      completedMonths,
      monthScores,
    });
  }, [selectedMonth, currentQuestion, selectedAnswer, feedback, incorrectAttempts, score, isComplete, completedMonths, monthScores]);

  // A new key remounts only the question visuals when the question changes.
  // Clicking an answer or opening the dictionary won't replay the entrance animations.
  const questionAnimationKey = `${selectedMonth}-${currentQuestion}`;

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

  useEffect(() => {
    if (!nextQuestionImage) return;

    const nextImage = new Image();
    nextImage.fetchPriority = "low";
    nextImage.src = nextQuestionImage;
  }, [nextQuestionImage]);

  function startMonth(month) {
    setSelectedMonth(month);
    restartGame();
  }

  function handleAnswerClick(answer) {
    if (feedback === "correct") return;

    if (answer === question.correctAnswer) {
      setSelectedAnswer(answer);
      setFeedback("correct");
      const earnedScore = score + 1;
      setScore(earnedScore);
      setMonthScores((previous) => ({
        ...previous,
        [selectedMonth]: Math.max(previous[selectedMonth] ?? 0, earnedScore),
      }));
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
      setCompletedMonths((previous) =>
        previous.includes(selectedMonth) ? previous : [...previous, selectedMonth]
      );
    }
  }

  function restartGame() {
    stopAudio();
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setIncorrectAttempts(0);
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
          <div className="game1-header-left">
            <WoodenButton onClick={handleBack}>Back</WoodenButton>
            <MikmawStarsTracker score={score} total={3} />
          </div>

          <p className="game1-title">Pictionary</p>

          <div className="game1-month">
            <label htmlFor="month-select">Month</label>
            <span className="game1-month__select-wrap">
              <select
                id="month-select"
                value={selectedMonth}
                onChange={(event) => startMonth(event.target.value)}
                aria-label="Select a month (completed months have a checkmark)"
              >
                {availableMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}{completedMonths.includes(month) && month !== selectedMonth ? " ✓" : ""}
                  </option>
                ))}
              </select>
              {completedMonths.includes(selectedMonth) && (
                <span
                  className="game1-month__check"
                  aria-label="Month completed"
                  title="Month completed"
                >
                  ✓
                </span>
              )}
            </span>
          </div>
        </header>

        {isComplete ? (
          <div className="game1-landing__welcome game1-complete-screen">
            <Confetti />
            <img
              className="game1-landing__character game1-complete-character"
              src={happyGirl}
              alt="Happy girl jumping with joy"
            />

            <section
              className="game1-landing__instructions game1-complete"
              aria-labelledby="game1-complete-title"
            >
              <div>
                <h1 id="game1-complete-title">{selectedMonthName} Complete!</h1>
                <p className="game1-complete__praise">
                  <span className="game1-complete__emoji" aria-hidden="true">🎉</span>{" "}
                  Great Job!{" "}
                  <span className="game1-complete__emoji" aria-hidden="true">🌟</span>
                </p>
              </div>
              <MikmawStarsTracker
                score={score}
                total={filteredQuestions.length}
                variant="complete"
                celebrate
              />
              <div className="game1-complete__actions">
                <WoodenButton onClick={restartGame}>Play Again</WoodenButton>
                {nextMonth && (
                  <WoodenButton
                    className="game1-landing__play"
                    onClick={() => startMonth(nextMonth)}
                  >
                    Play {nextMonthName}
                  </WoodenButton>
                )}
              </div>
            </section>
          </div>
        ) : (
          <section
            className={`game1-layout${currentQuestion === 0 ? " game1-layout--opening" : ""}`}
            aria-label="Pictionary game"
          >
            {!question ? (
              <p className="game1-empty">
                No questions available for {selectedMonth}.
              </p>
            ) : (
              <>
                <img
                  key={`image-${questionAnimationKey}`}
                  className="game1-image"
                  src={question.image}
                  onLoad={(event) => event.currentTarget.setAttribute("data-image-loaded", "")}
                  fetchPriority="high"
                  alt="Question illustration"
                />

                <QuestionBox
                  key={`question-${questionAnimationKey}`}
                  thumbnail={thumbnail}
                  questionText={question.text}
                  correctSentence={question.correctSentence}
                  highlightedText={question.highlightedText}
                  feedback={feedback}
                  incorrectAttempts={incorrectAttempts}
                  onNext={handleNextQuestion}
                  nextLabel={
                    currentQuestion === filteredQuestions.length - 1
                      ? "Finish Game"
                      : "Next Question"
                  }
                  dictionaryQuestions={unlockedQuestions}
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
