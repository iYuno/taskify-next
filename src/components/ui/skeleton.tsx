import { cn } from '@/lib/utils'

function Skeleton({
                    className,
                    ...props
                  }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-gray3 dark:bg-darkGray-gray3', className)}
      {...props}
    />
  )
}

export { Skeleton }
