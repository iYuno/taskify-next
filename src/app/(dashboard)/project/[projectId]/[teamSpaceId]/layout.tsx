import { ReactNode } from 'react';
import { getTeamSpace } from '@/lib/data';
import TabsNavigation from '@/components/tabsNavigation';

export default async function Layout({ children, params }: {
  children: ReactNode,
  params: {projectId: string, teamSpaceId: string}
}) {

  const { teamSpaceId } = params;
  const teamSpace = await getTeamSpace(teamSpaceId)

  return (
    <>
      <div className="space-y-6">
        <div className="flex w-full justify-between items-center">
          <h2 className="mainText capitalize text-4xl">
            {teamSpace?.teamName}
          </h2>
          <div className="space-x-4 flex font-montserrat text-sm h-fit">
            <button className="interactiveButton flex items-center space-x-1">
              <div className="flex items-center">
                <svg className="size-4 stroke-1 dark:stroke-darkGray-gray12 stroke-gray-gray12" viewBox="0 0 15 15"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.875 5.16565V7.04065M10.875 7.04065V8.91565M10.875 7.04065H12.75M10.875 7.04065H9M1.5 12.5V12.4313C1.5 11.3746 1.50278 10.1004 2.25 9.35315C2.99722 8.60593 4.44328 8.5 5.5 8.5C6.55672 8.5 8.00278 8.60593 8.75 9.35315C9.49721 10.1004 9.46875 11.3746 9.46875 12.4313M7.59375 4.46252C7.59375 5.02197 7.37151 5.55849 6.97593 5.95408C6.58034 6.34966 6.04382 6.5719 5.48438 6.5719C4.92493 6.5719 4.38841 6.34966 3.99282 5.95408C3.59724 5.55849 3.375 5.02197 3.375 4.46252C3.375 3.90308 3.59724 3.36656 3.99282 2.97097C4.38841 2.57539 4.92493 2.35315 5.48438 2.35315C6.04382 2.35315 6.58034 2.57539 6.97593 2.97097C7.37151 3.36656 7.59375 3.90308 7.59375 4.46252Z"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>invite</p>
            </button>
            <button className="interactiveButton flex items-center space-x-1">
              <svg className="size-4 stroke-0 dark:stroke-darkGray-gray12 stroke-gray-gray12" viewBox="0 0 15 15"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              <p>add task</p>
            </button>
          </div>
        </div>
        <TabsNavigation/>
      </div>
      <div>
        {children}
      </div>
    </>
  );
}
