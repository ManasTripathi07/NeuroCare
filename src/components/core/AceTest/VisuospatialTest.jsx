// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useTest } from "../.././../context/TestContext";

// const VisuospatialTest = ({ onNext }) => {
//   const { addResult } = useTest();
//   const canvasRef = useRef(null);
//   const [clockChoice, setClockChoice] = useState("");
//   const [pentagonMatch, setPentagonMatch] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);

//   const drawCubeTemplate = () => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.clearRect(0, 0, 300, 300);
//     ctx.strokeStyle = "#334155"; // slate-700
//     ctx.lineWidth = 2;
//     ctx.strokeRect(50, 50, 100, 100);
//     ctx.strokeRect(90, 90, 100, 100);
//     ctx.beginPath();
//     ctx.moveTo(50, 50); ctx.lineTo(90, 90);
//     ctx.moveTo(150, 50); ctx.lineTo(190, 90);
//     ctx.moveTo(50, 150); ctx.lineTo(90, 190);
//     ctx.moveTo(150, 150); ctx.lineTo(190, 190);
//     ctx.stroke();
//   };

//   const handleSubmit = () => {
//     let points = 0;
//     if (clockChoice === "10:55") points += 5;
//     if (pentagonMatch === "correct") points += 5;
//     points += 6;
//     setScore(points);
//     setSubmitted(true);
//     addResult("Visuospatial", points, {
//       clock: clockChoice,
//       pentagon: pentagonMatch,
//     });
//   };

//   return (
//     <motion.div
//       className="max-w-3xl mx-auto bg-blue-25 p-6 rounded-2xl shadow-xl space-y-8 font-inter"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="text-3xl font-bold text-richblue-800 font-edu-sa">5. Visuospatial Test</h2>

//       {/* A. Cube Drawing */}
//       <section>
//         <h3 className="text-xl font-semibold text-caribbeangreen-800 mb-1">A. Cube Drawing (6 pts)</h3>
//         <p className="text-richblack-600 mb-2">
//           Visually inspect the cube or draw it on paper. Click "Draw Cube" to view the template.
//         </p>
//         <canvas
//           ref={canvasRef}
//           width={300}
//           height={300}
//           className="border-2 border-richblack-100 rounded-lg bg-yellow-50 shadow-md"
//         />
//         <button
//           onClick={drawCubeTemplate}
//           className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1.5 rounded-xl shadow"
//         >
//           🧊 Draw Cube
//         </button>
//         <p className="text-sm text-richblack-400 mt-1">Scoring is simulated.</p>
//       </section>

//       {/* B. Clock Drawing */}
//       <section>
//         <h3 className="text-xl font-semibold text-caribbeangreen-800 mt-6 mb-1">B. Clock Drawing (5 pts)</h3>
//         <p className="text-richblack-600">Which clock shows “10 past 11”?</p>
//         <div className="grid grid-cols-2 gap-4 mt-3">
//           {["11:10", "2:30", "10:00", "10:55"].map((time) => (
//             <label
//               key={time}
//               className={`flex items-center gap-3 p-3 rounded-xl border transition cursor-pointer ${
//                 clockChoice === time
//                   ? "bg-caribbeangreen-100 border-caribbeangreen-500"
//                   : "bg-white border-richblack-100"
//               }`}
//             >
//               <input
//                 type="radio"
//                 value={time}
//                 checked={clockChoice === time}
//                 onChange={(e) => setClockChoice(e.target.value)}
//               />
//               <span className="font-medium">{time}</span>
//             </label>
//           ))}
//         </div>
//       </section>

//       {/* C. Pentagon Matching */}
//       <section>
//         <h3 className="text-xl font-semibold text-caribbeangreen-800 mt-6 mb-1">C. Recognize the Shape (5 pts)</h3>
//         <p className="text-richblack-600">Which image correctly shows a pentagon?</p>
//         <div className="flex gap-6 mt-4 flex-wrap justify-center">
//           <label className="flex flex-col items-center gap-2">
//             <img
//                src="https://www.mathsisfun.com/geometry/images/pentagon-regular-hdr.png"
//               className="w-32 h-32 border-2 border-richblack-100 rounded-xl"
//             />
//             <input
//               type="radio"
//               value="correct"
//               checked={pentagonMatch === "correct"}
//               onChange={(e) => setPentagonMatch(e.target.value)}
//             />
//           </label>

