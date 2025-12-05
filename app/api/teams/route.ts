import { NextRequest, NextResponse } from "next/server";
import { teams, getTeamsByLeague, getTeamsByPrefecture, getTeamsByLeagueAndPrefecture, getTeamsByBranch } from "@/data/teams";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const league = searchParams.get('league');
  const prefecture = searchParams.get('prefecture');
  const branch = searchParams.get('branch');
  
  let filteredTeams = teams;
  
  // フィルタリング
  if (league && prefecture) {
    filteredTeams = getTeamsByLeagueAndPrefecture(league, prefecture);
  } else if (league) {
    filteredTeams = getTeamsByLeague(league);
  } else if (prefecture) {
    filteredTeams = getTeamsByPrefecture(prefecture);
  } else if (branch) {
    filteredTeams = getTeamsByBranch(branch);
  }
  
  return NextResponse.json({
    teams: filteredTeams,
    totalCount: filteredTeams.length,
  });
}
