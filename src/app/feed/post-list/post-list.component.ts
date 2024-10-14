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
import { User } from '../../interfaces/feed';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  public posts = this.store.selectSignal(selectPosts);
  public isLoading = this.store.selectSignal(selectFeedIsLoading);
  private readonly following$ = this.store.select(selectFollowing);
 

  public constructor(private readonly store: Store<FeedState>) {}

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
      this.following$.pipe(take(1)).subscribe((users) => {
        const user = this.getRandomUserName(users);
        this.store.dispatch(FEED_ACTIONS.loadMoreFeed({ user }));
      });
    }
  }

  private getRandomUserName(users: User[]) {
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex].username;
  }
}
