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
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 w-full max-w-2xl text-center p-10 transform hover:scale-[1.02] transition-all duration-500 border border-white/20 ring-1 ring-white/30">
          <div className="mb-8">
            <div
              className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full mb-6 shadow-2xl shadow-orange-500/30 animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <Trophy className="text-white drop-shadow-lg" size={48} />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight">
              🧠 Brain Blitz
            </h1>
            <p className="text-gray-600 text-xl font-medium">
              Challenge your knowledge & beat your high score!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1">
              <Target
                className="text-white mx-auto mb-3 group-hover:scale-110 transition-transform"
                size={32}
              />
              <p className="text-2xl font-bold text-white">
                {availableQuestions.length}
              </p>
              <p className="text-blue-100 text-sm">Questions</p>
            </div>
            <div className="group bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
              <Clock
                className="text-white mx-auto mb-3 group-hover:scale-110 transition-transform"
                size={32}
              />
              <p className="text-2xl font-bold text-white">30s</p>
              <p className="text-emerald-100 text-sm">Per Question</p>
            </div>
          </div>

          <div className="flex items-center justify-center mb-8 p-5 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-2xl shadow-lg shadow-amber-400/30 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Star
              className="text-white mr-3 animate-spin"
              style={{ animationDuration: "3s" }}
              size={28}
            />
            <span className="text-2xl font-bold text-white drop-shadow-sm">
              🏆 High Score: {highScore}
            </span>
          </div>

          <div className="mb-8 w-full">
            <h3 className="text-lg font-bold text-gray-700 mb-4 text-center flex items-center justify-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></span>
              📚 Select Categories
              <span className="w-8 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></span>
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-6">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className={`flex items-center justify-center p-3 rounded-xl cursor-pointer text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategories.includes(cat)
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md"
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
            className={`group w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 px-10 rounded-2xl transition-all duration-300 flex items-center justify-center text-xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden ${availableQuestions.length === 0 ? "opacity-50 cursor-not-allowed hover:transform-none hover:scale-100" : ""}`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <Zap
              className="mr-3 group-hover:rotate-12 transition-transform"
              size={28}
            />
            🚀 Start Challenge
          </button>

          <p className="text-sm text-gray-400 mt-6 flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Test your knowledge • Use{" "}
            <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">
              A-D
            </kbd>{" "}
            keys during quiz
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
    const isNewHighScore = score >= highScore && score > 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Celebration background */}
        <div className="absolute inset-0 overflow-hidden">
          {isNewHighScore && (
            <>
              <div
                className="absolute top-20 left-10 text-6xl animate-bounce"
                style={{ animationDelay: "0s" }}
              >
                🎉
              </div>
              <div
                className="absolute top-40 right-20 text-5xl animate-bounce"
                style={{ animationDelay: "0.3s" }}
              >
                🌟
              </div>
              <div
                className="absolute bottom-32 left-20 text-4xl animate-bounce"
                style={{ animationDelay: "0.6s" }}
              >
                🎊
              </div>
              <div
                className="absolute bottom-20 right-10 text-6xl animate-bounce"
                style={{ animationDelay: "0.9s" }}
              >
                🏆
              </div>
            </>
          )}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-lg text-center transform hover:scale-[1.02] transition-all duration-500 border border-white/20">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-full mb-4 shadow-2xl shadow-orange-500/30 animate-pulse">
              <Award className="text-white drop-shadow-lg" size={40} />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
              {isNewHighScore ? "🎉 New High Score!" : "Quiz Complete!"}
            </h1>
            <p className="text-gray-500 font-medium">
              {accuracy >= 80
                ? "Outstanding performance! 🌟"
                : accuracy >= 60
                  ? "Great job! Keep it up! 💪"
                  : "Good effort! Practice makes perfect! 📚"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="group bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Trophy
                className="text-white/90 mx-auto mb-2 group-hover:scale-110 transition-transform"
                size={28}
              />
              <p className="text-3xl font-bold text-white">
                {score}/{questions.length}
              </p>
              <p className="text-blue-100 text-sm">Score</p>
            </div>
            <div className="group bg-gradient-to-br from-emerald-500 to-teal-600 p-5 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <TrendingUp
                className="text-white/90 mx-auto mb-2 group-hover:scale-110 transition-transform"
                size={28}
              />
              <p className="text-3xl font-bold text-white">{accuracy}%</p>
              <p className="text-emerald-100 text-sm">Accuracy</p>
            </div>
            <div className="group bg-gradient-to-br from-violet-500 to-purple-600 p-5 rounded-2xl shadow-lg shadow-violet-500/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Clock
                className="text-white/90 mx-auto mb-2 group-hover:scale-110 transition-transform"
                size={28}
              />
              <p className="text-3xl font-bold text-white">
                {Math.floor(totalTime / 60)}:
                {(totalTime % 60).toString().padStart(2, "0")}
              </p>
              <p className="text-violet-100 text-sm">Total Time</p>
            </div>
            <div className="group bg-gradient-to-br from-orange-500 to-red-500 p-5 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Zap
                className="text-white/90 mx-auto mb-2 group-hover:scale-110 transition-transform"
                size={28}
              />
              <p className="text-3xl font-bold text-white">{maxStreak}</p>
              <p className="text-orange-100 text-sm">Best Streak</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-5 rounded-2xl mb-6 shadow-lg shadow-amber-400/30">
            <Star
              className="text-white mx-auto mb-2 animate-spin"
              style={{ animationDuration: "3s" }}
              size={24}
            />
            <p className="text-xl font-bold text-white">
              🏆 High Score: {highScore}
            </p>
            <p className="text-amber-100 text-sm">
              ⏱️ Avg. time per question: {averageTime}s
            </p>
          </div>

          <button
            onClick={restartQuiz}
            className="group w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center text-xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <RotateCcw
              className="mr-3 group-hover:rotate-180 transition-transform duration-500"
              size={24}
            />
            🔄 Play Again
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
  const timerPercentage = (timeLeft / 30) * 100;
  const isLowTime = timeLeft <= 10;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 mb-6 shadow-2xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-3 shadow-lg shadow-amber-500/30">
                <Trophy className="text-white" size={22} />
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wide">
                  Score
                </p>
                <p className="text-white text-2xl font-bold">{score}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white/60 text-xs uppercase tracking-wide">
                  Streak
                </p>
                <p className="text-white text-2xl font-bold flex items-center justify-end">
                  {streak}
                  {streak >= 3 && <span className="ml-1">🔥</span>}
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-3 shadow-lg shadow-orange-500/30">
                <Zap className="text-white" size={22} />
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={togglePause}
                  className="text-xs font-medium bg-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                >
                  {paused ? "▶️ Resume" : "⏸️ Pause"}
                </button>
                <button
                  onClick={saveProgress}
                  className="text-xs font-medium bg-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all border border-white/10"
                >
                  💾
                </button>
                <button
                  onClick={loadProgress}
                  disabled={!hasSavedProgress}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all border border-white/10 ${hasSavedProgress ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/5 text-white/40 cursor-not-allowed"}`}
                >
                  📂
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {/* Circular Timer */}
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke={isLowTime ? "#ef4444" : "#a855f7"}
                    strokeWidth="3"
                    strokeDasharray={`${timerPercentage} 100`}
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ${isLowTime ? "animate-pulse" : ""}`}
                  />
                </svg>
                <span
                  className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${isLowTime ? "text-red-400" : "text-white"}`}
                >
                  {timeLeft}
                </span>
              </div>
              <p
                className={`text-sm font-medium ${isLowTime ? "text-red-400 animate-pulse" : "text-white/70"}`}
              >
                {isLowTime ? "⚡ Hurry!" : "seconds"}
              </p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-xl">
              <p className="text-white text-sm font-semibold">
                Q {currentQuestion + 1}{" "}
                <span className="text-white/50">of</span> {questions.length}
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div
          className={`bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl transition-all duration-500 border border-white/20 ${isAnimating ? "scale-[1.02] shadow-purple-500/20" : ""}`}
        >
          {q.category && (
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-lg shadow-purple-500/20">
              <Target size={14} className="mr-2" />
              {q.category}
            </div>
          )}

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
            {q.question}
          </h2>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-6 p-5 rounded-2xl transition-all duration-300 animate-in slide-in-from-top ${
                feedback.includes("Correct")
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30"
                  : "bg-gradient-to-r from-red-500 to-rose-500 shadow-lg shadow-red-500/30"
              }`}
            >
              <div className="flex items-center">
                {feedback.includes("Correct") ? (
                  <CheckCircle
                    className="text-white mr-3 flex-shrink-0"
                    size={28}
                  />
                ) : (
                  <XCircle
                    className="text-white mr-3 flex-shrink-0"
                    size={28}
                  />
                )}
                <p className="font-bold text-white text-lg">
                  {feedback.includes("Correct") ? "✨ " : ""}
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
                className={`group w-full p-5 rounded-2xl transition-all duration-300 text-left font-semibold flex items-center ${
                  answered
                    ? option === q.answer
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30 scale-[1.02]"
                      : option === selectedAnswer
                        ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-xl shadow-red-500/30"
                        : "bg-gray-100 text-gray-400"
                    : "bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transform hover:scale-[1.02] hover:-translate-y-0.5"
                } disabled:cursor-not-allowed`}
              >
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-bold text-sm mr-4 flex-shrink-0 transition-all ${
                    answered
                      ? option === q.answer
                        ? "bg-white/20 text-white"
                        : option === selectedAnswer
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-400"
                      : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white group-hover:scale-110 shadow-lg"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {answered && option === q.answer && (
                  <CheckCircle className="text-white ml-2" size={24} />
                )}
                {answered &&
                  option === selectedAnswer &&
                  option !== q.answer && (
                    <XCircle className="text-white ml-2" size={24} />
                  )}
              </button>
            ))}
          </div>

          {/* Hint Button */}
          {!answered && hintsUsed < 1 && (
            <button
              onClick={hint}
              className="group w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-white py-4 px-6 rounded-2xl hover:from-amber-500 hover:via-yellow-500 hover:to-orange-500 transition-all duration-300 flex items-center justify-center font-bold shadow-xl shadow-amber-500/30 hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-0.5 mb-4 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <Lightbulb
                className="mr-3 group-hover:rotate-12 transition-transform"
                size={22}
              />
              💡 Use Hint (Remove 1 wrong option)
            </button>
          )}

          {/* Explanation */}
          {answered && q.explanation && (
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-5 rounded-2xl mb-4 border-l-4 border-purple-400 shadow-inner">
              <p className="text-purple-800 font-bold mb-2 flex items-center">
                <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2 text-white text-xs">
                  i
                </span>
                Did you know?
              </p>
              <p className="text-purple-700">{q.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <button
              onClick={nextQuestion}
              className="group w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center text-xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-[1.02] hover:-translate-y-0.5 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              {currentQuestion < questions.length - 1
                ? "➡️ Next Question"
                : "🏆 View Results"}
              <TrendingUp
                className="ml-3 group-hover:translate-x-1 transition-transform"
                size={24}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
