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
  title: 'Dra. Sônis Paz | Fisioterapia Pélvica em Campo Grande - MS',
  description: 'Especialista em fisioterapia pélvica, reabilitação pós-cirurgia de próstata, incontinência urinária e dor pélvica crônica. Atendimento humanizado e discreto para homens e mulheres em Campo Grande - MS.',
  keywords: 'fisioterapia pélvica, incontinência urinária, dor pélvica, reabilitação próstata, fisioterapeuta Campo Grande, Dra Sônis Paz, assoalho pélvico, auriculoterapia, acupuntura, laser terapia',
  authors: [{ name: 'Dra. Sônis Paz' }],
  openGraph: {
    title: 'Dra. Sônis Paz | Fisioterapia Pélvica em Campo Grande',
    description: 'Recupere o controle do seu corpo com segurança e discrição. Atendimento especializado em fisioterapia pélvica para homens e mulheres.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Dra. Sônis Paz',
  },
  robots: {
    index: true,
    follow: true,
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
