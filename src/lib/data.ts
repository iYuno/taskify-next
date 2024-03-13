import { unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/utils/prisma';

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
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getProjectsList(userId: string) {
  try {
    return await prisma.project.findMany({
      where: {
        userIDs: {
          hasSome: [userId]
        },
      },
      include: {
        teamSpaces: true
      }
    });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw new Error('Failed to fetch projects.');
  }
}

export async function getProject(id: string) {
  try {
    return await prisma.project.findUnique({
      where: {
        id: id
      },
      include: {
        teamSpaces: true
      }
    })
  } catch (error) {
    console.error('Failed to fetch project:', error);
    throw new Error('Failed to fetch project.');
  }
}

export async function getTeamSpace(id: string) {
  try {
    return await prisma.teamspace.findUnique({
      where: {
        id: id
      }
    })
  }
  catch (error) {
    console.error('Failed to fetch team-space:', error);
    throw new Error('Failed to fetch team-space.');
  }
}
