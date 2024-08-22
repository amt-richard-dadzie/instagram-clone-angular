import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IResponse, PostItem, User } from '../interfaces/feed';
import { FeedService } from '../feed/feed.service';
import { combineLatest, finalize, map, mergeMap, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ExploreService {
  private http = inject(HttpClient);
  private feedService = inject(FeedService);
  public loading = signal(true);

  private getFollowing(user = '_kobby_r') {
    return this.http
      .get<IResponse>(
        `${environment.apiUrl}v1/following?username_or_id_or_url=${user}`
      )
      .pipe(map((res) => res.data.items));
  }

  private getRandomUsers(users: User[], count: number) {
    users.sort(() => 0.5 - Math.random());
    return users.slice(0, count);
  }

  private getPostsContent(users: User[]): Observable<PostItem[]> {
    const requests = users.map((user) =>
      this.feedService.getPosts(user.username)
    );

    return combineLatest(requests).pipe(map((response) => response.flat()));
  }

  public loadExplorePosts() {
    this.loading.set(true);
    return this.getFollowing().pipe(
      map((users) => this.getRandomUsers(users, 2)),
      mergeMap((randomUsers) => this.getPostsContent(randomUsers)),
      finalize(() => this.loading.set(false))
    );
  }
}
