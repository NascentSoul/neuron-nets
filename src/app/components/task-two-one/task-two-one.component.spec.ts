import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTwoOneComponent } from './task-two-one.component';

describe('TaskTwoOneComponent', () => {
  let component: TaskTwoOneComponent;
  let fixture: ComponentFixture<TaskTwoOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTwoOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTwoOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
