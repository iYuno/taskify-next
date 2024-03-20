import { ReactNode } from 'react';

export default async function Layout({ children, params }: {
  children: ReactNode,
  params: {projectId: string, teamSpaceId: string}
}) {


  return (
    <>
      {children}
    </>
  );
}
