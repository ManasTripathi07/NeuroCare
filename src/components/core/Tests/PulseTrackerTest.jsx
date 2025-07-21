import React, { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { AiOutlineStop } from "react-icons/ai";
import { captureResult } from "../../../services/operations/resultAPI";


const PulseTrackerTest = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const [circle, setCircle] = useState(null);
  const [score, setScore] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [repeats, setRepeats] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [endTime, setEndTime] = useState(null);

  const intervalRef = useRef(null);
  const circleTimerRef = useRef(null);
  const tapWindowRef = useRef(null);
  const tappedWithinTime = useRef(false);

  // Random position on board
  const getRandomPosition = () => ({
    x: Math.random() * 75 + 10,
    y: Math.random() * 75 + 10,
  });

  // Random 50% color
  const getRandomColor = () => (Math.random() < 0.5 ? "white" : "red");

  const spawnCircle = () => {
    const newCircle = { ...getRandomPosition(), color: getRandomColor() };
    setCircle(newCircle);
    setClickCount(0);
    tappedWithinTime.current = false;

    // Remove circle if not tapped in 5s
    clearTimeout(tapWindowRef.current);
    tapWindowRef.current = setTimeout(() => {
      if (!tappedWithinTime.current) setCircle(null);
    }, 5000);

    // After 10s, count repeat taps and spawn next circle
    clearTimeout(circleTimerRef.current);
    circleTimerRef.current = setTimeout(() => {
      if (clickCount > 1) setRepeats((r) => r + 1);
      spawnCircle();
    }, 10000);
  };

  const startTest = () => {
    setHasStarted(true);
    setScore(0);
    setPenalty(0);
    setRepeats(0);
    setEndTime(null);
    setTimer(0);
    spawnCircle();

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
  };

  const stopTest = () => {

    const result = {
      category : "Pulse Test",
      user : userId,
      score : score,
      mistakes : penalty,
      timeTaken : timer,
    }

    captureResult(result);
    setHasStarted(false);
    setCircle(null);
    clearInterval(intervalRef.current);
    clearTimeout(circleTimerRef.current);
    clearTimeout(tapWindowRef.current);
    setEndTime(Date.now());
  };

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    tappedWithinTime.current = true;

    if (circle?.color === "white") setScore((s) => s + 1);
    else setPenalty((p) => p + 1);

    setCircle(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center px-4 py-10 font-inter">
      {/* Custom animation */}
      <style>
        {`
          @keyframes pulse-ring {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.6; }
          }
          .animate-pulse-ring {
            animation: pulse-ring 1.2s infinite ease-in-out;
          }
        `}
      </style>

      {/* Heading + Start Button */}
      {!hasStarted && !endTime && (
        <div className="w-full max-w-[900px] flex flex-col items-center">
          <h1 className="text-yellow-50 text-4xl font-bold mb-6 text-center">
            Pulse Tracker Test
          </h1>
          <button
            onClick={startTest}
            className="mb-6 px-6 py-3 text-xl bg-yellow-50 text-black rounded-lg font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            Start Test
          </button>
        </div>
      )}

      {/* Game UI */}
      {hasStarted && !endTime && (
        <>
          {/* Timer & Controls */}
          <div className="flex items-center justify-between w-full max-w-[900px] mb-4 px-2 text-lg">
            <div className="text-cyan-300 font-semibold">
              ⏱️ Time: {timer}s | ✅ Score:{" "}
              <span className="text-green-400">{score}</span> | ❌ Penalty:{" "}
              <span className="text-red-400">{penalty}</span> | 🔁 Repeats:{" "}
              <span className="text-yellow-300">{repeats}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={startTest}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-black rounded-md font-semibold shadow hover:bg-yellow-100 transition-all"
              >
                <RotateCcw size={20} /> Reset
              </button>
              <button
                onClick={stopTest}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md font-semibold shadow hover:bg-red-600 transition-all"
              >
                <AiOutlineStop size={20} /> Stop
              </button>
            </div>
          </div>

          {/* Game Board */}
          <div className="relative w-[900px] h-[600px] bg-[#1b1f2a] rounded-2xl shadow-inner border border-gray-600 overflow-hidden">
            {circle && (
              <button
                onClick={handleClick}
                className={`absolute w-24 h-24 rounded-full animate-pulse-ring transition-all duration-300 hover:scale-110
                  ${
                    circle.color === "white"
                      ? "bg-white shadow-[0_0_30px_6px_rgba(255,255,255,0.7)]"
                      : "bg-red-500 shadow-[0_0_30px_6px_rgba(255,0,0,0.7)]"
                  }`}
                style={{
                  top: `${circle.y}%`,
                  left: `${circle.x}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>
        </>
      )}

      {/* Test Complete */}
      {endTime && !hasStarted && (
        <div className="mt-10 text-white text-center flex flex-col items-center gap-4 animate-fadeIn">
          <p className="text-2xl font-bold">Test Completed!</p>
          <p className="text-lg">
            ✅ Score: <span className="text-green-400">{score}</span>
          </p>
          <p className="text-lg">
            ❌ Penalty: <span className="text-red-400">{penalty}</span>
          </p>
          <p className="text-lg">
            🔁 Repeats: <span className="text-yellow-300">{repeats}</span>
          </p>
          <p className="text-lg">
            ⏱️ Duration: <span className="text-cyan-300">{timer}s</span>
          </p>
          <button
            onClick={startTest}
            className="mt-4 px-6 py-3 text-lg bg-yellow-50 text-black rounded-lg font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            Restart Test
          </button>
        </div>
      )}
    </div>
  );
};

export default PulseTrackerTest;
