'use server'
import { ReactNode, Suspense } from 'react';
import Sidebar from '@/components/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import MainNavigation from '@/components/mainNavigation';
import { Plus } from 'lucide-react';
import { currentUser } from '@/lib/auth';

export default async function Layout({ children }: {children: ReactNode}) {


  return (
    <main className="grid grid-cols-12 gap-4">
      <Suspense fallback={<p>123...</p>}>
        <Sidebar/>
      </Suspense>
      <div className="col-span-10 py-4 space-y-2 pr-4">
        {children}
      </div>
    </main>
  );
}
