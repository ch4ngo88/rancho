import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        'peer inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer items-center rounded-md border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seagreen focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-seagreen data-[state=unchecked]:bg-gray-200',
        className,
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          'pointer-events-none block h-[24px] w-[24px] rounded-sm bg-white shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-[24px] data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitives.Root>
  ),
)

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
