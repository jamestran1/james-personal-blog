'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { redirect, usePathname, useSearchParams } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const param = useSearchParams()
  const pathName = usePathname()
  const isEditMode = param.get('epieditmode') === 'true' || param.get('epieditmode') === 'false'
  if (isEditMode && pathName.includes('/ui/CMS/Content/en/,,')) {
    redirect('/?' + param.toString())
  }
  const opeSiteUrl = process.env.NEXT_PUBLIC_SITE_URL + "/Util/javascript/communicationinjector.js"
  return (
    <html lang="en">
      {isEditMode && (
        <script async src={opeSiteUrl}></script>
      )}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
