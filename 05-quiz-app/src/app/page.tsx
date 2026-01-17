"use client";

import {
  Award,
  CheckCircle,
  Clock,
  Lightbulb,
  RotateCcw,
  Star,
  Target,
  TrendingUp,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  category?: string;
}

const originalQuestions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
    explanation: "Paris is the capital and most populous city of France.",
    category: "Geography",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
    explanation: "Basic arithmetic: 2 + 2 equals 4.",
    category: "Math",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    explanation: "Mars appears red due to iron oxide (rust) on its surface.",
    category: "Science",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
    explanation: "The Pacific Ocean covers about 46% of Earth's water surface.",
    category: "Geography",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    answer: "Da Vinci",
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503-1519.",
    category: "Art",
  },
  {
    question: "What is the square root of 16?",
    options: ["2", "4", "6", "8"],
    answer: "4",
    explanation: "The square root of 16 is 4, since 4 × 4 = 16.",
    category: "Math",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
    explanation:
      "Plants use carbon dioxide during photosynthesis to make glucose.",
    category: "Science",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: "H2O",
    explanation: "H2O represents two hydrogen atoms and one oxygen atom.",
    category: "Science",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    answer: "Shakespeare",
    explanation: "William Shakespeare wrote Romeo and Juliet around 1595.",
    category: "Literature",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Leopard", "Tiger"],
    answer: "Cheetah",
    explanation: "Cheetahs can reach speeds up to 70 mph in short bursts.",
    category: "Nature",
  },
  {
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    answer: "Hydrogen",
    explanation:
      "Hydrogen is the lightest and most abundant element in the universe.",
    category: "Science",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
    answer: "Jupiter",
    explanation:
      "Jupiter has a diameter of about 143,000 km, making it the largest planet.",
    category: "Science",
  },
  {
    question: "Who discovered penicillin?",
    options: ["Pasteur", "Fleming", "Darwin", "Einstein"],
    answer: "Fleming",
    explanation: "Alexander Fleming discovered penicillin in 1928.",
    category: "Science",
  },
  {
    question: "What is the currency of Japan?",
    options: ["Won", "Yen", "Ringgit", "Baht"],
    answer: "Yen",
    explanation: "The Japanese yen is the official currency of Japan.",
    category: "Geography",
  },
  {
    question: "Which programming language was created by Guido van Rossum?",
    options: ["Java", "Python", "C++", "JavaScript"],
    answer: "Python",
    explanation: "Python was first released in 1991 by Guido van Rossum.",
    category: "Technology",
  },
];

