import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InfoResponse } from '../interfaces/profile-info';
import { FeedService } from '../feed/feed.service';
import { catchError, EMPTY, map, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private feedService = inject(FeedService);

  public getUserProfileInfo(username: string) {
    return this.http
      .get<InfoResponse>(
        `${environment.apiUrl}v1/info?username_or_id_or_url=${username}`
      )
      .pipe(
        switchMap((profileInfo) => {
  
          if (
            profileInfo.data.media_count &&
            profileInfo.data.media_count > 0
          ) {
            return this.feedService.getPosts(profileInfo.data.username).pipe(
              map((posts) => ({
                ...profileInfo,
                posts,
              })),
              catchError((error) => {
                console.error('Error fetching posts:', error);
                return of({ ...profileInfo, posts: [] });
              })
            );
          } else {
            return of({ ...profileInfo, posts: [] });
          }
        }),
        catchError((error) => {
          console.error('Error fetching user profile:', error);
          return EMPTY;
        })
      );
  }
}
