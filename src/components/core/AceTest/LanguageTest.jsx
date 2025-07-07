import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTest } from "../.././../context/TestContext";

const namingImages = [
  { src: "https://cdn-icons-png.flaticon.com/512/69/69524.png", answer: "pen" },
  { src: "https://cdn-icons-png.flaticon.com/512/2769/2769299.png", answer: "watch" },
];

const complexPhrase = "no ifs, ands, or buts";

const LanguageTest = ({ onNext }) => {
  const { addResult } = useTest();
  const [listening, setListening] = useState(false);
  const [spoken, setSpoken] = useState({});
  const [repetitionText, setRepetitionText] = useState("");
  const [writtenSentence, setWrittenSentence] = useState("");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) return;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (!spoken.currentTask) return;

      setSpoken((prev) => ({
        ...prev,
        [spoken.currentTask]: transcript,
      }));
    };
  }, []);

  const startListening = (task) => {
    if (!recognitionRef.current) return;
    spoken.currentTask = task;
    recognitionRef.current.start();
  };

  const handleSubmit = () => {
    let points = 0;

    namingImages.forEach(({ answer }, i) => {
      if ((spoken[`naming${i}`] || "").includes(answer)) points += 2;
    });

    if (spoken.repetition === complexPhrase) points += 2;

    if ((spoken.command || "").includes("raise") && (spoken.command || "").includes("touch")) points += 3;

    points += 1;

    if (writtenSentence.split(" ").length >= 4) points += 1;

    setScore(points);
    setDone(true);

    addResult("Language", points, {
      spoken,
      writtenSentence,
    });
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-pure-greys-5 p-8 rounded-2xl shadow-xl space-y-10 border border-yellow-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold text-yellow-500 font-edu-sa">
        4. Language Test
      </h2>

      {/* A. Naming */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-richblack-700">A. Naming (4 pts)</h3>
        <p className="text-richblack-500 mb-3">Name the object shown:</p>
        <div className="grid grid-cols-2 gap-6">
          {namingImages.map((img, idx) => (
            <div key={idx} className="text-center space-y-3 bg-yellow-25 p-4 rounded-xl border shadow-sm">
              <img src={img.src} alt="object" className="w-20 h-20 mx-auto" />
              <button
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
                onClick={() => startListening(`naming${idx}`)}
              >
                🎙 Speak
              </button>
              {spoken[`naming${idx}`] && (
                <p className="text-sm text-richblack-500 italic">
                  You said: {spoken[`naming${idx}`]}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* B. Repetition */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-richblack-700">B. Repetition (2 pts)</h3>
        <p className="text-richblack-500">
          Repeat: <span className="italic text-richblack-800">"{complexPhrase}"</span>
        </p>
        <button
          className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
          onClick={() => startListening("repetition")}
        >
          🎙 Speak
        </button>
        {spoken.repetition && (
          <p className="text-sm text-richblack-500 italic">You said: {spoken.repetition}</p>
        )}
      </section>

      {/* C. Comprehension */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-richblack-700">C. Comprehension (3 pts)</h3>
        <p className="text-richblack-500">
          Follow the command: <span className="italic">"Raise your hand, then touch your nose."</span>
        </p>
        <button
          className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
          onClick={() => startListening("command")}
        >
          🎙 Confirm You Followed
        </button>
        {spoken.command && (
          <p className="text-sm text-richblack-500 italic">You said: {spoken.command}</p>
        )}
      </section>

      {/* D. Reading */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-richblack-700">D. Reading (1 pt)</h3>
        <p className="text-richblack-500">
          Read this sentence aloud:{" "}
          <span className="font-serif text-richblack-600">"Close your eyes."</span>
        </p>
        <p className="text-sm italic text-richblack-300">(Assumed correct)</p>
      </section>

      {/* E. Writing */}
      <section>
        <h3 className="text-xl font-semibold mb-2 text-richblack-700">E. Writing (1 pt)</h3>
        <p className="text-richblack-500">Write a meaningful sentence:</p>
        <textarea
          rows={2}
          className="w-full border border-richblue-100 p-2 rounded-lg bg-white text-richblack-700"
          placeholder="I am feeling great today."
          value={writtenSentence}
          onChange={(e) => setWrittenSentence(e.target.value)}
        />
      </section>

      {!done ? (
        <button
          onClick={handleSubmit}
          className="bg-caribbeangreen-500 text-white px-6 py-2 rounded-xl shadow hover:bg-caribbeangreen-600 transition"
        >
          ✅ Submit Language Test
        </button>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold text-caribbeangreen-600">
            ✅ Score: {score} / 26
          </p>
          <button
            onClick={onNext}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Continue to Visuospatial Test
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default LanguageTest;
