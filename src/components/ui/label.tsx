import { cn } from "@/lib/utils"

export const Label = ({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"label">>) => (
  <label
    className={cn(
      "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
)
