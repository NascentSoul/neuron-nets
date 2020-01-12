import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopfieldNetComponent } from './hopfield-net.component';

describe('HopfieldNetComponent', () => {
  let component: HopfieldNetComponent;
  let fixture: ComponentFixture<HopfieldNetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopfieldNetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopfieldNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
