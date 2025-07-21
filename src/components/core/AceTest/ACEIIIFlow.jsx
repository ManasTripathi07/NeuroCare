import React, { useState } from "react";
import StartScreen from "./StartScreen";
import AttentionTest from "./AttentionTest";
import MemoryTest from "./MemoryTest";
import FluencyTest from "./FluencyTest";
import LanguageTest from "./LanguageTest";
import VisuospatialTest from "./VisuospatialTest";
import FinalReport from "./FinalReport";
import { useTest } from "../../../context/TestContext";

const ACEIIIFlow = () => {
  const { resetResults } = useTest();
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  const steps = [
    // <AttentionTest onNext={() => setStep(step + 1)} />,
    // <MemoryTest onNext={() => setStep(step + 1)} />,
    // <FluencyTest onNext={() => setStep(step + 1)} />,
    // <LanguageTest onNext={() => setStep(step + 1)} />,
    <VisuospatialTest onNext={() => setStep(step + 1)} />,
    <FinalReport
      onRestart={() => {
        setStep(0);
        setStarted(false);
        resetResults();
      }}
    />,
  ];

  const handleStart = () => {
    resetResults();
    setStarted(true);
    setStep(0);
  };

  const handleStop = () => {
    const confirmExit = window.confirm(
      "Are you sure you want to stop the test?"
    );
    if (confirmExit) {
      setStep(0);
      setStarted(false);
      resetResults();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-richblue-25 via-pure-greys-5 to-richblue-5 p-4">
      {!started ? (
        <StartScreen onStart={handleStart} />
      ) : (
        <>
          <div className="absolute top-4 right-4">
            <button
              onClick={handleStop}
              className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 shadow"
            >
              ⛔ Stop Test
            </button>
          </div>
          {steps[step]}
        </>
      )}
    </div>
  );
};

export default ACEIIIFlow;
