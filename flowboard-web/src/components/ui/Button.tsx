import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props =
ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
 className,
 children,
 ...props
}: Props) {
 return (
  <button
   className={cn(
    `
    px-5
    py-2
    rounded-xl
    bg-blue-600
    text-white
    hover:opacity-90
    transition
    `,
    className
   )}
   {...props}
  >
   {children}
  </button>
 );
}