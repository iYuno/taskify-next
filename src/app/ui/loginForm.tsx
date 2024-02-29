'use client';

import { useFormState } from 'react-dom';
import { LoginSchema } from '@/schemas/schemas';
import { z } from 'zod';
import { authenticateWithCredentials } from '@/app/lib/actions';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaGithub } from 'react-icons/fa';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

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
    <div
      className={'bg-[white] bg-opacity-5 px-6 py-12 space-y-4 border border-text border-opacity-10 rounded-md'}>
      <h1 className={'text-2xl font-semibold text-center text-text mb-10'}>
        Sign in to Flawless
      </h1>
      <button
        className='flex w-full'
        onClick={() => onClick('github')}
      >
        <div
          className={'flex justify-center space-x-4 w-full bg-background rounded-md border border-text border-opacity-50 hover:border-opacity-100 py-3 font-semibold'}>
          <FaGithub className='h-5 w-5' color={'white'}/>
          <p className={'text-text'}>Continue with GitHub</p>
        </div>
      </button>
      <div className={'w-full text-center'}>
        <p className={'text-text opacity-50'}>or</p>
      </div>
      <form className='space-y-4'
            action={(data) => dispatch({ data, callbackUrl: callbackUrl.get('callbackUrl') })}>
        <div className='w-full space-y-4 mb-4'>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-text border-opacity-50 hover:border-opacity-100 bg-background py-3 pl-3 text-text font-normal outline-2'
              id='email'
              type='email'
              name='email'
              placeholder='Email'
              required
            />
          </div>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-text border-opacity-50 hover:border-opacity-100 bg-background py-3 pl-3 text-text font-normal outline-2'
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              required
              minLength={6}
            />
          </div>
        </div>
        <button className='w-full py-3 rounded-md bg-primary-500 hover:bg-primary-300 text-bg text-base font-semibold' type='submit'
                aria-disabled={isPending}>
          Log in
        </button>
      </form>
      <div className={'flex justify-center'}>
        <p className={'text-text'}>New to Flawless? &nbsp;</p>
        <Link href={'/auth/register'} className={'text-accent_orange-500 font-medium'}>
          Create now
        </Link>
      </div>
    </div>
  );
}
