import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, take } from 'rxjs';
import { Post, Following } from './feed';

@Injectable()
export class FeedService {
  public constructor(private http: HttpClient) {}

  public getPosts(user: string) {
    return this.http
      .get<Post>(`${environment.apiUrl}v1/posts?username_or_id_or_url=${user}`)
      .pipe(
        map((res) => res.data.items),
        map((items) =>
          items.filter(
            (item) =>
              item.carousel_media_count >= 1 && item.media_name === 'album'
          )
        )
      );
  }
  public getFollowing(user = 'cddzeney') {
    return this.http.get<Following>(
      `${environment.apiUrl}v1/following?username_or_id_or_url=${user}`
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
