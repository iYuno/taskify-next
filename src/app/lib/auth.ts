import { auth } from '@/auth';
import { prisma } from '@/utils/prisma';

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
