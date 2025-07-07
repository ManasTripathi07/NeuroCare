import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTest } from "../.././../context/TestContext";

const targetWords = ["lemon", "key", "ball", "spoon", "book"];
const recognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
    ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
    : null;

const MemoryTest = ({ onNext }) => {
  const { addResult } = useTest();
  const [stage, setStage] = useState("presentation");
  const [spokenWords, setSpokenWords] = useState([]);
  const [listening, setListening] = useState(false);
  const [score, setScore] = useState(0);
  const capturedWords = useRef([]);

  useEffect(() => {
    if (!recognition) return;

    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const words = transcript.split(" ").map((word) => word.trim());
      capturedWords.current = words;
      setSpokenWords(words);
    };
  }, []);

  const startListening = () => {
    capturedWords.current = [];
    setSpokenWords([]);
    recognition.start();
  };

  const handleRecall = () => {
    const matched = targetWords.filter((word) => spokenWords.includes(word));
    const points = matched.length;
    setScore(points);
    setStage("done");

    addResult("Memory", points, {
      spokenWords,
      correctWords: targetWords,
    });
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-pure-greys-5 p-8 rounded-2xl shadow-xl space-y-8 border border-yellow-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-4xl font-bold text-yellow-500 font-edu-sa">2. Memory Test</h2>

      {stage === "presentation" && (
        <>
          <p className="text-lg text-richblack-600">Please remember these 5 words:</p>
          <ul className="flex flex-wrap justify-center gap-4 text-xl font-semibold text-blue-500">
            {targetWords.map((word) => (
              <li key={word} className="bg-yellow-25 px-4 py-2 rounded-xl shadow-sm">
                {word}
              </li>
            ))}
          </ul>
          <button
            className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 transition"
            onClick={() => setStage("recall")}
          >
            I’m Ready to Recall
          </button>
        </>
      )}

      {stage === "recall" && (
        <>
          <p className="text-richblack-600">Speak the words you remember:</p>
          <button
            onClick={startListening}
            className={`px-6 py-2 rounded-xl text-white font-medium transition shadow ${
              listening
                ? "bg-red-500 animate-pulse"
                : "bg-caribbeangreen-500 hover:bg-caribbeangreen-600"
            }`}
          >
            🎙 {listening ? "Listening..." : "Start Speaking"}
          </button>

          {spokenWords.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-richblack-400 mb-1">You said:</p>
              <div className="flex flex-wrap gap-2">
                {spokenWords.map((word, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      targetWords.includes(word)
                        ? "bg-caribbeangreen-100 text-caribbeangreen-700"
                        : "bg-richblack-100 text-richblack-400"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleRecall}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Submit Recall
          </button>
        </>
      )}

      {stage === "done" && (
        <div className="text-center">
          <p className="text-xl font-semibold text-caribbeangreen-600">
            ✅ Score: {score} / 5
          </p>
          <button
            onClick={onNext}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Continue to Fluency Test
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default MemoryTest;
