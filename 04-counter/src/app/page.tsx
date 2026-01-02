"use client";

import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("counter-value");
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Save to localStorage whenever count changes
  useEffect(() => {
    localStorage.setItem("counter-value", count.toString());
  }, [count]);

  // Play sound effect
  const playSound = useCallback((frequency: number, duration: number = 200) => {
    if (typeof window !== "undefined") {
      try {
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + duration / 1000
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
      } catch (error) {
        // Silently fail if Web Audio API is not supported
      }
    }
  }, []);

  const increment = useCallback(
    (amount: number) => {
      setCount((prev) => {
        const newCount = prev + amount;
        setHistory((h) => [...h.slice(-9), prev]); // Keep last 10 values
        return newCount;
      });
      setIsAnimating(true);
      playSound(800, 150);
      setTimeout(() => setIsAnimating(false), 300);
    },
    [playSound]
  );

  const decrement = useCallback(
    (amount: number) => {
      setCount((prev) => {
        const newCount = Math.max(0, prev - amount);
        if (newCount !== prev) {
          setHistory((h) => [...h.slice(-9), prev]);
        }
        return newCount;
      });
      setIsAnimating(true);
      playSound(600, 150);
      setTimeout(() => setIsAnimating(false), 300);
    },
    [playSound]
  );

  const reset = useCallback(() => {
    if (count > 0) {
      setHistory((h) => [...h.slice(-9), count]);
      setCount(0);
      playSound(400, 300);
    }
  }, [count, playSound]);

  const undo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.length > 0) {
        const lastValue = currentHistory[currentHistory.length - 1];
        setCount(lastValue);
        playSound(500, 200);
        return currentHistory.slice(0, -1);
      }
      return currentHistory;
    });
  }, [playSound]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return; // Don't trigger if typing in input

      switch (event.key) {
        case "ArrowUp":
        case "+":
        case "=":
          event.preventDefault();
          increment(step);
          break;
        case "ArrowDown":
        case "-":
          event.preventDefault();
          decrement(step);
          break;
        case " ":
          event.preventDefault();
          reset();
          break;
        case "u":
        case "U":
          event.preventDefault();
          undo();
          break;
        case "r":
        case "R":
          event.preventDefault();
          reset();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [increment, decrement, reset, undo, step]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-6 text-center tracking-tight">
          Counter App
        </h1>

        {/* Display */}
        <div className="bg-purple-600 rounded-2xl p-6 mb-6 shadow-lg">
          <p className="text-white/80 text-sm uppercase tracking-widest mb-2 text-center">
            Current Value
          </p>
          <h2
            className={`text-6xl font-bold text-white text-center transition-all duration-300 ${
              isAnimating ? "scale-110" : ""
            }`}
          >
            {count}
          </h2>
        </div>

        {/* Step Control */}
        <div className="mb-6">
          <label className="block text-white/80 text-sm mb-2 text-center">
            Step Size: {step}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>1</span>
            <span>100</span>
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex gap-3 mb-4">
          <button
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={() => decrement(step)}
            disabled={count === 0}
            title={`Decrement by ${step} (↓ or -)`}
          >
            −{step}
          </button>
          <button
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            onClick={() => increment(step)}
            title={`Increment by ${step} (↑ or +)`}
          >
            +{step}
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[1, 5, 10, 25].map((amount) => (
            <button
              key={`dec-${amount}`}
              className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => decrement(amount)}
              disabled={count === 0}
              title={`Decrement by ${amount}`}
            >
              −{amount}
            </button>
          ))}
          {[25, 10, 5, 1].map((amount) => (
            <button
              key={`inc-${amount}`}
              className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm font-medium"
              onClick={() => increment(amount)}
              title={`Increment by ${amount}`}
            >
              +{amount}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={undo}
            disabled={history.length === 0}
            title="Undo last action (U)"
          >
            Undo
          </button>
          <button
            className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={reset}
            disabled={count === 0}
            title="Reset to zero (Space or R)"
          >
            Reset
          </button>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="text-xs text-white/60 text-center space-y-1">
          <p>
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">↑</kbd> /{" "}
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">+</kbd>{" "}
            Increment
          </p>
          <p>
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">↓</kbd> /{" "}
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">-</kbd>{" "}
            Decrement
          </p>
          <p>
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">Space</kbd>{" "}
            / <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">R</kbd>{" "}
            Reset
          </p>
          <p>
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-xs">U</kbd>{" "}
            Undo
          </p>
        </div>
      </div>
    </div>
  );
}
