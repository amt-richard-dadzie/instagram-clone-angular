import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostDetailModalRoutingModule } from './post-detail-modal-routing.module';
import { PostDetailModalComponent } from './post-detail-modal.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { PostDetailsService } from './post-details.service';

@NgModule({
  declarations: [PostDetailModalComponent],
  imports: [
    CommonModule,
    PostDetailModalRoutingModule,
    SharedModule,
    MatIconModule,
  ],
  providers: [PostDetailsService],
})
export class PostDetailModalModule {}
