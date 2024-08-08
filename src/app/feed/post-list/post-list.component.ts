import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FeedService } from '../feed.service';
import { delay, exhaustMap, map, take } from 'rxjs';
import { PostItem, User } from '../feed';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  private feedService = inject(FeedService);
  public isLoading = signal(false);
  private following: User[] = [];
  public posts: PostItem[] = [];

  public ngOnInit(): void {
    this.loadInitialFeed();
  }

  private loadInitialFeed() {
    this.feedService
      .getFollowing()
      .pipe(
        map((res) => res.data.items.slice(7, 9)),
        exhaustMap((users) => {
          this.following = users;
          return this.feedService.getPosts(users[0].username);
        }),
        take(1)
      )
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll() {
    if (
      window.innerHeight + Math.ceil(window.scrollY) >=
        document.body.offsetHeight &&
      !this.isLoading()
    ) {
      this.loadMoreFeed();
    }
  }

  private loadMoreFeed() {
    this.isLoading.set(true);

    const secondUser = this.following[1].username;
    this.feedService
      .getPosts(secondUser)
      .pipe(delay(3000), take(1))
      .subscribe((newPosts) => {
        this.posts.push(...newPosts);
        this.isLoading.set(false);
      });
  }
}
