"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const increment = (amount: number) => setCount(count + amount);
  const decrement = (amount: number) => setCount(Math.max(0, count - amount));
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
        <h1 className="text-5xl font-bold text-white mb-8 text-center tracking-tight">
          Counter App
        </h1>

        {/* Display */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 mb-8 shadow-lg">
          <p className="text-white/80 text-sm uppercase tracking-widest mb-2 text-center">
            Current Value
          </p>
          <h2 className="text-7xl font-bold text-white text-center transition-all duration-300">
            {count}
          </h2>
        </div>

        {/* Main Controls */}
        <div className="flex gap-4 mb-6">
          <button
            className="flex-1 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={() => decrement(1)}
            disabled={count === 0}
          >
            − Decrement
          </button>
          <button
            className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            onClick={() => increment(1)}
          >
            + Increment
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <button
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => decrement(5)}
            disabled={count === 0}
          >
            −5
          </button>
          <button
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => decrement(10)}
            disabled={count === 0}
          >
            −10
          </button>
          <button
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm font-medium"
            onClick={() => increment(10)}
          >
            +10
          </button>
          <button
            className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm font-medium"
            onClick={() => increment(5)}
          >
            +5
          </button>
        </div>

        {/* Reset Button */}
        <button
          className="w-full px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={reset}
          disabled={count === 0}
        >
          Reset to Zero
        </button>
      </div>
    </div>
  );
}
