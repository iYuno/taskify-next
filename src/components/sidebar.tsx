import { getProjectsList } from '@/lib/data';
import { currentUser } from '@/lib/auth';
import ProjectsList from '@/components/projectsList';

export default async function Sidebar() {

  const user = await currentUser()
  const projectsList = await getProjectsList(user?.id!)

  return (
    <ProjectsList projectsList={projectsList}/>
  )
}
