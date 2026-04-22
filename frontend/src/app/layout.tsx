import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Cargar la fuente Inter desde Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'LyG Indumentaria Deportiva | Catálogo',
  description: 'Catálogo SaaS de ropa deportiva femenina y accesorios.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable}`}>
      <head>
        {/* Usamos el CDN para material symbols ya que es lo más directo basado en el HTML */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,24&display=swap" rel="stylesheet" />
      </head>
      {/* 
        bg-background-light dark:bg-background-dark es la configuración base 
        usada tanto en index.html como catalog.html
      */}
      <body className={`bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
