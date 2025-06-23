import React, { useState,useEffect } from "react";
import axios from "axios";
import "./TrailTest.css";

const TrailTest = () => {
  const originalSequence = [1, 2, 3, 4, 5, 6, 7, 8];
  const [trailSequence, setTrailSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [errorIndex, setErrorIndex] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [positions, setPositions] = useState([]);
  const [blinkIndex, setBlinkIndex] = useState(null);

  const NAVBAR_HEIGHT = 80; // Approximate height of the navbar

  // Helper to generate random non-overlapping positions within screen limits
  const generateNonOverlappingPositions = (count, width = 60, height = 60, padding = 10) => {
    const positions = [];
    let tries = 0;
    while (positions.length < count && tries < 2000) {
      const top = Math.random() * (window.innerHeight - height - padding - NAVBAR_HEIGHT) + NAVBAR_HEIGHT;
      const left = Math.random() * (window.innerWidth - width - padding);
      const overlap = positions.some(pos => {
        return Math.abs(pos.top - top) < height + padding && Math.abs(pos.left - left) < width + padding;
      });
      if (!overlap) {
        positions.push({ top, left });
      }
      tries++;
    }
    return positions;
  };

  useEffect(() => {
    setTrailSequence([...originalSequence]);
    const newPositions = generateNonOverlappingPositions(originalSequence.length);
    setPositions(newPositions);
  }, []);

  const handleClick = (num, idx) => {
    if (currentIndex === 0 && !startTime) {
      setStartTime(Date.now());
    }

    if (originalSequence[currentIndex] === num) {
      setClickedIndices([...clickedIndices, idx]);
      setCurrentIndex((prev) => prev + 1);
      setErrorIndex(null);
      setBlinkIndex(null); // remove blink when answer is correct
    } else {
      setErrorIndex(idx);
      setTimeout(() => {
        setErrorIndex(null);
        setBlinkIndex(originalSequence[currentIndex]);
      }, 500);
    }
  };

  useEffect(() => {
    if (currentIndex === originalSequence.length && originalSequence.length > 0) {
      const endTime = Date.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(2);
      alert(`Test Completed in ${totalTime} seconds!`);

      axios.post("/api/trail-test/submit", {
        timeTaken: totalTime,
      })
      .then((res) => console.log("Time submitted successfully"))
      .catch((err) => console.error("Failed to submit time", err));
    }
  }, [currentIndex]);

  return (
    <div className="trail-container-relative">
      {trailSequence.map((num, idx) => {
        let className = "trail-item";
        const seqIndex = originalSequence.indexOf(num);
        if (seqIndex === 0 && currentIndex === 0) className += " start";
        if (clickedIndices.includes(idx)) className += " correct";
        if (idx === errorIndex) className += " wrong";
        if (num === blinkIndex) className += " next";

        const style = positions[idx] ? {
          position: "absolute",
          top: `${positions[idx].top}px`,
          left: `${positions[idx].left}px`
        } : {};

        return (
          <div
            key={idx}
            className={className}
            style={style}
            onClick={() => handleClick(num, idx)}
          >
            {num}
          </div>
        );
      })}
    </div>
  );
};

export default TrailTest;
