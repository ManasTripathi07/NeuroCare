// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";

// const TrailMakingTest = () => {
//   const totalNumbers = 25;
//   const [numbers, setNumbers] = useState([]);
//   const [wrongcount, setWrongcount] = useState(0);
//   const [current, setCurrent] = useState(1);
//   const [score, setScore] = useState(0);
//   const [blink, setBlink] = useState(null);
//   const [time, setTime] = useState(0);
//   const [completed, setCompleted] = useState(false);
//   const timerRef = useRef(null);
//   const audioRef = useRef(new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"));

//   const generatePositions = () => {
//     const minDistance = 90;
//     const positions = [];
//     while (positions.length < totalNumbers) {
//       const candidate = {
//         num: positions.length + 1,
//         top: Math.random() * 80 + 5,
//         left: Math.random() * 80 + 5,
//       };

//       const isFarEnough = positions.every((pos) => {
//         const dx = (pos.left - candidate.left) * window.innerWidth / 100;
//         const dy = (pos.top - candidate.top) * window.innerHeight / 100;
//         return Math.sqrt(dx * dx + dy * dy) >= minDistance;
//       });

//       if (isFarEnough) {
//         positions.push(candidate);
//       }
//     }
//     return positions;
//   };

//   const resetTest = () => {
//     setCurrent(1);
//     setScore(0);
//     setCompleted(false);
//     setTime(0);
//     setWrongcount(0);
//     setNumbers(generatePositions());
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setTime((prev) => prev + 1);
//     }, 1000);
//   };

//   useEffect(() => {
//     setNumbers(generatePositions());
//     timerRef.current = setInterval(() => {
//       setTime((prev) => prev + 1);
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, []);

