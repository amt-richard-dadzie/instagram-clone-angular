import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailModalComponent } from './post-detail-modal.component';

const routes: Routes = [{ path: '', component: PostDetailModalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostDetailModalRoutingModule { }
