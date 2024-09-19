import { createReducer, on } from '@ngrx/store';
import { FeedState } from './feed.state';
import { FEED_ACTIONS } from './feed.actions';

export const initialState: FeedState = {
  posts: [],
  following: [],
  isLoading: false,
  error: null,
};

export const feedReducer = createReducer(
  initialState,
  on(FEED_ACTIONS.loadInitialFeed, FEED_ACTIONS.loadMoreFeed, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(FEED_ACTIONS.loadInitialFeedSuccess, (state, { posts, following }) => ({
    ...state,
    posts,
    following,
    isLoading: false,
  })),
  on(FEED_ACTIONS.loadMoreFeedSuccess, (state, { posts }) => ({
    ...state,
    posts: [...state.posts, ...posts],
    isLoading: false,
  })),
  on(FEED_ACTIONS.feedError, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(FEED_ACTIONS.togglePostLike, (state, { postId, likeCount, isLiked }) => ({
    ...state,
    posts: state.posts.map((post) =>
      post.id === postId
        ? { ...post, like_count: likeCount, is_liked: isLiked }
        : post
    ),
  })),
  on(FEED_ACTIONS.addComment, (state, { postId, comment }) => ({
    ...state,
    posts: state.posts.map((post) =>
      post.id === postId
        ? {
          ...post,
          comment_count: post.comment_count + 1,
          comments: post.comments ? [ comment, ...post.comments,]: [comment] 
        }
        : post
    ),
  }))
);
