import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsApp Ranking - Analise seus Chats',
  description: 'Analise seus chats do WhatsApp e veja quem mais envia mensagens',
  keywords: ['whatsapp', 'ranking', 'chat', 'análise', 'mensagens'],
  authors: [{ name: 'Seu Nome' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}