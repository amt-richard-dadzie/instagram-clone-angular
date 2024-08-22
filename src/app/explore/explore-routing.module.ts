import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreListComponent } from './explore-list/explore-list.component';


const routes: Routes = [
  {
    path: '',
    component: ExploreListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule {}
