import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FeedService } from '../feed/feed.service';
import { PostDetailsResponse } from './post-details';
import { NgToastService } from 'ng-angular-popup';
import { constants } from '../../utils/constants';

@Component({
  selector: 'app-post-detail-modal',
  templateUrl: './post-detail-modal.component.html',
  styleUrls: ['./post-detail-modal.component.scss'],
})
export class PostDetailModalComponent implements OnInit {
  @ViewChild('temvideo') public video!: ElementRef<HTMLVideoElement>;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private feedService = inject(FeedService);
  private toast = inject(NgToastService);
  public mediaUrl = signal('');
  public commentProfileImages: Record<string, string> = {};
  public profileImage!: string;
  private isPaused = false;
  public postDetails!: PostDetailsResponse;

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.postDetails = data['postsDetails'];
        if (this.postDetails) {
          this.setMediaUrl();
          this.loadProfileImages();
        }
      },
      error: () => {
        this.toast.danger(
          'Sorry error getting post details.Try again later',
          constants.TOAST_ERROR_TITLE,
          constants.TOAST_TIME_OUT
        );
      },
    });
  }

  private loadProfileImages(): void {
    this.feedService
      .getImage(this.postDetails.post.owner.profile_pic_url)
      .subscribe((url) => {
        this.profileImage = url;
      });
    this.postDetails.comments.forEach((comment) => {
      this.feedService
        .getImage(comment.user.profile_pic_url)
        .subscribe((url) => {
          this.commentProfileImages[comment.id] = url;
        });
    });
  }

  private setMediaUrl(): void {
    if (this.isReel()) {
      this.setVideoUrl();
    } else {
      this.setImageUrl();
    }
  }

  private setVideoUrl(): void {
    if (this.postDetails.post.video_versions?.length) {
      this.mediaUrl.set(this.postDetails.post.video_versions[0].url);
    }
  }

  private setImageUrl(): void {
    const imageUrl =
      this.postDetails.post.carousel_media[0].image_versions.items[0].url;
    if (imageUrl) {
      this.feedService.getImage(imageUrl).subscribe((url) => {
        this.mediaUrl.set(url);
      });
    }
  }

  public isReel(): boolean {
    return this.postDetails.post.media_name === 'reel';
  }

  public togglePause(): void {
    if (this.video) {
      if (this.isPaused) {
        this.video.nativeElement.play();
      } else {
        this.video.nativeElement.pause();
      }
      this.isPaused = !this.isPaused;
    }
  }

  public closeModal(): void {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
