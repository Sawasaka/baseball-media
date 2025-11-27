# Cloudflare Pages デプロイ手順

## 📋 前提条件

✅ GitHubリポジトリにコードがプッシュ済み  
✅ Cloudflareアカウントを持っている

---

## 🚀 デプロイ手順（ステップバイステップ）

### Step 1: Cloudflare Pages にアクセス

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. 左メニューから **「Workers & Pages」** をクリック
3. **「Create application」** をクリック
4. **「Pages」** タブを選択
5. **「Connect to Git」** をクリック

### Step 2: GitHubと連携

1. **「GitHub」** を選択
2. GitHubの認証画面で **「Authorize Cloudflare Pages」** をクリック
3. リポジトリ一覧から **`Sawasaka/baseball-media`** を選択
4. **「Begin setup」** をクリック

### Step 3: ビルド設定

以下の設定を入力してください：

| 項目 | 設定値 |
|------|--------|
| **Project name** | `baseball-media` (任意) |
| **Production branch** | `main` |
| **Framework preset** | `Next.js` |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | `/` (空欄のまま) |

### Step 4: 環境変数の設定（重要）

**「Environment variables」** セクションで以下を追加：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `NODE_VERSION` | `20` | Node.jsのバージョン |

**追加方法：**
1. **「Add variable」** をクリック
2. Variable name: `NODE_VERSION`
3. Value: `20`
4. **「Save」** をクリック

### Step 5: デプロイ開始

1. 設定を確認
2. **「Save and Deploy」** をクリック
3. ビルドが開始されます（3-5分かかります）

---

## ✅ デプロイ完了後

### 確認事項

1. **デプロイが成功したら**、Cloudflare Pagesのダッシュボードに表示されるURL（例: `https://baseball-media.pages.dev`）にアクセス
2. サイトが正常に表示されるか確認

### カスタムドメインの設定（オプション）

独自ドメインを使う場合：

1. Cloudflare Pagesのプロジェクトページで **「Custom domains」** をクリック
2. **「Set up a custom domain」** をクリック
3. ドメイン名を入力（例: `chukou-yakyu-media.com`）
4. DNS設定の指示に従って設定

---

## 🔧 トラブルシューティング

### ビルドエラーが出る場合

**エラー: "Command not found: npx"**
→ **Build command** を `npm install && npx @cloudflare/next-on-pages@1` に変更

**エラー: "Module not found"**
→ **Environment variables** に `NODE_VERSION: 20` が設定されているか確認

### サイトが表示されない場合

1. Cloudflare Pagesの **「Deployments」** タブで、最新のデプロイのログを確認
2. エラーメッセージを確認して、必要に応じて設定を修正

---

## 📝 今後の更新方法

コードを更新するたびに：

1. ローカルで変更をコミット
2. `git push` でGitHubにプッシュ
3. **Cloudflare Pagesが自動的に再デプロイ**します（数分で反映）

---

## 🎯 次のステップ

デプロイが完了したら：

1. ✅ サイトが正常に表示されるか確認
2. ✅ サブサービス5つのタブが動作するか確認
3. ✅ 各サブドメインサイトで `frame-ancestors` 設定（後ほど指示）

---

**質問があれば、いつでも聞いてください！**

