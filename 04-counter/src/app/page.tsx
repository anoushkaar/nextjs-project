"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Counter</h1>
      <h2 className="text-2xl">Value: {count}</h2>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-slate-400 transition"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-slate-400 transition"
          onClick={() => setCount(count > 0 ? count - 1 : 0)} // if count is 0, do not decrement if greater than 0, decrement
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
