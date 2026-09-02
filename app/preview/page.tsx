"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "../../components/DataTable";
import { sampleRecords } from "../../data/mockData";

export default function PreviewPage() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("docflow-preview");
      setData(raw ? JSON.parse(raw) : { records: sampleRecords, headers: Object.keys(sampleRecords[0]), rowCount: sampleRecords.length, fileName: "demo-data.xlsx", valid: true, errors: [] });
    } catch { setData(null); }
  }, []);

  async function saveDataset() {
    if (!data?.records?.length) return;
    setSaving(true); setError("");
    try {
      const response = await fetch("/api/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileName: data.fileName, fileType: data.fileName.split(".").pop() || "csv", records: data.records }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save dataset.");
      const next = { ...data, fileId: result.fileId, recordIds: (result.records || []).map((r: any) => r.id) };
      sessionStorage.setItem("docflow-preview", JSON.stringify(next));
      setData(next); setSaved(true);
    } catch (e: any) { setError(e.message || "Could not save dataset."); }
    finally { setSaving(false); }
  }

  if (!data) return <div className="loading">Loading preview…</div>;

  return <div className="page">
    <div className="page-intro"><span className="kicker">STEP 02</span><h2>Preview & validate</h2><p>Review the parsed records, then save the validated dataset.</p></div>
    <div className="summary-row"><div><strong>{data.fileName}</strong><span>Uploaded dataset</span></div><div><strong>{data.rowCount}</strong><span>Records</span></div><div><strong>{data.headers.length}</strong><span>Columns</span></div><div><strong className={data.valid ? "success-text" : "danger-text"}>{data.valid ? "Valid" : "Needs review"}</strong><span>Validation</span></div></div>
    <div className="panel"><DataTable records={data.records} errors={data.errors}/>{error && <div className="error-box">{error}</div>}<div className="panel-footer"><button className="secondary-btn" onClick={() => router.push("/upload")}>← Replace file</button><button className="primary-btn" onClick={saveDataset} disabled={!data.valid || saving || saved}>{saving ? "Saving…" : saved ? "Saved ✓" : "Save & Continue →"}</button></div></div>
    {saved && <div className="success-banner">Dataset saved successfully. Your records now have persistent IDs for document generation.</div>}
  </div>;
}
