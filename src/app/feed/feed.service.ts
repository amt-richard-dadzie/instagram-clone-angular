import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { Post, IResponse, ITag } from '../interfaces/feed';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private readonly minMediaCount = 1;
  public constructor(private http: HttpClient) {}

  public getPosts(user: string) {
    return this.http
      .get<Post>(`${environment.apiUrl}v1/posts?username_or_id_or_url=${user}`)
      .pipe(
        map((res) => res.data.items),
        map((items) =>
          items.filter((item) => {
            const isAlbum =
              item.media_name === 'album' &&
              item.carousel_media_count >= this.minMediaCount;
            const isReel = item.media_name === 'reel';
            return isAlbum || isReel;
          })
        )
      );
  }
  public getFollowing(user = '_kobby_r') {
    return this.http
      .get<IResponse>(
        `${environment.apiUrl}v1/following?username_or_id_or_url=${user}`
      )
      .pipe(map((res) => res.data.items));
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
