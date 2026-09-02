"use client";
import { useState } from "react";
import { UploadCloud, FileSpreadsheet, X } from "lucide-react";

export default function FileUpload({ onFile }) {
  const [file,setFile]=useState(null);
  const choose=(f)=>{ if(!f)return; setFile(f); onFile?.(f); };
  return <div className="upload-box">
    <input id="file-input" type="file" accept=".csv,.xlsx,.xls" onChange={e=>choose(e.target.files?.[0])}/>
    {!file ? <label htmlFor="file-input" className="drop-zone"><div className="upload-icon"><UploadCloud size={30}/></div><h3>Drop your data file here</h3><p>or click to browse from your computer</p><span className="file-types">CSV · XLSX · XLS</span></label> : <div className="selected-file"><div className="file-icon"><FileSpreadsheet/></div><div><strong>{file.name}</strong><span>{(file.size/1024).toFixed(1)} KB · Ready to parse</span></div><button onClick={()=>{setFile(null);onFile?.(null)}}><X size={18}/></button></div>}
  </div>;
}
