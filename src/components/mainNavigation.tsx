'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sideNav } from '@/utils/const';
import NavIcons from '@/components/navIcons';


export default function MainNavigation() {

  const pathname = usePathname()

  return (
    <div className="space-y-3 flex flex-col pr-4">
      {
        sideNav.map(({ key, linkUrl }) => (
          <Link
            className={`mainNavLink ${pathname.startsWith(linkUrl) ? 'dark:bg-darkBlue-blue9 bg-blue-blue9 text-[white] [&>svg]:stroke-darkGray-gray12' : 'bgInteractive dark:text-darkGray-gray11 text-gray-gray11 [&>svg]:stroke-gray-gray11 dark:[&>svg]:stroke-darkGray-gray11 [&>svg]:hover:stroke-gray-gray12 dark:[&>svg]:hover:stroke-darkGray-gray12 dark:hover:text-darkGray-gray12 hover:text-gray-gray12'} `}
            href={linkUrl}
            key={key}
          >
            <NavIcons linkUrl={linkUrl}/>
            <p>{key}</p>
          </Link>
        ))
      }
    </div>
  )
}

