'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ParticleBackground from '@/components/ui/ParticleBackground'
import GlassCard from '@/components/ui/GlassCard'
import { ageGroups } from '@/lib/gameData'
import { useGameState } from '@/contexts/GameStateContext'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function SubjectsPage() {
  const router = useRouter()
  const { userProgress } = useGameState()


  // Find the selected age group
  const selectedAgeGroup = ageGroups.find(group => group.id === userProgress.selectedAgeGroup)

  if (!selectedAgeGroup) {
    router.push('/age-group')
    return null
  }

  const handleSubjectSelect = (subjectId: string) => {
    // Navigate to theory page first
    router.push(`/theory/${subjectId}`)
  }

  return (
    <motion.div 
      className="min-h-screen relative p-4"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ParticleBackground theme="learning" particleCount={60} />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={staggerItem}
        >
          <h1 className="text-5xl font-bold font-['Orbitron'] bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Subject 🔬
          </h1>
          <p className="text-gray-300 font-['Space_Grotesk'] text-xl max-w-3xl mx-auto mb-6">
            Ready to explore the mysteries of science? Pick a subject and begin your adventure!
          </p>

          {/* Character and Age Group Display */}
          <motion.div
            className="inline-flex items-center space-x-4 bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-600/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-3xl">{selectedAgeGroup.character}</div>
            <div className="text-left">
              <div className="text-cyan-400 font-['Space_Grotesk'] font-bold">
                {selectedAgeGroup.name}
              </div>
              <div className="text-gray-400 text-sm">
                Ages {selectedAgeGroup.ageRange} • {selectedAgeGroup.questionCount} Questions
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Subject Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
        >
          {selectedAgeGroup.subjects.map((subject) => (
            <motion.div
              key={subject.id}
              variants={staggerItem}
              whileHover={{ 
                y: -10,
                scale: 1.02
              }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                onClick={() => handleSubjectSelect(subject.id)}
                className="h-80 cursor-pointer group"
                glow
              >
                <div className="h-full flex flex-col justify-between text-center relative">
                  {/* Subject Icon */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      className={`
                        w-24 h-24 rounded-2xl flex items-center justify-center text-5xl
                        bg-gradient-to-br ${subject.color} shadow-2xl relative
                        group-hover:shadow-3xl transition-all duration-300
                      `}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {subject.icon}
                      
                      {/* Glow effect */}
                      <div className={`
                        absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50
                        bg-gradient-to-br ${subject.color} transition-opacity duration-300
                      `} />
                      
                      {/* Orbiting particles */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-80"
                          style={{
                            left: `${50 + 40 * Math.cos((i * 120) * Math.PI / 180)}%`,
                            top: `${50 + 40 * Math.sin((i * 120) * Math.PI / 180)}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          animate={{
                            rotate: [0, 360],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 3,
                            delay: i * 0.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Subject Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white group-hover:text-cyan-300 transition-colors">
                      {subject.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {subject.description}
                    </p>

                    {/* Difficulty and Features */}
                    <div className="space-y-2">
                      <div className="flex justify-center space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className={`
                              w-2 h-2 rounded-full
                              ${i < (selectedAgeGroup.id === 'elementary' ? 1 : selectedAgeGroup.id === 'middle' ? 2 : 3) 
                                ? 'bg-yellow-400' 
                                : 'bg-gray-600'
                              }
                            `}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {selectedAgeGroup.id === 'elementary' ? 'Beginner' : 
                         selectedAgeGroup.id === 'middle' ? 'Intermediate' : 'Advanced'}
                      </div>
                    </div>

                    {/* Action hint */}
                    <motion.div
                      className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-['Space_Grotesk'] font-medium"
                      initial={{ y: 10 }}
                      whileInView={{ y: 0 }}
                    >
                      Click to start learning! ✨
                    </motion.div>
                  </div>

                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                    <div className="w-full h-full bg-repeat opacity-20"
                         style={{
                           backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                           backgroundSize: '20px 20px'
                         }} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="mt-12 text-center"
          variants={staggerItem}
        >
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-6 py-3 rounded-full backdrop-blur-sm border border-gray-600/50">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-['Space_Grotesk']">Step 3 of 3: Subject Selection</span>
          </div>
        </motion.div>

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