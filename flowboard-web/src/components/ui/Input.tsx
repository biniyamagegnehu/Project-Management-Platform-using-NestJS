import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props =
InputHTMLAttributes<HTMLInputElement>;

export function Input({
 className,
 ...props
}: Props) {
 return (
  <input
   className={cn(
    `
    w-full
    border
    rounded-xl
    px-4
    py-3
    outline-none
    `,
    className
   )}
   {...props}
  />
 );
}