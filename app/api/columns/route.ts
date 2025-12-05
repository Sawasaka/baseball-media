import { NextResponse } from "next/server";
import { getArticles, getCategories } from "@/lib/microcms/client";

// キャッシュを無効化し、常に最新データを取得
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const [articlesResponse, categoriesResponse] = await Promise.all([
      getArticles({ limit: 50 }),
      getCategories(),
    ]);

    return NextResponse.json({
      articles: articlesResponse.contents,
      categories: categoriesResponse.contents,
    });
  } catch (error) {
    console.error("Failed to fetch columns:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

