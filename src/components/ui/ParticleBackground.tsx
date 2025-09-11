'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

interface ParticleBackgroundProps {
  particleCount?: number
  theme?: 'space' | 'learning' | 'magic'
}

export default function ParticleBackground({ 
  particleCount = 50, 
  theme = 'space' 
}: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  const themeColors = {
    space: ['#00FFFF', '#3B82F6', '#8B5CF6', '#EC4899'],
    learning: ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    magic: ['#00FF00', '#FFFF00', '#FF00FF', '#00FFFF']
  }

  const themeShapes = {
    space: ['⭐', '✨', '🌟', '💫'],
    learning: ['📚', '✏️', '🔬', '🧪'],
    magic: ['✨', '🌟', '💫', '⚡']
  }

  useEffect(() => {
    const newParticles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: themeColors[theme][Math.floor(Math.random() * themeColors[theme].length)],
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      })
    }
    
    setParticles(newParticles)
  }, [particleCount, theme])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-900/30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            color: particle.color,
            fontSize: `${particle.size * 4}px`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {themeShapes[theme][Math.floor(Math.random() * themeShapes[theme].length)]}
        </motion.div>
      ))}

      {/* Additional floating geometric shapes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '20%',
            background: `linear-gradient(45deg, ${themeColors[theme][0]}20, ${themeColors[theme][1]}20)`
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* Twinkling stars overlay */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  )
}