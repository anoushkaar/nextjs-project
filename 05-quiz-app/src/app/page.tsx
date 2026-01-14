"use client";

import { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const originalQuestions: Question[] = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
    answer: "Da Vinci",
  },
  {
    question: "What is the square root of 16?",
    options: ["2", "4", "6", "8"],
    answer: "4",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: "H2O",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
    answer: "Shakespeare",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Leopard", "Tiger"],
    answer: "Cheetah",
  },
];

function shuffle(array: Question[]): Question[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setQuestions(
      shuffle([...originalQuestions]).map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      }))
    );
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResults && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults && !answered) {
      setAnswered(true);
      setFeedback(
        "Time's up! Correct answer: " + questions[currentQuestion]?.answer
      );
    }
  }, [
    timeLeft,
    currentQuestion,
    showResults,
    questions.length,
    answered,
    questions,
  ]);

  const handleAnswer = (selected: string) => {
    const isCorrect = selected === questions[currentQuestion]?.answer;
    if (isCorrect) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(
        "Wrong! Correct answer: " + questions[currentQuestion]?.answer
      );
    }
    setAnswered(true);
  };

  const nextQuestion = () => {
    setAnswered(false);
    setFeedback("");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setQuestions(
      shuffle([...originalQuestions]).map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      }))
    );
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(30);
    setFeedback("");
    setAnswered(false);
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Quiz Completed!</h1>
        <p className="text-xl mb-4">
          Your score: {score} / {questions.length}
        </p>
        <button
          onClick={restartQuiz}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Restart Quiz
        </button>
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Quiz App</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-2">Time left: {timeLeft}s</p>
        <p className="text-lg font-bold text-center mb-2">{feedback}</p>
        <h2 className="text-xl mb-4">{q.question}</h2>
        <div className="space-y-2">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
}
