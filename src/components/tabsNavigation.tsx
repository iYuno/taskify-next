'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tabs } from '@/utils/const';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import TabIcons from '@/components/tabIcons';
import { ListFilter } from 'lucide-react';

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
        value={pathname.split('/').filter(value => tabs.includes(value))[0] || 'board'}
      >
        <TabsList className="h-auto">
          {tabs.map((key) => (
            <TabsTrigger
              value={key}
              key={key}
              className="gap-x-1.5 py-3"
              onClick={() => router.push(pathname.split('/').slice(0,4).join('/') + '/' + key)}
            >
              <TabIcons tab={key}/>
              {key}
            </TabsTrigger>
          ))}
          <span className="w-[1px] h-4 bg-neutral-300 dark:bg-neutral-700"/>
          <TabsTrigger
            value="fillter"
            className="gap-x-1.5 py-3"
          >
            <ListFilter className="size-4 stroke-2"/>
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
            className="focus-visible:outline-none py-3 outline-none hover:border-rose-500 focus:border-rose-500 focus:w-52 transition-all ease-out border-b border-transparent h-[inherit] px-0 w-24"
          />
          <span className="w-[1px] h-4 bg-neutral-300 dark:bg-neutral-700"/>
          <p>1</p>
        </TabsList>
      </Tabs>
      <span className="absolute h-[1px] z-10 -bottom-0 dark:bg-neutral-700 bg-neutral-300 w-full"/>
    </div>
  )
}
