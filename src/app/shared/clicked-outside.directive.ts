import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickedOutside]',
})
export class ClickedOutsideDirective {
  public constructor(private element: ElementRef) {}

  @Output() public clickedOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClickOutside(target: HTMLElement) {
    const clickedInside = this.element.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickedOutside.emit();
    }
  }
}
