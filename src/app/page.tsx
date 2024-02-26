import { redirect } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';
import { currentUser } from '@/app/lib/auth';
import { prisma } from '@/utils/prisma';
import { signOut } from '@/auth';

export default async function Page() {

  const user = await currentUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div >
        root page {user?.id}
      </div>
      <form action={async () => {
        'use server'
        if (user) {
          await signOut();
        } else {
          redirect('/auth/login');
        }
      }}>
        <button>{user ? 'sign out' : 'sign in'}</button>
      </form>
    </main>
  );
}
