import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const emotions = [
  "Happiness",
  "Sadness",
  "Surprise",
  "Fear",
  "Anger",
  "Contempt"
];

const onlineImages = [
  { id: 1, src: "https://as2.ftcdn.net/jpg/00/49/22/63/1000_F_49226343_zrW0Mlu6hqxzgN2gUBwW8EGaHmD5GZU6.jpg", emotion: "Happiness" },
  { id: 2, src: "https://t3.ftcdn.net/jpg/00/48/88/36/360_F_48883681_3YSVqKeyIvDNGZ9t0A8ynIFaeo64sHDm.jpg", emotion: "Sadness" },
  { id: 3, src: "https://static.vecteezy.com/system/resources/thumbnails/047/832/357/small_2x/surprised-man-pointing-right-in-striped-shirt-free-png.png", emotion: "Surprise" },
  { id: 4, src: "https://img.freepik.com/free-photo/scared-young-woman-biting-fingernails-shivering-from-fear_176420-19465.jpg?semt=ais_items_boosted&w=740", emotion: "Fear" },
  { id: 5, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFo77b0R53JVWVPriCTWX2sTpS852_BZrdVA&s", emotion: "Anger" },
  { id: 6, src: "https://www.shutterstock.com/image-photo/young-beautiful-arrogant-moody-latin-600nw-574519522.jpg", emotion: "Contempt" }
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const EmotionRecognitionTest = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || showResult) return;

    const timer = setTimeout(() => {
      if (current < images.length) {
        if (selected === images[current].emotion) {
          setScore((s) => s + 1);
        }
        if (current < images.length - 1) {
          setCurrent((c) => c + 1);
          setSelected(null);
        } else {
          setShowResult(true);
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [current, selected, started, showResult]);

  const handleSelect = (emotion) => {
    if (!selected) setSelected(emotion);
  };

  const handleStart = () => {
    setImages(shuffleArray(onlineImages));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setStarted(true);
  };

  const handleStop = () => {
    setStarted(false);
    setShowResult(false);
    setImages([]);
    setCurrent(0);
    setSelected(null);
    setScore(0);
  };

  const handleReset = () => {
    handleStart();
  };

  return (
    <div className="min-h-screen bg-richblue-800 flex flex-col items-center justify-center text-white font-inter p-4">
      {!started && !showResult && (
        <div className="flex items-center flex-col gap-4">
          <p className="text-[45px] text-yellow-50 text-center font-bold">Emotion Recognition Test</p>
        <button
          onClick={handleStart}
          className="px-6 py-3 mb-6 text-lg bg-yellow-50 text-richblack-800 rounded-lg font-semibold shadow hover:bg-yellow-100 transition"
        >
          Start Test
        </button>
        </div>
      )}

      {started && !showResult && images.length > 0 && (
        <div className="w-full max-w-2xl p-6 rounded-2xl shadow-lg bg-richblack-700 space-y-6">
          <motion.img
            key={images[current].src}
            src={images[current].src}
            alt="emotion"
            className="w-full rounded-xl h-64 object-cover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />

          <div className="grid grid-cols-2 gap-4">
            {emotions.map((emo) => (
              <button
                key={emo}
                onClick={() => handleSelect(emo)}
                className={`rounded-xl px-4 py-2 text-sm font-bold border-2 transition-all duration-300
                  ${
                    selected === emo
                      ? "bg-caribbeangreen-200 border-caribbeangreen-300 text-richblack-900"
                      : "bg-richblue-600 hover:bg-caribbeangreen-100 border-richblue-200"
                  }`}
              >
                {emo}
              </button>
            ))}
          </div>

          <div className="text-xs text-pure-greys-50 text-center">
            {selected ? `You selected: ${selected}` : "Select the emotion shown above"}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleStop}
              className="flex items-center gap-2 px-5 py-2 bg-pink-200 text-richblack-900 rounded-xl font-bold hover:bg-pink-100 transition"
            >
              <RotateCcw size={18} /> Stop Test
            </button>
          </div>
        </div>
      )}

      {showResult && (
        <motion.div
          className="text-center bg-richblack-700 p-8 rounded-2xl shadow-xl space-y-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-caribbeangreen-100">Test Completed!</h2>
          <p className="text-lg">You got {score} out of {images.length} correct</p>
          <p className="text-sm text-richblue-100">Great job recognizing emotions!</p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-caribbeangreen-100 text-richblack-900 rounded-xl font-bold hover:bg-caribbeangreen-200 transition"
          >
            Restart Test
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default EmotionRecognitionTest;
