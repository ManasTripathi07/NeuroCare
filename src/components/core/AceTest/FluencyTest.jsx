import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTest } from "../../../context/TestContext";
import { captureResult } from "../../../services/operations/resultAPI";

const letter = "F";
const durationInSeconds = 30;

const FluencyTest = ({ onNext }) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const { addResult } = useTest();

  const [listening, setListening] = useState(false);
  const [spokenWords, setSpokenWords] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [allSpokenWords, setAllSpokenWords] = useState([]);
  const [timer, setTimer] = useState(durationInSeconds);
  const [done, setDone] = useState(false);

  const intervalRef = useRef(null);
  const recognitionRef = useRef(null);
  const validWords = useRef(new Set());
  const hasAddedResult = useRef(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) return;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
      const words = transcript.split(" ").map((w) => w.trim()).filter((w) => w.length > 1);

      const valid = [];
      const invalid = [];

      words.forEach((word) => {
        if (word.startsWith(letter.toLowerCase())) {
          validWords.current.add(word);
          valid.push(word);
        } else {
          invalid.push(word);
        }
      });

      setSpokenWords(Array.from(validWords.current));
      setAllSpokenWords((prev) => [...prev, ...words]);
      setMistakes((prev) => [...prev, ...invalid]);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }, []);

  const startFluencyTest = () => {
    if (!recognitionRef.current) return;

    validWords.current.clear();
    setSpokenWords([]);
    setMistakes([]);
    setAllSpokenWords([]);
    setDone(false);
    hasAddedResult.current = false;
    setStartTime(Date.now());

    setTimer(durationInSeconds);
    setListening(true);
    recognitionRef.current.start();

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          stopTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTest = () => {
    recognitionRef.current?.stop();
    setListening(false);
    setDone(true);
  };

  useEffect(() => {
    if (done && !hasAddedResult.current) {
      const score = spokenWords.length;
      const endTime = Date.now();
      const timeTaken = startTime ? Math.floor((endTime - startTime) / 1000) : durationInSeconds;

      addResult("Fluency", score, {
        letter,
        words: spokenWords,
        mistakes: mistakes,
      });

      const result = {
        score,
        timeTaken,
        user: userId,
        category: "Ace Test",
        subcategory: "Fluency Test",
        mistakes: mistakes.length,
      };

      captureResult(result);
      hasAddedResult.current = true;
    }
  }, [done, spokenWords, startTime, addResult, mistakes, userId]);

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-pure-greys-5 p-8 rounded-2xl shadow-xl space-y-8 border border-pink-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-pink-600 font-edu-sa">3. Fluency Test</h2>

      {!done && (
        <>
          <p className="text-richblack-700 font-inter text-lg">
            Say as many words as you can that begin with the letter:{" "}
            <span className="font-bold text-pink-500 text-xl">{letter}</span>
          </p>
          <p className="text-richblack-400 text-sm">(No proper nouns or repeated word forms)</p>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={startFluencyTest}
              disabled={listening}
              className={`${
                listening ? "bg-yellow-500" : "bg-pink-500"
              } text-white px-6 py-2 rounded-xl shadow-md hover:bg-pink-600 transition duration-300`}
            >
              {listening ? "🎙️ Listening..." : "▶️ Start Speaking"}
            </button>
            <span className="text-xl font-mono text-blue-700">⏱️ {timer}s</span>
          </div>

          {spokenWords.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-richblack-500 mb-1">Captured words:</p>
              <div className="flex flex-wrap gap-2">
                {spokenWords.map((word, idx) => (
                  <span
                    key={idx}
                    className="bg-richblue-25 text-richblue-700 px-3 py-1 rounded-full text-sm shadow-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {done && (
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-2xl font-semibold text-caribbeangreen-600">
            ✅ Score: {spokenWords.length} / 14
          </p>

          {mistakes.length > 0 && (
            <div>
              <p className="text-md font-medium text-red-600">❌ Mistakes (invalid words):</p>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {mistakes.map((word, idx) => (
                  <span
                    key={idx}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm shadow-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onNext}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300 shadow"
          >
            Continue to Language Test
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FluencyTest;
