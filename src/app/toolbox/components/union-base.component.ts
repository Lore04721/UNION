// src/app/shared/base.component.ts
import { OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

export abstract class BaseComponent implements OnInit, OnDestroy {
  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // logica comune di inizializzazione
  }

  ngOnDestroy(): void {
    // cleanup risorse
  }
}
