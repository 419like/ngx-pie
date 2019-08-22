import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasPieComponent } from './canvas-pie.component';

describe('CanvasPieComponent', () => {
  let component: CanvasPieComponent;
  let fixture: ComponentFixture<CanvasPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
