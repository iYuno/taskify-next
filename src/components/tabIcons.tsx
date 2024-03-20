import { GanttChart, Kanban, List, Table2 } from 'lucide-react';

export default function TabIcons({ tab }: {tab: string}) {

  switch (tab) {
    case 'timeline':
      return <GanttChart className="size-4 stroke-2"/>
    case 'list':
      return <List className="size-4 stroke-2"/>
    case 'table':
      return <Table2 className="size-4 stroke-2"/>
    default:
      return <Kanban className="size-4 stroke-2 "/>
  }

}
