import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTest } from "../.././../context/TestContext";


const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const questions = [
  { id: "day", question: "What day is it today?", answer: days[new Date().getDay()], score: 1 },
  { id: "month", question: "What month is it?", answer: new Date().toLocaleString('default', { month: 'long' }).toLowerCase(), score: 1 },
  { id: "year", question: "What year is it?", answer: new Date().getFullYear().toString(), score: 1 },
  { id: "place", question: "What place are you in?", answer: "hospital", score: 1 },
  { id: "city", question: "What city are you in?", answer: "jaipur", score: 1 }, // customize
];



const serial7s = [100, 93, 86, 79, 72, 65];
const digitSpanAnswer = "2574";

const AttentionTest = ({ onNext }) => {
  const { addResult } = useTest();
  const [answers, setAnswers] = useState({});
  const [serialInput, setSerialInput] = useState("");
  const [digitInput, setDigitInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    let total = 0;

    // Orientation scoring
    questions.forEach(({ id, answer, score }) => {
      const userAnswer = (answers[id] || "").toLowerCase().trim();
      const correct = typeof answer === "function" ? answer() : answer.toString().toLowerCase();
      if (userAnswer === correct) total += score;
      else console.log("wrong answer" ,answer);
    });
    console.log("score adter 1" , total);

    // Serial 7s scoring
    console.log("Serial INput", serialInput);
    const serialParts = serialInput.split(" ");
    console.log("serial Parts" , serialParts);
    let serialScore = 0;
    for (let i = 0; i < Math.min(serialParts.length, serial7s.length); i++) {
      if (serialParts[i] === serial7s[i].toString()) serialScore++;
       else console.log("wrong answer" ,serialParts[i]);
    }
    total += serialScore;

    console.log("score adter 2" , total);

    // Digit span backward scoring
    if (digitInput.trim() === digitSpanAnswer) {
      total += 3;
    }
    console.log("score adter 3" , total);

    setScore(total);
    console.log("score adter 4" , score);
    addResult("Attention", total, {
      orientationAnswers: answers,
      serial7s: serialInput,
      digitSpan: digitInput,
    });
    setSubmitted(true);
  };

  useEffect(()=> {
  console.log(new Date().getDay().toString());
   console.log(new Date().getMonth().toString());
    console.log(new Date().getFullYear().toString());

},[])

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-pure-greys-5 p-6 rounded-2xl shadow-lg space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <h2 className="text-3xl font-bold text-richblue-700">1. Attention Test</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-richblack-700">A. Orientation (5 pts)</h3>
        {questions.map((q) => (
          <div key={q.id}>
            <label className="block text-richblack-600">{q.question}</label>
            <input
              type="text"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-richblack-100 rounded-lg"
              disabled={submitted}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-richblack-700">B. Serial 7s (5 pts)</h3>
        <p className="text-richblack-600">Start at 100 and keep subtracting 7 (e.g., 100, 93, ...)</p>
        <input
          type="text"
          value={serialInput}
         onChange={(e) => {
  console.log(e.target.value);
  setSerialInput(e.target.value);
  console.log("searil input" , serialInput); // <-- this is required
}}
          className="w-full px-4 py-2 border border-richblack-100 rounded-lg"
          placeholder="Enter space-separated numbers"
          disabled={submitted}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-richblack-700">C. Digit Span Backward (3 pts)</h3>
        <p className="text-richblack-600">Please type this backward: 4 7 5 2</p>
        <input
          type="text"
          value={digitInput}
          onChange={(e) => setDigitInput(e.target.value)}
          className="w-full px-4 py-2 border border-richblack-100 rounded-lg"
          placeholder="Example: 2574"
          disabled={submitted}
        />
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="bg-caribbeangreen-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-caribbeangreen-700 transition"
        >
          Submit Attention Test
        </button>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-caribbeangreen-700">✅ Score: {score} / 13</p>
          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Continue to Memory Test
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default AttentionTest;
