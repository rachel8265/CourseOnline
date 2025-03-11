import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonAddFormComponent } from './lesson-add-form.component';

describe('LessonAddFormComponent', () => {
  let component: LessonAddFormComponent;
  let fixture: ComponentFixture<LessonAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonAddFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
