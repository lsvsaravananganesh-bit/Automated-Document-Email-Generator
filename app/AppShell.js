import { LayoutDashboard, Upload, Table2, FileText, Sparkles, Mail, Activity, Settings } from 'lucide-react';
import Link from 'next/link';

const items = [
  ['/','Dashboard',LayoutDashboard], ['/upload','Upload Data',Upload], ['/preview','Data Preview',Table2], ['/template','Templates',FileText], ['/generate','Generate',Sparkles], ['/email','Email',Mail], ['/tracking','Tracking',Activity]
];
export default function Layout({children}) { return <div className="shell"><aside><div className="brand"><div className="logo">D</div><div><b>DocFlow</b><span>Automation Suite</span></div></div><nav>{items.map(([href,label,Icon])=><Link key={href} href={href}><Icon size={18}/><span>{label}</span></Link>)}</nav><div className="side-bottom"><Link href="#"><Settings size={18}/>Settings</Link><div className="user"><div className="avatar">G</div><div><b>Ganesh</b><span>Administrator</span></div></div></div></aside><main><header><div><span className="eyebrow">DOCUMENT AUTOMATION</span><h1>Automated Document & Email Generator</h1></div><div className="status"><i/> System Ready</div></header>{children}</main></div> }
