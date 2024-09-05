import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { AvatarComponent } from './avatar/avatar.component';
import { GridComponent } from './grid/grid.component';
import { MatIconModule } from '@angular/material/icon';
import { ClickedOutsideDirective } from './clicked-outside.directive';

@NgModule({
  declarations: [
    SpinnerComponent,
    AvatarComponent,
    GridComponent,
    ClickedOutsideDirective,
  ],
  imports: [CommonModule, MatIconModule],
  exports: [
    SpinnerComponent,
    AvatarComponent,
    GridComponent,
    ClickedOutsideDirective
  ],
})
export class SharedModule {}
