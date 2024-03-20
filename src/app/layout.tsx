import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Montserrat, Poppins } from 'next/font/google'
import { Providers } from '@/app/providers';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
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
      <html lang="en" className={`${montserrat.variable}`} suppressHydrationWarning>
      <body className={'dark:bg-neutral-900 bg-neutral-50'}>
      <Providers>{children}</Providers>
      </body>
      </html>
    </SessionProvider>
  );
}
