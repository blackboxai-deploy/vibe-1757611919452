'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NeonButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  pulse?: boolean
}

export default function NeonButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  pulse = false
}: NeonButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 border-blue-400 shadow-blue-500/50',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-purple-500/50',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 shadow-green-500/50',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 shadow-yellow-500/50'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return (
    <motion.button
      className={`
        relative font-bold text-white border-2 rounded-2xl
        font-['Space_Grotesk'] tracking-wide transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      initial={{ scale: 1, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
      whileHover={!disabled ? {
        scale: 1.05,
        boxShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(59, 130, 246, 0.4)',
        y: -2
      } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      animate={pulse && !disabled ? {
        boxShadow: [
          '0 0 20px rgba(59, 130, 246, 0.3)',
          '0 0 40px rgba(59, 130, 246, 0.8)',
          '0 0 20px rgba(59, 130, 246, 0.3)'
        ]
      } : undefined}
      transition={{
        duration: pulse ? 2 : 0.3,
        repeat: pulse ? Infinity : 0,
        ease: 'easeInOut'
      }}
    >
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}