'use server'
import { getProjectsList } from '@/lib/data';
import { currentUser } from '@/lib/auth';
import MainNavigation from '@/components/mainNavigation';
import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import ProjectsList from './projectsList';


export default async function Sidebar() {

  return (
    <div
      className="col-span-2 h-[100vh] gap-4 border-r border-neutral-300 dark:border-neutral-700 py-4 flex flex-col">
      <MainNavigation/>
      <p
        className="text-neutral-950 pl-4 dark:text-neutral-400 font-montserrat font-normal uppercase text-base"
      >Projects</p>
      <ProjectsList/>
      <div className="px-4">
        <button
          className="transition-all ease-out space-x-1 w-full flex justify-center items-center interactiveButton bg-transparent"
        >
          <Plus className="size-4 stroke-2 stroke-current"/>
          <p
            className="font-poppins max-w-max ease-out text-xs font-normal w-full text-neutral-950 dark:text-neutral-50"
          >
            add new
          </p>
        </button>
      </div>
    </div>
  )
}
