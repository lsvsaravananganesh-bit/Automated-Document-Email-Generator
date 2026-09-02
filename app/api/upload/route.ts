import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileName, fileType, records } = body;

    if (!fileName || !fileType || !Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ error: "fileName, fileType and records are required." }, { status: 400 });
    }

    const { data: file, error: fileError } = await supabaseServer
      .from("uploaded_files")
      .insert({ file_name: fileName, file_type: fileType, row_count: records.length, status: "validated" })
      .select("id")
      .single();

    if (fileError) throw fileError;

    const rows = records.map((row: Record<string, unknown>, index: number) => ({
      file_id: file.id,
      row_number: index + 2,
      row_data: row,
      validation_status: "valid",
      validation_errors: [],
    }));

    const { data: inserted, error: recordsError } = await supabaseServer
      .from("uploaded_records")
      .insert(rows)
      .select("id,row_number,row_data");

    if (recordsError) throw recordsError;

    return NextResponse.json({ fileId: file.id, records: inserted ?? [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save the uploaded dataset." }, { status: 500 });
  }
}
