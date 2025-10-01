"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import QuestionDisplay from "@/components/question-display"
import Timer from "@/components/timer"
import Navigation from "@/components/navigation"
import { getQuestions, shuffleArray } from "@/lib/questions"

export default function TestPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(7200) // 2 hours in seconds
  const [testStarted, setTestStarted] = useState(false)

  useEffect(() => {
    // Load questions and check for saved progress
    const allQuestions = getQuestions()
    const shuffled = shuffleArray(allQuestions)

    const savedProgress = localStorage.getItem("waec_test_progress")

    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setQuestions(progress.questions)
      setCurrentQuestionIndex(progress.currentQuestionIndex)
      setAnswers(progress.answers)
      setTimeRemaining(progress.timeRemaining)
      setTestStarted(true)
    } else {
      setQuestions(shuffled)
      setTestStarted(true)
    }
  }, [])

  useEffect(() => {
    // Save progress whenever state changes
    if (testStarted && questions.length > 0) {
      const progress = {
        questions,
        currentQuestionIndex,
        answers,
        timeRemaining,
      }
      localStorage.setItem("waec_test_progress", JSON.stringify(progress))
    }
  }, [currentQuestionIndex, answers, timeRemaining, questions, testStarted])

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: answer,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate results
    let correctCount = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++
      }
    })

    const results = {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: questions.length - Object.keys(answers).length - correctCount,
      unanswered: questions.length - Object.keys(answers).length,
      timeTaken: 7200 - timeRemaining,
      questions,
      answers,
    }

    localStorage.setItem("waec_test_results", JSON.stringify(results))
    localStorage.removeItem("waec_test_progress")
    router.push("/results")
  }

  const handleTimeUp = () => {
    handleSubmit()
  }

  if (!testStarted || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">WAEC CBT Practice</h1>
            <p className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} onTimeUp={handleTimeUp} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <QuestionDisplay
          question={currentQuestion}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestionIndex + 1}
        />

        <Navigation
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          hasAnswer={answers[currentQuestionIndex] !== undefined}
        />

        {/* Question Navigator */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`
                  w-10 h-10 rounded-lg font-semibold text-sm transition-colors duration-200
                  ${
                    index === currentQuestionIndex
                      ? "bg-indigo-600 text-white"
                      : answers[index] !== undefined
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-600 rounded"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span>Not Answered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
