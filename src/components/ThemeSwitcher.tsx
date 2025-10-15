'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Palette, Check, X } from 'lucide-react'

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTheme, setTheme, availableThemes } = useTheme()

  return (
    <div className="relative">
      {/* 按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all border border-gray-200"
      >
        <Palette size={20} />
        <span className="hidden sm:inline font-medium">主題</span>
      </button>

      {/* 面板 */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Palette size={20} />
                選擇主題
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(availableThemes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key)
                    setIsOpen(false)
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${currentTheme === key
                      ? 'border-gray-900 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <div className="flex gap-2 mb-3">
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: theme.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded-lg"
                      style={{ backgroundColor: theme.accent }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{theme.label}</span>
                    {currentTheme === key && (
                      <Check size={16} className="text-green-600" />
                    )}
                  </div>

                  <div
                    className={`mt-3 h-2 rounded-full bg-gradient-to-r ${theme.gradient}`}
                  />
                </button>
              ))}
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center">
              主題會自動保存到瀏覽器
            </p>
          </div>
        </>
      )}
    </div>
  )
}