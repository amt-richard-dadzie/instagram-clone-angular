import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
} from '@angular/core';
import { PostItem } from '../../interfaces/feed';
import { FeedService } from '../../feed/feed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnChanges {
  @Input({ required: true }) public posts: PostItem[] = [];
  @Input({ required: true }) public layout: 'profile' | 'explore' = 'profile';
  private readonly router = inject(Router);
  private readonly feedService = inject(FeedService);
  public thumbnailImages: Record<string, string> = {};

  public ngOnChanges(): void {
    this.posts.forEach((post) => {
      this.feedService.getImage(post.thumbnail_url).subscribe((url) => {
        this.thumbnailImages[post.id] = url;
      });
    });
  }

  public isLarge(index: number): boolean {
    if (this.layout === 'explore') {
      if (index < 2) return false;
      return (index - 2) % 10 === 0 || (index - 5) % 10 === 0;
    }
    return false;
  }
  public openPostDetail(postId: string): void {
    this.router.navigate([{ outlets: { modal: ['post', postId] } }]);
  }

  public isReel(post: PostItem): boolean {
    return post.media_name === 'reel';
  }
}
