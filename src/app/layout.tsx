import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Montserrat, Lexend } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata: Metadata = {
  title: 'Taskify',
  description: 'Task-manager app',
  metadataBase: new URL('http://localhost:3000')
};

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="en" className={`${montserrat.variable} ${lexend.variable}`}>
      <body className={'bg-background'}>{children}</body>
      </html>
    </SessionProvider>
  );
}
