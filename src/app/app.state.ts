import { createActionGroup, createSelector, props } from '@ngrx/store';
import { AuthState } from './auth/auth.state';
import { FeedState } from './feed/feed.state';
import { selectAuthState } from './auth/auth.selectors';
import { selectFeedState } from './feed/feed.selectors';

export interface AppState {
  auth: AuthState;
  feed: FeedState;
}

export const APP_ACTIONS = createActionGroup({
  source: 'APP',
  events: {
    'Restore App State': props<AppState>(),
  },
});

export const selectAppState = createSelector(
  selectAuthState,
  selectFeedState,
  (auth, feed) => ({ auth, feed })
);
