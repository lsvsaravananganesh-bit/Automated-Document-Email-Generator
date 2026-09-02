export function normalizeHeader(value){ return String(value??"").trim().toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,""); }
export function validateRecords(records){
  if(!Array.isArray(records)||records.length===0) return {valid:false,errors:["No records found in the uploaded file."],records:[]};
  const headers=Object.keys(records[0]||{}); const errors=[];
  if(!headers.length) errors.push("The file has no columns.");
  records.forEach((row,i)=>{ if(Object.values(row).every(v=>String(v??"").trim()==="")) errors.push(`Row ${i+2} is empty.`); });
  const emailKey=headers.find(h=>normalizeHeader(h)==="email");
  if(emailKey) records.forEach((row,i)=>{const email=String(row[emailKey]??"").trim(); if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push(`Invalid email in row ${i+2}.`);});
  return {valid:errors.length===0,errors,records};
}
