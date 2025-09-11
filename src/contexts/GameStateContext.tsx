'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface UserProgress {
  level: number
  xp: number
  coins: number
  completedQuizzes: string[]
  selectedLanguage?: string
  selectedAgeGroup?: string
}

interface GameStateContextType {
  userProgress: UserProgress
  updateProgress: (updates: Partial<UserProgress>) => void
  addXP: (amount: number) => void
  addCoins: (amount: number) => void
  completeQuiz: (quizId: string) => void
  resetProgress: () => void
}

const defaultProgress: UserProgress = {
  level: 1,
  xp: 0,
  coins: 0,
  completedQuizzes: []
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined)

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress)

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('lumosLearnProgress')
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('lumosLearnProgress', JSON.stringify(userProgress))
  }, [userProgress])

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({ ...prev, ...updates }))
  }

  const addXP = (amount: number) => {
    setUserProgress(prev => {
      const newXP = prev.xp + amount
      const newLevel = Math.floor(newXP / 100) + 1
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      }
    })
  }

  const addCoins = (amount: number) => {
    setUserProgress(prev => ({
      ...prev,
      coins: prev.coins + amount
    }))
  }

  const completeQuiz = (quizId: string) => {
    setUserProgress(prev => ({
      ...prev,
      completedQuizzes: [...prev.completedQuizzes, quizId]
    }))
  }

  const resetProgress = () => {
    setUserProgress(defaultProgress)
    localStorage.removeItem('lumosLearnProgress')
  }

  return (
    <GameStateContext.Provider 
      value={{ 
        userProgress, 
        updateProgress, 
        addXP, 
        addCoins, 
        completeQuiz, 
        resetProgress 
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context
}