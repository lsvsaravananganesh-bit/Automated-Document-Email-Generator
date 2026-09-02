import * as XLSX from "xlsx";
import { normalizeHeader, validateRecords } from "./validation";

export async function parseFile(file){
  if(!file) throw new Error("Please select a CSV or Excel file.");
  const extension=file.name.toLowerCase().split(".").pop();
  if(!["csv","xlsx","xls"].includes(extension)) throw new Error("Only CSV, XLSX and XLS files are supported.");
  const buffer=await file.arrayBuffer();
  const workbook=XLSX.read(buffer,{type:"array"});
  const firstSheet=workbook.Sheets[workbook.SheetNames[0]];
  if(!firstSheet) throw new Error("No worksheet found.");
  const raw=XLSX.utils.sheet_to_json(firstSheet,{defval:""});
  const records=raw.map(row=>Object.fromEntries(Object.entries(row).map(([key,value])=>[normalizeHeader(key),value])));
  const result=validateRecords(records);
  return {...result,headers:records.length?Object.keys(records[0]):[],rowCount:records.length,fileName:file.name};
}
