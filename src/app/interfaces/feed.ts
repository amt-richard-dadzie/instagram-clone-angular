
/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
  full_name: string;
  id: string;
  is_private: boolean;
  is_verified: boolean;
  latest_story_ts: number;
  profile_pic_url: string;
  username: string;
}



export type ResponseCombinedV2 = {
  data:'User',
  user:User
}|{
  data:'HashTags',
  hashTags:HashTags
} ;


export interface ResponseCombined {
  full_name: string;
  id: string;
  is_private: boolean;
  is_verified: boolean;
  latest_story_ts: number;
  profile_pic_url: string;
  username: string;
  media_count: number;
  name: string;
}

export interface IResponse {
  data: {
    count: number;
    items: ResponseCombined[];
  };
}



export interface Optional {
  media_count?: number;
  name?: string;
}
export interface HashTags {
  id: string;
  media_count: number;
  name: string;
}
export interface ITag {
  data: {
    count: number;
    items: ResponseCombined[];
  };
}
interface ImageItem {
  height: number;
  url: string;
  width: number;
}

interface ImageVersions {
  items: ImageItem[];
}

interface CarouselMedia {
  accessibility_caption: string;
  carousel_media: null;
  carousel_parent_id: string;
  id: string;
  image_versions: ImageVersions;
}

export interface Caption {
  created_at: number;
  has_translation: null;
  hashtags: string[];
  mentions: string[];
  pk: string;
  text?: string;
}

interface Owner {
  full_name: string;
  id: string;
  is_embeds_disabled: null | boolean;
  is_private: boolean;
  is_unpublished: boolean;
  is_verified: boolean;
  pk: string;
  profile_pic_url: string;
  show_account_transparency_details: boolean;
  supervision_info: null;
  transparency_label: null;
  transparency_product: null;
  transparency_product_enabled: boolean;
  type: string;
  username: string;
}

export interface PostItem {
  id: string;
  caption: Caption;
  comment_count: number;
  like_count: number;
  comments: string[];
  carousel_media: CarouselMedia[];
  carousel_media_count: number;
  owner: Owner;
  code: string;
  taken_at: number;
  media_name: string;
  video_versions?: VideoVersion[];
  thumbnail_url: string;
  metrics: Metrics;
}

export interface Metrics {
  comment_count: number;
  fb_like_count: number;
  fb_play_count: number;
  like_count: number;
  play_count: number;
  save_count: number;
  share_count: number;
  user_follower_count: number;
  user_media_count: number;
  view_count: number;
}

export interface VideoVersion {
  height: number;
  id: string;
  type: number;
  url: string;
  width: number;
}

export interface Post {
  data: {
    count: number;
    items: PostItem[];
  };
  pagination_token: string;
}
