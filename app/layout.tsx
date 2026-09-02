import "./globals.css";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "DocFlow | Automated Documents & Email",
  description: "Automated document and email generation workflow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
