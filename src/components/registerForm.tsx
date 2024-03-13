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
          <p className={'text-red-500 text-center'}>
            {error}
          </p>
        )
      }
      <button

        className="flex w-full"
        onClick={() => onClick('github')}
      >
        <div
          className="authButton space-x-4 font-semibold">
          <FaGithub className="size-5 dark:fill-darkGray-gray12 fill-gray-gray12"/>
          <p className="mainText">Continue with GitHub</p>
        </div>
      </button>
      <div className="w-full text-center">
        <p className="mainText dark:text-darkGray-gray8">or</p>
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
          className="w-full py-3 transition-all ease-out rounded-sm bg-blue-blue9 hover:bg-blue-blue10 text-darkGray-gray12 font-semibold"
          type="submit"
          aria-disabled={isPending}>
          {isPending ? 'Loading' : 'Sign Up'}
        </button>
      </form>
      <div className={'flex justify-center'}>
        <p className={'mainText'}>Already have an account? &nbsp;</p>
        <Link href={'/auth/login'}
              className={'transition-all ease-out text-darkGreen-green10 hover:text-darkGreen-green11 font-medium'}>
          Log in
        </Link>
      </div>
    </>
  );
}
