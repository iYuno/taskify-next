'use client'
import { useParams, useRouter } from 'next/navigation';
import { Project, Teamspace } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Skeleton } from '@/components/ui/skeleton';
import useSWR from 'swr';

export default function ProjectsList(
  // { projectsList }: {projectsList: Array<{teamSpaces: Teamspace[]} & Project>}
) {

  const { projectId, teamSpaceId } = useParams()
  const router = useRouter()
  const user = useCurrentUser()
  const [projectsList, setProjectsList] = useState<Array<{teamSpaces: Teamspace[]} & Project> | null>(null);

  const { data, error, isLoading } = useSWR('/api/projects?userId=65e072bd16f275640fd5926f', key => fetch(key).then(res => res.json()))

  useEffect(() => {
    setProjectsList(data)
  }, [isLoading])

  return (
    <>
      {!isLoading ?
        <Accordion
          value={typeof projectId === 'string' ? projectId : ''} type="single" collapsible
          className="w-full space-y-4 h-full overflow-hidden hover:overflow-auto pl-4 border-t border-transparent"
          onScroll={event => {
            if (event.currentTarget.scrollTop > 0) {
              event.currentTarget.classList.add('dark:border-neutral-800')
              event.currentTarget.classList.add('border-neutral-300')
              event.currentTarget.classList.remove('border-transparent')
            } else {
              event.currentTarget.classList.remove('dark:border-neutral-800')
              event.currentTarget.classList.remove('border-neutral-300')
              event.currentTarget.classList.add('border-transparent')
            }
          }}
        >
          {
            projectsList && projectsList
              .sort((a, b) => a.projectName.localeCompare(b.projectName))
              .map(({ id, projectName, teamSpaces }) => (
                <AccordionItem
                  value={id}
                  key={id}
                >
                  <AccordionTrigger
                    onClick={() => router.push(`/project/${id}`)}
                    className={`ease-out font-montserrat capitalize
                      dark:data-[state=open]:text-rose-500 dark:data-[state=closed]:text-neutral-400
                      data-[state=open]:text-rose-600 data-[state=closed]:text-neutral-600 
                      [&[data-state=open]>svg]:rotate-180 [&[data-state=closed]>svg]:text-transparent 
                      dark:[&[data-state=closed]>svg]:hover:text-neutral-50 [&[data-state=closed]>svg]:hover:text-neutral-950
                      ${teamSpaceId === undefined ? '' : 'dark:data-[state=open]:text-neutral-50 data-[state=open]:text-neutral-950 '} dark:hover:!text-neutral-50 hover:!text-neutral-950`
                    }
                  >
                    <p>{projectName}</p>
                  </AccordionTrigger>
                  <AccordionContent className="pr-4">
                    {teamSpaces
                      .sort((a, b) => a.teamName.localeCompare(b.teamName))
                      .map((team) => (
                        <li
                          key={team.id}
                          className={`transition-all ease-out ${team.id === teamSpaceId ? 'border-rose-600 dark:border-rose-500' : 'border-transparent dark:hover:border-neutral-400 hover:border-neutral-700'} cursor-pointer border-l-[1px] z-30 text-neutral-950 dark:text-neutral-50 capitalize pl-3`}>
                          <p
                            onClick={() => {
                              router.push(`/project/${id}/${team.id}/board`)
                            }}
                            className={`${team.id === teamSpaceId ? 'text-rose-600 dark:text-rose-500' : 'dark:text-neutral-400 text-neutral-600'} hover:text-neutral-950 dark:hover:text-neutral-50 py-0.5 transition-colors ease-out text-sm rounded-sm w-full font-montserrat pl-[calc(0.625rem+2px)]`}
                          >
                            {team.teamName}
                          </p>
                        </li>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              ))
          }
        </Accordion> :
        <div className="px-4 h-full">
          <Skeleton className="h-full"/>
        </div>
      }
    </>
  )
}
