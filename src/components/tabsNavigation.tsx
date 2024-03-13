'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tabs } from '@/utils/const';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import TabIcons from '@/components/tabIcons';

export default function TabsNavigation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex relative justify-between items-center font-montserrat">
      <Tabs
        className="z-20"
        value={searchParams.get('view') || 'board'}
      >
        <TabsList className="h-auto">
          {tabs.map(({ key }) => (
            <Link href={pathname + '/' + key} key={key}>
              <TabsTrigger
                value={key}
                className="gap-x-1.5 py-3"
                // onClick={() => router.push(pathname + '?' + createQueryString('view', key))}
              >
                <TabIcons tab={key}/>
                {key}
              </TabsTrigger>
            </Link>
          ))}
          <span className="w-[1px] h-4 bg-gray-gray8 dark:bg-darkGray-gray8"/>
          <TabsTrigger
            value="fillter"
            className="gap-x-1.5 py-3"
          >
            <svg className="size-4" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fillRule="evenodd" clipRule="evenodd"
                    d="M2.5 3.0625C2.22386 3.0625 2 3.28636 2 3.5625C2 3.83864 2.22386 4.0625 2.5 4.0625H12.5347C12.8109 4.0625 13.0347 3.83864 13.0347 3.5625C13.0347 3.28636 12.8109 3.0625 12.5347 3.0625H2.5ZM3.00348 7.5C3.00348 7.22386 3.22734 7 3.50348 7H11.5312C11.8074 7 12.0312 7.22386 12.0312 7.5C12.0312 7.77614 11.8074 8 11.5312 8H3.50348C3.22734 8 3.00348 7.77614 3.00348 7.5ZM4.00696 11.4375C4.00696 11.1614 4.23082 10.9375 4.50696 10.9375H10.5278C10.8039 10.9375 11.0278 11.1614 11.0278 11.4375C11.0278 11.7136 10.8039 11.9375 10.5278 11.9375H4.50696C4.23082 11.9375 4.00696 11.7136 4.00696 11.4375Z"/>
            </svg>
            <p>filter</p>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs className="z-20">
        <TabsList className="h-auto">
          <Input
            type="text"
            onChange={(event) => router.push(pathname + '?' + createQueryString('search', event.target.value))}
            placeholder="Search task..."
            className="focus-visible:outline-none py-3 outline-none hover:border-blue-blue9 focus:border-blue-blue9 focus:w-52 transition-all ease-out border-b border-transparent h-[inherit] px-0 w-24"
          />
          <span className="w-[1px] h-4 bg-gray-gray8 dark:bg-darkGray-gray8"/>
          <p>1</p>
        </TabsList>
      </Tabs>
      <span className="absolute h-[1px] z-10 -bottom-0 dark:bg-darkGray-gray6 bg-gray-gray6 w-full"/>
    </div>
  )
}
