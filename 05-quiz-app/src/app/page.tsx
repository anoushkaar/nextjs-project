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
import { useEffect, useRef, useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation?: string;
  category?: string;
}

const categories = [
  "Geography",
  "Math",
  "Science",
  "Art",
  "Literature",
  "Nature",
  "Technology",
  "History",
  "Sports",
  "Music",
  "Movies",
];

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
  // New questions
  {
    question: "Who was the first President of the United States?",
    options: [
      "Abraham Lincoln",
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
    ],
    answer: "George Washington",
    explanation:
      "George Washington was the first President, serving from 1789 to 1797.",
    category: "History",
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    options: ["Germany", "Argentina", "Brazil", "Italy"],
    answer: "Brazil",
    explanation: "Brazil has won the FIFA World Cup five times.",
    category: "Sports",
  },
  {
    question: "Who is known as the King of Pop?",
    options: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
    answer: "Michael Jackson",
    explanation: "Michael Jackson is often called the King of Pop.",
    category: "Music",
  },
  {
    question: "Which movie features the character Darth Vader?",
    options: ["Star Wars", "Star Trek", "The Matrix", "Lord of the Rings"],
    answer: "Star Wars",
    explanation: "Darth Vader is a character in the Star Wars franchise.",
    category: "Movies",
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
    explanation: "Canberra is the capital city of Australia.",
    category: "Geography",
  },
  {
    question: "What is 15 divided by 3?",
    options: ["3", "4", "5", "6"],
    answer: "5",
    explanation: "15 divided by 3 equals 5.",
    category: "Math",
  },
  {
    question: "Which vitamin is produced when skin is exposed to sunlight?",
    options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    answer: "Vitamin D",
    explanation:
      "Vitamin D is synthesized in the skin upon exposure to ultraviolet light.",
    category: "Science",
  },
  {
    question: "Who painted 'The Starry Night'?",
    options: ["Van Gogh", "Picasso", "Monet", "Dali"],
    answer: "Van Gogh",
    explanation: "Vincent van Gogh painted 'The Starry Night' in 1889.",
    category: "Art",
  },
  {
    question: "Who wrote 'Pride and Prejudice'?",
    options: [
      "Jane Austen",
      "Emily Bronte",
      "Charlotte Bronte",
      "George Eliot",
    ],
    answer: "Jane Austen",
    explanation: "Jane Austen wrote 'Pride and Prejudice' in 1813.",
    category: "Literature",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
    explanation:
      "The blue whale is the largest animal ever known to have lived.",
    category: "Nature",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    answer: "HyperText Markup Language",
    explanation:
      "HTML stands for HyperText Markup Language, the standard markup language for web pages.",
    category: "Technology",
  },
  {
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    answer: "1945",
    explanation: "World War II ended in 1945 with the surrender of Japan.",
    category: "History",
  },
  {
    question: "Which sport is known as 'America's Pastime'?",
    options: ["Basketball", "Football", "Baseball", "Soccer"],
    answer: "Baseball",
    explanation: "Baseball is often called America's Pastime.",
    category: "Sports",
  },
  {
    question: "Who composed 'The Four Seasons'?",
    options: ["Bach", "Mozart", "Vivaldi", "Beethoven"],
    answer: "Vivaldi",
    explanation: "Antonio Vivaldi composed 'The Four Seasons' in 1723.",
    category: "Music",
  },
  {
    question: "Which movie won the Academy Award for Best Picture in 2020?",
    options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    answer: "Parasite",
    explanation: "'Parasite' won the Academy Award for Best Picture in 2020.",
    category: "Movies",
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
  const [paused, setPaused] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categories);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const autoAdvanceRef = useRef<number | null>(null);

  const availableQuestions = originalQuestions.filter((q) =>
    selectedCategories.includes(q.category || ""),
  );

  useEffect(() => {
    const filtered = originalQuestions.filter((q) =>
      selectedCategories.includes(q.category || ""),
    );
    setQuestions(
      shuffle([...filtered]).map((q) => ({
        ...q,
        options: shuffleStrings([...q.options]),
      })),
    );
  }, [selectedCategories]);

  useEffect(() => {
    const saved = localStorage.getItem("quizHighScore");
    if (saved) setHighScore(parseInt(saved));
    const savedCats = localStorage.getItem("quizSelectedCategories");
    if (savedCats) {
      try {
        const parsed = JSON.parse(savedCats) as string[];
        if (Array.isArray(parsed)) setSelectedCategories(parsed);
      } catch {}
    }
    const savedCount = localStorage.getItem("quizQuestionCount");
    if (savedCount) {
      const n = parseInt(savedCount);
      if (!isNaN(n)) setQuestionCount(n);
    }
    // check for saved progress
    if (localStorage.getItem("quizProgress")) setHasSavedProgress(true);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResults && !answered && !paused) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults && !answered && !paused) {
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
    paused,
  ]);

  useEffect(() => {
    if (quizStarted && !showResults && !paused) {
      const totalTimer = setInterval(() => {
        setTotalTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(totalTimer);
    }
  }, [quizStarted, showResults, paused]);

  // persist selected categories and question count
  useEffect(() => {
    localStorage.setItem(
      "quizSelectedCategories",
      JSON.stringify(selectedCategories),
    );
  }, [selectedCategories]);

  useEffect(() => {
    localStorage.setItem("quizQuestionCount", questionCount.toString());
  }, [questionCount]);

  // keyboard shortcuts (A-D) for selecting options
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!quizStarted || showResults || answered) return;
      const key = e.key.toLowerCase();
      if (key >= "a" && key <= "d") {
        const idx = key.charCodeAt(0) - "a".charCodeAt(0);
        const q = questions[currentQuestion];
        if (q && q.options[idx]) {
          handleAnswer(q.options[idx]);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [quizStarted, showResults, answered, questions, currentQuestion]);

  // additional keyboard shortcuts: P pause/resume, S save, L load, H reset high score
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "p") {
        // toggle pause when quiz running
        if (quizStarted && !showResults) togglePause();
      }
      if (key === "s") {
        if (quizStarted) saveProgress();
      }
      if (key === "l") {
        loadProgress();
      }
      if (key === "h") {
        resetHighScore();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [quizStarted, showResults, answered, questions, currentQuestion, paused]);

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

    // auto-advance short delay
    if (autoAdvanceRef.current) {
      window.clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    autoAdvanceRef.current = window.setTimeout(() => {
      nextQuestion();
    }, 1400);
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

  const togglePause = () => {
    setPaused((p) => !p);
  };

  const resetHighScore = () => {
    setHighScore(0);
    localStorage.removeItem("quizHighScore");
    setFeedback("High score reset.");
    setTimeout(() => setFeedback(""), 1200);
  };

  const saveProgress = () => {
    const payload = {
      questions,
      currentQuestion,
      score,
      timeLeft,
      totalTime,
      questionTimes,
      streak,
      maxStreak,
      selectedAnswer,
      answered,
      hintsUsed,
      showExplanation,
      quizStarted,
      selectedCategories,
      questionCount,
    };
    try {
      localStorage.setItem("quizProgress", JSON.stringify(payload));
      setHasSavedProgress(true);
      setFeedback("Progress saved.");
      setTimeout(() => setFeedback(""), 1200);
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  const loadProgress = () => {
    const raw = localStorage.getItem("quizProgress");
    if (!raw) {
      setFeedback("No saved progress to load.");
      setTimeout(() => setFeedback(""), 1200);
      return;
    }
    try {
      const p = JSON.parse(raw) as any;
      if (Array.isArray(p.questions)) setQuestions(p.questions);
      if (typeof p.currentQuestion === "number")
        setCurrentQuestion(p.currentQuestion);
      if (typeof p.score === "number") setScore(p.score);
      if (typeof p.timeLeft === "number") setTimeLeft(p.timeLeft);
      if (typeof p.totalTime === "number") setTotalTime(p.totalTime);
      if (Array.isArray(p.questionTimes)) setQuestionTimes(p.questionTimes);
      if (typeof p.streak === "number") setStreak(p.streak);
      if (typeof p.maxStreak === "number") setMaxStreak(p.maxStreak);
      if (typeof p.selectedAnswer === "string")
        setSelectedAnswer(p.selectedAnswer);
      if (typeof p.answered === "boolean") setAnswered(p.answered);
      if (typeof p.hintsUsed === "number") setHintsUsed(p.hintsUsed);
      if (typeof p.showExplanation === "boolean")
        setShowExplanation(p.showExplanation);
      if (typeof p.quizStarted === "boolean") setQuizStarted(p.quizStarted);
      if (Array.isArray(p.selectedCategories))
        setSelectedCategories(p.selectedCategories);
      if (typeof p.questionCount === "number")
        setQuestionCount(p.questionCount);
      setFeedback("Progress loaded.");
      setTimeout(() => setFeedback(""), 1200);
    } catch (e) {
      console.error("Failed to load progress", e);
    }
  };

  const nextQuestion = () => {
    if (autoAdvanceRef.current) {
      window.clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
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
    // return to start screen and reset state; preserve selected categories/count
    setQuizStarted(false);
    setQuestions([]);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl text-center p-10 transform hover:scale-105 transition-all duration-300">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mb-6 shadow-lg">
              <Trophy className="text-white" size={40} />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Brain Blitz
            </h1>
            <p className="text-gray-700 text-xl">Challenge your knowledge!</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
              <Target className="text-blue-600 mx-auto mb-3" size={28} />
              <p className="text-lg font-semibold text-gray-800">
                {availableQuestions.length} Questions
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
              <Clock className="text-green-600 mx-auto mb-3" size={28} />
              <p className="text-lg font-semibold text-gray-800">30s per Q</p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-8 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
            <Star className="text-yellow-600 mr-3" size={24} />
            <span className="text-xl font-bold text-gray-800">
              High Score: {highScore}
            </span>
          </div>

          <div className="mb-8 w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Select Categories:
            </h3>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center justify-center bg-gradient-to-r p-3 rounded-full cursor-pointer text-sm font-medium transition-all ${
                    selectedCategories.includes(cat)
                      ? "from-blue-500 to-cyan-500 text-white shadow-md"
                      : "from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories((prev) => [...prev, cat]);
                      } else {
                        setSelectedCategories((prev) =>
                          prev.filter((c) => c !== cat),
                        );
                      }
                    }}
                    className="sr-only"
                  />
                  {cat}
                </label>
              ))}
            </div>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => setSelectedCategories(categories)}
                className="text-blue-600 hover:text-blue-800 font-medium underline text-sm"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-gray-600 hover:text-gray-800 font-medium underline text-sm"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="mb-8 w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Number of Questions
            </h3>
            <div className="flex items-center justify-center">
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="p-3 rounded-xl bg-white border border-gray-300 shadow-sm text-lg"
              >
                {[5, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value={availableQuestions.length}>
                  All ({availableQuestions.length})
                </option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              // initialize questions based on selected categories and count
              const filtered = originalQuestions.filter((q) =>
                selectedCategories.includes(q.category || ""),
              );
              const toUse = shuffle([...filtered])
                .slice(0, Math.max(1, Math.min(questionCount, filtered.length)))
                .map((q) => ({
                  ...q,
                  options: shuffleStrings([...q.options]),
                }));
              setQuestions(toUse);
              setCurrentQuestion(0);
              setScore(0);
              setTimeLeft(30);
              setTotalTime(0);
              setQuestionTimes([]);
              setQuizStarted(true);
            }}
            disabled={availableQuestions.length === 0}
            className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-5 px-10 rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center justify-center text-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${availableQuestions.length === 0 ? "opacity-50 cursor-not-allowed hover:transform-none" : ""}`}
          >
            <Zap className="mr-4" size={28} />
            Start Challenge
          </button>

          <p className="text-sm text-gray-500 mt-6">
            Test your knowledge across multiple categories • Use A-D keys during
            quiz
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
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePause}
                  className="text-sm bg-white bg-opacity-10 text-white px-3 py-1 rounded-full hover:bg-opacity-20"
                >
                  {paused ? "Resume" : "Pause"}
                </button>
                <button
                  onClick={saveProgress}
                  className="text-sm bg-white bg-opacity-10 text-white px-3 py-1 rounded-full hover:bg-opacity-20"
                >
                  Save
                </button>
                <button
                  onClick={loadProgress}
                  disabled={!hasSavedProgress}
                  className={`text-sm px-3 py-1 rounded-full ${hasSavedProgress ? "bg-white bg-opacity-10 text-white hover:bg-opacity-20" : "bg-white bg-opacity-5 text-white/60 cursor-not-allowed"}`}
                >
                  Load
                </button>
                <button
                  onClick={resetHighScore}
                  className="text-sm bg-white bg-opacity-10 text-white px-3 py-1 rounded-full hover:bg-opacity-20"
                >
                  Reset HS
                </button>
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
