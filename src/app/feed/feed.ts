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

export interface Following {
  data: {
    count: number;
    items: User[];
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
  caption: Caption;
  comment_count: number;
  like_count: number;
  carousel_media: CarouselMedia[];
  carousel_media_count: number;
  owner: Owner;
  media_name: string;
}

export interface Post {
  data: {
    count: number;
    items: PostItem[];
  };
}
