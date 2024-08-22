import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { profileResolver } from '../profile/profile.resolver';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: PostListComponent },
      {
        path: 'explore',
        loadChildren: () =>
          import('../explore/explore.module').then((m) => m.ExploreModule),
      },
      {
        path: 'profile/:username',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
        resolve: { profile: profileResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
