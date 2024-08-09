import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { PostCardComponent } from './post-list/post-card/post-card.component';
import { PostListComponent } from './post-list/post-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FeedService } from './feed.service';

@NgModule({
  declarations: [PostCardComponent, PostListComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    AsyncPipe,
  ],
  providers: [FeedService],
})
export class FeedModule {}
