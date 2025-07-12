
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ReactNode, useState } from "react"

type Props = {
  children: ReactNode
  content: (close: () => void) => ReactNode
}

export function PopOverWrapper({ children, content }: Props) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent>{content(close)}</PopoverContent>
    </Popover>
  )
}
