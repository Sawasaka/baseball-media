// クチコミデータの型定義
export interface Review {
  id: string;
  teamId: string;
  reviewerName: string;
  rating: number; // 1-5
  comment: string;
  date: string; // YYYY-MM-DD
}

// クチコミデータ
// 新しいクチコミはメールで受信後、手動でここに追加
export const reviews: Review[] = [
  // クチコミ投稿があった場合、以下の形式で追加してください
  // {
  //   id: "review-001",
  //   teamId: "boys-saitama-omiya-nanasato",
  //   reviewerName: "野球パパ",
  //   rating: 5,
  //   comment: "コメント内容",
  //   date: "2025-01-15",
  // },
];

// チームIDからクチコミを取得するヘルパー関数
export const getReviewsByTeamId = (teamId: string): Review[] => {
  return reviews.filter((review) => review.teamId === teamId);
};

// チームの平均評価を計算するヘルパー関数
export const getAverageRating = (teamId: string): number | null => {
  const teamReviews = getReviewsByTeamId(teamId);
  if (teamReviews.length === 0) return null;
  
  const sum = teamReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / teamReviews.length) * 10) / 10; // 小数点1桁
};

// チームのクチコミ件数を取得するヘルパー関数
export const getReviewCount = (teamId: string): number => {
  return getReviewsByTeamId(teamId).length;
};
