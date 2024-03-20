import { ReactNode, Suspense } from 'react';
import Sidebar from '@/components/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import MainNavigation from '@/components/mainNavigation';
import { Plus } from 'lucide-react';

export default async function Layout({ children }: {children: ReactNode}) {

  return (
    <main className="grid grid-cols-12 gap-4">
      <div
        className="col-span-2 h-[100vh] gap-4 border-r border-neutral-300 dark:border-neutral-800 py-4 flex flex-col">
        <MainNavigation/>
        <p
          className="text-neutral-950 pl-4 dark:text-neutral-400 font-montserrat font-normal uppercase text-base"
        >Projects</p>
        <Suspense fallback={
          <div className="px-4 h-full">
            <Skeleton className="h-full"/>
          </div>
        }>
          <Sidebar/>
        </Suspense>
        <div className="px-4">
          <button
            className="transition-all ease-out space-x-1 w-full flex justify-center items-center interactiveButton bg-transparent"
          >
            <Plus className="size-4 stroke-2 stroke-current"/>
            <p
              className="font-poppins max-w-max ease-out text-xs font-normal w-full text-neutral-950 dark:text-neutral-50"
            >
              add new
            </p>
          </button>
        </div>
      </div>
      <div className="col-span-10 py-4 space-y-2 pr-4">
        {children}
      </div>
    </main>
  );
}
