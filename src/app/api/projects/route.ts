import { prisma } from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId') as string
  const result = await prisma.project.findMany({
    where: {
      userIDs: {
        hasSome: [userId]
      },
    },
    include: {
      teamSpaces: true
    }
  });
  console.log(result)
  return Response.json(result)
}
