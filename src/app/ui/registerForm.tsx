'use client';

import { signUp, validEmail, validPassword } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { FC, useState, useTransition } from 'react';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useDebouncedCallback } from 'use-debounce';

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
    <div
      className={'bg-[white] bg-opacity-5 px-6 py-12 space-y-4 border border-text border-opacity-10 rounded-md'}>
      <h1 className={'text-2xl font-semibold text-center text-text mb-10'}>
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
            action={(data) => onSubmit(data, '/auth/login')}>
        <div className='w-full space-y-4 mb-4'>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-text border-opacity-50 hover:border-opacity-100 bg-background py-3 pl-3 pr-9 text-text font-normal outline-2'
              id='email'
              type='email'
              name='email'
              placeholder='Email'
              onChange={(event) => emailHandler(event.target.value)}
              required
            />
            <Check isCheck={isEmailValid}/>
          </div>
          <div className='relative'>
            <input
              className='peer block w-full rounded-md border border-text border-opacity-50 hover:border-opacity-100 bg-background py-3 pl-3 pr-9 text-text font-normal outline-2'
              id='password'
              type='password'
              name='password'
              placeholder='Password'
              required
              minLength={6}
              onChange={(event) => passwordHandler(event.target.value)}
            />
            <Check isCheck={isPasswordValid}/>
          </div>
        </div>
        <button className='w-full py-3 rounded-md bg-primary-500 hover:bg-primary-300 text-bg text-base font-semibold'
                type='submit'
                aria-disabled={isPending}>
          {isPending ? 'Loading' : 'Sign Up'}
        </button>
      </form>
      <div className={'flex justify-center'}>
        <p className={'text-text'}>Already have an account? &nbsp;</p>
        <Link href={'/auth/login'} className={'text-accent_orange-500 font-medium hover:text-accent_orange-300'}>
          Log in
        </Link>
      </div>
    </div>
  );
}

interface ICheck {
  isCheck: boolean | undefined
}
export const Check: FC<ICheck> = ({isCheck}) => {
  switch (isCheck) {
    case true:
      return <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'
                  className='w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 z-10 fill-green-500'>
        <path fillRule='evenodd'
              d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
              clipRule='evenodd'/>
      </svg>
    case false:
      return <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'
                  className='w-6 h-6 absolute top-1/2 -translate-y-1/2 right-3 z-10 fill-red-500'>
        <path fillRule='evenodd'
              d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z'
              clipRule='evenodd'/>
      </svg>
    default:
      return <></>
  }
}
