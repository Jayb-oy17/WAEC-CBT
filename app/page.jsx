"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  BookOpen,
  Plus,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Home,
  GraduationCap,
} from "lucide-react";
import { getQuestionsByDepartment, shuffleArray } from "@/lib/questions";

export default function WaecApp() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [view, setView] = useState("home"); // 'home', 'department-select', 'test', 'results', 'add-questions'
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [hasProgress, setHasProgress] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedProgress = localStorage.getItem("waec_test_progress");
    setHasProgress(!!savedProgress);
  }, []);

  useEffect(() => {
    if (!testStarted || view !== "test") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, view]);

  useEffect(() => {
    if (testStarted && questions.length > 0) {
      localStorage.setItem(
        "waec_test_progress",
        JSON.stringify({
          department: selectedDepartment,
          questions,
          answers,
          currentQuestionIndex,
          timeRemaining,
        })
      );
    }
  }, [
    answers,
    currentQuestionIndex,
    timeRemaining,
    questions,
    testStarted,
    selectedDepartment,
  ]);

  const startNewTest = () => {
    localStorage.removeItem("waec_test_progress");
    setView("department-select");
  };

  const startTestWithDepartment = (department) => {
    setSelectedDepartment(department);
    const departmentQuestions = getQuestionsByDepartment(department);
    const shuffled = shuffleArray(departmentQuestions);
    setQuestions(shuffled);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(7200);
    setTestStarted(true);
    setView("test");
  };

  const continueTest = () => {
    const savedProgress = JSON.parse(
      localStorage.getItem("waec_test_progress")
    );
    if (savedProgress) {
      setSelectedDepartment(savedProgress.department);
      setQuestions(savedProgress.questions);
      setAnswers(savedProgress.answers);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setTimeRemaining(savedProgress.timeRemaining);
      setTestStarted(true);
      setView("test");
    }
  };

  const handleAnswer = (answerIndex) => {
    if (answers[currentQuestionIndex] !== undefined) return;
    setAnswers({ ...answers, [currentQuestionIndex]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    localStorage.removeItem("waec_test_progress");
    setTestStarted(false);
    setView("results");
  };

  const handleAddQuestion = (newQuestion) => {
    const customQuestions = JSON.parse(
      localStorage.getItem("waec_custom_questions") || "[]"
    );
    const questionWithId = {
      ...newQuestion,
      id: Date.now(),
    };
    customQuestions.push(questionWithId);
    localStorage.setItem(
      "waec_custom_questions",
      JSON.stringify(customQuestions)
    );
  };

  const goHome = () => {
    setView("home");
    setHasProgress(!!localStorage.getItem("waec_test_progress"));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach((question, index) => {
      if (answers[index] === undefined) {
        unanswered++;
      } else if (answers[index] === question.correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { correct, incorrect, unanswered, total: questions.length };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.subject &&
      formData.question &&
      formData.options.every((opt) => opt.trim())
    ) {
      handleAddQuestion(formData);
      setFormData({
        subject: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      });
      alert("Question added successfully!");
    }
  };

  if (showPreloader) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center z-50">
        <style jsx>{`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .rotating-circle {
            animation: rotate 2s linear infinite;
          }
          .fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
        `}</style>
        <div className="text-center fade-in">
          <div className="relative inline-block mb-8">
            {/* Rotating circle */}
            <div className="rotating-circle absolute inset-0 -m-8">
              <svg
                width="280"
                height="280"
                viewBox="0 0 280 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="140"
                  cy="140"
                  r="135"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray="20 10"
                  opacity="0.3"
                />
              </svg>
            </div>
            {/* Logo */}
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <img
                src="/logo.png"
                alt="D'TITI Innovation Hub"
                className="w-48 h-auto"
              />
            </div>
          </div>
          <div className="max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold text-white mb-2">
              This test is brought to you by
            </h2>
            <h1 className="text-4xl font-bold text-white mb-4">
              D'TITI Innovation Hub
            </h1>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-white rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-4">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              WAEC CBT Practice
            </h1>
            <p className="text-gray-600 text-lg">
              Prepare for your WAEC examination with authentic past questions
            </p>
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
              onClick={() => setView("add-questions")}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 border-2 border-gray-300"
            >
              <Plus className="w-5 h-5" />
              Add Custom Questions
            </button>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-2">
              Test Information
            </h3>
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
    );
  }

  if (view === "department-select") {
    const departments = [
      {
        name: "Science",
        icon: "🔬",
        subjects: "Physics, Chemistry, Biology + Math & English",
        color: "from-blue-500 to-cyan-500",
      },
      {
        name: "Arts",
        icon: "📚",
        subjects: "Literature, History, Geography, Government + Math & English",
        color: "from-purple-500 to-pink-500",
      },
      {
        name: "Commercial",
        icon: "💼",
        subjects: "Economics, Accounting, Commerce + Math & English",
        color: "from-green-500 to-emerald-500",
      },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-full mb-4">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Select Your Department
            </h1>
            <p className="text-gray-600 text-lg">
              Choose the department for your WAEC examination
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {departments.map((dept) => (
              <button
                key={dept.name}
                onClick={() => startTestWithDepartment(dept.name)}
                className="group relative overflow-hidden bg-white border-2 border-gray-200 hover:border-indigo-500 rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div className="text-5xl mb-4">{dept.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {dept.subjects}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-900 text-center">
              <span className="font-semibold">Note:</span> Mathematics and
              English are compulsory for all departments
            </p>
          </div>

          <button
            onClick={goHome}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 border-2 border-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (view === "test") {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestionIndex];
    const answeredCount = Object.keys(answers).length;

    if (!currentQuestion || questions.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading questions...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={goHome}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Go to Home"
              >
                <Home className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  WAEC Practice Test - {selectedDepartment}
                </h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Answered</p>
                <p className="text-lg font-bold text-indigo-600">
                  {answeredCount}/{questions.length}
                </p>
              </div>
              <div
                className={`text-right ${
                  timeRemaining < 600 ? "text-red-600" : "text-gray-900"
                }`}
              >
                <p className="text-sm text-gray-600">Time Remaining</p>
                <p className="text-lg font-bold flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  {formatTime(timeRemaining)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {currentQuestion.subject}
                </span>
                <span className="text-gray-500 text-sm">
                  Question {currentQuestionIndex + 1}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showFeedback = selectedAnswer !== undefined;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== undefined}
                    className={`
                      w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                      ${
                        !showFeedback && !isSelected
                          ? "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                          : ""
                      }
                      ${
                        !showFeedback && isSelected
                          ? "border-indigo-500 bg-indigo-50"
                          : ""
                      }
                      ${
                        showFeedback && isSelected && isCorrect
                          ? "border-green-500 bg-green-50"
                          : ""
                      }
                      ${
                        showFeedback && isSelected && !isCorrect
                          ? "border-red-500 bg-red-50"
                          : ""
                      }
                      ${
                        showFeedback && !isSelected && isCorrect
                          ? "border-green-500 bg-green-50"
                          : ""
                      }
                      ${
                        showFeedback && !isSelected && !isCorrect
                          ? "border-gray-200 bg-gray-50 opacity-60"
                          : ""
                      }
                      ${
                        selectedAnswer !== undefined
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold
                          ${
                            !showFeedback && !isSelected
                              ? "bg-gray-100 text-gray-700"
                              : ""
                          }
                          ${
                            !showFeedback && isSelected
                              ? "bg-indigo-500 text-white"
                              : ""
                          }
                          ${
                            showFeedback && isSelected && isCorrect
                              ? "bg-green-500 text-white"
                              : ""
                          }
                          ${
                            showFeedback && isSelected && !isCorrect
                              ? "bg-red-500 text-white"
                              : ""
                          }
                          ${
                            showFeedback && !isSelected && isCorrect
                              ? "bg-green-500 text-white"
                              : ""
                          }
                          ${
                            showFeedback && !isSelected && !isCorrect
                              ? "bg-gray-100 text-gray-700"
                              : ""
                          }
                        `}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span
                        className={`
                          flex-1 font-medium
                          ${
                            showFeedback && isSelected && isCorrect
                              ? "text-green-900"
                              : ""
                          }
                          ${
                            showFeedback && isSelected && !isCorrect
                              ? "text-red-900"
                              : ""
                          }
                          ${
                            showFeedback && !isSelected && isCorrect
                              ? "text-green-900"
                              : ""
                          }
                          ${
                            !showFeedback || (!isSelected && !isCorrect)
                              ? "text-gray-900"
                              : ""
                          }
                        `}
                      >
                        {option}
                      </span>
                      {showFeedback && isCorrect && (
                        <span className="flex-shrink-0 text-green-600 text-sm font-semibold">
                          ✓ Correct
                        </span>
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <span className="flex-shrink-0 text-red-600 text-sm font-semibold">
                          ✗ Wrong
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== undefined && (
              <div
                className={`
                  mt-6 p-4 rounded-lg
                  ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }
                `}
              >
                <p
                  className={`
                    font-semibold mb-1
                    ${
                      selectedAnswer === currentQuestion.correctAnswer
                        ? "text-green-900"
                        : "text-red-900"
                    }
                  `}
                >
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? "🎉 Correct!"
                    : "❌ Incorrect"}
                </p>
                <p className="text-sm text-gray-700">
                  {selectedAnswer === currentQuestion.correctAnswer
                    ? "Well done! You selected the right answer."
                    : `The correct answer is ${String.fromCharCode(
                        65 + currentQuestion.correctAnswer
                      )}: ${
                        currentQuestion.options[currentQuestion.correctAnswer]
                      }`}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-2">
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "results") {
    const results = calculateResults();
    const percentage = ((results.correct / results.total) * 100).toFixed(1);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                percentage >= 50 ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <span className="text-4xl text-white font-bold">
                {percentage}%
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Test Complete!
            </h1>
            <p className="text-gray-600 text-lg">Here are your results</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="text-green-600 text-sm font-medium mb-1">Correct</p>
              <p className="text-3xl font-bold text-green-900">
                {results.correct}
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-600 text-sm font-medium mb-1">Incorrect</p>
              <p className="text-3xl font-bold text-red-900">
                {results.incorrect}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Unanswered
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {results.unanswered}
              </p>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center">
              <p className="text-indigo-600 text-sm font-medium mb-1">Total</p>
              <p className="text-3xl font-bold text-indigo-900">
                {results.total}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={startNewTest}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Take Another Test
            </button>
            <button
              onClick={goHome}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3 border-2 border-gray-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "add-questions") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Add Custom Question
              </h1>
              <button
                onClick={goHome}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Go to Home"
              >
                <Home className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Mathematics, English, Physics"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter your question here"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options
                </label>
                <div className="space-y-3">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold text-gray-700">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...formData.options];
                          newOptions[index] = e.target.value;
                          setFormData({ ...formData, options: newOptions });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder={`Option ${String.fromCharCode(
                          65 + index
                        )}`}
                        required
                      />
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={formData.correctAnswer === index}
                        onChange={() =>
                          setFormData({ ...formData, correctAnswer: index })
                        }
                        className="w-5 h-5 text-indigo-600"
                        title="Mark as correct answer"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Select the radio button next to the correct answer
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Add Question
                </button>
                <button
                  type="button"
                  onClick={goHome}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 border-2 border-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
