'use client';

import { useFormState } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { FaGithub } from 'react-icons/fa';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { authenticateWithCredentials } from '@/lib/actions';

export default function LoginForm() {
  const [, dispatch] = useFormState(authenticateWithCredentials, undefined)
  const callbackUrl = useSearchParams()
  const [isPending, startTransition] = useTransition();

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mainText mb-10">
        Sign in to Flawless
      </h1>
      <button
        className="flex w-full"
        onClick={() => onClick('github')}
      >
        <div
          className="authButton space-x-4 font-semibold">
          <FaGithub className="h-5 w-5 fill-gray-gray12 dark:fill-darkGray-gray12"/>
          <p className="mainText">Continue with GitHub</p>
        </div>
      </button>
      <div className="w-full text-center">
        <p className="mainText dark:text-darkGray-gray8">or</p>
      </div>
      <form className="space-y-4"
            action={(data) => dispatch({ data, callbackUrl: callbackUrl.get('callbackUrl') })}>
        <div className="w-full space-y-4 mb-4">
          <div className="relative">
            <input
              className="peer authButton font-normal pl-3 pr-10 outline-2"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              className="peer authButton font-normal pl-3 pr-10 outline-2"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />
          </div>
        </div>
        <button
          className="w-full py-3 transition-all ease-out rounded-sm bg-blue-blue9 hover:bg-blue-blue10 text-darkGray-gray12 font-semibold"
          type="submit"
          aria-disabled={isPending}>
          Log in
        </button>
      </form>
      <div className={'flex justify-center'}>
        <p className="mainText">New to Flawless? &nbsp;</p>
        <Link href={'/auth/register'}
              className={'transition-all ease-out text-darkGreen-green10 hover:text-darkGreen-green11 font-medium'}>
          Create now
        </Link>
      </div>
    </>
  );
}
