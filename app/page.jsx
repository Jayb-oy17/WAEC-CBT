"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, BookOpen, Plus, RotateCcw } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [hasProgress, setHasProgress] = useState(false)

  useEffect(() => {
    // Check if there's saved progress
    const savedProgress = localStorage.getItem("waec_test_progress")
    setHasProgress(!!savedProgress)
  }, [])

  const startNewTest = () => {
    // Clear any existing progress
    localStorage.removeItem("waec_test_progress")
    router.push("/test")
  }

  const continueTest = () => {
    router.push("/test")
  }

  const addQuestions = () => {
    router.push("/add-questions")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-4">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">WAEC CBT Practice</h1>
          <p className="text-gray-600 text-lg">Prepare for your WAEC examination with authentic past questions</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={startNewTest}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Start New Test
          </button>

          {hasProgress && (
            <button
              onClick={continueTest}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
            >
              <Clock className="w-5 h-5" />
              Continue Previous Test
            </button>
          )}

          <button
            onClick={addQuestions}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 border-2 border-gray-300"
          >
            <Plus className="w-5 h-5" />
            Add Custom Questions
          </button>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-2">Test Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Duration: 2 hours (120 minutes)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Multiple choice questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Immediate feedback after each answer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>Progress is automatically saved</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
