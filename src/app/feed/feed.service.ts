import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { Post, IResponse, ITag } from '../interfaces/feed';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly minMediaCount = 1;
  private paginationToken: string | null = null;
  private isFirstRequest = true;

  public constructor(private readonly http: HttpClient) {}

  public getPosts(user: string) {
    let params = new HttpParams().set('username_or_id_or_url', user);

    if (this.paginationToken) {
      params = params.set('pagination_token', this.paginationToken);
    }

    return this.http
      .get<Post>(`${environment.apiUrl}v1/posts?`, { params })
      .pipe(
        map((res) => {
          this.paginationToken = res.pagination_token;
          this.isFirstRequest = false;
          return res.data.items.filter((item) => {
            const isAlbum =
              item.media_name === 'album' &&
              item.carousel_media_count >= this.minMediaCount;
            const isReel = item.media_name === 'reel';
            return isAlbum || isReel;
          });
        })
      );
  }

  public hasMorePosts() {
    return this.paginationToken !== null;
  }

  public get isFirstReq() {
    return this.isFirstRequest;
  }
  public getFollowing(user = '_kobby_r') {
    return this.http
      .get<IResponse>(
        `${environment.apiUrl}v1/following?username_or_id_or_url=${user}`
      )
      .pipe(map((res) => res.data.items.filter((user) => !user.is_private )));
  }

  public searchUser(query: string) {
    return this.http.get<IResponse>(
      `${environment.apiUrl}v1/search_users?search_query=${query}`
    );
  }

  public searchHashTags(query: string) {
    return this.http.get<ITag>(
      `${environment.apiUrl}v1/search_hashtags?search_query=${query}`
    );
  }

  public getImage(url: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((res) => this.createImageFromBlob(res)),
      take(1)
    );
  }

  private createImageFromBlob(image: Blob) {
    return window.URL.createObjectURL(image);
  }
}
