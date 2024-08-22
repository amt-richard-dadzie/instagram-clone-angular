import { FEED_ACTIONS } from './../feed.actions';
import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import {
  selectPosts,
  selectFollowing,
  selectFeedIsLoading,
} from '../feed.selectors';
import { FeedState } from '../feed.state';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  public posts = this.store.selectSignal(selectPosts);
  public isLoading = this.store.selectSignal(selectFeedIsLoading);
  private following$ = this.store.select(selectFollowing);

  public constructor(private store: Store<FeedState>) {}

  public ngOnInit(): void {
    if (this.posts().length === 0) {
      this.store.dispatch(FEED_ACTIONS.loadInitialFeed());
    }
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll() {
    if (
      window.innerHeight + Math.ceil(window.scrollY) >=
        document.body.offsetHeight &&
      !this.isLoading()
    ) {
      this.following$.pipe(take(1)).subscribe((following) => {
        const user = following[1].username;
        this.store.dispatch(FEED_ACTIONS.loadMoreFeed({ user }));
      });
    }
  }
}
