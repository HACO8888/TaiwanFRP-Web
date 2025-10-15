'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { themes, defaultTheme, type ThemeColors } from '@/lib/theme-config'

interface ThemeContextType {
  currentTheme: string
  themeColors: ThemeColors
  setTheme: (theme: string) => void
  availableThemes: typeof themes
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // 從 localStorage 讀取主題
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('taiwanfrp-theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  // 更新 CSS 變數
  useEffect(() => {
    if (!mounted) return

    const theme = themes[currentTheme]
    const root = document.documentElement

    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-secondary', theme.secondary)
    root.style.setProperty('--color-accent', theme.accent)
  }, [currentTheme, mounted])

  const setTheme = (theme: string) => {
    if (themes[theme]) {
      setCurrentTheme(theme)
      localStorage.setItem('taiwanfrp-theme', theme)
    }
  }

  const value = {
    currentTheme,
    themeColors: themes[currentTheme],
    setTheme,
    availableThemes: themes,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}