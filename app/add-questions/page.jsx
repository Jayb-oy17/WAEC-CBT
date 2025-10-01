"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, ArrowLeft } from "lucide-react"

export default function AddQuestionsPage() {
  const router = useRouter()
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [savedQuestions, setSavedQuestions] = useState([])

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleAddQuestion = () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Please fill in all fields")
      return
    }

    const newQuestion = {
      id: `custom_${Date.now()}`,
      question: question.trim(),
      options: options.map((opt) => opt.trim()),
      correctAnswer,
      subject: "Custom",
      isCustom: true,
    }

    // Save to localStorage
    const existingQuestions = JSON.parse(localStorage.getItem("waec_custom_questions") || "[]")
    existingQuestions.push(newQuestion)
    localStorage.setItem("waec_custom_questions", JSON.stringify(existingQuestions))

    setSavedQuestions([...savedQuestions, newQuestion])

    // Reset form
    setQuestion("")
    setOptions(["", "", "", ""])
    setCorrectAnswer(0)

    alert("Question added successfully!")
  }

  const handleDeleteQuestion = (id) => {
    const existingQuestions = JSON.parse(localStorage.getItem("waec_custom_questions") || "[]")
    const filtered = existingQuestions.filter((q) => q.id !== id)
    localStorage.setItem("waec_custom_questions", JSON.stringify(filtered))
    setSavedQuestions(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Custom Questions</h1>
          <p className="text-gray-600 mb-8">Create your own practice questions to supplement the WAEC question bank</p>

          <div className="space-y-6">
            {/* Question Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            {/* Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Answer Options</label>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-700">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctAnswer === index}
                        onChange={() => setCorrectAnswer(index)}
                        className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Correct</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddQuestion}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Question
            </button>
          </div>
        </div>

        {/* Saved Questions */}
        {savedQuestions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Custom Questions ({savedQuestions.length})</h2>
            <div className="space-y-4">
              {savedQuestions.map((q, index) => (
                <div key={q.id} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-3">
                        {index + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => (
                          <div
                            key={optIndex}
                            className={`flex items-center gap-2 text-sm ${
                              optIndex === q.correctAnswer ? "text-green-700 font-semibold" : "text-gray-700"
                            }`}
                          >
                            <span className="font-semibold">{String.fromCharCode(65 + optIndex)}.</span>
                            <span>{opt}</span>
                            {optIndex === q.correctAnswer && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
