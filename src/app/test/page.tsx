'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor, AlertTriangle } from 'lucide-react'

export default function BrowserThemeTest() {
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light')
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>('light')
  const [htmlClass, setHtmlClass] = useState('')

  useEffect(() => {
    // 檢測系統偏好
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemPreference(darkModeQuery.matches ? 'dark' : 'light')

    const checkStatus = () => {
      const root = document.documentElement
      const hasDark = root.classList.contains('dark')
      setCurrentMode(hasDark ? 'dark' : 'light')
      setHtmlClass(root.className)
    }

    checkStatus()
    const interval = setInterval(checkStatus, 500)

    return () => clearInterval(interval)
  }, [])

  const forceLight = () => {
    const root = document.documentElement
    root.classList.remove('dark')
    root.style.colorScheme = 'light'
    console.log('🌞 強制設置為淺色模式')
  }

  const forceDark = () => {
    const root = document.documentElement
    root.classList.add('dark')
    root.style.colorScheme = 'dark'
    console.log('🌙 強制設置為深色模式')
  }

  return (
    <div className="min-h-screen p-8 transition-colors duration-300
      bg-white dark:bg-gray-900">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* 警告橫幅 */}
        {systemPreference === 'dark' && (
          <div className="rounded-xl p-4 border-2
            bg-yellow-50 dark:bg-yellow-900/20
            border-yellow-400 dark:border-yellow-600">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold mb-1
                  text-yellow-900 dark:text-yellow-300">
                  ⚠️ 檢測到系統深色模式
                </h3>
                <p className="text-sm
                  text-yellow-800 dark:text-yellow-400">
                  你的系統/瀏覽器設置為深色模式。這可能會影響某些樣式的顯示。
                  但我們的 Dark Mode 切換應該能覆蓋系統設置。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 狀態面板 */}
        <div className="grid md:grid-cols-3 gap-4">

          {/* 系統偏好 */}
          <div className="rounded-xl p-6 border
            bg-gray-50 dark:bg-gray-800
            border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <Monitor size={24} className="text-gray-600 dark:text-gray-400" />
              <h3 className="font-bold
                text-gray-900 dark:text-white">
                系統偏好
              </h3>
            </div>
            <div className={`text-2xl font-bold ${systemPreference === 'dark'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-orange-600 dark:text-orange-400'
              }`}>
              {systemPreference === 'dark' ? '🌙 深色' : '☀️ 淺色'}
            </div>
          </div>

          {/* 當前模式 */}
          <div className="rounded-xl p-6 border
            bg-gray-50 dark:bg-gray-800
            border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              {currentMode === 'dark' ? (
                <Moon size={24} className="text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun size={24} className="text-gray-600 dark:text-gray-400" />
              )}
              <h3 className="font-bold
                text-gray-900 dark:text-white">
                當前模式
              </h3>
            </div>
            <div className={`text-2xl font-bold ${currentMode === 'dark'
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-green-600 dark:text-green-400'
              }`}>
              {currentMode === 'dark' ? '🌙 深色' : '☀️ 淺色'}
            </div>
          </div>

          {/* HTML Class */}
          <div className="rounded-xl p-6 border
            bg-gray-50 dark:bg-gray-800
            border-gray-200 dark:border-gray-700">
            <h3 className="font-bold mb-3
              text-gray-900 dark:text-white">
              HTML Class
            </h3>
            <code className="text-sm break-all
              text-gray-700 dark:text-gray-300">
              {htmlClass || '(empty)'}
            </code>
          </div>
        </div>

        {/* 手動控制 */}
        <div className="rounded-xl p-6 border
          bg-white dark:bg-gray-800
          border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4
            text-gray-900 dark:text-white">
            🎮 手動控制（測試用）
          </h2>
          <div className="flex gap-3">
            <button
              onClick={forceLight}
              className="flex-1 px-6 py-4 rounded-xl font-bold transition-all
                bg-gradient-to-r from-orange-400 to-yellow-400
                hover:from-orange-500 hover:to-yellow-500
                text-white shadow-lg"
            >
              ☀️ 強制淺色模式
            </button>
            <button
              onClick={forceDark}
              className="flex-1 px-6 py-4 rounded-xl font-bold transition-all
                bg-gradient-to-r from-blue-600 to-purple-600
                hover:from-blue-700 hover:to-purple-700
                text-white shadow-lg"
            >
              🌙 強制深色模式
            </button>
          </div>
          <p className="text-xs mt-3 text-center
            text-gray-500 dark:text-gray-400">
            這些按鈕會直接操作 DOM，繞過 React Context
          </p>
        </div>

        {/* 視覺測試區 */}
        <div className="rounded-xl p-6 border
          bg-white dark:bg-gray-800
          border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4
            text-gray-900 dark:text-white">
            🎨 視覺測試區
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* 測試卡片 1 */}
            <div className="p-6 rounded-xl border transition-colors
              bg-gray-50 dark:bg-gray-900
              border-gray-200 dark:border-gray-700">
              <h3 className="font-bold mb-2
                text-gray-900 dark:text-white">
                測試卡片 1
              </h3>
              <p className="text-sm
                text-gray-600 dark:text-gray-400">
                這張卡片的背景應該在淺色模式是灰色，深色模式是深灰色
              </p>
            </div>

            {/* 測試卡片 2 */}
            <div className="p-6 rounded-xl border transition-colors
              bg-blue-50 dark:bg-blue-900/30
              border-blue-200 dark:border-blue-800">
              <h3 className="font-bold mb-2
                text-blue-900 dark:text-blue-300">
                測試卡片 2
              </h3>
              <p className="text-sm
                text-blue-700 dark:text-blue-400">
                這張卡片的背景應該在淺色模式是淺藍色，深色模式是深藍色
              </p>
            </div>

            {/* 測試卡片 3 */}
            <div className="p-6 rounded-xl border transition-colors
              bg-green-50 dark:bg-green-900/30
              border-green-200 dark:border-green-800">
              <h3 className="font-bold mb-2
                text-green-900 dark:text-green-300">
                測試卡片 3
              </h3>
              <p className="text-sm
                text-green-700 dark:text-green-400">
                這張卡片的背景應該在淺色模式是淺綠色，深色模式是深綠色
              </p>
            </div>

            {/* 測試卡片 4 */}
            <div className="p-6 rounded-xl border transition-colors
              bg-purple-50 dark:bg-purple-900/30
              border-purple-200 dark:border-purple-800">
              <h3 className="font-bold mb-2
                text-purple-900 dark:text-purple-300">
                測試卡片 4
              </h3>
              <p className="text-sm
                text-purple-700 dark:text-purple-400">
                這張卡片的背景應該在淺色模式是淺紫色，深色模式是深紫色
              </p>
            </div>
          </div>
        </div>

        {/* 診斷結果 */}
        <div className="rounded-xl p-6 border
          bg-white dark:bg-gray-800
          border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4
            text-gray-900 dark:text-white">
            📊 診斷結果
          </h2>

          <div className="space-y-3">
            {systemPreference === currentMode ? (
              <div className="p-4 rounded-lg
                bg-yellow-50 dark:bg-yellow-900/20
                border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm
                  text-yellow-800 dark:text-yellow-400">
                  ⚠️ 當前模式 = 系統偏好
                  <br />
                  這可能表示 Dark Mode 切換沒有生效，或者剛好和系統設置一致。
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-lg
                bg-green-50 dark:bg-green-900/20
                border border-green-200 dark:border-green-800">
                <p className="text-sm
                  text-green-800 dark:text-green-400">
                  ✅ 當前模式 ≠ 系統偏好
                  <br />
                  這表示我們的 Dark Mode 切換成功覆蓋了系統設置！
                </p>
              </div>
            )}

            {currentMode === 'dark' && !htmlClass.includes('dark') ? (
              <div className="p-4 rounded-lg
                bg-red-50 dark:bg-red-900/20
                border border-red-200 dark:border-red-800">
                <p className="text-sm
                  text-red-800 dark:text-red-400">
                  ❌ 錯誤：顯示為深色但 HTML 沒有 dark class
                  <br />
                  這表示瀏覽器可能使用了系統設置，而不是我們的控制。
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-lg
                bg-blue-50 dark:bg-blue-900/20
                border border-blue-200 dark:border-blue-800">
                <p className="text-sm
                  text-blue-800 dark:text-blue-400">
                  ℹ️ HTML class 和顯示模式一致
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 修復建議 */}
        <div className="rounded-xl p-6 border
          bg-white dark:bg-gray-800
          border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4
            text-gray-900 dark:text-white">
            🔧 修復建議
          </h2>

          <ol className="space-y-3 text-sm
            text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
              <div>
                點擊上面的「強制淺色模式」按鈕，看看視覺測試區的卡片是否變色
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 dark:text-blue-400">2.</span>
              <div>
                然後點擊「強制深色模式」，再次觀察卡片是否變色
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
              <div>
                如果卡片能正常變色，說明 CSS 是正常的，問題在於 ThemeContext
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-blue-600 dark:text-blue-400">4.</span>
              <div>
                如果卡片不變色，可能是 globals.css 沒有正確載入或被其他樣式覆蓋
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}