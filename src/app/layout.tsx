import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/ui/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsApp Ranking - Analise seus Chats',
  description: 'Analise seus chats do WhatsApp e veja quem mais envia mensagens de forma segura e privada',
  keywords: ['whatsapp', 'ranking', 'chat', 'análise', 'mensagens', 'estatísticas', 'privado'],
  authors: [{ name: 'WhatsApp Ranking' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'WhatsApp Ranking - Analise seus Chats',
    description: 'Descubra quem mais envia mensagens no seu grupo do WhatsApp com análises detalhadas e seguras',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}