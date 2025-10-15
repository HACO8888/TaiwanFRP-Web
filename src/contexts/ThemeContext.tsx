'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface ThemeColors {
  name: string
  label: string
  primary: string
  secondary: string
  accent: string
  gradient: string
  hover: string
}

export const themes: Record<string, ThemeColors> = {
  amber: {
    name: "amber",
    label: "琥珀金",
    primary: "#f59e0b",
    secondary: "#f97316",
    accent: "#fb923c",
    gradient: "from-amber-500 to-orange-500",
    hover: "hover:from-amber-600 hover:to-orange-600",
  },
  blue: {
    name: "blue",
    label: "海洋藍",
    primary: "#3b82f6",
    secondary: "#0ea5e9",
    accent: "#06b6d4",
    gradient: "from-blue-500 to-cyan-500",
    hover: "hover:from-blue-600 hover:to-cyan-600",
  },
  emerald: {
    name: "emerald",
    label: "翡翠綠",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#14b8a6",
    gradient: "from-emerald-500 to-teal-500",
    hover: "hover:from-emerald-600 hover:to-teal-600",
  },
  purple: {
    name: "purple",
    label: "紫羅蘭",
    primary: "#a855f7",
    secondary: "#9333ea",
    accent: "#c084fc",
    gradient: "from-purple-500 to-pink-500",
    hover: "hover:from-purple-600 hover:to-pink-600",
  },
  rose: {
    name: "rose",
    label: "玫瑰紅",
    primary: "#f43f5e",
    secondary: "#e11d48",
    accent: "#fb7185",
    gradient: "from-rose-500 to-pink-500",
    hover: "hover:from-rose-600 hover:to-pink-600",
  },
  indigo: {
    name: "indigo",
    label: "靛藍色",
    primary: "#6366f1",
    secondary: "#4f46e5",
    accent: "#818cf8",
    gradient: "from-indigo-500 to-purple-500",
    hover: "hover:from-indigo-600 hover:to-purple-600",
  },
  slate: {
    name: "slate",
    label: "石板灰",
    primary: "#64748b",
    secondary: "#475569",
    accent: "#94a3b8",
    gradient: "from-slate-500 to-gray-500",
    hover: "hover:from-slate-600 hover:to-gray-600",
  },
}

export const defaultTheme = "amber"

interface ThemeContextType {
  currentTheme: string
  themeColors: ThemeColors
  darkMode: boolean
  setTheme: (theme: string) => void
  toggleDarkMode: () => void
  availableThemes: typeof themes
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 初始化
  useEffect(() => {
    setMounted(true)

    // 讀取 localStorage
    const savedTheme = localStorage.getItem('taiwanfrp-theme')
    const savedDarkMode = localStorage.getItem('taiwanfrp-darkmode')

    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }

    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true')
    } else {
      // 檢查系統偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
    }
  }, [])

  // 應用主題
  useEffect(() => {
    if (!mounted) return

    const theme = themes[currentTheme]
    const root = document.documentElement

    // 設置 CSS 變數
    root.style.setProperty('--color-primary', theme.primary)
    root.style.setProperty('--color-secondary', theme.secondary)
    root.style.setProperty('--color-accent', theme.accent)

    // 設置 dark mode
    if (darkMode) {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
  }, [currentTheme, darkMode, mounted])

  const setTheme = (theme: string) => {
    if (themes[theme]) {
      setCurrentTheme(theme)
      localStorage.setItem('taiwanfrp-theme', theme)
    }
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('taiwanfrp-darkmode', String(newDarkMode))
  }

  const value = {
    currentTheme,
    themeColors: themes[currentTheme],
    darkMode,
    setTheme,
    toggleDarkMode,
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