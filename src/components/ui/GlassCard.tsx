'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  onClick 
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative backdrop-blur-md bg-white/10 border border-white/20 
        rounded-3xl p-6 shadow-2xl overflow-hidden cursor-pointer
        ${glow ? 'shadow-cyan-500/25' : ''}
        ${className}
      `}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={hover ? { 
        scale: 1.02, 
        boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
        borderColor: 'rgba(0, 255, 255, 0.5)'
      } : undefined}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl" />
      
      {/* Glow effect */}
      {glow && (
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-sm -z-10" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}