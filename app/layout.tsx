import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Johnrey Alcantara | Software Developer",
  description: "Portfolio of Johnrey Alcantara - Software Developer",
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