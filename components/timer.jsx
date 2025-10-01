"use client"

import { useEffect } from "react"
import { Clock } from "lucide-react"

export default function Timer({ timeRemaining, setTimeRemaining, onTimeUp }) {
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp()
      return
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeRemaining, setTimeRemaining, onTimeUp])

  const hours = Math.floor(timeRemaining / 3600)
  const minutes = Math.floor((timeRemaining % 3600) / 60)
  const seconds = timeRemaining % 60

  const isLowTime = timeRemaining < 600 // Less than 10 minutes

  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-semibold
        ${isLowTime ? "bg-red-100 text-red-700 animate-pulse" : "bg-blue-50 text-blue-700"}
      `}
    >
      <Clock className="w-5 h-5" />
      <span>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}
