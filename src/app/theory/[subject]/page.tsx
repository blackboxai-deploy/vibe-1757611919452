'use client'

import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import ParticleBackground from '@/components/ui/ParticleBackground'
import GlassCard from '@/components/ui/GlassCard'
import NeonButton from '@/components/ui/NeonButton'
import { ageGroups } from '@/lib/gameData'
import { useGameState } from '@/contexts/GameStateContext'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface TheoryContent {
  [key: string]: {
    title: string
    icon: string
    content: string[]
    keyPoints: string[]
    funFacts: string[]
  }
}

const theoryContent: TheoryContent = {
  'general-science': {
    title: 'General Science Basics',
    icon: '🔬',
    content: [
      'Science is the study of the natural world around us. It helps us understand how things work!',
      'Scientists use experiments to test their ideas and learn new things.',
      'The scientific method involves asking questions, making hypotheses, and testing them.'
    ],
    keyPoints: [
      'Observation is the first step in science',
      'Experiments help us find answers',
      'Science is everywhere in our daily lives'
    ],
    funFacts: [
      'A group of flamingos is called a "flamboyance"! 🦩',
      'Honey never spoils - it can last thousands of years! 🍯',
      'Octopuses have three hearts! 🐙'
    ]
  },
  'physics': {
    title: 'Physics - The Science of Motion',
    icon: '⚡',
    content: [
      'Physics studies matter, energy, and how they interact with each other.',
      'Everything in the universe follows physical laws, from tiny atoms to massive stars.',
      'Forces like gravity, friction, and magnetism shape our world.'
    ],
    keyPoints: [
      'Energy cannot be created or destroyed, only transformed',
      'Every action has an equal and opposite reaction',
      'Light travels incredibly fast - 300,000 km per second!'
    ],
    funFacts: [
      'Lightning is 5 times hotter than the Sun! ⚡',
      'A single bolt of lightning contains enough energy to power a 100-watt bulb for 3 months! 💡',
      'Sound travels 4 times faster through water than air! 🌊'
    ]
  },
  'chemistry': {
    title: 'Chemistry - The Science of Matter',
    icon: '🧪',
    content: [
      'Chemistry is all about atoms, molecules, and how they combine to form everything around us.',
      'Chemical reactions happen when atoms rearrange to form new substances.',
      'The periodic table organizes all known elements by their properties.'
    ],
    keyPoints: [
      'Everything is made of atoms',
      'Chemical bonds hold atoms together',
      'Reactions can release or absorb energy'
    ],
    funFacts: [
      'Diamond and graphite are both made of carbon but have completely different properties! 💎',
      'The human body contains enough carbon to make 900 pencils! ✏️',
      'Water expands when it freezes - that\'s why ice floats! 🧊'
    ]
  },
  'biology': {
    title: 'Biology - The Science of Life',
    icon: '🌱',
    content: [
      'Biology studies all living things, from tiny bacteria to giant whales.',
      'All life forms share certain characteristics: they grow, reproduce, and respond to their environment.',
      'Cells are the basic building blocks of all living things.'
    ],
    keyPoints: [
      'DNA contains the instructions for life',
      'All living things need energy to survive',
      'Evolution explains the diversity of life on Earth'
    ],
    funFacts: [
      'Your body has more bacterial cells than human cells! 🦠',
      'A human brain uses 20% of the body\'s total energy! 🧠',
      'Some trees can live for thousands of years! 🌳'
    ]
  },
  'space-science': {
    title: 'Space Science - Exploring the Cosmos',
    icon: '🚀',
    content: [
      'Space science explores everything beyond Earth - planets, stars, galaxies, and the universe itself.',
      'Our solar system has 8 planets, and scientists have discovered thousands of planets around other stars.',
      'The universe is constantly expanding and contains billions of galaxies.'
    ],
    keyPoints: [
      'Light from distant stars takes years to reach us',
      'Black holes have gravity so strong that even light cannot escape',
      'The International Space Station orbits Earth every 90 minutes'
    ],
    funFacts: [
      'One day on Venus is longer than one year on Venus! 🪐',
      'Neutron stars are so dense that a teaspoon would weigh 6 billion tons! ⭐',
      'There are more possible games of chess than atoms in the observable universe! ♟️'
    ]
  }
}

export default function TheoryPage() {
  const router = useRouter()
  const params = useParams()
  const subjectId = params.subject as string
  const { userProgress } = useGameState()
  const [currentSection, setCurrentSection] = useState(0)

  // Get subject details
  const selectedAgeGroup = ageGroups.find(group => group.id === userProgress.selectedAgeGroup)
  const subject = selectedAgeGroup?.subjects.find(s => s.id === subjectId)
  const theory = theoryContent[subjectId] || theoryContent['general-science']

  if (!selectedAgeGroup || !subject) {
    router.push('/subjects')
    return null
  }

  const sections = [
    { title: 'Introduction', content: theory.content },
    { title: 'Key Points', content: theory.keyPoints },
    { title: 'Fun Facts', content: theory.funFacts }
  ]

  const handleStartQuiz = () => {
    router.push(`/quiz/${subjectId}`)
  }

  return (
    <motion.div 
      className="min-h-screen relative p-4"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <ParticleBackground theme="learning" particleCount={40} />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          variants={staggerItem}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center text-3xl
              bg-gradient-to-br ${subject.color} shadow-2xl
            `}>
              {theory.icon}
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold font-['Orbitron'] text-white">
                {theory.title}
              </h1>
              <p className="text-cyan-400 font-['Space_Grotesk']">
                Interactive Learning Session
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={staggerItem}
        >
          <div className="flex bg-gray-800/50 rounded-2xl p-2 backdrop-blur-sm border border-gray-600/50">
            {sections.map((section, index) => (
              <button
                key={section.title}
                onClick={() => setCurrentSection(index)}
                className={`
                  px-6 py-2 rounded-xl font-['Space_Grotesk'] font-medium transition-all duration-300
                  ${currentSection === index 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                {section.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div variants={staggerItem}>
          <GlassCard className="mb-8" glow>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] text-white flex items-center space-x-2">
                <span>{sections[currentSection].title}</span>
                {currentSection === 0 && <span>📚</span>}
                {currentSection === 1 && <span>🎯</span>}
                {currentSection === 2 && <span>🌟</span>}
              </h2>
              
              <div className="space-y-4">
                {sections[currentSection].content.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-800/30 rounded-xl border border-gray-600/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0" />
                    <p className="text-gray-300 font-['Space_Grotesk'] leading-relaxed">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div 
          className="flex justify-between items-center"
          variants={staggerItem}
        >
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="
                px-6 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl
                text-gray-300 hover:text-white hover:border-cyan-400/50
                transition-all duration-300 backdrop-blur-sm font-['Space_Grotesk']
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              ← Previous
            </button>
            
            <button
              onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              disabled={currentSection === sections.length - 1}
              className="
                px-6 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl
                text-gray-300 hover:text-white hover:border-cyan-400/50
                transition-all duration-300 backdrop-blur-sm font-['Space_Grotesk']
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Next →
            </button>
          </div>

          {currentSection === sections.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <NeonButton 
                onClick={handleStartQuiz}
                variant="success"
                size="lg"
                pulse
              >
                🎯 Start Quiz Challenge!
              </NeonButton>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="mt-8 text-center"
          variants={staggerItem}
        >
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-6 py-3 rounded-full backdrop-blur-sm border border-gray-600/50">
            <span className="text-2xl">{theory.icon}</span>
            <span className="text-gray-300 font-['Space_Grotesk']">
              Learning: {subject.name} ({currentSection + 1}/{sections.length})
            </span>
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