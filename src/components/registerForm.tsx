'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';
import { Check } from '@/components/ui/check';
import { signUp, validEmail, validPassword } from '@/lib/actions';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const router = useRouter()
  const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>(undefined)
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | undefined>(undefined)

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: '/home',
    }).catch((err) => {
      console.log(err)
    });
  }

  const emailHandler = useDebouncedCallback(async(email: string) => {
    setIsEmailValid(await validEmail(email))
  }, 700)

  const passwordHandler = useDebouncedCallback(async(password: string) => {
    setIsPasswordValid(await validPassword(password))
  }, 700)

  const onSubmit = (data: FormData, callbackUrl: string) => {
    startTransition(() => {
      signUp(data, callbackUrl)
        .then((result) => {
          setError(result.error)
          return result.success
        })
        .then((final) => {
          setSuccess(final)
          if (final === true) {
            setTimeout(() => {
              router.push('/auth/login')
            }, 750)
          }
        })
    })
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mainText mb-10">
        Sign up for Flawless
      </h1>
      {
        error && (
          <p className={'text-rose-500 text-center'}>
            {error}
          </p>
        )
      }
      <button
        className="flex w-full authButton space-x-4 font-semibold"
        onClick={() => onClick('github')}
      >
        <FaGithub className="h-5 w-5 fill-neutral-950 dark:fill-neutral-50"/>
        <p className="mainText">Continue with GitHub</p>
      </button>
      <div className="w-full text-center">
        <p className="mainText dark:text-neutral-700">or</p>
      </div>
      <form className="space-y-4"
            action={(data) => onSubmit(data, '/auth/login')}>
        <div className="w-full space-y-4 mb-4">
          <div className="relative">
            <input
              className="peer authButton font-normal pl-3 pr-10 outline-2"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(event) => emailHandler(event.target.value)}
              required
            />
            <Check isCheck={isEmailValid}/>
          </div>
          <div className="relative">
            <input
              className="peer authButton font-normal pl-3 pr-10"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
              onChange={(event) => passwordHandler(event.target.value)}
            />
            <Check isCheck={isPasswordValid}/>
          </div>
        </div>
        <button
          className="w-full py-3 transition-all ease-out rounded-md bg-rose-600 hover:bg-rose-500 text-neutral-50 font-semibold"
          type="submit"
          aria-disabled={isPending}>
          {isPending ? 'Loading' : 'Sign Up'}
        </button>
      </form>
      <div className={'flex justify-center'}>
        <p className={'mainText'}>Already have an account? &nbsp;</p>
        <Link href={'/auth/login'}
              className={'transition-all ease-out text-emerald-500 hover:text-emerald-400 font-medium'}>
          Log in
        </Link>
      </div>
    </>
  );
}
