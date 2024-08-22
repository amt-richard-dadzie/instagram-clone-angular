import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { AvatarComponent } from './avatar/avatar.component';
import { GridComponent } from './grid/grid.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SpinnerComponent, AvatarComponent, GridComponent],
  imports: [CommonModule, MatIconModule],
  exports: [SpinnerComponent, AvatarComponent, GridComponent],
  
})
export class SharedModule {}
