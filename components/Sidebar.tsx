import Link from "next/link";
import { FileSpreadsheet, LayoutDashboard, Upload, Eye, FileText, Mail, Activity } from "lucide-react";

const links = [
  ["/", "Dashboard", LayoutDashboard],
  ["/upload", "Upload Data", Upload],
  ["/preview", "Data Preview", Eye],
  ["/generate", "Generate", FileText],
  ["/email", "Email", Mail],
  ["/tracking", "Tracking", Activity],
];

export default function Sidebar() {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><FileSpreadsheet size={20}/></div><div><strong>DocFlow</strong><span>Automation Studio</span></div></div>
    <nav>{links.map(([href,label,Icon]) => <Link key={href} href={href}><Icon size={18}/><span>{label}</span></Link>)}</nav>
    <div className="sidebar-footer">Frontend pipeline<br/><small>Backend-ready architecture</small></div>
  </aside>;
}
