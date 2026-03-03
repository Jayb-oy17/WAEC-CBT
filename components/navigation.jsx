"use client"

import { ChevronLeft, ChevronRight, Send } from "lucide-react"

export default function Navigation({ currentIndex, totalQuestions, onPrevious, onNext, onSubmit, hasAnswer }) {
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalQuestions - 1

  return (
    <div className="flex items-center justify-between gap-4 mt-6">
      <button
        onClick={onPrevious}
        disabled={isFirst}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200
          ${isFirst ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
        `}
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      <div className="text-center">
        <p className="text-sm text-gray-600">{hasAnswer ? "Answer recorded" : "Select an answer to continue"}</p>
      </div>

      <div className="flex items-center gap-3">
        {!isLast && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onSubmit}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors duration-200"
        >
          Submit Now
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
