'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import ParticleBackground from '@/components/ui/ParticleBackground'
import GlassCard from '@/components/ui/GlassCard'
import NeonButton from '@/components/ui/NeonButton'
import { ageGroups, quizQuestions } from '@/lib/gameData'
import { useGameState } from '@/contexts/GameStateContext'
import { questionAnimation, coinAnimation, levelUpAnimation, confettiAnimation } from '@/lib/animations'

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const subjectId = params.subject as string
  const { userProgress, addXP, addCoins, completeQuiz } = useGameState()
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [showCoinAnimation, setShowCoinAnimation] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Get questions for this subject
  const questions = quizQuestions[subjectId] || quizQuestions['general-science']
  const selectedAgeGroup = ageGroups.find(group => group.id === userProgress.selectedAgeGroup)
  const subject = selectedAgeGroup?.subjects.find(s => s.id === subjectId)
  
  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = Math.min(questions.length, selectedAgeGroup?.questionCount || 10)

  // Timer effect
  useEffect(() => {
    if (isAnswered || showResult) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAnswer(-1) // Auto-submit as wrong
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isAnswered, showResult, currentQuestionIndex])

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30)
  }, [currentQuestionIndex])

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setScore(prev => prev + 1)
      // Award XP and coins
      const xpReward = selectedAgeGroup?.id === 'elementary' ? 10 : 
                      selectedAgeGroup?.id === 'middle' ? 15 : 20
      const coinReward = Math.floor(xpReward / 2)
      
      addXP(xpReward)
      addCoins(coinReward)
      
      // Show coin animation
      setShowCoinAnimation(true)
      setTimeout(() => setShowCoinAnimation(false), 1000)
      
      // Check for level up
      const newXP = userProgress.xp + xpReward
      const newLevel = Math.floor(newXP / 100) + 1
      if (newLevel > userProgress.level) {
        setTimeout(() => {
          setShowLevelUp(true)
          setTimeout(() => setShowLevelUp(false), 2000)
        }, 500)
      }
    }

    // Auto advance after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setIsAnswered(false)
      } else {
        finishQuiz()
      }
    }, 2000)
  }

  const finishQuiz = () => {
    setShowResult(true)
    completeQuiz(subjectId)
    
    // Show confetti for good performance
    const percentage = (score / totalQuestions) * 100
    if (percentage >= 70) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setShowResult(false)
    setTimeLeft(30)
  }

  const goToSubjects = () => {
    router.push('/subjects')
  }

  if (!selectedAgeGroup || !subject) {
    router.push('/subjects')
    return null
  }

  // Quiz Results Screen
  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100)
    const performance = percentage >= 90 ? 'Excellent!' : 
                       percentage >= 70 ? 'Great Job!' :
                       percentage >= 50 ? 'Good Effort!' : 'Keep Learning!'
    
    return (
      <motion.div 
        className="min-h-screen relative p-4 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ParticleBackground theme="magic" particleCount={100} />
        
        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              className="fixed inset-0 pointer-events-none z-50"
              variants={confettiAnimation}
              initial="initial"
              animate="animate"
              exit="initial"
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10%'
                  }}
                  animate={{
                    y: [0, window.innerHeight + 100],
                    rotate: [0, 360],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 2,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <GlassCard className="p-12" glow>
              <div className="space-y-6">
                {/* Trophy/Character */}
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {percentage >= 70 ? '🏆' : '🌟'}
                </motion.div>

                <h1 className="text-4xl font-bold font-['Orbitron'] bg-gradient-to-r from-yellow-400 via-green-500 to-cyan-500 bg-clip-text text-transparent">
                  Quiz Complete!
                </h1>

                <div className="text-3xl font-bold font-['Space_Grotesk'] text-white">
                  {performance}
                </div>

                {/* Score Display */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50">
                    <div className="text-2xl font-bold text-cyan-400">{score}</div>
                    <div className="text-sm text-gray-400">Correct</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50">
                    <div className="text-2xl font-bold text-green-400">{percentage}%</div>
                    <div className="text-sm text-gray-400">Score</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50">
                    <div className="text-2xl font-bold text-purple-400">{totalQuestions}</div>
                    <div className="text-sm text-gray-400">Total</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 justify-center">
                  <NeonButton onClick={restartQuiz} variant="secondary">
                    🔄 Try Again
                  </NeonButton>
                  <NeonButton onClick={goToSubjects} variant="primary">
                    📚 More Subjects
                  </NeonButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen relative p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ParticleBackground theme="space" particleCount={50} />
      
      {/* Coin Animation */}
      <AnimatePresence>
        {showCoinAnimation && (
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
            variants={coinAnimation}
            initial="initial"
            animate="animate"
            exit="collect"
          >
            <div className="text-6xl">🪙</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Animation */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 pointer-events-none"
            variants={levelUpAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <GlassCard className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-3xl font-bold font-['Orbitron'] bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                LEVEL UP!
              </div>
              <div className="text-xl text-cyan-400 mt-2">
                You reached level {userProgress.level + 1}!
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`
              w-12 h-12 rounded-xl flex items-center justify-center text-2xl
              bg-gradient-to-br ${subject.color}
            `}>
              {subject.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-['Orbitron'] text-white">
                {subject.name} Quiz
              </h1>
              <p className="text-cyan-400 font-['Space_Grotesk']">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Time Left</div>
              <div className={`text-xl font-bold font-['Space_Grotesk'] ${
                timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-cyan-400'
              }`}>
                {timeLeft}s
              </div>
            </div>
            <div className={`
              w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl
              ${timeLeft <= 10 ? 'border-red-400 animate-pulse' : 'border-cyan-400'}
            `}>
              ⏱️
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-800/50 rounded-full h-4 border border-gray-600/50">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Progress: {Math.round((currentQuestionIndex / totalQuestions) * 100)}%</span>
            <span>Score: {score}/{totalQuestions}</span>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            variants={questionAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <GlassCard className="mb-8" glow>
              <div className="space-y-6">
                <h2 className="text-xl font-bold font-['Space_Grotesk'] text-white leading-relaxed">
                  {currentQuestion.question}
                </h2>

                <div className="grid gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnswered}
                      className={`
                        p-4 rounded-xl border-2 text-left font-['Space_Grotesk'] transition-all duration-300
                        ${!isAnswered 
                          ? 'bg-gray-800/50 border-gray-600/50 hover:border-cyan-400/50 hover:bg-cyan-500/10' 
                          : selectedAnswer === index
                            ? index === currentQuestion.correctAnswer 
                              ? 'bg-green-500/20 border-green-400 text-green-300'
                              : 'bg-red-500/20 border-red-400 text-red-300'
                            : index === currentQuestion.correctAnswer
                              ? 'bg-green-500/20 border-green-400 text-green-300'
                              : 'bg-gray-800/30 border-gray-600/30 text-gray-500'
                        }
                        disabled:cursor-not-allowed
                      `}
                      whileHover={!isAnswered ? { scale: 1.02, y: -2 } : undefined}
                      whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold
                          ${!isAnswered 
                            ? 'border-gray-500 text-gray-300' 
                            : selectedAnswer === index
                              ? index === currentQuestion.correctAnswer 
                                ? 'border-green-400 bg-green-400 text-black'
                                : 'border-red-400 bg-red-400 text-black'
                              : index === currentQuestion.correctAnswer
                                ? 'border-green-400 bg-green-400 text-black'
                                : 'border-gray-600 text-gray-500'
                          }
                        `}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                        {isAnswered && index === currentQuestion.correctAnswer && (
                          <span className="ml-auto text-green-400">✓</span>
                        )}
                        {isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                          <span className="ml-auto text-red-400">✗</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <motion.div
                    className="mt-6 p-4 bg-blue-500/10 border border-blue-400/30 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-400 mt-1">💡</span>
                      <div>
                        <div className="text-blue-300 font-semibold mb-1">Explanation:</div>
                        <div className="text-gray-300 font-['Space_Grotesk']">
                          {currentQuestion.explanation}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        {/* Stats Display */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-600/50">
            <div className="text-lg font-bold text-cyan-400">{userProgress.level}</div>
            <div className="text-xs text-gray-400">Level</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-600/50">
            <div className="text-lg font-bold text-green-400">{userProgress.xp}</div>
            <div className="text-xs text-gray-400">XP</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-600/50">
            <div className="text-lg font-bold text-yellow-400">{userProgress.coins}</div>
            <div className="text-xs text-gray-400">Coins</div>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-gray-600/50">
            <div className="text-lg font-bold text-purple-400">{score}/{currentQuestionIndex + (isAnswered ? 1 : 0)}</div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
        </div>

        {/* Back button */}
        <motion.div 
          className="absolute top-8 left-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="
              flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-600/50
              rounded-xl text-gray-300 hover:text-white hover:border-cyan-400/50
              transition-all duration-300 backdrop-blur-sm font-['Space_Grotesk']
            "
          >
            <span>←</span>
            <span>Back</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}