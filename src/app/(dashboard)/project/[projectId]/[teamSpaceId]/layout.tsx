import { ReactNode, Suspense } from 'react';
import TabsNavigation from '@/components/tabsNavigation';
import TeamHeader from '@/components/teamHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Layout({ children, params }: {
  children: ReactNode,
  params: {projectId: string, teamSpaceId: string}
}) {

  const { projectId, teamSpaceId } = params;


  return (
    <>
      <Suspense fallback={
        <>
          <div className="flex h-[1.875rem] items-center !my-0 justify-between">
            <div className="flex gap-x-2">
              <Skeleton className="h-5 w-10"/>
              <Skeleton className="h-5 w-20"/>
            </div>
            <Skeleton className="size-5"/>
          </div>
          <div className="flex my-2 h-10 w-full justify-between items-center gap-x-2">
            <Skeleton className="h-8 w-full"/>
            <div className="gap-x-2 flex font-montserrat text-sm h-fit items-center">
              <Skeleton className="h-8 w-16"/>
              <Skeleton className="h-8 w-16"/>
              <Skeleton className="h-8 w-24"/>
            </div>
          </div>
        </>
      }>
        <TeamHeader teamSpaceId={teamSpaceId} projectId={projectId}/>
      </Suspense>
      <TabsNavigation/>
      <div>
        {children}
      </div>
    </>
  );
}
