import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../service/lesson/lesson.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lesson-add-form',
  imports: [
    FormsModule],
  templateUrl: './lesson-add-form.component.html',
  styleUrl: './lesson-add-form.component.css'
})
export class LessonAddFormComponent {
  @Input() courseId!: number; // מזהה הקורס
  @Output() lessonAdded = new EventEmitter<Lesson>();

  editingLesson: Lesson | null = null; // שיעור שנמצא בעריכה

  constructor(private lessonService: LessonService) { }

  lesson$: Observable<Lesson[]> | undefined = this.lessonService.lessons$;

  ngOnInit(): void {
    this.loadLessons(); // טען שיעורים כאשר הקומפוננט נטען
  }

  loadLessons(): void {
    this.lessonService.getLesson(this.courseId);
    this.lesson$ = this.lessonService.lessons$;
  }








  updateLesson(lesson: Lesson) {
    this.editingLesson = { ...lesson }; // העתקת שיעור לעריכה
  }

  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(this.courseId, lessonId).subscribe(() => {
      this.loadLessons();
    });
  }

  lessonTitle: string = '';
  lessonContent: string = '';



  addLesson() {
    const lesson = new Lesson(Date.now(), this.lessonTitle, this.lessonContent, this.courseId);
    this.lessonService.addLesson(this.courseId, lesson).subscribe(() => {
      // this.lessonAdded.emit(lesson); // שליחת השיעור שנוסף
      this.lessonTitle = '';
      this.lessonContent = '';
    });
  }
}