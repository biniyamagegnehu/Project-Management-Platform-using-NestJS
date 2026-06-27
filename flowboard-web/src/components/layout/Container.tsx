import { ReactNode } from "react";

export function Container({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}