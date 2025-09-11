'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ParticleBackground from '@/components/ui/ParticleBackground'
import GlassCard from '@/components/ui/GlassCard'
import { languages } from '@/lib/gameData'
import { useGameState } from '@/contexts/GameStateContext'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function LanguageDashboard() {
  const router = useRouter()
  const { updateProgress } = useGameState()

  const handleLanguageSelect = (languageId: string) => {
    updateProgress({ selectedLanguage: languageId })
    router.push('/age-group')
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
          <h1 className="text-6xl font-bold font-['Orbitron'] bg-gradient-to-r from-yellow-400 via-green-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            Choose Your Language 🌍
          </h1>
          <p className="text-gray-300 font-['Space_Grotesk'] text-xl max-w-2xl mx-auto">
            Select your preferred language to start your amazing learning adventure!
          </p>
        </motion.div>

        {/* Language Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
        >
          {languages.map((language) => (
            <motion.div
              key={language.id}
              variants={staggerItem}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard
                onClick={() => handleLanguageSelect(language.id)}
                className="h-64 cursor-pointer group perspective-1000"
                glow
              >
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center relative">
                  {/* 3D Flag Effect */}
                  <motion.div
                    className={`
                      w-24 h-24 rounded-2xl flex items-center justify-center text-4xl
                      bg-gradient-to-br ${language.color} shadow-2xl
                      transform-gpu transition-transform duration-300 group-hover:rotate-3d
                    `}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 5,
                      scale: 1.1
                    }}
                  >
                    <span className="text-5xl filter drop-shadow-lg">
                      {language.flag}
                    </span>
                    
                    {/* 3D depth effect */}
                    <div className="absolute inset-0 bg-black/20 rounded-2xl transform translate-z-[-10px]" />
                  </motion.div>

                  {/* Language Name */}
                  <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-white group-hover:text-cyan-300 transition-colors">
                    {language.name}
                  </h3>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      className="text-2xl"
                    >
                      ✨
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div
                    className={`
                      absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                      bg-gradient-to-br ${language.color} blur-xl -z-10
                    `}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Floating particles around card */}
                  {[...Array(6)].map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-60"
                      style={{
                        left: `${20 + (particleIndex % 3) * 30}%`,
                        top: `${20 + Math.floor(particleIndex / 3) * 60}%`
                      }}
                      animate={{
                        y: [-5, 5, -5],
                        x: [0, 2, 0],
                        opacity: [0, 0.6, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: particleIndex * 0.2,
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
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 font-['Space_Grotesk']">Step 1 of 3: Language Selection</span>
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