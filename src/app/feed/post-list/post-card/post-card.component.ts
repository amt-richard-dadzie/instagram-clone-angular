import { FeedService } from './../../feed.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { PostItem } from '../../feed';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent implements OnInit {
  @Input({ required: true }) public post!: PostItem;
  public testUrl!: string;
  public profileImage!: string;
  private feedService = inject(FeedService);

  public ngOnInit(): void {
    this.feedService
      .getImage(this.post.carousel_media[0].image_versions.items[0].url)
      .subscribe((url) => {
        this.testUrl = url;
      });

    this.feedService
      .getImage(this.post.owner.profile_pic_url)
      .subscribe((url) => {
        this.profileImage = url;
      });
  }
}
