import Sidebar from "./Sidebar";
import Header from "./Header";
import WorkflowSteps from "./WorkflowSteps";
export default function AppShell({children}){return <div className="app-shell"><Sidebar/><main className="main"><Header/><WorkflowSteps/><section className="content">{children}</section></main></div>}
