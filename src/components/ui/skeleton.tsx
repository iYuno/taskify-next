import { cn } from '@/lib/utils'

function Skeleton({
                    className,
                    ...props
                  }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-sm bg-neutral-900/10 dark:bg-neutral-800', className)}
      {...props}
    />
  )
}

export { Skeleton }
