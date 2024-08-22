import { PostItem, User } from '../interfaces/feed';

export interface FeedState {
  posts: PostItem[];
  following: User[];
  isLoading: boolean;
  error: string | null;
}
