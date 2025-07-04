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
  const [userScores, setUserScores] = useState([])

  const containerRef = useRef(null)
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
    while (positions.length < count && tries < 2000) {
      const top = Math.random() * (containerHeight - itemHeight - padding)
      const left = Math.random() * (containerWidth - itemWidth - padding)
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

  useEffect(() => {
    const fetchUserScores = async () => {
      try {
        if (userId) {
          const res = await getTrailTestHistory(userId)
          setUserScores(res.timings || [])
        }
      } catch (err) {
        console.error("Failed to fetch user scores", err)
      }
    }

    fetchUserScores()
    setTrailSequence([...originalSequence])

    const waitForContainer = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(waitForContainer, 50)
        return
      }

      const newPositions = generateNonOverlappingPositions(
        originalSequence.length,
        rect.width,
        rect.height
      )
      setPositions(newPositions)
    }

    waitForContainer()
  }, [])

  const handleClick = (num, idx) => {
    if (currentIndex === 0 && !startTime) {
      setStartTime(Date.now())
    }

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
      alert(`Test Completed in ${totalTime} seconds!`)

      if (userId) {
        submitTrailTestTime(userId, totalTime)
          .then((res) => {
            setUserScores(res.timings)
          })
          .catch((err) => console.error("Failed to submit time", err))
      }
    }
  }, [currentIndex])

  return (
    <div className="trail-wrapper-flex">
      <div className="trail-container-wrapper">
        <div className="trail-container-relative" ref={containerRef}>
          <div className="text-richblack-25 font-semibold text-3xl text-center pt-4">
            Trial Test
          </div>
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
      </div>

      <div className="leaderboard-container">
        <h2 className="text-white text-xl font-semibold mb-3">Your Scores</h2>
        <ol className="text-white text-sm">
          {userScores.length > 0 ? (
            userScores.map((score, i) => (
              <li key={i} className="mb-1">
                #{i + 1}: {score}s
              </li>
            ))
          ) : (
            <li>No scores yet</li>
          )}
        </ol>
      </div>
    </div>
  )
}

export default TrailTest

