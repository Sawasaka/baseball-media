import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'edge';

// Supabase クライアント
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 報告者タイプのラベル
const reporterLabels: Record<string, string> = {
  individual: '個人（保護者・選手など）',
  team_member: 'チーム関係者',
};

// 問題タイプのラベル
const issueLabels: Record<string, string> = {
  broken_link: 'リンク切れ',
  wrong_info: '情報の誤り',
  add_info: '情報の追加依頼',
  other: 'その他',
};

// IPアドレスを取得
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId, teamName, reporter, issue, details } = body;

    // バリデーション
    if (!teamName || !reporter || !issue) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
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
      console.log('Blocked IP attempted to report:', ipAddress);
      return NextResponse.json(
        { error: '報告が制限されています', code: 'BLOCKED' },
        { status: 403 }
      );
    }

    // 2. Supabase に保存（報告は重複チェックしない - 同じ問題を複数報告可能）
    const { error: insertError } = await supabase
      .from('feedbacks')
      .insert({
        type: 'report',
        team_id: teamId || null,
        team_name: teamName,
        reporter_name: '匿名',
        reporter_type: reporter,
        issue_type: issue,
        comment: details || null,
        ip_address: ipAddress,
        is_published: false,
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

    console.log('Report saved successfully for team:', teamName);

    // 3. メール通知
    const toEmail = 'h.sawasaka@rookiesmart.jp';
    const reporterLabel = reporterLabels[reporter] || reporter;
    const issueLabel = issueLabels[issue] || issue;

    const emailContent = `
【ROOKIE SMART 修正依頼】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ チーム名
${teamName}

■ 報告者
${reporterLabel}

■ 状況
${issueLabel}

■ 詳細
${details || '（記載なし）'}

■ IPアドレス
${ipAddress}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

このメールは ROOKIE SMART (https://rookiesmart-jp.com) の
チームカード修正依頼フォームから自動送信されました。
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
          subject: `【修正依頼】${teamName}`,
          text: emailContent,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend API error:', errorData);
      }
    } else {
      console.log('='.repeat(50));
      console.log('【修正依頼受信】');
      console.log(emailContent);
      console.log('='.repeat(50));
    }

    return NextResponse.json({ 
      success: true, 
      message: '修正依頼を受け付けました' 
    });

  } catch (error) {
    console.error('Feedback form error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
