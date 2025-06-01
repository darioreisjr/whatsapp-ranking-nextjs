import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/ui/Navigation'
import { PWAInstallPrompt } from '@/components/PWA/PWAInstallPrompt'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsApp Ranking - Analise seus Chats',
  description: 'Analise seus chats do WhatsApp e veja quem mais envia mensagens de forma segura e privada',
  keywords: ['whatsapp', 'ranking', 'chat', 'análise', 'mensagens', 'estatísticas', 'privado', 'pwa'],
  authors: [{ name: 'WhatsApp Ranking' }],
  generator: 'Next.js',
  manifest: '/manifest.json',
  openGraph: {
    title: 'WhatsApp Ranking - Analise seus Chats',
    description: 'Descubra quem mais envia mensagens no seu grupo do WhatsApp com análises detalhadas e seguras',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'WhatsApp Ranking Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Ranking - Analise seus Chats',
    description: 'Descubra quem mais envia mensagens no seu grupo do WhatsApp',
    images: ['/icons/icon-512x512.png']
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WhatsApp Ranking',
  },
  applicationName: 'WhatsApp Ranking',
  category: 'productivity'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#059669' },
    { media: '(prefers-color-scheme: dark)', color: '#059669' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="WhatsApp Ranking" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WhatsApp Ranking" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />

        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#059669" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Microsoft */}
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />

        {/* Splashscreens */}
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/apple-splash-2048-2732.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/apple-splash-1668-2224.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/apple-splash-1536-2048.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/apple-splash-1125-2436.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/apple-splash-1242-2208.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/apple-splash-750-1334.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/splashscreens/apple-splash-640-1136.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <PWAInstallPrompt />
      </body>
    </html>
  )
}