import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreListComponent } from './explore-list/explore-list.component';
import { ExploreService } from './explore.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ExploreListComponent],
  imports: [CommonModule, ExploreRoutingModule, SharedModule],
  providers: [ExploreService],
})
export class ExploreModule {}
