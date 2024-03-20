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
            className={`border-l border-transparent mainNavLink ${pathname.startsWith(linkUrl) ? 'dark:border-l-rose-500 border-l-rose-600 dark:bg-neutral-800 bg-neutral-800 hover:bg-neutral-900 text-neutral-50 dark:hover:bg-neutral-800/75' : 'bgInteractive dark:hover:border-l-rose-500 hover:border-l-rose-600 dark:text-neutral-400 text-neutral-600 dark:hover:text-neutral-50 hover:text-neutral-950'} `}
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

