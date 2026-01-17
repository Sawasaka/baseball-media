"use client";

import { useState, useEffect } from 'react';
import { supabase, Feedback, getAverageRating, getReviewCount, isSupabaseConfigured } from './client';

// チームのクチコミを取得するカスタムフック
export const useTeamReviews = (teamId: string) => {
  const [reviews, setReviews] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      // Supabase未設定の場合は空配列を返す
      if (!isSupabaseConfigured() || !supabase) {
        setReviews([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('feedbacks')
          .select('*')
          .eq('type', 'review')
          .eq('team_id', teamId)
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setReviews(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch reviews'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [teamId]);

  const averageRating = getAverageRating(reviews);
  const reviewCount = getReviewCount(reviews);

  return { reviews, averageRating, reviewCount, isLoading, error };
};
