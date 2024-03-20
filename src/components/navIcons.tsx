import { memo } from 'react';
import { LayoutGrid, MessageSquareMore, Settings } from 'lucide-react';

function NavIcons({ linkUrl }: {
  linkUrl: string
}) {

  switch (linkUrl) {
    case '/home':
      return <LayoutGrid className="size-6 stroke-2"/>
    case '/messages':
      return <MessageSquareMore className="size-6 stroke-2"/>
    default:
      return <Settings className="size-6 stroke-2"/>
  }
}

export default memo(NavIcons)
