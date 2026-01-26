-- ========================================
-- 特集記事依頼テーブル
-- Supabase Dashboard > SQL Editor で実行してください
-- ========================================

-- テーブル作成
CREATE TABLE IF NOT EXISTS team_feature_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- 基本情報
  team_name TEXT NOT NULL,
  team_id TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  
  -- 監督情報
  director_name TEXT,
  director_message TEXT,
  director_icon_url TEXT,
  
  -- チーム情報
  background_image_url TEXT,
  team_description TEXT,
  practice_info TEXT,
  achievements TEXT,
  feature_article TEXT,
  
  -- ステータス管理
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'published', 'rejected')),
  admin_notes TEXT
);

-- updated_at を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_team_feature_requests_updated_at
  BEFORE UPDATE ON team_feature_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) を有効化
ALTER TABLE team_feature_requests ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーからの INSERT を許可
CREATE POLICY "Allow anonymous insert" ON team_feature_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ========================================
-- Storage バケット設定
-- Supabase Dashboard > Storage で以下を設定してください
-- ========================================

-- 1. 「team-features」という名前のバケットを作成
-- 2. Public bucket: ON に設定（画像を公開）
-- 3. または以下のSQLで作成：

-- バケット作成（Dashboard から作成する場合は不要）
INSERT INTO storage.buckets (id, name, public)
VALUES ('team-features', 'team-features', true)
ON CONFLICT (id) DO NOTHING;

-- Storage のポリシー設定
-- アップロードを許可
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'team-features');

-- 公開読み取りを許可
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'team-features');

-- ========================================
-- 確認用クエリ
-- ========================================

-- 依頼一覧を確認
-- SELECT * FROM team_feature_requests ORDER BY created_at DESC;

-- ステータス別に確認
-- SELECT * FROM team_feature_requests WHERE status = 'pending' ORDER BY created_at DESC;

-- ========================================
-- ステータス更新例
-- ========================================

-- 対応中に変更
-- UPDATE team_feature_requests SET status = 'in_progress' WHERE id = 'uuid-here';

-- 公開済みに変更
-- UPDATE team_feature_requests SET status = 'published' WHERE id = 'uuid-here';
