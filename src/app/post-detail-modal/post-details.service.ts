import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import {
  CommentResponse,
  PostDetails,
  PostDetailsResponse,
} from './post-details';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostDetailsService {
  private http = inject(HttpClient);

  public fetchPostDetails(postCode: string): Observable<PostDetailsResponse> {
    return this.http
      .get<PostDetails>(
        `${environment.apiUrl}v1/post_info?code_or_id_or_url=${postCode}&include_insights=true`
      )
      .pipe(
        map((response) => response.data),
        switchMap((post) => {
          if (post.metrics?.comment_count && post.metrics.comment_count > 0) {
            return this.fetchPostComment(post.code).pipe(
              map((comments) => ({
                post,
                comments,
              })),
              catchError((error) => {
                console.error('Error fetching comments:', error);
                return of({ post, comments: [] });
              })
            );
          } else {
            return of({ post, comments: [] });
          }
        }),
        catchError((error) => {
          console.error('Error fetching post details:', error);
          return EMPTY;
        })
      );
  }

  public fetchPostComment(postCode: string) {
    return this.http
      .get<CommentResponse>(
        `${environment.apiUrl}v1/comments?code_or_id_or_url=${postCode}`
      )
      .pipe(map((comments) => comments.data.items));
  }
}
