import { ReactNode } from 'react';
import ThemeButton from '@/components/ui/themeButton';

export default async function Layout({ children }: {children: ReactNode}) {

  return (
    <main className="flex items-center justify-center md:h-screen relative">
      <div className="relative flex w-[30vw] flex-col">
        <div
          className="dark:bg-darkGray-gray3 bg-gray-gray3 px-6 py-12 space-y-4 border border-gray-gray6 dark:border-darkGray-gray6 rounded-sm"
        >
          {children}
        </div>
      </div>
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton/>
      </div>
    </main>
  );
}
