import RegisterForm from '@/app/ui/registerForm';


export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen ">
      <div className="relative flex w-[30vw] flex-col">
        <RegisterForm />
      </div>
    </main>
  );
}
