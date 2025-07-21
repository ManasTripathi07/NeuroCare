import React, { useState, useEffect, useRef } from "react"
import "./TrailTest.css"
import { getTrailTestHistory, submitTrailTestTime } from "../../../services/operations/trailTestApi"


const TrailTest = () => {
  const originalSequence = [1, 2, 3, 4, 5, 6, 7, 8]
  const [trailSequence, setTrailSequence] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [clickedIndices, setClickedIndices] = useState([])
  const [errorIndex, setErrorIndex] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [positions, setPositions] = useState([])
  const [blinkIndex, setBlinkIndex] = useState(null)
  const [showStartScreen, setShowStartScreen] = useState(true)
  const [finalTime, setFinalTime] = useState(null)
  const [timer, setTimer] = useState(0)

  const containerRef = useRef(null)
  const timerRef = useRef(null)
  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user?._id

  const generateNonOverlappingPositions = (
    count,
    containerWidth,
    containerHeight,
    itemWidth = 60,
    itemHeight = 60,
    padding = 10
  ) => {
    const positions = []
    let tries = 0
    while (positions.length < count && tries < 3000) {
      const top = Math.max(
        padding,
        Math.random() * (containerHeight - itemHeight - padding)
      )
      const left = Math.max(
        padding,
        Math.random() * (containerWidth - itemWidth - padding)
      )

      const overlap = positions.some(
        (pos) =>
          Math.abs(pos.top - top) < itemHeight + padding &&
          Math.abs(pos.left - left) < itemWidth + padding
      )

      if (!overlap) {
        positions.push({ top, left })
      }
      tries++
    }
    return positions
  }

  const initializePositions = () => {
    requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const newPositions = generateNonOverlappingPositions(
        originalSequence.length,
        rect.width,
        rect.height
      )
      setPositions(newPositions)
    })
  }

  const startTest = () => {
    setTrailSequence([...originalSequence])
    setClickedIndices([])
    setCurrentIndex(0)
    setErrorIndex(null)
    setBlinkIndex(null)
    setStartTime(Date.now())
    setFinalTime(null)
    setTimer(0)
    setShowStartScreen(false)

    initializePositions()
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
  }

  const resetTest = () => {
    setTrailSequence([...originalSequence])
    setClickedIndices([])
    setCurrentIndex(0)
    setErrorIndex(null)
    setBlinkIndex(null)
    setStartTime(Date.now())
    setFinalTime(null)
    setTimer(0)
    setShowStartScreen(false)

    clearInterval(timerRef.current)
    initializePositions()
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
  }

  const handleClick = (num, idx) => {
    if (originalSequence[currentIndex] === num) {
      setClickedIndices((prev) => [...prev, idx])
      setCurrentIndex((prev) => prev + 1)
      setErrorIndex(null)
      setBlinkIndex(null)
    } else {
      setErrorIndex(idx)
      setTimeout(() => {
        setErrorIndex(null)
        setBlinkIndex(originalSequence[currentIndex])
      }, 500)
    }
  }

  useEffect(() => {
    if (
      currentIndex === originalSequence.length &&
      originalSequence.length > 0
    ) {
      const endTime = Date.now()
      const totalTime = ((endTime - startTime) / 1000).toFixed(2)
      setFinalTime(totalTime)
      clearInterval(timerRef.current)

      if (userId) {
        submitTrailTestTime(userId, totalTime).catch((err) =>
          console.error("Failed to submit time", err)
        )
      }
    }
  }, [currentIndex])

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="w-full min-h-screen bg-[#1A1A2E] flex flex-col items-center justify-start py-10 font-inter px-4">
      {/* Timer and Reset */}
      {!showStartScreen && finalTime === null && (
        <div className="flex justify-between items-center w-full max-w-[900px] mb-4 px-2 text-lg">
          <div className="text-caribbeangreen-100 font-semibold">Time: {timer}s</div>
          <button
            onClick={resetTest}
            className="px-4 py-2 bg-yellow-50 text-richblack-800 rounded-md font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            Reset Test
          </button>
        </div>
      )}

      {/* Start Test Screen */}
      {showStartScreen && (
        <div className="flex flex-col items-center  justify-center mt-[227px]">
          <h1 className="text-yellow-50 text-4xl font-bold mb-6">Trail Test A</h1>
          <button
            onClick={startTest}
            className="px-6 py-3 text-xl bg-yellow-50 text-richblack-800 rounded-lg font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            Start Test
          </button>
        </div>
      )}

      {/* Test Completed */}
      {finalTime && (
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-2xl font-bold text-pure-greys-5">Test Completed!</p>
          <p className="text-xl text-caribbeangreen-100 font-semibold">
            Time Taken: {finalTime}s
          </p>
          <button
            onClick={resetTest}
            className="mt-2 px-6 py-3 text-lg bg-yellow-50 text-richblack-800 rounded-lg font-semibold shadow hover:bg-yellow-100 transition-all"
          >
            Restart Test
          </button>
        </div>
      )}

      {/* Game Window */}
      {!showStartScreen && finalTime === null && (
        <div
          ref={containerRef}
          className="relative w-[900px] h-[600px] bg-richblack-700 rounded-2xl shadow-2xl border-2 border-richblack-100"
        >
          {trailSequence.map((num, idx) => {
            let className = "trail-item"
            const seqIndex = originalSequence.indexOf(num)
            if (seqIndex === 0 && currentIndex === 0) className += " start"
            if (clickedIndices.includes(idx)) className += " correct"
            if (idx === errorIndex) className += " wrong"
            if (num === blinkIndex) className += " next"

            const style = positions[idx]
              ? {
                  position: "absolute",
                  top: `${positions[idx].top}px`,
                  left: `${positions[idx].left}px`,
                }
              : {}

            return (
              <div
                key={idx}
                className={className}
                style={style}
                onClick={() => handleClick(num, idx)}
              >
                {num}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TrailTest
