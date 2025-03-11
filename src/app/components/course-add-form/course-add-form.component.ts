import { Component, SimpleChanges } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../service/course/course.service';
import { Course } from '../../models/course';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../service/lesson/lesson.service';
import { LessonAddFormComponent } from "../lesson-add-form/lesson-add-form.component";
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-course-add-form',
  imports: [MatIconModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule, LessonAddFormComponent],

  templateUrl: './course-add-form.component.html',
  styleUrl: './course-add-form.component.css'
})
export class CourseAddFormComponent {
  constructor(private courseService: CourseService, private lessonService: LessonService, private activatedRoute: ActivatedRoute) { }
  title: string | undefined = ''
  description: string | undefined = ''
  teacherId: number;

  lessonId: number
  showLessonInput: boolean = false; //

  isUpdate: boolean = false
  currentCourse: Partial<Course>
  idcurentCourse: number
  lessons: Lesson[] = [];
  lesson$: Observable<Lesson[]> = this.lessonService.lessons$;

  ngOnInit(): void {
    if (this.currentCourse) {
      this.title = this.currentCourse.title;
      this.description = this.currentCourse.description;
      if (this.currentCourse.id)
        this.loadLessons(this.currentCourse.id);
      this.isUpdate = true;
    }
  }


  loadLessons(courseId: number) {
    this.lessonService.getLesson(courseId);
    this.lessonService.lessons$.subscribe(lessons => {
      this.lessons = lessons;
    });
  }
  addLesson() {
    this.showLessonInput = true; // הצג את שדות השיעור
  }
  deleteLesson(lessonId: number) {

    this.lessonService.deleteLesson(this.idcurentCourse, lessonId).subscribe(() => {
      this.loadLessons(this.idcurentCourse);

    })
  }
  saveDetail() {
    this.currentCourse = {
      title: this.title,
      description: this.description,
      teacherId: this.teacherId
    };

    if (this.isUpdate) {
      this.courseService.updateCourse(this.idcurentCourse, this.currentCourse);

      this.lessons.forEach(lesson => {
        this.lessonService.updateLesson(this.idcurentCourse, lesson.id, lesson).subscribe();
      });
    }
    else {
      this.courseService.addCourse(this.currentCourse)
    }
  }

}
