"use client"

import { useEffect, useRef, useState } from "react"
import { Clock } from "lucide-react"

export default function Timer({
  timeRemaining,
  setTimeRemaining,
  onTimeUp,
  onFiveMinuteWarning, // optional callback
}) {
  const intervalRef = useRef(null)
  const warningPlayedRef = useRef(false)
  const [isLowTime, setIsLowTime] = useState(false)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        // ⛔ Time up → auto submit
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onTimeUp?.() // auto submit trigger
          return 0
        }

        const newTime = prev - 1

        // ⚠️ 5-minute warning (300 seconds)
        if (newTime <= 300 && !warningPlayedRef.current) {
          warningPlayedRef.current = true
          setIsLowTime(true)

          // optional parent callback
          onFiveMinuteWarning?.()

          // 🔔 simple beep sound
          try {
            const audio = new Audio("/warning.mp3") // put file in /public
            audio.play().catch(() => {})
          } catch {}
        }

        // 🔴 visual low time state (<10 min like before)
        if (newTime < 600) {
          setIsLowTime(true)
        }

        return newTime
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [setTimeRemaining, onTimeUp, onFiveMinuteWarning])

  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold
        ${isLowTime ? "bg-red-100 text-red-700 animate-pulse" : "bg-blue-50 text-blue-700"}
      `}
    >
      <Clock className="w-5 h-5" />
      <span>
        {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}