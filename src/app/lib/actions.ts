'use server'
import { AuthError } from 'next-auth';
import { z } from 'zod'
import { LoginSchema } from '@/schemas/schemas';
import { prisma } from '@/utils/prisma';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn, signOut } from '@/auth';


interface FormDataWithCallback extends FormData {
  callbackUrl?: string | null;
}
export async function authenticateWithCredentials(
  prevState: string | undefined,
  formData: {
    data: FormData,
    callbackUrl?: string | null
  },
  callbackUrl?: string | null
) {

  try {
    await signIn('credentials', {
      email: formData.data.get('email'),
      password: formData.data.get('password'),
      redirectTo: formData.callbackUrl || DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export const logout = async () => {
  await signOut();
};
