'use client'

import { useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Server, Menu, X, LogIn, UserPlus, LogOut, Settings, Sun, Moon, Palette, Check } from 'lucide-react'

interface HeaderProps {
  isLoggedIn?: boolean
  username?: string
  onLogin?: () => void
  onRegister?: () => void
  onLogout?: () => void
  onEditProxy?: () => void
}

export default function Header({
  isLoggedIn = false,
  username = 'User123',
  onLogin,
  onRegister,
  onLogout,
  onEditProxy
}: HeaderProps) {
  // 🚨 關鍵修改：使用真實的 ThemeContext
  const { themeColors, darkMode, toggleDarkMode, currentTheme, setTheme, availableThemes } = useTheme()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)

  const navItems = [
    { label: '首頁', href: '#home' },
    { label: '服務介紹', href: '#services' },
    { label: '軟體下載', href: '#download' },
    { label: '教學影片', href: '#tutorial' },
    { label: '狀態監控', href: 'https://status.taiwanfrp.me', external: true }
  ]

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300
      bg-white/80 dark:bg-gray-900/80 
      border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo 區域 */}
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                backgroundImage: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.secondary})`,
              }}
            >
              <Server className="text-white" size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1
                className="text-xl font-bold tracking-tight"
                style={{
                  backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                TAIWANFRP
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                免費內網穿透
              </p>
            </div>
          </div>

          {/* 桌面導覽列 */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="px-4 py-2 rounded-lg font-medium transition-all relative group
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {item.label}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300 rounded-full"
                  style={{ backgroundColor: themeColors.primary }}
                />
              </a>
            ))}
          </nav>

          {/* 右側操作區 */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-lg transition-all
                hover:bg-gray-100 dark:hover:bg-gray-800
                text-gray-700 dark:text-gray-300"
              aria-label="切換明暗模式"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="p-2.5 rounded-lg transition-all
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  text-gray-700 dark:text-gray-300"
                aria-label="切換主題"
              >
                <Palette size={20} />
              </button>

              {themeMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setThemeMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-2xl shadow-2xl border p-4
                    bg-white dark:bg-gray-800
                    border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-bold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <Palette size={16} />
                      選擇主題色
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(availableThemes).map(([key, theme]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setTheme(key)
                            setThemeMenuOpen(false)
                          }}
                          className={`p-3 rounded-xl border-2 transition-all ${currentTheme === key
                              ? 'border-gray-900 dark:border-gray-100 shadow-lg'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                        >
                          <div className="flex gap-1.5 mb-2">
                            <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: theme.primary }} />
                            <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: theme.secondary }} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-xs text-gray-900 dark:text-white">
                              {theme.label}
                            </span>
                            {currentTheme === key && <Check size={14} className="text-green-500" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 分隔線 */}
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1" />

            {/* 用戶操作 */}
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                  bg-gray-100 dark:bg-gray-800">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {username}
                  </span>
                </div>

                <button
                  onClick={onEditProxy}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                  }}
                >
                  <Settings size={18} />
                  編輯代理
                </button>

                <button
                  onClick={onLogout}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-colors
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut size={18} />
                  登出
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLogin}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-colors
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogIn size={18} />
                  登入
                </button>

                <button
                  onClick={onRegister}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                  }}
                >
                  <UserPlus size={18} />
                  註冊
                </button>
              </>
            )}
          </div>

          {/* 移動端選單按鈕 */}
          <button
            className="lg:hidden p-2.5 rounded-xl transition-colors
              hover:bg-gray-100 dark:hover:bg-gray-800
              text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="選單"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 移動端選單 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t backdrop-blur-xl
          bg-white/95 dark:bg-gray-900/95
          border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-6">

            {/* 移動端導覽 */}
            <nav className="space-y-1 mb-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="block px-4 py-3 rounded-xl font-medium transition-colors
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* 移動端設置 */}
            <div className="mb-6 px-4 space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                  {darkMode ? '深色模式' : '淺色模式'}
                </span>
                <button
                  onClick={toggleDarkMode}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  style={{ backgroundColor: darkMode ? themeColors.primary : '#d1d5db' }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Palette size={18} />
                  主題色
                </span>
                <div className="flex gap-1">
                  {Object.entries(availableThemes).slice(0, 5).map(([key, theme]) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${currentTheme === key
                          ? 'border-gray-900 dark:border-white scale-110'
                          : 'border-transparent'
                        }`}
                      style={{ backgroundColor: theme.primary }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 移動端操作按鈕 */}
            <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-800">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl
                    bg-gray-100 dark:bg-gray-800">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      歡迎，{username}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onEditProxy?.()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white shadow-lg"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                    }}
                  >
                    <Settings size={20} />
                    編輯我的代理
                  </button>

                  <button
                    onClick={() => {
                      onLogout?.()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors
                      text-gray-700 dark:text-gray-300
                      bg-gray-100 dark:bg-gray-800
                      hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <LogOut size={20} />
                    登出
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLogin?.()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors
                      text-gray-700 dark:text-gray-300
                      bg-gray-100 dark:bg-gray-800
                      hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <LogIn size={20} />
                    登入
                  </button>

                  <button
                    onClick={() => {
                      onRegister?.()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white shadow-lg"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                    }}
                  >
                    <UserPlus size={20} />
                    註冊
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}