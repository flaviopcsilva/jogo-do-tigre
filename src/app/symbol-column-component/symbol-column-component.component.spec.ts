import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolColumnComponentComponent } from './symbol-column-component.component';

describe('SymbolColumnComponentComponent', () => {
  let component: SymbolColumnComponentComponent;
  let fixture: ComponentFixture<SymbolColumnComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolColumnComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymbolColumnComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
