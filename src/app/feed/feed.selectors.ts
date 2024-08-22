import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from './feed.state';

export const selectFeedState = createFeatureSelector<FeedState>('feed');

export const selectPosts = createSelector(
  selectFeedState,
  (state) => state.posts
);

export const selectFollowing = createSelector(
  selectFeedState,
  (state) => state.following
);

export const selectFeedIsLoading = createSelector(
  selectFeedState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectFeedState,
  (state) => state.error
);
