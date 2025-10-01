"use client"

export default function QuestionDisplay({ question, selectedAnswer, onAnswer, questionNumber }) {
  if (!question) return null

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mb-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
            {question.subject}
          </span>
          <span className="text-gray-500 text-sm">Question {questionNumber}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correctAnswer
          const showFeedback = selectedAnswer !== undefined

          return (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              disabled={selectedAnswer !== undefined}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                ${!showFeedback && !isSelected ? "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50" : ""}
                ${!showFeedback && isSelected ? "border-indigo-500 bg-indigo-50" : ""}
                ${showFeedback && isSelected && isCorrect ? "border-green-500 bg-green-50" : ""}
                ${showFeedback && isSelected && !isCorrect ? "border-red-500 bg-red-50" : ""}
                ${showFeedback && !isSelected && isCorrect ? "border-green-500 bg-green-50" : ""}
                ${showFeedback && !isSelected && !isCorrect ? "border-gray-200 bg-gray-50 opacity-60" : ""}
                ${selectedAnswer !== undefined ? "cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold
                    ${!showFeedback && !isSelected ? "bg-gray-100 text-gray-700" : ""}
                    ${!showFeedback && isSelected ? "bg-indigo-500 text-white" : ""}
                    ${showFeedback && isSelected && isCorrect ? "bg-green-500 text-white" : ""}
                    ${showFeedback && isSelected && !isCorrect ? "bg-red-500 text-white" : ""}
                    ${showFeedback && !isSelected && isCorrect ? "bg-green-500 text-white" : ""}
                    ${showFeedback && !isSelected && !isCorrect ? "bg-gray-100 text-gray-700" : ""}
                  `}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span
                  className={`
                    flex-1 font-medium
                    ${showFeedback && isSelected && isCorrect ? "text-green-900" : ""}
                    ${showFeedback && isSelected && !isCorrect ? "text-red-900" : ""}
                    ${showFeedback && !isSelected && isCorrect ? "text-green-900" : ""}
                    ${!showFeedback || (!isSelected && !isCorrect) ? "text-gray-900" : ""}
                  `}
                >
                  {option}
                </span>
                {showFeedback && isCorrect && (
                  <span className="flex-shrink-0 text-green-600 text-sm font-semibold">✓ Correct</span>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <span className="flex-shrink-0 text-red-600 text-sm font-semibold">✗ Wrong</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {selectedAnswer !== undefined && (
        <div
          className={`
            mt-6 p-4 rounded-lg
            ${
              selectedAnswer === question.correctAnswer
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }
          `}
        >
          <p
            className={`
              font-semibold mb-1
              ${selectedAnswer === question.correctAnswer ? "text-green-900" : "text-red-900"}
            `}
          >
            {selectedAnswer === question.correctAnswer ? "🎉 Correct!" : "❌ Incorrect"}
          </p>
          <p className="text-sm text-gray-700">
            {selectedAnswer === question.correctAnswer
              ? "Well done! You selected the right answer."
              : `The correct answer is ${String.fromCharCode(65 + question.correctAnswer)}: ${question.options[question.correctAnswer]}`}
          </p>
        </div>
      )}
    </div>
  )
}
