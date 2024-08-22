import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { postDetailsResolver } from './post-detail-modal/profile-details.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'feed',
    canActivate: [authGuard],
    loadChildren: () => import('./feed/feed.module').then((m) => m.FeedModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'post/:id',
    resolve: {
      postsDetails: postDetailsResolver,
    },
    loadChildren: () =>
      import('./post-detail-modal/post-detail-modal.module').then(
        (m) => m.PostDetailModalModule
      ),
    outlet: 'modal',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
