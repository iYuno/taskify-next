'use server'
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { signIn, signOut } from '@/auth';
import { RegisterSchema } from '@/schemas/schemas';
import { prisma } from '@/utils/prisma';
import bcrypt from 'bcryptjs';
import { getUser } from '@/lib/data';

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
    email: data.get('email'),
    password: data.get('password'),
  }

  console.log(userForm)

  const validateFields = RegisterSchema.safeParse(userForm);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { ...user } = validateFields.data

  if (!(await validEmail(user.email))) {
    return { error: 'Invalid email!' }
  }

  if (!(await validPassword(user.password))) {
    return { error: 'Invalid password!' }
  }

  const existingUser = await getUser(user.email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  await prisma.user.create({
    data: {
      email: user.email,
      password: bcrypt.hashSync(user.password, 10).toString(),
    }
  })

  return { success: true, error: undefined }
}

export const validEmail = async(email: string): Promise<boolean | undefined> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
    return undefined;
  }
  return emailRegex.test(email);
}

export const validPassword = async(password: string): Promise<undefined | boolean> => {

  if (password === '') {
    return undefined;
  }

  if (password.length < 6) {
    return false;
  }

  // Проверка на наличие хотя бы одной цифры
  if (!/\d/.test(password)) {
    return false;
  }

  // Проверка на наличие хотя бы одной буквы в верхнем регистре
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Проверка на наличие хотя бы одной буквы в нижнем регистре
  return /[a-z]/.test(password);

}
