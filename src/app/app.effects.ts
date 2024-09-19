import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { switchMap, tap } from 'rxjs';
import { FeedService } from './feed/feed.service';

@Injectable()
export class AppEffects {
  public constructor(
    private actions: Actions,
    private feedService: FeedService
  ) {}

  public init$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(ROOT_EFFECTS_INIT),
        tap((action) => console.log(action)),
        switchMap(() => this.feedService.getFollowing()),
        tap((res) => console.log(res))
      ),
    { dispatch: false }
  );
}
