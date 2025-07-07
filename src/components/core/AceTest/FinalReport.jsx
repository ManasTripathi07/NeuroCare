import React from "react";
import { motion } from "framer-motion";
import { useTest } from "../.././../context/TestContext";

const FinalReport = ({ onRestart }) => {
  const { results } = useTest();
  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-pure-greys-5 p-8 rounded-2xl shadow-xl space-y-10 border border-richblue-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-center text-richblue-700 font-edu-sa">
        🧾 Final ACE-III Report
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {results.map(({ testName, score, details }) => (
          <div
            key={testName}
            className="bg-richblue-25 p-5 rounded-xl border border-richblue-100 shadow-md"
          >
            <h3 className="text-xl font-semibold text-richblack-700 mb-2 font-inter">
              {testName} Test
            </h3>
            <p className="text-caribbeangreen-600 font-bold text-lg">Score: {score}</p>
            {details && (
              <div className="mt-2 text-sm text-richblack-600 space-y-1">
                {Object.entries(details).map(([k, v], i) => (
                  <div key={i}>
                    <span className="font-medium">{k}:</span>{" "}
                    <span className="italic">
                      {Array.isArray(v)
                        ? v.join(", ")
                        : typeof v === "object"
                        ? JSON.stringify(v)
                        : v}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold text-blue-600">
          🧠 Total Score: {totalScore} / 100
        </h3>
        <button
          onClick={onRestart}
          className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition-all duration-300 text-lg shadow-md"
        >
          🔁 Restart ACE-III Test
        </button>
      </motion.div>
    </motion.div>
  );
};

export default FinalReport;
