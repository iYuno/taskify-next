'use server'
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn, signOut } from '@/auth';
import { User } from '@prisma/client';
import { RegisterSchema } from '@/schemas/schemas';
import { prisma } from '@/utils/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { getUser } from '@/app/lib/data';

export async function authenticateWithCredentials(
  prevState: string | undefined,
  formData: {
    data: FormData,
    callbackUrl?: string | null
  },
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

export const logout = async() => {
  await signOut();
};

export async function signUp(
  data: FormData,
  callbackUrl?: string | null
) {

  const userForm = {
    username: data.get('username'),
    email: data.get('email'),
    password: data.get('password'),
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),

  }

  const validateFields = RegisterSchema.safeParse(userForm);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { ...user } = validateFields.data

  const existingUser = await getUser(user.email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await prisma.user.create({
    data: {
      email: user.email,
      passwordHash: bcrypt.hashSync(user.password, 10).toString(),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  })

  return { success: true }
}