function shuffle(array: Question[]): Question[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleStrings(array: string[]): string[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setQuestions(
      shuffle([...originalQuestions]).map((q) => ({
        ...q,
        options: shuffleStrings([...q.options]),
      })),
    );
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("quizHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResults && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults && !answered) {
      setAnswered(true);
      setFeedback(
        "Time's up! Correct answer: " + questions[currentQuestion]?.answer,
      );
      setStreak(0);
    }
  }, [
    timeLeft,
    currentQuestion,
    showResults,
    questions.length,
    answered,
    questions,
  ]);

  useEffect(() => {
    if (quizStarted && !showResults) {
      const totalTimer = setInterval(() => {
        setTotalTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(totalTimer);
    }
  }, [quizStarted, showResults]);

  const handleAnswer = (selected: string) => {
    setSelectedAnswer(selected);
    const isCorrect = selected === questions[currentQuestion]?.answer;
    const timeSpent = 30 - timeLeft;

    setQuestionTimes((prev) => [...prev, timeSpent]);

    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct!");
      setStreak(streak + 1);
      if (streak + 1 > maxStreak) setMaxStreak(streak + 1);
    } else {
      setFeedback(
        "Wrong! Correct answer: " + questions[currentQuestion]?.answer,
      );
      setStreak(0);
    }
    setAnswered(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const hint = () => {
    if (!answered && hintsUsed < 1) {
      const q = questions[currentQuestion];
      const wrongOptions = q.options.filter((o) => o !== q.answer);
      const toRemove =
        wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
      setQuestions((prev) => {
        const newQs = [...prev];
        newQs[currentQuestion].options = newQs[currentQuestion].options.filter(
          (o) => o !== toRemove,
        );
        return newQs;
      });
      setHintsUsed(hintsUsed + 1);
    }
  };

  const nextQuestion = () => {
    setAnswered(false);
    setFeedback("");
    setSelectedAnswer(null);
    setHintsUsed(0);
    setShowExplanation(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setShowResults(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("quizHighScore", score.toString());
      }
    }
  };

  const restartQuiz = () => {
    setQuestions(
      shuffle([...originalQuestions]).map((q) => ({
        ...q,
        options: shuffleStrings([...q.options]),
      })),
    );
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(30);
    setFeedback("");
    setAnswered(false);
    setSelectedAnswer(null);
    setHintsUsed(0);
    setShowExplanation(false);
    setTotalTime(0);
    setQuestionTimes([]);
    setStreak(0);
    setMaxStreak(0);
    setIsAnimating(false);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center transform hover:scale-105 transition-all duration-300">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <Trophy className="text-white" size={32} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Brain Blitz
            </h1>
            <p className="text-gray-600 text-lg">Challenge your knowledge!</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
              <Target className="text-blue-500 mx-auto mb-2" size={24} />
              <p className="text-sm font-semibold text-gray-700">
                15 Questions
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
              <Clock className="text-green-500 mx-auto mb-2" size={24} />
              <p className="text-sm font-semibold text-gray-700">30s per Q</p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-6 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl">
            <Star className="text-yellow-500 mr-2" size={20} />
            <span className="text-lg font-bold text-gray-800">
              High Score: {highScore}
            </span>
          </div>

          <button
            onClick={() => setQuizStarted(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Zap className="mr-3" size={24} />
            Start Challenge
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Test your knowledge across multiple categories
          </p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const averageTime =
      questionTimes.length > 0
        ? Math.round(
            questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length,
          )
        : 0;
    const accuracy =
      questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center transform hover:scale-105 transition-all duration-300">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-4 shadow-lg">
              <Award className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Quiz Complete!
            </h1>
            <p className="text-gray-600">
              Great job on completing the challenge!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
              <Trophy className="text-blue-500 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">
                {score}/{questions.length}
              </p>
              <p className="text-xs text-gray-600">Score</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
              <TrendingUp className="text-green-500 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{accuracy}%</p>
              <p className="text-xs text-gray-600">Accuracy</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <Clock className="text-purple-500 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">
                {Math.floor(totalTime / 60)}:
                {(totalTime % 60).toString().padStart(2, "0")}
              </p>
              <p className="text-xs text-gray-600">Total Time</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
              <Zap className="text-orange-500 mx-auto mb-2" size={24} />
              <p className="text-2xl font-bold text-gray-800">{maxStreak}</p>
              <p className="text-xs text-gray-600">Best Streak</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl mb-6">
            <Star className="text-yellow-500 mx-auto mb-2" size={20} />
            <p className="text-lg font-bold text-gray-800">
              High Score: {highScore}
            </p>
            <p className="text-sm text-gray-600">
              Average time per question: {averageTime}s
            </p>
          </div>

          <button
            onClick={restartQuiz}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-8 rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <RotateCcw className="mr-3" size={24} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <Trophy className="text-yellow-400" size={20} />
              </div>
              <div>
                <p className="text-white text-sm opacity-80">Score</p>
                <p className="text-white text-xl font-bold">{score}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-white text-sm opacity-80">Streak</p>
                <p className="text-white text-xl font-bold">{streak}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-2">
                <Zap className="text-orange-400" size={20} />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="text-white opacity-80" size={16} />
              <p className="text-white text-sm">{timeLeft}s</p>
            </div>
            <p className="text-white text-sm opacity-80">
              {currentQuestion + 1} / {questions.length}
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div
          className={`bg-white bg-opacity-95 backdrop-blur-md rounded-3xl p-8 shadow-2xl transition-all duration-300 ${isAnimating ? "scale-105" : ""}`}
        >
          {q.category && (
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Target size={14} className="mr-1" />
              {q.category}
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
            {q.question}
          </h2>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-xl transition-all duration-300 ${
                feedback.includes("Correct")
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center">
                {feedback.includes("Correct") ? (
                  <CheckCircle
                    className="text-green-500 mr-3 flex-shrink-0"
                    size={24}
                  />
                ) : (
                  <XCircle
                    className="text-red-500 mr-3 flex-shrink-0"
                    size={24}
                  />
                )}
                <p
                  className={`font-semibold ${
                    feedback.includes("Correct")
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {feedback}
                </p>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 mb-6">
            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`w-full p-4 rounded-xl transition-all duration-200 text-left font-medium ${
                  answered
                    ? option === q.answer
                      ? "bg-green-500 text-white shadow-lg transform scale-105"
                      : option === selectedAnswer
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-500"
                    : "bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 text-gray-800 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transform hover:scale-102"
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <span className="inline-block w-8 h-8 bg-gray-200 rounded-full text-gray-700 font-bold text-sm mr-3 flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Hint Button */}
          {!answered && hintsUsed < 1 && (
            <button
              onClick={hint}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 mb-4"
            >
              <Lightbulb className="mr-2" size={20} />
              Use Hint (-1 wrong option)
            </button>
          )}

          {/* Explanation */}
          {answered && q.explanation && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl mb-4 border-l-4 border-blue-400">
              <p className="text-blue-800 font-medium mb-1">💡 Explanation:</p>
              <p className="text-blue-700 text-sm">{q.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "View Results"}
              <TrendingUp className="ml-2" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
