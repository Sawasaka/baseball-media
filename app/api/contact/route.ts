import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // バリデーション
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メール送信先
    const toEmail = 'h.sawasaka@rookiesmart.jp';

    // メール本文を作成
    const emailContent = `
【ROOKIE SMART お問い合わせ】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お名前
${name}

■ メールアドレス
${email}

■ 電話番号
${phone}

■ 相談内容
${message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

このメールは ROOKIE SMART (https://rookiesmart-jp.com) の
お問い合わせフォームから自動送信されました。
    `.trim();

    // Resend, SendGrid, またはその他のメールサービスを使用する場合は
    // ここでAPIを呼び出します。
    // 
    // 例: Resendを使用する場合
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@rookiesmart-jp.com',
    //   to: toEmail,
    //   subject: `【お問い合わせ】${name}様より`,
    //   text: emailContent,
    // });

    // 現在は環境変数でメールサービスが設定されているか確認
    if (process.env.RESEND_API_KEY) {
      // Resend APIを使用
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: toEmail,
          subject: `【ROOKIE SMART お問い合わせ】${name}様より`,
          text: emailContent,
          reply_to: email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API error:', errorData);
        throw new Error('メール送信に失敗しました');
      }
    } else {
      // メールサービスが設定されていない場合はコンソールに出力（開発用）
      console.log('='.repeat(50));
      console.log('【お問い合わせ受信】');
      console.log('送信先:', toEmail);
      console.log('='.repeat(50));
      console.log(emailContent);
      console.log('='.repeat(50));
    }

    return NextResponse.json({ 
      success: true, 
      message: 'お問い合わせを受け付けました' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}

