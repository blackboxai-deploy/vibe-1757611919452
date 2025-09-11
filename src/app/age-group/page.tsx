'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ParticleBackground from '@/components/ui/ParticleBackground'
import GlassCard from '@/components/ui/GlassCard'
import { ageGroups } from '@/lib/gameData'
import { useGameState } from '@/contexts/GameStateContext'
import { staggerContainer, staggerItem, portalAnimation } from '@/lib/animations'

export default function AgeGroupDashboard() {
  const router = useRouter()
  const { updateProgress, userProgress } = useGameState()

  const handleAgeGroupSelect = (ageGroupId: string) => {
    updateProgress({ selectedAgeGroup: ageGroupId })
    router.push('/subjects')
  }

  return (
    <motion.div 
      className="min-h-screen relative p-4"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ParticleBackground theme="magic" particleCount={70} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={staggerItem}
        >
          <h1 className="text-6xl font-bold font-['Orbitron'] bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Select Your Age Group 🚀
          </h1>
          <p className="text-gray-300 font-['Space_Grotesk'] text-xl max-w-3xl mx-auto">
            Choose your learning adventure based on your age. Each portal leads to exciting challenges designed just for you!
          </p>
          
          {/* Selected Language Display */}
          {userProgress.selectedLanguage && (
            <motion.div
              className="mt-4 inline-flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-green-400 font-['Space_Grotesk'] font-medium">
                Selected Language: {userProgress.selectedLanguage.toUpperCase()}
              </span>
              <span className="text-2xl">✓</span>
            </motion.div>
          )}
        </motion.div>

        {/* Age Group Portal Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {ageGroups.map((ageGroup) => (
            <motion.div
              key={ageGroup.id}
              variants={portalAnimation}
              className="perspective-1000"
            >
              <GlassCard
                onClick={() => handleAgeGroupSelect(ageGroup.id)}
                className="h-96 cursor-pointer group relative overflow-hidden"
                glow
              >
                <div className="h-full flex flex-col justify-between p-6 relative z-10">
                  {/* Character Portal */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Portal Ring */}
                      <motion.div
                        className="w-32 h-32 rounded-full border-4 border-cyan-400/50 flex items-center justify-center
                                   bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm
                                   shadow-2xl shadow-cyan-500/30 relative"
                        animate={{
                          rotate: [0, 360],
                          boxShadow: [
                            '0 0 30px rgba(0, 255, 255, 0.3)',
                            '0 0 60px rgba(0, 255, 255, 0.6)',
                            '0 0 30px rgba(0, 255, 255, 0.3)'
                          ]
                        }}
                        transition={{
                          rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                          boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                        }}
                      >
                        {/* Inner character */}
                        <motion.div
                          className="text-6xl filter drop-shadow-lg"
                          animate={{
                            y: [-2, 2, -2],
                            rotate: [-5, 5, -5]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        >
                          {ageGroup.character}
                        </motion.div>

                        {/* Orbiting particles */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                            style={{
                              left: `${50 + 50 * Math.cos((i * 90) * Math.PI / 180)}%`,
                              top: `${50 + 50 * Math.sin((i * 90) * Math.PI / 180)}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            animate={{
                              rotate: [0, 360],
                              scale: [0.8, 1.2, 0.8],
                              opacity: [0.5, 1, 0.5]
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
                    </motion.div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-4 text-center">
                    <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white group-hover:text-cyan-300 transition-colors">
                      {ageGroup.name}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="text-cyan-400 font-['Space_Grotesk'] font-medium">
                        Ages {ageGroup.ageRange}
                      </div>
                      
                      <div className="text-gray-300 text-sm">
                        {ageGroup.description}
                      </div>
                      
                      <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-3 py-1 rounded-full">
                        <span className="text-purple-300 text-sm font-['Space_Grotesk']">
                          {ageGroup.questionCount} Questions
                        </span>
                        <span className="text-yellow-400">⚡</span>
                      </div>
                    </div>

                    {/* Subject Preview */}
                    <div className="grid grid-cols-2 gap-2">
                      {ageGroup.subjects.slice(0, 4).map((subject) => (
                        <div
                          key={subject.id}
                          className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-lg flex items-center space-x-1"
                        >
                          <span>{subject.icon}</span>
                          <span>{subject.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portal Energy Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating energy orbs */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-70"
                      style={{
                        left: `${10 + (i % 4) * 25}%`,
                        top: `${20 + Math.floor(i / 4) * 60}%`
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0, 0.7, 0],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
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
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-['Space_Grotesk']">Step 2 of 3: Age Group Selection</span>
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