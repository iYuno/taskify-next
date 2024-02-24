import { prisma } from '@/utils/prisma';
import { Project } from '.prisma/client';
import { auth } from '@/auth';
import { useSession } from 'next-auth/react';
export default async function Sidebar() {

  // const {data: session} = useSession();

  // const projects = await fetchUserProjects(session?.user?.id || '')

  return(
    <div>
      {/*{*/}
      {/*  projects.length !== 0*/}
      {/*  &&*/}
      {/*  projects.map((project) => (*/}
      {/*    <div key={project.id}>*/}
      {/*      {project.projectName}*/}
      {/*    </div>*/}
      {/*  ))*/}
      {/*}*/}
    </div>
  )
}
