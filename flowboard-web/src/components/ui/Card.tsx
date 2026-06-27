import { ReactNode } from "react";

export function Card({
 children,
}: {
 children: ReactNode;
}) {
 return (
  <div
   className="
   border
   rounded-xl
   p-6
   shadow-sm
   "
  >
   {children}
  </div>
 );
}