import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRoutingModule } from './feed-routing.module';
import { PostCardComponent } from './post-list/post-card/post-card.component';
import { PostListComponent } from './post-list/post-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FeedService } from './feed.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { feedReducer } from './feed.reducer';
import { EffectsModule } from '@ngrx/effects';
import { FeedEffects } from './feed.effects';
import { LayoutComponent } from './layout/layout.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { SearchComponent } from './layout/search/search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchProfileComponent } from './layout/search-profile/search-profile.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
@NgModule({
  declarations: [
    PostCardComponent,
    PostListComponent,
    LayoutComponent,
    SideBarComponent,
    SearchComponent,
    SearchProfileComponent,
    CreateNewPostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSidenavModule,
    StoreModule.forFeature('feed', feedReducer),
    EffectsModule.forFeature([FeedEffects]),
  ],
  providers: [FeedService],
})
export class FeedModule {}
