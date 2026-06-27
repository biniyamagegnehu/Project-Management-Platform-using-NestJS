import Link from "next/link";

export function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>{" | "}
      <Link href="/dashboard">Dashboard</Link>{" | "}
      <Link href="/tasks">Tasks</Link>{" | "}
      <Link href="/projects">Projects</Link>
    </nav>
  );
}