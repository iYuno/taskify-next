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
      <form className="space-y-3 rounded-md border-[1px] border-[#292c30]"
            action={(data) => dispatch({ data, callbackUrl: callbackUrl.get('callbackUrl') })}>
        <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
          <h1 className={`mb-3 text-2xl`}>
            Please log in to continue.
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-white"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full text-black rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>
          <button className="mt-4 w-full" type="submit" aria-disabled={isPending}>
            Log in
          </button>
        </div>
      </form>
      <button
        className="w-full"
        onClick={() => onClick('github')}
      >
        <FaGithub className="h-5 w-5"/>
      </button>
    </>
  );
}
