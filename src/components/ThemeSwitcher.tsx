'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Palette, Check, X, Sun, Moon } from 'lucide-react'

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentTheme, darkMode, setTheme, toggleDarkMode, availableThemes } = useTheme()

  return (
    <div className="relative">
      {/* 主題按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          text-gray-700 dark:text-gray-300"
        aria-label="主題設置"
      >
        <Palette size={20} />
        <span className="hidden sm:inline font-medium">主題</span>
      </button>

      {/* 主題面板 */}
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* 主題選擇面板 */}
          <div className="absolute right-0 top-full mt-2 z-50 w-80 rounded-2xl shadow-2xl border p-6
            bg-white dark:bg-gray-800
            border-gray-200 dark:border-gray-700
            animate-scale-in">

            {/* 標題列 */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold flex items-center gap-2
                text-gray-900 dark:text-white">
                <Palette size={20} />
                主題設置
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-colors
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  text-gray-500 dark:text-gray-400"
                aria-label="關閉"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dark Mode 切換 */}
            <div className="mb-5 p-4 rounded-xl
              bg-gray-50 dark:bg-gray-900/50
              border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? (
                    <Moon size={20} className="text-gray-700 dark:text-gray-300" />
                  ) : (
                    <Sun size={20} className="text-gray-700 dark:text-gray-300" />
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {darkMode ? '深色模式' : '淺色模式'}
                  </span>
                </div>

                {/* Toggle Switch */}
                <button
                  onClick={toggleDarkMode}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  style={{
                    backgroundColor: darkMode ? 'var(--color-primary)' : '#d1d5db',
                  }}
                  aria-label="切換明暗模式"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>
            </div>

            {/* 顏色主題選擇 */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                選擇顏色主題
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(availableThemes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTheme(key)
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${currentTheme === key
                        ? 'border-gray-900 dark:border-gray-100 shadow-lg scale-105'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                  >
                    {/* 顏色預覽 */}
                    <div className="flex gap-2 mb-3">
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm"
                        style={{ backgroundColor: theme.secondary }}
                      />
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm"
                        style={{ backgroundColor: theme.accent }}
                      />
                    </div>

                    {/* 主題名稱 */}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">
                        {theme.label}
                      </span>
                      {currentTheme === key && (
                        <Check size={16} className="text-green-600 dark:text-green-400" />
                      )}
                    </div>

                    {/* 漸層預覽 */}
                    <div
                      className="mt-3 h-2 rounded-full"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 提示文字 */}
            <p className="mt-5 pt-4 text-xs text-center border-t
              text-gray-500 dark:text-gray-400
              border-gray-200 dark:border-gray-700">
              🎨 設置會自動保存到瀏覽器
            </p>
          </div>
        </>
      )}
    </div>
  )
}