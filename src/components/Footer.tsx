'use client'

import { useTheme } from '@/contexts/ThemeContext'

export default function Footer() {
  const { themeColors } = useTheme()

  return (
    <footer className="border-t py-8
      bg-white dark:bg-gray-800
      border-gray-100 dark:border-gray-700">
      <div className="container mx-auto px-4 text-center
        text-gray-600 dark:text-gray-400">
        <p className="mb-4">powered by kiwi071294</p>
        <div className="flex justify-center gap-6 text-sm">
          <a
            href="#"
            className="transition-colors hover:underline"
            onMouseEnter={(e) => e.currentTarget.style.color = themeColors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            隱私權政策
          </a>
          <a
            href="#"
            className="transition-colors hover:underline"
            onMouseEnter={(e) => e.currentTarget.style.color = themeColors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            服務條款
          </a>
          <a
            href="#"
            className="transition-colors hover:underline"
            onMouseEnter={(e) => e.currentTarget.style.color = themeColors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ''}
          >
            管理員中心
          </a>
        </div>
      </div>
    </footer>
  )
}