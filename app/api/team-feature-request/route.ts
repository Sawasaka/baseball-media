import { NextRequest, NextResponse } from 'next/server';
import { 
  uploadFeatureImage, 
  submitTeamFeatureRequest,
  TeamFeatureRequestInput 
} from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // テキストデータを取得
    const input: TeamFeatureRequestInput = {
      team_name: formData.get('teamName') as string,
      contact_name: formData.get('contactName') as string,
      contact_email: formData.get('contactEmail') as string,
      contact_phone: formData.get('contactPhone') as string || undefined,
      director_name: formData.get('directorName') as string || undefined,
      director_message: formData.get('directorMessage') as string || undefined,
      team_description: formData.get('teamDescription') as string || undefined,
      practice_info: formData.get('practiceInfo') as string || undefined,
      achievements: formData.get('achievements') as string || undefined,
      feature_article: formData.get('featureArticle') as string || undefined,
    };

    // 必須フィールドのバリデーション
    if (!input.team_name || !input.contact_name || !input.contact_email) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      );
    }

    // 画像をアップロード
    let directorIconUrl: string | undefined;
    let backgroundImageUrl: string | undefined;

    const directorIconFile = formData.get('directorIcon') as File | null;
    if (directorIconFile && directorIconFile.size > 0) {
      try {
        const url = await uploadFeatureImage(directorIconFile, 'director-icons');
        if (url) directorIconUrl = url;
      } catch (error) {
        console.error('Director icon upload error:', error);
        // 画像アップロードエラーは無視して続行
      }
    }

    const backgroundImageFile = formData.get('backgroundImage') as File | null;
    if (backgroundImageFile && backgroundImageFile.size > 0) {
      try {
        const url = await uploadFeatureImage(backgroundImageFile, 'team-backgrounds');
        if (url) backgroundImageUrl = url;
      } catch (error) {
        console.error('Background image upload error:', error);
        // 画像アップロードエラーは無視して続行
      }
    }

    // データベースに保存
    await submitTeamFeatureRequest(input, directorIconUrl, backgroundImageUrl);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Team feature request error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました' },
      { status: 500 }
    );
  }
}
