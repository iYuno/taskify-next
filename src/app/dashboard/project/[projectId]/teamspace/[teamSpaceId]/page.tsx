import { notFound } from 'next/navigation';

export default function Page({ params }: { params: {teamSpaceId: string}}) {

  const teamSpaceId = params.teamSpaceId

  if(teamSpaceId === '1') {
    return notFound();
  }

  return(
    <div>
      dashboard.project.page.[{teamSpaceId}].teamSpace
    </div>
  )
}
