"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, Clock, Award, Home } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState(null)

  useEffect(() => {
    const savedResults = localStorage.getItem("waec_test_results")
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    } else {
      router.push("/")
    }
  }, [router])

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  const percentage = ((results.correctAnswers / results.totalQuestions) * 100).toFixed(1)
  const hours = Math.floor(results.timeTaken / 3600)
  const minutes = Math.floor((results.timeTaken % 3600) / 60)
  const seconds = results.timeTaken % 60

  const getGrade = (percent) => {
    if (percent >= 75) return { grade: "A", color: "text-green-600", bg: "bg-green-50" }
    if (percent >= 60) return { grade: "B", color: "text-blue-600", bg: "bg-blue-50" }
    if (percent >= 50) return { grade: "C", color: "text-yellow-600", bg: "bg-yellow-50" }
    if (percent >= 40) return { grade: "D", color: "text-orange-600", bg: "bg-orange-50" }
    return { grade: "F", color: "text-red-600", bg: "bg-red-50" }
  }

  const gradeInfo = getGrade(percentage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-8 text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
            <p className="text-indigo-100">Here's your performance summary</p>
          </div>

          {/* Score Card */}
          <div className="p-8">
            <div className={`${gradeInfo.bg} rounded-xl p-8 mb-8 text-center`}>
              <div className={`text-6xl font-bold ${gradeInfo.color} mb-2`}>{percentage}%</div>
              <div className={`text-2xl font-semibold ${gradeInfo.color}`}>Grade: {gradeInfo.grade}</div>
            </div>

            {/* Statistics Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Correct Answers</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">{results.correctAnswers}</p>
                <p className="text-sm text-gray-600 mt-1">out of {results.totalQuestions} questions</p>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Incorrect Answers</h3>
                </div>
                <p className="text-3xl font-bold text-red-600">
                  {results.totalQuestions - results.correctAnswers - results.unanswered}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {results.unanswered > 0 && `${results.unanswered} unanswered`}
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 md:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Time Taken</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {hours > 0 && `${hours}h `}
                  {minutes}m {seconds}s
                </p>
              </div>
            </div>

            {/* Question Review */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Question Review</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {results.questions.map((question, index) => {
                  const userAnswer = results.answers[index]
                  const isCorrect = userAnswer === question.correctAnswer
                  const wasAnswered = userAnswer !== undefined

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        !wasAnswered
                          ? "bg-gray-100 border-gray-300"
                          : isCorrect
                            ? "bg-green-50 border-green-300"
                            : "bg-red-50 border-red-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {!wasAnswered ? (
                            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold">
                              ?
                            </div>
                          ) : isCorrect ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="text-sm space-y-1">
                            {!wasAnswered ? (
                              <p className="text-gray-600">Not answered</p>
                            ) : (
                              <>
                                <p className="text-gray-700">
                                  <span className="font-semibold">Your answer:</span> {question.options[userAnswer]}
                                </p>
                                {!isCorrect && (
                                  <p className="text-green-700">
                                    <span className="font-semibold">Correct answer:</span>{" "}
                                    {question.options[question.correctAnswer]}
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
