import { Variants } from 'framer-motion'

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

// Stagger animation for multiple items
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.8 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

// Hover animations
export const hoverScale: Variants = {
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  },
  tap: { scale: 0.95 }
}

export const hoverGlow: Variants = {
  hover: { 
    scale: 1.02,
    filter: 'brightness(1.2) drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

// Button animations
export const neonButtonAnimation: Variants = {
  initial: { 
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
    scale: 1
  },
  hover: { 
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  tap: { scale: 0.95 },
  pulse: {
    boxShadow: [
      '0 0 10px rgba(59, 130, 246, 0.3)',
      '0 0 20px rgba(59, 130, 246, 0.6)',
      '0 0 10px rgba(59, 130, 246, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Portal/Card animations
export const portalAnimation: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8, 
    rotateY: -30,
    z: -100
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    rotateY: 0,
    z: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  hover: {
    scale: 1.05,
    rotateY: 5,
    z: 50,
    boxShadow: '0 20px 40px rgba(0, 255, 255, 0.3)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

// Character animations
export const heroCharacterAnimation: Variants = {
  initial: { x: -200, opacity: 0, rotate: -10 },
  animate: { 
    x: 0, 
    opacity: 1, 
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// Progress bar animation
export const progressAnimation: Variants = {
  initial: { width: 0, opacity: 0 },
  animate: (progress: number) => ({
    width: `${progress}%`,
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  })
}

// Coin animation
export const coinAnimation: Variants = {
  initial: { scale: 0, rotate: 0, y: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    rotate: [0, 180, 360],
    y: [0, -20, 0],
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  },
  collect: {
    scale: 0,
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeIn'
    }
  }
}

// Level up animation
export const levelUpAnimation: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
}

// Particle animations
export const particleAnimation: Variants = {
  float: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 360],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'linear'
    }
  }
}

// Quiz question animations
export const questionAnimation: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: {
      duration: 0.3
    }
  }
}

// Success/Confetti animation
export const confettiAnimation: Variants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1.5, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 1,
      ease: 'easeOut'
    }
  }
}