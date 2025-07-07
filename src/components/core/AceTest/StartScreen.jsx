import React from "react";
import { motion } from "framer-motion";

const StartScreen = ({ onStart }) => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen bg-richblue-900 text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-yellow-50 mb-6 font-edu-sa drop-shadow">
        🧠 Welcome to ACE-III Cognitive Assessment
      </h1>

      <p className="max-w-xl text-lg text-blue-25 mb-8 font-inter leading-relaxed">
        This test evaluates your Attention, Memory, Fluency, Language, and Visuospatial abilities.
        Please click the button below to begin.
      </p>

      <button
        onClick={onStart}
        className="bg-caribbeangreen-500 hover:bg-caribbeangreen-600 text-white px-8 py-3 rounded-2xl text-xl shadow-lg transition"
      >
        🚀 Start Test
      </button>
    </motion.div>
  );
};

export default StartScreen;
