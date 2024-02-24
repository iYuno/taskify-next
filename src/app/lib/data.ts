import { prisma } from '@/utils/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchUserProjects(userId: string) {
  noStore();
  try {
    const projectsList = await prisma.project.findMany({
      where: {
        userIDs: {
          hasSome: [userId]
        }
      }
    })
    return projectsList;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch projects.');
  }

}

export async function getUser(email: string) {
  try {
    return await prisma
      .user
      .findUnique({
        where: {
          email: email,
        },
      })
  } catch (error) {
    // console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
