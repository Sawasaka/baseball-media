import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 環境変数が設定されていない場合は null を返す
export const supabase: SupabaseClient | null = 
  supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : null;

// Supabase が利用可能かどうかをチェック
export const isSupabaseConfigured = (): boolean => {
  return supabase !== null;
};

// フィードバック（クチコミ・報告）の型定義
export interface Feedback {
  id: string;
  created_at: string;
  type: 'review' | 'report';
  team_id: string;
  team_name: string;
  reporter_name: string;
  reporter_type: 'individual' | 'team_member' | null;
  rating: number | null;
  issue_type: 'broken_link' | 'wrong_info' | 'add_info' | 'other' | null;
  comment: string | null;
  is_published: boolean;
  status: 'pending' | 'in_progress' | 'done';
}

// クチコミ投稿用の型
export interface ReviewInput {
  team_id: string;
  team_name: string;
  reporter_name: string;
  rating: number;
  comment?: string;
}

// 報告投稿用の型
export interface ReportInput {
  team_id: string;
  team_name: string;
  reporter_name: string;
  reporter_type: 'individual' | 'team_member';
  issue_type: 'broken_link' | 'wrong_info' | 'add_info' | 'other';
  comment?: string;
}

// クチコミを投稿
export const submitReview = async (input: ReviewInput) => {
  if (!supabase) {
    console.error('Supabase not configured:', { url: supabaseUrl, key: supabaseAnonKey ? 'SET' : 'NOT SET' });
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  console.log('Submitting review to Supabase:', input);
  console.log('Supabase URL:', supabaseUrl);

  const insertData = {
    type: 'review' as const,
    team_id: input.team_id,
    team_name: input.team_name,
    reporter_name: input.reporter_name,
    rating: input.rating,
    comment: input.comment || null,
    is_published: true,
    status: 'pending' as const,
  };

  console.log('Insert data:', insertData);

  const { error } = await supabase
    .from('feedbacks')
    .insert(insertData);

  if (error) {
    console.error('Supabase INSERT error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }
  
  console.log('Review submitted successfully!');
  return { success: true };
};

// 報告を投稿
export const submitReport = async (input: ReportInput) => {
  if (!supabase) {
    console.error('Supabase not configured');
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  console.log('Submitting report to Supabase:', input);

  const insertData = {
    type: 'report' as const,
    team_id: input.team_id,
    team_name: input.team_name,
    reporter_name: input.reporter_name,
    reporter_type: input.reporter_type,
    issue_type: input.issue_type,
    comment: input.comment || null,
    is_published: false,
    status: 'pending' as const,
  };

  console.log('Insert data:', insertData);

  const { error } = await supabase
    .from('feedbacks')
    .insert(insertData);

  if (error) {
    console.error('Supabase INSERT error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw error;
  }

  console.log('Report submitted successfully!');
  return { success: true };
};

// チームのクチコミを取得（公開済みのみ）
export const getReviewsByTeamId = async (teamId: string): Promise<Feedback[]> => {
  if (!supabase) {
    // Supabase未設定の場合は空配列を返す（エラーにしない）
    return [];
  }

  const { data, error } = await supabase
    .from('feedbacks')
    .select('*')
    .eq('type', 'review')
    .eq('team_id', teamId)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// チームの平均評価を計算
export const getAverageRating = (reviews: Feedback[]): number | null => {
  const reviewsWithRating = reviews.filter(r => r.rating !== null);
  if (reviewsWithRating.length === 0) return null;
  
  const sum = reviewsWithRating.reduce((acc, r) => acc + (r.rating || 0), 0);
  return Math.round((sum / reviewsWithRating.length) * 10) / 10;
};

// クチコミ件数を取得
export const getReviewCount = (reviews: Feedback[]): number => {
  return reviews.length;
};
