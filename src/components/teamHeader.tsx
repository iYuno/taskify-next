'use server'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Folders, Github, Plus, Settings, Slash, User, UserPlus, Users } from 'lucide-react';
import ThemeButton from '@/components/ui/themeButton';
import { getTeamSpaceInfo } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { currentUser } from '@/lib/auth';

export default async function TeamHeader({ teamSpaceId, projectId }: {teamSpaceId: string, projectId: string}) {

  const getTeamPromise = getTeamSpaceInfo(teamSpaceId)
  const userPromise = currentUser()

  const [{projectName, teamSpace}, user] = await Promise.all([getTeamPromise, userPromise])

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              className="dark:hover:text-neutral-50 hover:text-neutral-950 transition-all ease-out"
            >
              <Link
                href={`/project/${projectId}`}
              >
                {projectName}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-rose-600 dark:text-rose-500">
              <Slash/>
            </BreadcrumbSeparator>
            <BreadcrumbPage>
              {teamSpace?.teamName}
            </BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-x-2">
          <ThemeButton/>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="size-7">
                <AvatarImage src=""/>
                <AvatarFallback>RL</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-sm">
              <DropdownMenuLabel>
                {user?.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <User className="size-4 mr-2"/>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4 mr-2"/>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <Folders className="size-4 mr-2"/>
                <span>Projects</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="size-4 mr-2"/>
                <span>Teams</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <Github className="size-4 mr-2"/>
                <span>
                  Github
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem className="text-red-500 hover:!text-red-500">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex w-full my-2 justify-between items-center">
        <h2 className="mainText capitalize text-4xl">
          {teamSpace?.teamName}
        </h2>
        <div className="gap-2 flex font-montserrat text-sm h-fit items-center">
          <div className="flex gap-2 items-center">
            <button
              className="uppercase text-neutral-400 hover:text-neutral-50 hover:underline transition-all ease-out">
              {teamSpace.totalUsersAmount} {teamSpace.totalUsersAmount > 1 ? 'users' : 'user'}:
            </button>
            <div className="flex -space-x-4">
              {
                teamSpace.userPreview.map((user, index, array) => (
                  <Avatar className={`size-7 z-[${array.length - index}]`}>
                    <AvatarImage src={''}/>
                    <AvatarFallback
                      className="capitalize ">
                      {user.firstName ? user.firstName.slice(0, 1) : user.name?.slice(0, 1)} {user.lastName ? user.lastName.slice(0, 1) : user.name?.slice(1, 2)}
                    </AvatarFallback>
                  </Avatar>
                ))
              }
            </div>
          </div>
          <span className="w-[1px] h-4 bg-neutral-300 dark:bg-neutral-700"/>
          <button className="interactiveButton flex items-center space-x-1">
            <UserPlus className="size-4 stroke-2 stroke-current"/>
            <p>invite</p>
          </button>
          <button className="interactiveButton flex items-center space-x-1">
            <Plus className="size-4 stroke-2 stroke-current"/>
            <p>add task</p>
          </button>
        </div>
      </div>
    </>
  )
}
