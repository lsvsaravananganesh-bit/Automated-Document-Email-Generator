"use client";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";

const titles = { "/":"Dashboard", "/upload":"Upload Data", "/preview":"Data Preview", "/generate":"Generate Documents", "/email":"Email Configuration", "/tracking":"Tracking & History" };
export default function Header() {
  const path = usePathname();
  return <header className="header"><div><div className="eyebrow">AUTOMATED DOCUMENT WORKFLOW</div><h1>{titles[path] || "DocFlow"}</h1></div><div className="header-actions"><span className="demo-pill">DEMO MODE</span><button className="icon-btn" aria-label="Notifications"><Bell size={18}/></button><div className="avatar">G</div></div></header>;
}
