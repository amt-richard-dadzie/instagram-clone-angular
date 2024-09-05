import { ElementRef, EventEmitter } from '@angular/core';
import { ClickedOutsideDirective } from './clicked-outside.directive';

describe('ClickedOutsideDirective', () => {
  let directive: ClickedOutsideDirective;
  let elementRef: ElementRef;
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement('div');
    elementRef = new ElementRef(mockElement);
    directive = new ClickedOutsideDirective(elementRef);
    directive.clickedOutside = new EventEmitter<void>();
  });
  it('should create an instance of clicked outside directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit clickedOutside event if clicked outside the element', () => {
    jest.spyOn(elementRef.nativeElement, 'contains').mockReturnValue(false);

    jest.spyOn(directive.clickedOutside, 'emit');

    directive.onClickOutside(mockElement);

    expect(directive.clickedOutside.emit).toHaveBeenCalled();
  });

  it('should not emit clickedOutside event if clicked inside the element', () => {
    jest.spyOn(elementRef.nativeElement, 'contains').mockReturnValue(true);

    jest.spyOn(directive.clickedOutside, 'emit');

    directive.onClickOutside(mockElement);

    expect(directive.clickedOutside.emit).not.toHaveBeenCalled();
  });
});
