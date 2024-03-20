'use client'
import { useParams } from 'next/navigation';
import { Project, Teamspace } from '@prisma/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';
import Link from 'next/link';

export default async function Breadcrumbs({ project }: {project: {teamSpaces: Teamspace[]} & Project | null}) {

  const { teamSpaceId } = useParams()

  if (!project) {
    return null
  }

  return (
    <div className="flex items-center space-x-2 font-montserrat capitalize">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              href={`/project/${project.id}`}
              className={`${teamSpaceId ? '' : 'text-neutral-50'}`}
            >
              {project.projectName}
            </Link>
          </BreadcrumbItem>
          {teamSpaceId ?
            <>
              <BreadcrumbSeparator>
                <Slash/>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {project.teamSpaces.filter((teamSpace) => teamSpace.id === teamSpaceId.toString())[0].teamName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </> : <></>
          }
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
