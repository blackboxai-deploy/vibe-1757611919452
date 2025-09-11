'use client'

import { motion } from 'framer-motion'
import { heroCharacterAnimation } from '@/lib/animations'

interface HeroCharacterProps {
  size?: 'sm' | 'md' | 'lg'
  animation?: 'enter' | 'float' | 'idle'
}

export default function HeroCharacter({ 
  size = 'md', 
  animation = 'enter' 
}: HeroCharacterProps) {
  const sizes = {
    sm: 'w-20 h-20 text-4xl',
    md: 'w-32 h-32 text-6xl',
    lg: 'w-48 h-48 text-8xl'
  }

  return (
    <div className="relative">
      {/* Character container with portal effect */}
      <motion.div
        className={`
          relative ${sizes[size]} mx-auto flex items-center justify-center
          rounded-full border-4 border-cyan-400/50 backdrop-blur-md
          bg-gradient-to-br from-blue-500/20 to-purple-500/20
          shadow-2xl shadow-cyan-500/30
        `}
        variants={heroCharacterAnimation}
        initial="initial"
        animate={animation === 'enter' ? 'animate' : animation === 'float' ? 'float' : 'animate'}
        whileHover={{ scale: 1.1, rotateY: 10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Pulsing outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Character emoji/icon */}
        <motion.div
          className="text-center filter drop-shadow-lg"
          animate={animation === 'float' ? {
            y: [-2, 2, -2],
            rotate: [-2, 2, -2]
          } : undefined}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🚀
        </motion.div>

        {/* Sparkle effects around character */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${50 + 30 * Math.cos((i * 60) * Math.PI / 180)}%`,
              top: `${50 + 30 * Math.sin((i * 60) * Math.PI / 180)}%`,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 360]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>

      {/* Portal base effect */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-8 
                   bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent 
                   rounded-full blur-md"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scaleX: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Character name/title */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                   text-center text-cyan-300 font-['Space_Grotesk'] font-bold text-lg
                   bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Space Explorer
      </motion.div>
    </div>
  )
}