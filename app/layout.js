import './globals.css'

export const metadata = {
  title: 'Mortalité Maternelle au Kenya — Enquête 2022',
  description: 'Une enquête de datajournalisme sur les inégalités de mortalité maternelle au Kenya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}