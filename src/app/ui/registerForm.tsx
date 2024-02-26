'use client';

import { useFormState } from 'react-dom';
import { LoginSchema } from '@/schemas/schemas';
import { z } from 'zod';
import { authenticateWithCredentials, signUp } from '@/app/lib/actions';
import { useForm } from 'react-hook-form';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaGithub } from 'react-icons/fa';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<boolean | undefined | 'loading'>(undefined);
  const router = useRouter()
  const form = useForm<FormData>()
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: '/home',
    }).catch((err) => {
      console.log(err)
    });
  }

  const onSubmit = (data: FormData, callbackUrl: string) => {
    setSuccess('loading')
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

  const buttonHandler = () => {
    switch (success) {
      case true:
        return 'Success'
      case false:
        return 'Sign Up'
      case 'loading':
        return 'Loading...'
      default:
        return 'Sign Up'
    }
  }

  return (
    <form className="space-y-3 rounded-md border-[1px] border-[#292c30]"
          action={(data) => onSubmit(data, '/auth/login')}
    >
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Please register to continue.
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
              htmlFor="username"
            >
              username
            </label>
            <div className="relative">
              <input
                className="peer block w-full text-black rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
                required
                minLength={4}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="firstName"
            >
              First Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full text-black rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Enter first name"
                required
                minLength={1}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-white"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full text-black rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-black"
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Enter last name"
                required
                minLength={1}
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
          {buttonHandler()}
        </button>
      </div>
      <button
        className="w-full"
        onClick={() => onClick('github')}
      >
        <FaGithub className="h-5 w-5"/>
      </button>
    </form>
  );
}
