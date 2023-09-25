import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-symbol-column',
  templateUrl: './symbol-column-component.component.html',
  styleUrls: ['./symbol-column-component.component.css']
})
export class SymbolColumnComponent implements OnInit {
  @Input() symbols: any[] = [];
  @Input() spinSpeed: number = 500; // Velocidade de rotação

  currentSymbolIndex: number = 0;
  private destroy$ = new Subject();

  constructor() { }

  ngOnInit() {
    this.startRotation();
  }

  rotateSymbols() {
    this.currentSymbolIndex++;

    if (this.currentSymbolIndex >= this.symbols.length) {
      this.currentSymbolIndex = 0;
    }
  }

  startRotation() {
    interval(this.spinSpeed)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.rotateSymbols();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

