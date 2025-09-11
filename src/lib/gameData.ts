export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
}

export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  description: string
}

export interface AgeGroup {
  id: string
  name: string
  ageRange: string
  character: string
  subjects: Subject[]
  questionCount: number
  description: string
}

export const languages = [
  { id: 'en', name: 'English', flag: '🇺🇸', color: 'from-blue-500 to-purple-600' },
  { id: 'hi', name: 'Hindi', flag: '🇮🇳', color: 'from-orange-500 to-red-600' },
  { id: 'mr', name: 'Marathi', flag: '🇮🇳', color: 'from-green-500 to-teal-600' },
  { id: 'or', name: 'Odia', flag: '🇮🇳', color: 'from-yellow-500 to-orange-600' }
]

export const ageGroups: AgeGroup[] = [
  {
    id: 'elementary',
    name: 'Young Explorer',
    ageRange: '8-10 years',
    character: '🤖',
    questionCount: 15,
    description: 'Basic science concepts made fun!',
    subjects: [
      {
        id: 'general-science',
        name: 'General Science',
        icon: '🔬',
        color: 'from-cyan-400 to-blue-500',
        description: 'Fun facts about the world around us'
      }
    ]
  },
  {
    id: 'middle',
    name: 'Science Detective',
    ageRange: '11-13 years',
    character: '🧑‍🔬',
    questionCount: 20,
    description: 'Dive deeper into scientific mysteries!',
    subjects: [
      {
        id: 'physics',
        name: 'Physics',
        icon: '⚡',
        color: 'from-purple-400 to-pink-500',
        description: 'Forces, energy, and motion'
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        icon: '🧪',
        color: 'from-green-400 to-emerald-500',
        description: 'Atoms, molecules, and reactions'
      },
      {
        id: 'biology',
        name: 'Biology',
        icon: '🌱',
        color: 'from-emerald-400 to-teal-500',
        description: 'Living organisms and life processes'
      },
      {
        id: 'general-science-mid',
        name: 'General Science',
        icon: '🔬',
        color: 'from-cyan-400 to-blue-500',
        description: 'Comprehensive science knowledge'
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Space Pioneer',
    ageRange: '14-16 years',
    character: '👩‍🚀',
    questionCount: 35,
    description: 'Master advanced scientific concepts!',
    subjects: [
      {
        id: 'physics-advanced',
        name: 'Advanced Physics',
        icon: '⚛️',
        color: 'from-purple-400 to-indigo-500',
        description: 'Quantum mechanics and relativity'
      },
      {
        id: 'chemistry-advanced',
        name: 'Advanced Chemistry',
        icon: '⚗️',
        color: 'from-green-400 to-cyan-500',
        description: 'Organic chemistry and biochemistry'
      },
      {
        id: 'biology-advanced',
        name: 'Advanced Biology',
        icon: '🧬',
        color: 'from-teal-400 to-green-500',
        description: 'Genetics and molecular biology'
      },
      {
        id: 'space-science',
        name: 'Space Science',
        icon: '🚀',
        color: 'from-indigo-400 to-purple-500',
        description: 'Astronomy and space exploration'
      }
    ]
  }
]

// Sample questions for different subjects and age groups
export const quizQuestions: Record<string, QuizQuestion[]> = {
  'general-science': [
    {
      id: 'gs1',
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 2,
      explanation: 'Jupiter is the largest planet in our solar system, more than twice as massive as all other planets combined!',
      difficulty: 'easy',
      subject: 'general-science'
    },
    {
      id: 'gs2',
      question: 'Which gas do plants need to make their own food?',
      options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
      correctAnswer: 2,
      explanation: 'Plants use carbon dioxide from the air, along with water and sunlight, to make their own food through photosynthesis.',
      difficulty: 'easy',
      subject: 'general-science'
    },
    {
      id: 'gs3',
      question: 'How many bones are there in an adult human body?',
      options: ['186', '206', '226', '246'],
      correctAnswer: 1,
      explanation: 'An adult human has 206 bones. Babies are born with about 270 bones, but many fuse together as they grow.',
      difficulty: 'medium',
      subject: 'general-science'
    }
  ],
  'physics': [
    {
      id: 'ph1',
      question: 'What is the speed of light in vacuum?',
      options: ['300,000 km/s', '299,792,458 m/s', '150,000 km/s', '186,000 miles/s'],
      correctAnswer: 1,
      explanation: 'The speed of light in vacuum is exactly 299,792,458 meters per second, which is approximately 300,000 km/s.',
      difficulty: 'medium',
      subject: 'physics'
    },
    {
      id: 'ph2',
      question: 'Which law states that force equals mass times acceleration?',
      options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Law of Gravitation'],
      correctAnswer: 1,
      explanation: 'Newton\'s Second Law states that F = ma, where force equals mass times acceleration.',
      difficulty: 'medium',
      subject: 'physics'
    }
  ],
  'chemistry': [
    {
      id: 'ch1',
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
      explanation: 'Gold\'s chemical symbol is Au, which comes from the Latin word "aurum" meaning gold.',
      difficulty: 'easy',
      subject: 'chemistry'
    },
    {
      id: 'ch2',
      question: 'How many electrons can the first electron shell hold?',
      options: ['2', '4', '6', '8'],
      correctAnswer: 0,
      explanation: 'The first electron shell (K shell) can hold a maximum of 2 electrons.',
      difficulty: 'medium',
      subject: 'chemistry'
    }
  ],
  'biology': [
    {
      id: 'bi1',
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
      correctAnswer: 1,
      explanation: 'Mitochondria are called the powerhouse of the cell because they produce ATP, the energy currency of cells.',
      difficulty: 'easy',
      subject: 'biology'
    },
    {
      id: 'bi2',
      question: 'Which organ is responsible for producing insulin?',
      options: ['Liver', 'Pancreas', 'Kidney', 'Heart'],
      correctAnswer: 1,
      explanation: 'The pancreas produces insulin, which helps regulate blood sugar levels in the body.',
      difficulty: 'medium',
      subject: 'biology'
    }
  ],
  'space-science': [
    {
      id: 'ss1',
      question: 'What is a light-year?',
      options: ['The age of light', 'A unit of time', 'A unit of distance', 'The speed of light'],
      correctAnswer: 2,
      explanation: 'A light-year is the distance light travels in one year, approximately 9.46 trillion kilometers.',
      difficulty: 'hard',
      subject: 'space-science'
    },
    {
      id: 'ss2',
      question: 'Which is the closest star to Earth after the Sun?',
      options: ['Sirius', 'Proxima Centauri', 'Alpha Centauri A', 'Betelgeuse'],
      correctAnswer: 1,
      explanation: 'Proxima Centauri is the closest star to Earth after the Sun, located about 4.24 light-years away.',
      difficulty: 'hard',
      subject: 'space-science'
    }
  ]
}