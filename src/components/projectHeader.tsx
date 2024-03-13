'use client'
import { useParams, useSearchParams } from 'next/navigation';
import { Project, Teamspace } from '@prisma/client';
import { useEffect } from 'react';

export default function ProjectHeader({ project }: {project: {teamSpaces: Teamspace[]} & Project}) {

  const { teamSpaceId } = useParams()
  const searchParams = useSearchParams()
  useEffect(() => {

  }, [])
  return (
    <div className="space-y-6">

      {/*<TabsNavigation/>*/}
    </div>
  )
}
