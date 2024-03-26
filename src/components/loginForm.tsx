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
        className="flex w-full authButton space-x-4 font-semibold"
        onClick={() => onClick('github')}
      >
        <FaGithub className="h-5 w-5 fill-neutral-950 dark:fill-neutral-50"/>
        <p className="mainText">Continue with GitHub</p>
      </button>
      <div className="w-full text-center">
        <p className="mainText dark:text-neutral-400">or</p>
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
          className="w-full py-3 transition-all ease-out rounded-md bg-rose-600 hover:bg-rose-500 text-neutral-50 font-semibold"
          type="submit"
          aria-disabled={isPending}>
          Log in
        </button>
      </form>
      <div className={'flex justify-center'}>
        <p className="mainText">New to Flawless? &nbsp;</p>
        <Link href={'/auth/register'}
              className={'transition-all ease-out text-emerald-500 hover:text-emerald-400 font-medium'}>
          Create now
        </Link>
      </div>
    </>
  );
}
