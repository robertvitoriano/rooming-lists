import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
interface PopOverWrapperProps {
  children: ReactNode;
  content: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export const PopOverWrapper = ({ children, content, onOpenChange,open}:PopOverWrapperProps) => {
  return (
    <Popover  open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>{content}</PopoverContent>
    </Popover>
  );
};
