import { NextResponse } from "next/server";

// TODO: 将来的にCSV/JSONベースのチームデータに切り替え予定
// 現在はmicroCMS teams APIを削除したため、空データを返す

export async function GET() {
  // 空のチームデータを返す（将来CSVデータに差し替え）
  return NextResponse.json({
    teams: [],
    totalCount: 0,
  });
}