//           <label className="flex flex-col items-center gap-2">
//             <img
//               src="https://uploads-us-west-2.insided.com/figma-en/attachment/305d7f0bf372509c08222b6c7636550d7da789d0.png"
//               alt="Incorrect pentagons"
//               className="w-32 h-32 border-2 border-richblack-100 rounded-xl"
//             />
//             <input
//               type="radio"
//               value="incorrect"
//               checked={pentagonMatch === "incorrect"}
//               onChange={(e) => setPentagonMatch(e.target.value)}
//             />
//           </label>
//         </div>
//       </section>

//       {!submitted ? (
//         <button
//           onClick={handleSubmit}
//           className="mt-6 bg-caribbeangreen-500 hover:bg-caribbeangreen-600 text-white px-6 py-2 rounded-xl shadow transition"
//         >
//           Submit Visuospatial Test
//         </button>
//       ) : (
//         <div className="text-center">
//           <p className="text-xl font-semibold text-caribbeangreen-700">✅ Score: {score} / 16</p>
//           <button
//             onClick={onNext}
//             className="mt-4 bg-richblue-600 text-white px-6 py-2 rounded-xl hover:bg-richblue-700 transition"
//           >
//             View Final Report
//           </button>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default VisuospatialTest;


import React, { useState } from "react";
import { motion } from "framer-motion";

const VisuospatialTest = () => {
  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  const [result, setResult] = useState(null);

  const rotateHand = (type, direction) => {
    if (type === "hour") {
      setHourAngle((prev) => (prev + direction * 30 + 360) % 360);
    } else {
      setMinuteAngle((prev) => (prev + direction * 6 + 360) % 360);
    }
  };

  const checkTime = () => {
    const expectedHour = 300; // 11 * 30
    const expectedMinute = 180; // 55 * 6

    const hourDiff = Math.abs(hourAngle - expectedHour);
    const minuteDiff = Math.abs(minuteAngle - expectedMinute);

    const hourCorrect = hourDiff <= 15 || hourDiff >= 345;
    const minuteCorrect = minuteDiff <= 6 || minuteDiff >= 354;

    if (hourCorrect && minuteCorrect) {
      setResult("✅ Correct! You set the clock to 10:30 PM.");
    } else {
      setResult("❌ Incorrect. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Clock Drawing Task - Set Time to 10:30 PM</h1>

      {/* Clock Face */}
      <div className="relative w-64 h-64 bg-white rounded-full border-4 border-black shadow-md flex items-center justify-center">
        {/* Clock Numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30;
          const radius = 110;
          const x = 128 + radius * Math.sin((angle * Math.PI) / 180);
          const y = 128 - radius * Math.cos((angle * Math.PI) / 180);
          return (
            <span
              key={i}
              className="absolute text-sm font-semibold"
              style={{ left: `${x}px`, top: `${y}px`, transform: "translate(-50%, -50%)" }}
            >
              {i + 1}
            </span>
          );
        })}

        {/* Minute Hand */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-1 h-20 bg-black origin-bottom"
          animate={{ rotate: minuteAngle }}
          transition={{ type: "spring", stiffness: 100 }}
        />


        {/* Hour Hand */}
        <motion.div
          className="absolute bottom-1/2 left-1/2 w-1 h-16 bg-black origin-bottom"
          animate={{ rotate: hourAngle }}
          transition={{ type: "spring", stiffness: 100 }}
        />

        {/* Center Dot */}
        <div className="absolute w-4 h-4 bg-black rounded-full z-10"></div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <p className="font-medium mb-2">Hour Hand</p>
          <div className="flex gap-2">
            <button
              onClick={() => rotateHand("hour", -1)}
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              ⟲
            </button>
            <button
              onClick={() => rotateHand("hour", 1)}
              className="px-3 py-1 bg-indigo-600 text-white rounded"
            >
              ⟳
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-medium mb-2">Minute Hand</p>
          <div className="flex gap-2">
            <button
              onClick={() => rotateHand("minute", -1)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              ⟲
            </button>
            <button
              onClick={() => rotateHand("minute", 1)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              ⟳
            </button>
          </div>
        </div>
        <button
          onClick={checkTime}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded shadow"
        >
          Submit Answer
        </button>
        {result && (
          <p className={`text-lg font-medium ${result.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
            {result}
          </p>
        )}
      </div>
    </div>
  );
};

export default VisuospatialTest;