//   const handleClick = (num) => {
//     if (num === current) {
//       audioRef.current.play();
//       setScore((prev) => prev + 1);
//       setCurrent((prev) => prev + 1);
//       setNumbers((prev) => prev.filter((item) => item.num !== num));
//       if (num === totalNumbers) {
//         clearInterval(timerRef.current);
//         setCompleted(true);
//       }
//     } else {
//       setBlink(current);
//       setTimeout(() => setBlink(null), 600);
//       setWrongcount((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-richblue-800 p-6 font-inter">
//       <style>{`
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         .animate-blink {
//           animation: blink 0.6s linear infinite;
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out;
//         }
//       `}</style>

//       <h1 className="text-4xl font-bold text-center mb-6 text-yellow-50 animate-pulse">
//         🧠 Trail Making Test
//       </h1>
//       <div className="flex justify-center gap-10 mb-6 text-xl text-white">
//         <p>
//           Score: <span className="font-bold text-caribbeangreen-100">{score}</span>
//         </p>
//         <p>
//           Time: <span className="font-bold text-caribbeangreen-100">{time}s</span>
//         </p>
//         <p>
//           Incorrect Taps: <span className="font-bold text-pink-200">{wrongcount}</span>
//         </p>
//         <button
//           onClick={resetTest}
//           className="px-4 py-2 bg-yellow-100 text-richblue-900 rounded-md hover:bg-yellow-200 transition-all"
//         >
//           Reset
//         </button>
//       </div>

//       <div className="relative w-full h-[80vh] border border-richblack-200 rounded-xl bg-white shadow-inner overflow-hidden">
//         {numbers.map(({ num, top, left }) => (
//           <motion.button
//             key={num}
//             onClick={() => handleClick(num)}
//             className={`absolute w-16 h-16 rounded-full text-white text-lg font-bold flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 
//               ${blink === num ? "bg-pink-500 animate-blink" : "bg-gradient-to-tr from-caribbeangreen-200 to-blue-200 hover:from-caribbeangreen-300 hover:to-blue-300"}`}
//             style={{ top: `${top}%`, left: `${left}%` }}
//             whileTap={{ scale: 0.9 }}
//           >
//             {num}
//           </motion.button>
//         ))}
//         {completed && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-caribbeangreen-100 bg-opacity-90 text-center animate-fadeIn">
//             <p className="text-3xl font-bold text-richblue-900 mb-3">🎉 Test Completed!</p>
//             <p className="text-2xl text-richblue-700">Final Score: {score}</p>
//             <p className="text-xl text-richblue-600">Time Taken: {time} seconds</p>
//             <p className="text-xl text-richblue-600">Total Incorrect Taps: {wrongcount}</p>
//             <button
//               onClick={resetTest}
//               className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all"
//             >
//               Restart Test
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrailMakingTest;


// import React, { useState, useEffect, useRef } from "react";

// const TrailMakingTest = () => {
//   const totalNumbers = 10;
//   const [positions, setPositions] = useState([]);
//   const [path, setPath] = useState([]);
//   const [startDrawing, setStartDrawing] = useState(false);
//   const [current, setCurrent] = useState(1);
//   const [time, setTime] = useState(0);
//   const [wrongAttempts, setWrongAttempts] = useState(0);
//   const [correctionsFollowed, setCorrectionsFollowed] = useState(true);
//   const [completed, setCompleted] = useState(false);
//   const timerRef = useRef(null);

//   const generatePositions = () => {
//     const minDistance = 100;
//     const generated = [];
//     while (generated.length < totalNumbers) {
//       const candidate = {
//         num: generated.length + 1,
//         top: Math.random() * 80 + 5,
//         left: Math.random() * 80 + 5,
//       };
//       const isFarEnough = generated.every(pos => {
//         const dx = (pos.left - candidate.left) * window.innerWidth / 100;
//         const dy = (pos.top - candidate.top) * window.innerHeight / 100;
//         return Math.sqrt(dx * dx + dy * dy) >= minDistance;
//       });
//       if (isFarEnough) generated.push(candidate);
//     }
//     return generated;
//   };

//   useEffect(() => {
//     setPositions(generatePositions());
//     timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
//     return () => clearInterval(timerRef.current);
//   }, []);

//   const handleMouseDown = () => {
//     setStartDrawing(true);
//   };

//   const handleMouseUp = () => {
//     setStartDrawing(false);
//     if (current > totalNumbers) {
//       clearInterval(timerRef.current);
//       setCompleted(true);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!startDrawing || completed) return;
//     const x = e.clientX;
//     const y = e.clientY;
//     positions.forEach(pos => {
//       const btn = document.getElementById(`node-${pos.num}`);
//       if (btn) {
//         const rect = btn.getBoundingClientRect();
//         const cx = rect.left + rect.width / 2;
//         const cy = rect.top + rect.height / 2;
//         const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
//         if (distance < 30 && !path.includes(pos.num)) {
//           if (pos.num === current) {
//             setPath(p => [...p, pos.num]);
//             setCurrent(c => c + 1);
//             setCorrectionsFollowed(true);
//           } else {
//             setWrongAttempts(w => w + 1);
//             setCorrectionsFollowed(false);
//           }
//         }
//       }
//     });
//   };

//   return (
//     <div
//       className="min-h-screen bg-richblue-800 text-white font-inter p-6"
//       onMouseDown={handleMouseDown}
//       onMouseUp={handleMouseUp}
//       onMouseMove={handleMouseMove}
//     >
//       <style>{`
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         .animate-blink {
//           animation: blink 0.6s linear infinite;
//         }
//       `}</style>

//       <h1 className="text-3xl text-yellow-50 font-bold text-center mb-6">
//         ✍️ Trail Making Test A
//       </h1>
//       <div className="flex justify-center gap-8 mb-6 text-lg">
//         <span>Time: <span className="text-yellow-50 font-bold">{time}s</span></span>
//         <span>Incorrect Paths: <span className="text-pink-200 font-bold">{wrongAttempts}</span></span>
//         <span>Correction Followed: <span className="font-bold text-caribbeangreen-100">{correctionsFollowed ? "Yes" : "No"}</span></span>
//       </div>

//       <div className="relative w-full h-[80vh] bg-white rounded-xl border border-richblack-200">
//         {positions.map(({ num, top, left }) => (
//           <div
//             key={num}
//             id={`node-${num}`}
//             className={`absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
//               ${path.includes(num) ? "bg-caribbeangreen-200" : "bg-pink-400 animate-pulse"}`}
//             style={{ top: `${top}%`, left: `${left}%` }}
//           >
//             {num}
//           </div>
//         ))}

//         {completed && (
//           <div className="absolute inset-0 flex flex-col items-center justify-center bg-caribbeangreen-100 bg-opacity-90 text-center">
//             <p className="text-2xl text-richblue-900 font-bold mb-2">✅ Test Completed!</p>
//             <p className="text-xl text-richblue-800">Total Time: {time}s</p>
//             <p className="text-xl text-richblue-700">Mistakes: {wrongAttempts}</p>
//             <p className="text-xl text-richblue-600">Followed Corrections: {correctionsFollowed ? "Yes" : "No"}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TrailMakingTest;

import React, { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const TrailMakingTest = () => {
  const [points, setPoints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [timer, setTimer] = useState(0);
  const [blinkIndex, setBlinkIndex] = useState(null);
  const canvasRef = useRef(null);
  const pathRef = useRef([]);
  const intervalRef = useRef(null);

  const BUTTON_MIN_DISTANCE = 70;

  const isTooClose = (p1, p2) => {
    const dx = ((p1.x - p2.x) / 100) * 600;
    const dy = ((p1.y - p2.y) / 100) * 600;
    return Math.sqrt(dx * dx + dy * dy) < BUTTON_MIN_DISTANCE;
  };

  const generateTrailData = () => {
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

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => {
    generateTrailData();
    return () => clearInterval(intervalRef.current);
  }, []);

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
      ctx.lineWidth = 4;
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
    <div className="w-full min-h-screen bg-richblue-900 flex flex-col items-center justify-center px-4 py-10 font-inter">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.6s linear;
        }
      `}</style>

      <h1 className="text-yellow-50 text-3xl font-bold mb-2 font-edu-sa text-center">
        Trail Making Test B
      </h1>

      <div className="flex items-center justify-between w-full max-w-[640px] mb-4 px-2">
        {!endTime && (
          <div className="text-lg text-caribbeangreen-100 font-semibold">
            Time: {timer}s | Incorrect Taps: <span className="text-pink-200">{mistakes}</span>
          </div>
        )}
        {!endTime && (
          <button
            onClick={generateTrailData}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-richblack-800 rounded-md font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            <RotateCcw size={18} /> Reset Test
          </button>
        )}
      </div>

      {!endTime && (
        <div className="relative w-[600px] h-[600px] bg-richblack-700 rounded-xl shadow-lg border border-richblack-200">
          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            className="absolute top-0 left-0 z-0"
          />
          {points.map((pt, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`absolute z-10 w-14 h-14 rounded-full text-black text-lg font-bold flex items-center justify-center font-mono shadow-md transition-all hover:scale-110
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

      {endTime && (
        <div className="mt-8 text-pure-greys-5 font-inter flex flex-col items-center gap-3 text-center animate-fadeIn">
          <p className="text-lg">Test Completed!</p>
          <p>
            Time Taken: <span className="text-caribbeangreen-100 font-bold">{getTime()}s</span>
          </p>
          <p>
            Mistakes: <span className="text-pink-200 font-bold">{mistakes}</span>
          </p>
          <button
            onClick={generateTrailData}
            className="flex items-center gap-2 mt-2 px-5 py-2 bg-yellow-50 text-richblack-800 rounded-md font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            <RotateCcw size={18} /> Restart Test
          </button>
        </div>
      )}
    </div>
  );
};

export default TrailMakingTest;




