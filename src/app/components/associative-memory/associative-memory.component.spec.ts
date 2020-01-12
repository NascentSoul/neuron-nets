import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociativeMemoryComponent } from './associative-memory.component';

describe('AssociativeMemoryComponent', () => {
  let component: AssociativeMemoryComponent;
  let fixture: ComponentFixture<AssociativeMemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociativeMemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociativeMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
