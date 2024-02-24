import { notFound } from 'next/navigation';

export default function Page({ params }: { params: {projectId: string}}) {

  const projectId = params.projectId;

  if(projectId === '1') {
    return notFound();
  }

  return(
    <div>
      project.[{projectId}].page
    </div>
  )
}
