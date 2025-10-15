'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import Header from '@/components/Header'
import {
  Server, Zap, Shield, Users, Download, Globe,
  Activity, TrendingUp, ChevronRight, Info, UserPlus
} from 'lucide-react'

// 類型定義
interface ThemeColors {
  primary: string
  secondary: string
  accent: string
}

interface Stats {
  totalClients: number
  totalConnections: number
  trafficIn: string
  trafficOut: string
  tcpProxies: number
  udpProxies: number
}

interface ServerData {
  name: string
  status: 'online' | 'offline'
  load: 'best' | 'normal' | 'busy'
}

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'white-outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  themeColors?: ThemeColors
  onClick?: () => void
}

interface StatCardProps {
  icon: React.ReactNode
  value: number | string
  label: string
}

interface ServerCardProps {
  server: ServerData
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  themeColors: ThemeColors
}

interface DownloadCardProps {
  platform: string
  icon: string
  themeColors: ThemeColors
}

interface FooterLinkProps {
  children: React.ReactNode
  themeColors: ThemeColors
}

export default function TaiwanFRPPage() {
  const { themeColors } = useTheme()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [servers, setServers] = useState<ServerData[]>([])
  const [stats, setStats] = useState<Stats>({
    totalClients: 25,
    totalConnections: 12,
    trafficIn: '72.40 MB',
    trafficOut: '3.14 GB',
    tcpProxies: 38,
    udpProxies: 39
  })

  // 模擬伺服器資料
  useEffect(() => {
    setServers([
      { name: 'Lazco Cloud TPE1', status: 'online', load: 'best' },
      { name: '日本大阪', status: 'online', load: 'best' },
      { name: '台北中華電信', status: 'online', load: 'normal' },
      { name: '台中中華電信', status: 'online', load: 'best' },
      { name: '美國奧勒岡(google抗攻擊)', status: 'online', load: 'best' },
      { name: '台北凱擘大寬頻', status: 'online', load: 'best' },
      { name: '美國洛杉磯Frontier', status: 'online', load: 'best' },
      { name: '台南中華電信', status: 'online', load: 'busy' }
    ])
  }, [])

  const handleLogin = (): void => {
    console.log('跳轉到登入頁')
    // 實際應用中：router.push('/login')
  }

  const handleRegister = (): void => {
    console.log('跳轉到註冊頁')
    // 實際應用中：router.push('/register')
  }

  const handleLogout = (): void => {
    setIsLoggedIn(false)
    setUsername('')
    console.log('登出成功')
  }

  const handleEditProxy = (): void => {
    console.log('跳轉到編輯代理頁')
    // 實際應用中：router.push('/edit')
  }

  return (
    <div className="min-h-screen transition-colors duration-300
      bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50
      dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        onEditProxy={handleEditProxy}
      />

      {/* 主要內容 */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        {!isLoggedIn && (
          <section className="py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight
                text-gray-900 dark:text-white">
                免費內網穿透服務
              </h2>
              <p className="text-xl mb-8
                text-gray-600 dark:text-gray-300">
                立即架設 Minecraft 伺服器在自己的電腦上
                <br />
                無需設定路由器，支援 TCP/UDP 協定
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" icon={<UserPlus size={20} />} themeColors={themeColors} onClick={handleRegister}>
                  立即註冊
                </Button>
                <Button variant="outline" size="lg" icon={<Info size={20} />} themeColors={themeColors}>
                  了解更多
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* 統計卡片 */}
        <section className="mb-12">
          <div
            className="rounded-3xl shadow-2xl p-8 text-white"
            style={{
              backgroundImage: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
            }}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">TAIWANFRP 總量統計</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <StatCard icon={<Users />} value={stats.totalClients} label="在線客戶端" />
              <StatCard icon={<Activity />} value={stats.totalConnections} label="建立連接" />
              <StatCard icon={<TrendingUp />} value={stats.trafficIn} label="入網流量" />
              <StatCard icon={<TrendingUp />} value={stats.trafficOut} label="出網流量" />
              <StatCard icon={<Server />} value={stats.tcpProxies} label="TCP 代理" />
              <StatCard icon={<Server />} value={stats.udpProxies} label="UDP 代理" />
            </div>
          </div>
        </section>

        {/* 伺服器狀態 */}
        <section className="mb-12">
          <div className="rounded-3xl shadow-xl p-8
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold
                text-gray-900 dark:text-white">
                內網穿透伺服器狀態
              </h3>
              <a
                href="#"
                className="text-sm hover:opacity-80 flex items-center gap-1"
                style={{ color: themeColors.primary }}
              >
                該選哪個？ <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {servers.map((server: ServerData, index: number) => (
                <ServerCard key={index} server={server} />
              ))}
            </div>
          </div>
        </section>

        {/* 功能介紹 */}
        <section className="mb-12">
          <div className="rounded-3xl shadow-xl p-8
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-2 text-center
              text-gray-900 dark:text-white">
              服務特色
            </h3>
            <p className="font-bold text-center mb-8
              text-red-600 dark:text-red-400">
              注意：所有伺服器都運行在您的電腦上，我們僅提供內網穿透服務
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Zap />}
                title="快速設置"
                description="無需設定路由器，簡化所有操作，幾分鐘即可完成設置"
                themeColors={themeColors}
              />
              <FeatureCard
                icon={<Shield />}
                title="安全可靠"
                description="支援 4G/5G 行動網路及台灣各大寬頻，無需擔心防火牆"
                themeColors={themeColors}
              />
              <FeatureCard
                icon={<Server />}
                title="穩定運行"
                description="同時支援 TCP 與 UDP 流量轉發，確保伺服器穩定運行"
                themeColors={themeColors}
              />
              <FeatureCard
                icon={<Users />}
                title="完全免費"
                description="免費服務，專為沒有公網 IP 的用戶設計"
                themeColors={themeColors}
              />
            </div>
          </div>
        </section>

        {/* 下載區域 */}
        <section className="mb-12">
          <div className="rounded-3xl shadow-xl p-8
            bg-white dark:bg-gray-800
            border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center
              text-gray-900 dark:text-white">
              軟體下載
            </h3>
            <p className="text-center mb-8
              text-gray-600 dark:text-gray-300">
              選擇您的作業系統下載對應的軟體版本
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <DownloadCard platform="Windows" icon="🪟" themeColors={themeColors} />
              <DownloadCard platform="Linux (ARM)" icon="🐧" themeColors={themeColors} />
              <DownloadCard platform="Linux (x86_64)" icon="🐧" themeColors={themeColors} />
              <DownloadCard platform="macOS (M1以上)" icon="🍎" themeColors={themeColors} />
              <DownloadCard platform="macOS (Intel晶片)" icon="🍎" themeColors={themeColors} />
            </div>
            <div className="mt-6 p-4 rounded-xl border
              bg-orange-50 dark:bg-orange-900/20
              border-orange-200 dark:border-orange-800">
              <p className="text-sm mb-2
                text-gray-700 dark:text-gray-300">
                <strong>Linux 和 macOS 使用說明：</strong>
              </p>
              <p className="text-sm
                text-gray-600 dark:text-gray-400">
                下載完畢後，請先 cd 到該目錄下執行{' '}
                <code className="px-2 py-1 rounded
                  bg-gray-800 dark:bg-gray-700
                  text-white dark:text-gray-200">
                  chmod +x taiwanfrp
                </code>{' '}
                再執行{' '}
                <code className="px-2 py-1 rounded
                  bg-gray-800 dark:bg-gray-700
                  text-white dark:text-gray-200">
                  ./taiwanfrp
                </code>
              </p>
            </div>
            <p className="text-sm font-bold text-center mt-6
              text-red-600 dark:text-red-400">
              * 軟體需搭配帳號使用，請先<a href="#" className="underline">註冊帳號</a> *
            </p>
          </div>
        </section>

        {/* 聯絡方式 */}
        <section className="mb-12">
          <div
            className="rounded-3xl shadow-xl p-8 text-white text-center"
            style={{
              backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
            }}
          >
            <h3 className="text-2xl font-bold mb-4">需要協助？</h3>
            <p className="mb-6">加入我們的 Discord 社群或發送郵件聯絡我們</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="white-outline" icon={<Users size={20} />}>
                加入 Discord
              </Button>
              <Button variant="white-outline" icon={<Globe size={20} />}>
                發送郵件
              </Button>
            </div>
            <div className="mt-6 text-sm opacity-90">
              <p>📧 kiwi071294@gmail.com</p>
              <p>💬 Discord: discord.gg/83AFn92DbX</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8
        bg-white dark:bg-gray-800
        border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center
          text-gray-600 dark:text-gray-400">
          <p className="mb-4">powered by kiwi071294</p>
          <div className="flex justify-center gap-6 text-sm">
            <FooterLink themeColors={themeColors}>隱私權政策</FooterLink>
            <FooterLink themeColors={themeColors}>服務條款</FooterLink>
            <FooterLink themeColors={themeColors}>管理員中心</FooterLink>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 輔助組件
function Button({ children, variant = 'primary', size = 'md', icon, themeColors, onClick }: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-2 rounded-xl font-semibold transition-all'

  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        return `shadow-lg hover:shadow-xl`
      case 'secondary':
        return 'text-white shadow-lg hover:shadow-xl bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600'
      case 'outline':
        return 'border-2 hover:bg-opacity-10 shadow-lg hover:shadow-xl'
      case 'ghost':
        return 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      case 'white':
        return 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg hover:shadow-xl'
      case 'white-outline':
        return 'border-2 border-white text-white hover:bg-white/10'
      default:
        return ''
    }
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const getStyles = (): React.CSSProperties => {
    if (variant === 'primary' && themeColors) {
      return {
        backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
        color: 'white'
      }
    } else if (variant === 'outline' && themeColors) {
      return {
        borderColor: themeColors.primary,
        color: themeColors.primary
      }
    } else if (variant === 'white' && themeColors) {
      return {
        color: themeColors.primary
      }
    }
    return {}
  }

  return (
    <button
      className={`${baseStyles} ${getVariantStyles()} ${sizes[size]}`}
      style={getStyles()}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2 opacity-90">{icon}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  )
}

function ServerCard({ server }: ServerCardProps) {
  const statusColors: Record<string, string> = {
    online: 'bg-green-500',
    offline: 'bg-red-500'
  }

  const loadColors: Record<string, string> = {
    best: 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30',
    normal: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/30',
    busy: 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30'
  }

  const loadLabels: Record<string, string> = {
    best: '最流暢',
    normal: '普通',
    busy: '最忙碌'
  }

  return (
    <div className="rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer
      bg-gray-50 dark:bg-gray-900/50
      border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm
          text-gray-900 dark:text-white">
          {server.name}
        </h4>
        <div className={`w-3 h-3 rounded-full ${statusColors[server.status]} animate-pulse`} />
      </div>
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${loadColors[server.load]}`}>
        {loadLabels[server.load]}
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, themeColors }: FeatureCardProps) {
  return (
    <div className="text-center p-6 rounded-xl transition-colors
      hover:bg-gray-50 dark:hover:bg-gray-900/50">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{
          backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
        }}
      >
        <div className="text-white">{icon}</div>
      </div>
      <h4 className="font-bold text-lg mb-2
        text-gray-900 dark:text-white">
        {title}
      </h4>
      <p className="text-sm
        text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}

function DownloadCard({ platform, icon, themeColors }: DownloadCardProps) {
  return (
    <a
      href="#"
      className="flex items-center justify-between p-4 rounded-xl border-2 border-transparent transition-all group
        bg-gray-50 dark:bg-gray-900/50
        hover:bg-opacity-80"
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.borderColor = themeColors.primary
        e.currentTarget.style.backgroundColor = `${themeColors.primary}10`
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.borderColor = 'transparent'
        e.currentTarget.style.backgroundColor = ''
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
          style={{
            backgroundImage: `linear-gradient(to right, ${themeColors.primary}, ${themeColors.secondary})`,
          }}
        >
          {icon}
        </div>
        <span className="font-semibold
          text-gray-900 dark:text-white">
          {platform}
        </span>
      </div>
      <ChevronRight
        className="transition-opacity group-hover:opacity-100
          text-gray-400 dark:text-gray-500"
        style={{ opacity: 0.5 }}
      />
    </a>
  )
}

function FooterLink({ children, themeColors }: FooterLinkProps) {
  return (
    <a
      href="#"
      className="transition-colors hover:underline"
      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = themeColors.primary}
      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.color = ''}
    >
      {children}
    </a>
  )
}