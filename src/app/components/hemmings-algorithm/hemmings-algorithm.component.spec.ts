import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemmingsAlgorithmComponent } from './hemmings-algorithm.component';

describe('HemmingsAlgorithmComponent', () => {
  let component: HemmingsAlgorithmComponent;
  let fixture: ComponentFixture<HemmingsAlgorithmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HemmingsAlgorithmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HemmingsAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
