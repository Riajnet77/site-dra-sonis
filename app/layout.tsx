import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({ 
  subsets: ["latin"],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dra. Sonis Paz | Fisioterapia Pelvica em Campo Grande',
  description: 'Especialista em fisioterapia pelvica, reabilitacao pos-cirurgia de prostata, incontinencia urinaria e dor pelvica. Atendimento humanizado e discreto para homens e mulheres.',
  keywords: 'fisioterapia pelvica, incontinencia urinaria, dor pelvica, reabilitacao prostata, fisioterapeuta Campo Grande, Dra Sonis Paz',
  authors: [{ name: 'Dra. Sonis Paz' }],
  openGraph: {
    title: 'Dra. Sonis Paz | Fisioterapia Pelvica',
    description: 'Recupere o controle do seu corpo com seguranca e discricao. Atendimento especializado em fisioterapia pelvica.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#a89968',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${lato.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
