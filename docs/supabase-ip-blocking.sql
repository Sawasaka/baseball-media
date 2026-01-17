-- =====================================================
-- IP アドレス制限・ブロック機能
-- Supabase SQL Editor で実行してください
-- =====================================================

-- 1. feedbacks テーブルに ip_address カラムを追加
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS ip_address text;

-- 2. feedbacks テーブルに is_ip_blocked カラムを追加
-- このカラムをONにすると、そのIPは全チームで投稿・報告が不可になります
ALTER TABLE feedbacks ADD COLUMN IF NOT EXISTS is_ip_blocked boolean DEFAULT false;

-- 3. ip_address カラムにインデックスを追加（検索高速化）
CREATE INDEX IF NOT EXISTS idx_feedbacks_ip ON feedbacks(ip_address);

-- 4. feedbacks の SELECT ポリシー（重複チェック・ブロックチェック用）
DROP POLICY IF EXISTS "Allow select for checks" ON feedbacks;
CREATE POLICY "Allow select for checks" ON feedbacks
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =====================================================
-- 完了！
-- 
-- 【使い方】
-- 1. 荒らしを発見したら、feedbacksテーブルでそのレコードを探す
-- 2. is_ip_blocked カラムを true (チェックON) にする
-- 3. そのIPアドレスは永久にブロックされます
-- =====================================================
