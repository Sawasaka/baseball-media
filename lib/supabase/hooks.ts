"use client";

import { useState, useEffect } from 'react';
import { 
  supabase, 
  Feedback, 
  TeamFeatureRequest,
  getAverageRating, 
  getReviewCount, 
  isSupabaseConfigured 
} from './client';

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

// チームの特集記事を取得するカスタムフック
export const useTeamFeature = (teamId: string, teamName: string) => {
  const [feature, setFeature] = useState<TeamFeatureRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeature = async () => {
      // Supabase未設定の場合はnullを返す
      if (!isSupabaseConfigured() || !supabase) {
        setFeature(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // まずteam_idで検索
        let { data, error: idError } = await supabase
          .from('team_feature_requests')
          .select('*')
          .eq('team_id', teamId)
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        // team_idで見つからなければteam_nameで検索
        if (!data && teamName) {
          const { data: nameData, error: nameError } = await supabase
            .from('team_feature_requests')
            .select('*')
            .eq('team_name', teamName)
            .eq('status', 'published')
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          
          if (nameError && nameError.code !== 'PGRST116') {
            throw nameError;
          }
          data = nameData;
        } else if (idError && idError.code !== 'PGRST116') {
          throw idError;
        }

        setFeature(data as TeamFeatureRequest | null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch feature'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeature();
  }, [teamId, teamName]);

  const hasFeature = feature !== null;

  return { feature, hasFeature, isLoading, error };
};
