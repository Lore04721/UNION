
import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({ selector: '[legacyInit]' })
export class LegacyInitDirective implements AfterViewInit, OnDestroy {
  constructor(private el: ElementRef) {}
  ngAfterViewInit() {
    // Esempio: inizializza qui plugin o script legacy su this.el.nativeElement
    // (window as any).$?.call($(this.el.nativeElement));
  }
  ngOnDestroy() {
    // cleanup se necessario
  }
}
