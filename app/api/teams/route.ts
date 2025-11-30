import { NextResponse } from "next/server";
import { getTeams } from "@/lib/microcms/client";

export async function GET() {
  try {
    const teamsResponse = await getTeams({ limit: 100 });

    return NextResponse.json({
      teams: teamsResponse.contents,
      totalCount: teamsResponse.totalCount,
    });
  } catch (error) {
    console.error("Failed to fetch teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", teams: [] },
      { status: 500 }
    );
  }
}

