import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GameStateProvider } from '@/contexts/GameStateContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lumos Learn ✨ - Gamified Learning Platform',
  description: 'An interactive gamified learning platform for science education with neon futuristic design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.className} bg-gray-900 overflow-x-hidden`}>
        <GameStateProvider>
          {children}
        </GameStateProvider>
      </body>
    </html>
  )
}