"use client";
import { usePathname } from "next/navigation";
const steps = [["/upload","1","Upload"],["/preview","2","Preview"],["/generate","3","Generate"],["/email","4","Email"],["/tracking","5","Track"]];
export default function WorkflowSteps(){ const path=usePathname(); return <div className="workflow">{steps.map(([href,n,label],i)=><div className={`workflow-step ${path===href?"active":""} ${steps.findIndex(s=>s[0]===path)>i?"done":""}`} key={href}><div className="step-circle">{n}</div><span>{label}</span>{i<steps.length-1&&<div className="step-line"/>}</div>)}</div>; }
