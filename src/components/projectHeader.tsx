'use client'
import { Project, Teamspace } from '@prisma/client';

export default function ProjectHeader({ project }: {project: {teamSpaces: Teamspace[]} & Project}) {

  return (
    <div className="space-y-6">

    </div>
  )
}
