import { Injectable } from '@angular/core';
import { FeedService } from './feed.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FEED_ACTIONS } from './feed.actions';
import { switchMap, map, catchError, of, exhaustMap } from 'rxjs';
import { User } from '../interfaces/feed';

@Injectable()
export class FeedEffects {
  public constructor(
    private readonly actions$: Actions,
    private readonly feedService: FeedService
  ) {}

  public loadInitialFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FEED_ACTIONS.loadInitialFeed),
      switchMap(() =>
        this.feedService.getFollowing().pipe(
          switchMap((users: User[]) =>
            this.feedService.getPosts(users[7].username).pipe(
              map((posts) =>
                FEED_ACTIONS.loadInitialFeedSuccess({
                  posts,
                  following: users,
                })
              )
            )
          ),
          catchError((error) => of(FEED_ACTIONS.feedError({ error })))
        )
      )
    )
  );

  public loadMoreFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FEED_ACTIONS.loadMoreFeed),
      exhaustMap(({ user }) =>
        this.feedService.getPosts(user).pipe(
          map((posts) => FEED_ACTIONS.loadMoreFeedSuccess({ posts })),
          catchError((error) => of(FEED_ACTIONS.feedError({ error })))
        )
      )
    )
  );
}
