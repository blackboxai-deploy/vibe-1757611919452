'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ParticleBackground from '@/components/ui/ParticleBackground'
import GlassCard from '@/components/ui/GlassCard'
import NeonButton from '@/components/ui/NeonButton'
import HeroCharacter from '@/components/game/HeroCharacter'
import { pageTransition } from '@/lib/animations'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleLogin = () => {
    // For demo purposes, directly navigate to dashboard
    router.push('/dashboard')
  }

  return (
    <motion.div 
      className="min-h-screen relative flex items-center justify-center p-4"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ParticleBackground theme="space" particleCount={80} />
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Hero Character Animation */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <HeroCharacter size="lg" animation="enter" />
        </motion.div>

        {/* App Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold font-['Orbitron'] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Lumos Learn ✨
          </h1>
          <p className="text-cyan-300 font-['Space_Grotesk'] text-lg opacity-80">
            Embark on an Epic Learning Adventure
          </p>
        </motion.div>

        {/* Login Card */}
        <GlassCard glow className="mb-6">
          <div className="space-y-6">
            {/* Toggle Login/Register */}
            <div className="flex bg-gray-800/50 rounded-2xl p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`
                  flex-1 py-2 px-4 rounded-xl font-['Space_Grotesk'] font-medium transition-all duration-300
                  ${isLogin 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`
                  flex-1 py-2 px-4 rounded-xl font-['Space_Grotesk'] font-medium transition-all duration-300
                  ${!isLogin 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                Sign Up
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="
                      w-full p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl
                      text-white placeholder-gray-400 font-['Space_Grotesk']
                      focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                      transition-all duration-300 backdrop-blur-sm
                    "
                  />
                </motion.div>
              )}
              
              <input
                type="email"
                placeholder="Email Address"
                className="
                  w-full p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl
                  text-white placeholder-gray-400 font-['Space_Grotesk']
                  focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                  transition-all duration-300 backdrop-blur-sm
                "
              />
              
              <input
                type="password"
                placeholder="Password"
                className="
                  w-full p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl
                  text-white placeholder-gray-400 font-['Space_Grotesk']
                  focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                  transition-all duration-300 backdrop-blur-sm
                "
              />
            </div>

            {/* Action Button */}
            <NeonButton 
              onClick={handleLogin} 
              variant="primary" 
              size="lg" 
              className="w-full"
              pulse
            >
              {isLogin ? '🚀 Launch Learning Journey' : '✨ Create Adventure'}
            </NeonButton>

            {/* Additional options */}
            <div className="text-center space-y-2">
              <button className="text-cyan-400 hover:text-cyan-300 font-['Space_Grotesk'] text-sm transition-colors">
                Forgot your credentials?
              </button>
              <div className="text-gray-400 text-sm font-['Space_Grotesk']">
                Demo Mode: Click the button above to start exploring! 🌟
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Features Preview */}
        <motion.div
          className="grid grid-cols-3 gap-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[
            { icon: '🎮', text: 'Gamified' },
            { icon: '🌍', text: 'Multi-Lang' },
            { icon: '🏆', text: 'Rewards' }
          ].map((feature) => (
            <motion.div
              key={feature.text}
              className="p-3 bg-gray-800/30 rounded-xl border border-gray-600/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 255, 255, 0.5)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className="text-cyan-300 font-['Space_Grotesk'] text-sm font-medium">
                {feature.text}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}