import { redirect } from 'next/navigation';
import { signOut } from '@/auth';
import { currentUser } from '@/lib/auth';

export default async function Page() {

  const user = await currentUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        root page {user?.id}
      </div>
      <form action={async() => {
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
