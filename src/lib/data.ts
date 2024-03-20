import { unstable_noStore, unstable_noStore as noStore } from 'next/cache';
import { prisma } from '@/utils/prisma';
import { Teamspace, User } from '@prisma/client';

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
  // await new Promise(resolve => setTimeout(resolve, 5000));
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
  unstable_noStore()
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
  unstable_noStore()
  try {
    // await new Promise(resolve => setTimeout(resolve, 1500));
    const team = await prisma.teamspace.findUnique({
      where: {
        id: id
      },
    })
    const project = await prisma.project.findUnique({
      where: {
        id: team?.projectId
      }
    })
    return { projectName: project?.projectName, teamSpace: team }
  } catch (error) {
    console.error('Failed to fetch team-space:', error);
    throw new Error('Failed to fetch team-space.');
  }
}

export async function getTeamSpaceInfo(id: string): Promise<{
  projectName: string,
  teamSpace: Pick<Teamspace, 'teamName' | 'id'>
    & {userPreview: Pick<User, 'image' | 'firstName' | 'lastName' | 'name'>[], totalUsersAmount: number}
}> {
  unstable_noStore()
  try {
    const team = await prisma.teamspace.findUnique({
      where: {
        id: id
      },
    })

    if (!team) {
      throw new Error('Team not found.')
    }

    const project = await prisma.project.findUnique({
      where: {
        id: team?.projectId
      }
    })

    if (!project) {
      throw new Error('Project not found.')
    }

    const usersList = await prisma.user.findMany({
      where: {
        id: {
          in: team.userIDs
        }
      },
      take: 3
    })

    return { projectName: project.projectName, teamSpace: { ...team, userPreview: [...usersList], totalUsersAmount: team.userIDs.length } }
  } catch (error) {
    console.error('Failed to fetch team-space:', error);
    throw new Error('Failed to fetch team-space.');
  }
}
