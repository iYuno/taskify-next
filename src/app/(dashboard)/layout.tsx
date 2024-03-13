import { ReactNode, Suspense } from 'react';
import Sidebar from '@/components/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import MainNavigation from '@/components/mainNavigation';

export default async function Layout({ children }: {children: ReactNode}) {

  return (
    <main className="grid grid-cols-12 gap-4">
      <div
        className="col-span-2 h-[100vh] gap-4 border-r border-gray-gray6 dark:border-darkGray-gray6 py-4 flex flex-col">
        <MainNavigation/>
        <p
          className="text-gray-gray11 pl-4 dark:text-darkGray-gray11 font-montserrat font-normal uppercase text-base"
        >Projects</p>
        <Suspense fallback={
          <div className="px-4 overflow-hidden h-full">
            <Skeleton className="h-full"/>
          </div>
        }>
          <Sidebar/>
        </Suspense>
        <div className="px-4">
          <button
            className="transition-all ease-out space-x-1 w-full flex justify-center py-1 items-center border border-gray-gray6 dark:border-darkGray-gray6 dark:hover:border-darkGray-gray11 hover:border-gray-gray11 cursor-pointer capitalize rounded-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                 className="size-4 dark:stroke-darkGray-gray12 stroke-gray-gray12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
            <p
              className="font-poppins max-w-max ease-out text-xs font-normal w-full text-gray-gray12 dark:text-darkGray-gray12"
            >
              add new
            </p>
          </button>
        </div>
      </div>
      <div className="col-span-10 py-4 space-y-3 pr-4">
        {children}
      </div>
    </main>
  );
}
