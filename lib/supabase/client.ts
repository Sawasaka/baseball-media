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

// ========================================
// 特集記事依頼関連
// ========================================

// 特集記事依頼の型定義
export interface TeamFeatureRequest {
  id: string;
  created_at: string;
  team_name: string;
  team_id?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  director_name?: string;
  director_message?: string;
  director_icon_url?: string;
  background_image_url?: string;
  feature_article?: string;
  team_description?: string;
  practice_info?: string;
  achievements?: string;
  status: 'pending' | 'in_progress' | 'published' | 'rejected';
}

// 特集記事依頼の入力型
export interface TeamFeatureRequestInput {
  team_name: string;
  team_id?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  director_name?: string;
  director_message?: string;
  team_description?: string;
  practice_info?: string;
  achievements?: string;
  feature_article?: string;
}

// 画像アップロード（Supabase Storage）
export const uploadFeatureImage = async (
  file: File,
  folder: 'director-icons' | 'team-backgrounds'
): Promise<string | null> => {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('team-features')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Storage upload error:', error);
    throw error;
  }

  // 公開URLを取得
  const { data: urlData } = supabase.storage
    .from('team-features')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

// 特集記事依頼を送信
export const submitTeamFeatureRequest = async (
  input: TeamFeatureRequestInput,
  directorIconUrl?: string,
  backgroundImageUrl?: string
) => {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const insertData = {
    team_name: input.team_name,
    team_id: input.team_id || null,
    contact_name: input.contact_name,
    contact_email: input.contact_email,
    contact_phone: input.contact_phone || null,
    director_name: input.director_name || null,
    director_message: input.director_message || null,
    director_icon_url: directorIconUrl || null,
    background_image_url: backgroundImageUrl || null,
    team_description: input.team_description || null,
    practice_info: input.practice_info || null,
    achievements: input.achievements || null,
    feature_article: input.feature_article || null,
    status: 'pending' as const,
  };

  const { error } = await supabase
    .from('team_feature_requests')
    .insert(insertData);

  if (error) {
    console.error('Supabase INSERT error:', error);
    throw error;
  }

  return { success: true };
};

// 公開済み特集記事をチームIDで取得
export const getPublishedFeatureByTeamId = async (teamId: string): Promise<TeamFeatureRequest | null> => {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('team_feature_requests')
    .select('*')
    .eq('team_id', teamId)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    // PGRST116 = no rows returned, which is expected for teams without features
    if (error.code !== 'PGRST116') {
      console.error('Error fetching feature:', error);
    }
    return null;
  }

  return data as TeamFeatureRequest;
};

// 公開済み特集記事をチーム名で取得（team_idがない場合のフォールバック）
export const getPublishedFeatureByTeamName = async (teamName: string): Promise<TeamFeatureRequest | null> => {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from('team_feature_requests')
    .select('*')
    .eq('team_name', teamName)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching feature:', error);
    }
    return null;
  }

  return data as TeamFeatureRequest;
};
