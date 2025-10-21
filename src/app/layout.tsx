import { ThemeProvider } from '@/contexts/ThemeContext'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="zh-TW">
      <body>
        <SessionProvider session={session}>
          <ThemeProvider>
            <div className="min-h-screen transition-colors duration-300
              bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50
              dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

              <Header />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}