'use client'

import { useTheme } from '@/contexts/ThemeContext'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Server, Zap, Shield, Users } from 'lucide-react'

export default function HomePage() {
  const { themeColors } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                }}
              >
                <Server className="text-white" size={24} />
              </div>
              <div>
                {/* 修正：使用 backgroundImage 而不是 background */}
                <h1
                  className="text-2xl font-bold"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                >
                  TAIWANFRP
                </h1>
                <p className="text-xs text-gray-500">內網穿透服務</p>
              </div>
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            免費內網穿透服務
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            立即架設 Minecraft 伺服器在自己的電腦上
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all"
              style={{
                backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
              }}
            >
              立即開始
            </button>
            <button
              className="px-8 py-4 rounded-xl font-bold border-2 transition-all hover:shadow-lg"
              style={{
                borderColor: themeColors.primary,
                color: themeColors.primary,
              }}
            >
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Zap />}
            title="快速設置"
            description="只需幾分鐘即可完成設置"
            color={themeColors.primary}
          />
          <FeatureCard
            icon={<Shield />}
            title="安全可靠"
            description="企業級安全保護"
            color={themeColors.secondary}
          />
          <FeatureCard
            icon={<Server />}
            title="穩定運行"
            description="99.9% 正常運行時間"
            color={themeColors.accent}
          />
          <FeatureCard
            icon={<Users />}
            title="免費使用"
            description="永久免費基礎服務"
            color={themeColors.primary}
          />
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16">
        <div
          className="rounded-3xl shadow-2xl p-8 text-white max-w-4xl mx-auto"
          style={{
            backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
          }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">即時統計</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value="1,234" label="活躍用戶" />
            <StatCard value="8" label="可用節點" />
            <StatCard value="99.9%" label="正常運行" />
            <StatCard value="24/7" label="技術支援" />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: color }}
      >
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  )
}