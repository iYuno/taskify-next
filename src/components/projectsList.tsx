'use client'
import { useParams, useRouter } from 'next/navigation';
import { Project, Teamspace } from '@prisma/client';
import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export default function ProjectsList({ projectsList }: {projectsList: Array<{teamSpaces: Teamspace[]} & Project>}) {

  const { projectId, teamSpaceId } = useParams()
  const router = useRouter()

  return (
    <>
      {projectsList && projectsList.length > 0 ?
        <Accordion value={typeof projectId === 'string' ? projectId : ''} type="single" collapsible
                   className="w-full space-y-4 h-full overflow-scroll pl-4">
          {
            projectsList
              .sort((a, b) => a.projectName.localeCompare(b.projectName))
              .map(({ id, projectName, teamSpaces }) => (
                <AccordionItem
                  value={id}
                  key={id}
                >
                  <AccordionTrigger
                    className={`ease-out font-montserrat capitalize dark:text-darkGray-gray11 text-gray-gray11 [&>p]:hover:text-gray-gray12 dark:[&>p]:hover:text-darkGray-gray12 [&>svg]:hover:stroke-gray-gray12 dark:[&>svg]:hover:stroke-darkGray-gray12 [&[data-state=open]>svg]:rotate-180 ${teamSpaceId !== undefined ? 'dark:[&[data-state=open]>*]:stroke-darkGray-gray12 [&[data-state=open]>*]:stroke-gray-gray12 dark:[&[data-state=open]>p]:text-darkGray-gray12 [&[data-state=open]>p]:text-gray-gray12' : '[&[data-state=open]>*]:stroke-blue-blue9 [&[data-state=open]>p]:text-blue-blue9'}`}>
                    <Link href={`/project/${id}`} className="transition-all ease-out">{projectName}</Link>
                  </AccordionTrigger>
                  <AccordionContent className="pr-4">
                    {teamSpaces
                      .sort((a, b) => a.teamName.localeCompare(b.teamName))
                      .map((team) => (
                        <li
                          key={team.id}
                          className={`transition-all ease-out ${team.id === teamSpaceId ? 'border-blue-blue10' : 'border-transparent'} cursor-pointer border-l-[1px] z-30 text-gray-gray12 dark:text-darkGray-gray12 capitalize pl-3`}>
                          <p
                            onClick={() => {
                              if (!teamSpaceId) {
                                router.push(`${id}/${team.id}`)
                              } else {
                                router.push(`${team.id}`)
                              }
                            }}
                            className={`${team.id === teamSpaceId ? 'text-blue-blue11 dark:text-darkBlue-blue10' : 'dark:text-darkGray-gray11 text-gray-gray11'} hover:text-gray-gray12 dark:hover:text-darkGray-gray12 py-1.5 transition-colors ease-out text-sm rounded-sm w-full font-montserrat pl-[calc(0.625rem+2px)]`}
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
        <></>}
    </>
  )
}
