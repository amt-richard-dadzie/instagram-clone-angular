import { FeedService } from './../../feed.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PostItem } from '../../../interfaces/feed';
import { Store } from '@ngrx/store';
import { FeedState } from '../../feed.state';
import { FEED_ACTIONS } from '../../feed.actions';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) public post!: PostItem;
  @ViewChild('temvideo') public video!: ElementRef<HTMLVideoElement>;
  private feedService = inject(FeedService);
  private store = inject(Store<FeedState>);
  public mediaUrl!: string;
  public profileImage!: string;
  private isPaused = false;
  public isMuted = true;
  public isLiked = false;
  public commentText = '';

  public ngOnInit(): void {
    this.feedService
      .getImage(this.post.owner.profile_pic_url)
      .subscribe((url) => {
        this.profileImage = url;
      });

    this.setMediaUrl();
  }

  private setMediaUrl() {
    if (
      this.isReel() &&
      this.post.video_versions &&
      this.post.video_versions.length > 0
    ) {
      this.mediaUrl = this.post.video_versions[0].url;
    } else {
      this.feedService
        .getImage(this.post.carousel_media[0].image_versions.items[0].url)
        .subscribe((url) => {
          this.mediaUrl = url;
        });
    }
  }

  public ngAfterViewInit(): void {
    this.video.nativeElement.muted = this.isMuted;
    this.video.nativeElement.src = this.mediaUrl;
  }

  public toggleLike() {
    this.isLiked = !this.isLiked;
    const likeCount = this.isLiked
      ? this.post.like_count + 1
      : this.post.like_count - 1;

    this.store.dispatch(
      FEED_ACTIONS.togglePostLike({
        postId: this.post.id,
        likeCount,
        isLiked: this.isLiked,
      })
    );
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    this.video.nativeElement.muted = this.isMuted;
  }

  public isReel(): boolean {
    return this.post.media_name === 'reel';
  }
  public addComment() {
    this.store.dispatch(
      FEED_ACTIONS.addComment({
        postId: this.post.id,
        comment: this.commentText,
      })
    );
    this.commentText = '';
  }
  public togglePause() {
    if (this.isPaused) {
      this.video.nativeElement.play();
    } else {
      this.video.nativeElement.pause();
    }
    this.isPaused = !this.isPaused;
  }

  private checkVideoVisibility(): boolean {
    const videoRect = this.video.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    return (
      videoRect.top + videoRect.height / 2 >= 0 && videoRect.top <= windowHeight
    );
  }

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    if (!this.isReel()) return;

    const isVisible = this.checkVideoVisibility();
    if (isVisible) {
      this.video.nativeElement.play();
    } else {
      this.video.nativeElement.pause();
    }
  }
}
