import React, { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { AiOutlineStop } from "react-icons/ai";
import { captureResult } from "../../../services/operations/resultAPI"

const TrailMakingTestB = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user?._id

  const [points, setPoints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [blinkIndex, setBlinkIndex] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const canvasRef = useRef(null);
  const pathRef = useRef([]);
  const intervalRef = useRef(null);

  const BUTTON_MIN_DISTANCE = 120;

  const isTooClose = (p1, p2) => {
    const dx = ((p1.x - p2.x) / 100) * 900;
    const dy = ((p1.y - p2.y) / 100) * 600;
    return Math.sqrt(dx * dx + dy * dy) < BUTTON_MIN_DISTANCE;
  };

  const generateTrailData = () => {
    setHasStarted(true);
    const tempPoints = [];
    for (let i = 1; i <= 8; i++) {
      tempPoints.push(`${i}`);
      tempPoints.push(String.fromCharCode(64 + i));
    }

    const placedPoints = [];

    while (placedPoints.length < 16) {
      const label = tempPoints[placedPoints.length];
      const candidate = {
        label,
        x: Math.random() * 75 + 10,
        y: Math.random() * 75 + 10,
      };

      const hasConflict = placedPoints.some((p) => isTooClose(p, candidate));
      if (!hasConflict) {
        placedPoints.push(candidate);
      }
    }

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    setPoints(placedPoints);
    setCurrentIndex(0);
    setMistakes(0);
    setEndTime(null);
    setStartTime(Date.now());
    setTimer(0);
    setBlinkIndex(null);
    pathRef.current = [];
    clearCanvas();
  };

  const stopTest = () => {
    clearInterval(intervalRef.current);
    setHasStarted(false);
    setPoints([]);
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setMistakes(0);
    setTimer(0);
    setBlinkIndex(null);
    pathRef.current = [];
    clearCanvas();
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect( () => {
  if (endTime && startTime && userId) {
    const totalTime = ((endTime - startTime) / 1000).toFixed(2)

    const resultPayload = {
      category: "Trail Test", // or use category ObjectId if required
      subcategory : "Trail Test B",
      user: userId,
      mistakes: mistakes,
      timeTaken: Number(totalTime),
    }

     captureResult(resultPayload)
      .then(() => {
        console.log("Result captured successfully for Trail Test B")
      })
      .catch((err) => {
        console.error("Failed to capture result for Trail Test B", err)
      })
  }
}, [endTime])


  const handleClick = (index) => {
    if (index !== getExpectedIndex()) {
      setMistakes((prev) => prev + 1);
      const correctIndex = getExpectedIndex();
      setBlinkIndex(correctIndex);
      setTimeout(() => setBlinkIndex(null), 600);
      return;
    }

    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = points[index];
    const canvasX = (x / 100) * canvasRef.current.width;
    const canvasY = (y / 100) * canvasRef.current.height;

    if (pathRef.current.length > 0) {
      const { x: prevX, y: prevY } = pathRef.current[pathRef.current.length - 1];
      ctx.strokeStyle = "#06D6A0";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(canvasX, canvasY);
      ctx.stroke();
    }

    pathRef.current.push({ x: canvasX, y: canvasY });
    setCurrentIndex((prev) => prev + 1);

    if (currentIndex + 1 === 16) {
      clearInterval(intervalRef.current);
      setEndTime(Date.now());
    }
  };

  const getExpectedIndex = () => {
    const sequence = [];
    for (let i = 1; i <= 8; i++) {
      sequence.push(`${i}`);
      sequence.push(String.fromCharCode(64 + i));
    }
    return points.findIndex((pt) => pt.label === sequence[currentIndex]);
  };

  const getTime = () => {
    if (!startTime || !endTime) return null;
    return ((endTime - startTime) / 1000).toFixed(2);
  };

  return (
    <div className="w-full min-h-screen bg-[#1A1A2E] flex flex-col items-center justify-center px-4 py-10 font-inter">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.6s linear;
        }
      `}</style>

      {/* Header + Start Button */}
      <div className="w-full max-w-[900px] flex flex-col items-center">
        <h1 className="text-yellow-50 text-4xl font-bold mb-6 font-edu-sa text-center">
          Trail Test B
        </h1>

        {!hasStarted && (
          <button
            onClick={generateTrailData}
            className="mb-6 px-6 py-3 text-xl bg-yellow-50 text-richblack-800 rounded-lg font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            Start Test
          </button>
        )}
      </div>

      {/* Timer, Reset, and Stop */}
      {hasStarted && !endTime && (
        <div className="flex items-center justify-between w-full max-w-[900px] mb-4 px-2 text-lg">
          <div className="text-caribbeangreen-100 font-semibold">
            Time: {timer}s | Mistakes:{" "}
            <span className="text-pink-200">{mistakes}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={generateTrailData}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-richblack-800 rounded-md font-semibold shadow hover:bg-yellow-100 transition-all"
            >
              <RotateCcw size={20} /> Reset Test
            </button>
            <button
              onClick={stopTest}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-richblack-900 rounded-md font-semibold shadow hover:bg-pink-100 transition-all"
            >
              <AiOutlineStop size={20} /> Stop Test
            </button>
          </div>
        </div>
      )}

      {/* Game Board */}
      {hasStarted && !endTime && (
        <div className="relative w-[900px] h-[600px] bg-richblack-700 rounded-2xl shadow-2xl border-2 border-richblack-100">
          <canvas
            ref={canvasRef}
            width={900}
            height={600}
            className="absolute top-0 left-0 z-0"
          />
          {points.map((pt, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`absolute z-10 w-20 h-20 text-2xl rounded-full text-black font-bold flex items-center justify-center font-mono shadow-lg transition-all hover:scale-105
                ${blinkIndex === idx ? "animate-blink bg-pink-200" : "bg-caribbeangreen-100"}`}
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {pt.label}
            </button>
          ))}
        </div>
      )}

      {/* Test Completed */}
      {endTime && (
        <div className="mt-10 text-pure-greys-5 font-inter flex flex-col items-center gap-4 text-center animate-fadeIn">
          <p className="text-2xl font-bold">Test Completed!</p>
          <p className="text-xl">
            Time Taken:{" "}
            <span className="text-caribbeangreen-100 font-bold">{getTime()}s</span>
          </p>
          <p className="text-xl">
            Mistakes:{" "}
            <span className="text-pink-200 font-bold">{mistakes}</span>
          </p>
          <button
            onClick={generateTrailData}
            className="flex items-center gap-2 mt-2 px-6 py-3 text-lg bg-yellow-50 text-richblack-800 rounded-lg font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            <RotateCcw size={20} /> Restart Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TrailMakingTestB;

