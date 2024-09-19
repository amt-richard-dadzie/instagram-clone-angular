import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PostItem, User } from '../interfaces/feed';

export const FEED_ACTIONS = createActionGroup({
  source: 'Feed',
  events: {
    'Load Initial Feed': emptyProps(),
    'Get user following': props<{
      following: User[];
    }>(),
    'Load Initial Feed Success': props<{
      posts: PostItem[];
      following: User[];
    }>(),
    'Load More Feed': props<{ user: string }>(),
    'Load More Feed Success': props<{ posts: PostItem[] }>(),
    'Feed Error': props<{ error: string }>(),
    'Toggle Post Like': props<{
      postId: string;
      likeCount: number;
      isLiked: boolean;
    }>(),
    'Add Comment': props<{ postId: string; comment: string }>(),
  },
});
