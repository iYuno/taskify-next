import LoginForm from '@/app/ui/loginForm';

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen ">
      <div className="relative flex w-[30vw] flex-col">
        <LoginForm />
      </div>
    </main>
  );
}
