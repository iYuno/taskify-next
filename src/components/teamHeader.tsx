import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Plus, Slash, UserPlus } from 'lucide-react';
import ThemeButton from '@/components/ui/themeButton';
import { getTeamSpaceInfo } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function TeamHeader({ teamSpaceId, projectId }: {teamSpaceId: string, projectId: string}) {

  const { projectName, teamSpace } = await getTeamSpaceInfo(teamSpaceId)

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
          <Avatar className="size-7">
            <AvatarImage src=""/>
            <AvatarFallback>RL</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex w-full my-2 justify-between items-center">
        <h2 className="mainText capitalize text-4xl">
          {teamSpace?.teamName}
        </h2>
        <div className="gap-2 flex font-montserrat text-sm h-fit items-center">
          <button type="button" className="flex gap-2 items-center">
            <p className="uppercase text-neutral-400">
              {teamSpace.totalUsersAmount} {teamSpace.totalUsersAmount > 1 ? 'users' : 'user'}:
            </p>
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
          </button>
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
