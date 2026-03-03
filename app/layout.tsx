import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "John Alcantara | AI Automation Developer",
  description: "Portfolio of John Alcantara - AI & Automation Developer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}