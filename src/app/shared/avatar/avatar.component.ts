import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() public src = '';
  @Input() public altText = '';
  @Input() public width = 40;
  @Input() public height = 40;
}
