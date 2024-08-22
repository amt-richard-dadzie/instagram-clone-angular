import { PostItem } from './feed';

/* eslint-disable @typescript-eslint/naming-convention */
export interface InfoResponse {
  data: Data;
}

export interface Data {
  bio_links: BioLink[];
  biography: string;
  follower_count: number;
  following_count: number;
  full_name: string;
  id: string;
  media_count: number;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  username: string;
}

export interface BioLink {
  is_pinned: boolean;
  link_id: number;
  link_type: string;
  lynx_url: string;
  open_external_url_with_in_app_browser: boolean;
  title: string;
  url: string;
}

export interface ProfileData {
  posts: PostItem[];
  data: Data;
}
