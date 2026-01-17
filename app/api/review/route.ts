import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

// Supabase クライアント
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 星評価のラベル
const ratingLabels: Record<number, string> = {
  1: '★☆☆☆☆ (1/5)',
  2: '★★☆☆☆ (2/5)',
  3: '★★★☆☆ (3/5)',
  4: '★★★★☆ (4/5)',
  5: '★★★★★ (5/5)',
};

// IPアドレスを取得
function getClientIP(request: NextRequest): string {
  // Vercel/Cloudflare などのプロキシ経由
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  // Cloudflare
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // X-Real-IP
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId, teamName, reviewerName, rating, comment } = body;

    // バリデーション
    if (!teamId || !teamName || !reviewerName || !rating) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: '評価は1〜5の範囲で入力してください' },
        { status: 400 }
      );
    }

    // IPアドレスを取得
    const ipAddress = getClientIP(request);
    console.log('Client IP:', ipAddress);

    // Supabase クライアント作成
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase not configured');
      return NextResponse.json(
        { error: 'サーバー設定エラー' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 1. ブロックチェック: このIPで is_ip_blocked = true のレコードがあるか
    const { data: blockedRecord } = await supabase
      .from('feedbacks')
      .select('id')
      .eq('ip_address', ipAddress)
      .eq('is_ip_blocked', true)
      .limit(1)
      .single();

    if (blockedRecord) {
      console.log('Blocked IP attempted to post:', ipAddress);
      return NextResponse.json(
        { error: '投稿が制限されています', code: 'BLOCKED' },
        { status: 403 }
      );
    }

    // 2. 重複チェック: 同じIPで同じチームに投稿済みか
    const { data: existingReview } = await supabase
      .from('feedbacks')
      .select('id')
      .eq('type', 'review')
      .eq('team_id', teamId)
      .eq('ip_address', ipAddress)
      .limit(1)
      .single();

    if (existingReview) {
      console.log('Duplicate review attempt:', ipAddress, teamId);
      return NextResponse.json(
        { error: 'このチームには既にクチコミを投稿済みです', code: 'DUPLICATE' },
        { status: 409 }
      );
    }

    // 3. Supabase に保存
    const { error: insertError } = await supabase
      .from('feedbacks')
      .insert({
        type: 'review',
        team_id: teamId,
        team_name: teamName,
        reporter_name: reviewerName,
        rating: rating,
        comment: comment || null,
        ip_address: ipAddress,
        is_published: true,
        is_ip_blocked: false,
        status: 'pending',
      });

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { error: 'データの保存に失敗しました' },
        { status: 500 }
      );
    }

    console.log('Review saved successfully for team:', teamId);

    // 4. メール通知
    const toEmail = 'h.sawasaka@rookiesmart.jp';
    const today = new Date().toISOString().split('T')[0];

    const emailContent = `
【ROOKIE SMART クチコミ投稿】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ チーム名
${teamName}

■ チームID
${teamId}

■ 投稿者
${reviewerName}

■ 評価
${ratingLabels[rating] || rating}

■ コメント
${comment || '（コメントなし）'}

■ 投稿日
${today}

■ IPアドレス
${ipAddress}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

このメールは ROOKIE SMART (https://rookiesmart-jp.com) の
クチコミ投稿フォームから自動送信されました。
    `.trim();

    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: toEmail,
          subject: `【クチコミ】${teamName} - ${ratingLabels[rating]}`,
          text: emailContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API error:', errorData);
      }
    } else {
      console.log('='.repeat(50));
      console.log('【クチコミ投稿受信】');
      console.log(emailContent);
      console.log('='.repeat(50));
    }

    return NextResponse.json({ 
      success: true, 
      message: 'クチコミを投稿しました' 
    });

  } catch (error) {
    console.error('Review form error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
