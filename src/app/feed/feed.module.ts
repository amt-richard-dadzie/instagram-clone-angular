import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { PostCardComponent } from './post-list/post-card/post-card.component';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  declarations: [
    PostCardComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule
  ]
})
export class FeedModule { }
