import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Plus, UserPlus } from 'lucide-react';
import ThemeButton from '@/components/ui/themeButton';

export default async function Page({ params }: {params: {projectId: string}}) {

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              className="dark:hover:text-neutral-50 hover:text-neutral-950 transition-all ease-out"
            >
              <BreadcrumbPage
              >
                {/*{projectName}*/}
                project name
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-x-2">
          <ThemeButton/>
          <div className="size-7 border border-rose-500 rounded-full bg-neutral-600 text-sm items-center flex">
            <p className="mx-auto tracking-wider">RL</p>
          </div>
        </div>
      </div>
      <div className="flex w-full my-2 justify-between items-center">
        <h2 className="mainText capitalize text-4xl">
          project name
        </h2>
        <div className="space-x-2 flex font-montserrat text-sm h-fit">
          <button className="interactiveButton flex items-center space-x-1">
            <UserPlus className="size-4 stroke-2 stroke-current"/>
            <p>invite</p>
          </button>
          <button className="interactiveButton flex items-center space-x-1">
            <Plus className="size-4 stroke-2 stroke-current"/>
            <p>add team</p>
          </button>
        </div>
      </div>
    </>
  )
}
