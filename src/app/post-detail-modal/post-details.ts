/* eslint-disable @typescript-eslint/naming-convention */
import { PostItem, User } from '../interfaces/feed';

export interface PostDetails {
  data: PostItem;
}

export interface PostDetailsResponse {
  post: PostItem;
  comments: Comment[];
}

export interface Comment {
  child_comment_count: number;
  comment_index: number;
  comment_like_count: number;
  content_type: string;
  created_at: number;
  created_at_utc: number;
  has_liked: boolean;
  has_liked_comment: boolean;
  id: string;
  inline_composer_display_condition: string;
  is_covered: boolean;
  is_ranked_comment: boolean;
  like_count: number;
  private_reply_status: number;
  share_enabled: boolean;
  text: string;
  type: number;
  user_id: string;
  user: User;
  has_translation?: boolean;
}

export interface CommentResponse {
  data: {
    count: number;
    items: Comment[];
    total: number;
  };
}
