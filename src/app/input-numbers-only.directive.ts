import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputNumbersOnly]'
})
export class InputNumbersOnlyDirective {

  constructor() { }

  @HostListener('keydown', ['$event'])
  confirmFirst(event: KeyboardEvent) {
    if (!isNaN(Number(event.key)) || event.keyCode == 8 || event.keyCode == 9) {
      return true;
    }
    else {
      return false;
    }
  }

}
