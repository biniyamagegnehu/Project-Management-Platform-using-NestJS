import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <Container>
          {children}
        </Container>
      </body>
    </html>
  );
}