import { ReactNode } from 'react';
import { getProject } from '@/lib/data';
import ThemeButton from '@/components/ui/themeButton';
import Breadcrumbs from '@/components/breadcrumbs';

export default async function Layout({ children, params }: {
  children: ReactNode,
  params: {projectId: string, teamSpaceId: string}
}) {

  const { projectId, teamSpaceId } = params;
  const project = await getProject(projectId)
  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumbs project={project!}/>
        <ThemeButton/>
      </div>
      {children}
    </>
  );
}
