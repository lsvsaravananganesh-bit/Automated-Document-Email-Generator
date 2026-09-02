import './globals.css';
import AppShell from './AppShell';
export const metadata={title:'DocFlow — Automated Document & Email Generator',description:'Automate personalized document and email workflows.'};
export default function RootLayout({children}){return <html lang="en"><body><AppShell>{children}</AppShell></body></html>}
