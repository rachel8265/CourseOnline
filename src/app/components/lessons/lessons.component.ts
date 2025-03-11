import { Component, Input, input, OnInit, SimpleChanges } from '@angular/core';
import { Course } from '../../models/course';
import { LessonService } from '../../service/lesson/lesson.service';
import { Lesson } from '../../models/lesson';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lessons',
  imports: [],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
constructor(private lessonService:LessonService){}//,private activatedRoute: ActivatedRoute, private router: Router){}
lessons:Lesson[]=[]
@Input() course!: Course

lesson$:Observable<Lesson[]>|undefined = this.lessonService.lessons$;

ngOnInit(): void {
  this.loadLessons(); // טען שיעורים כאשר הקומפוננט נטען
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['course'] && this.course) {
    this.loadLessons(); // טען שיעורים כאשר הקורס משתנה
  }
}

loadLessons(): void {
  this.lessonService.getLesson(this.course.id);
  this.lessonService.lessons$.subscribe(l=>{this.lessons=l})
  this.lesson$ = this.lessonService.lessons$; 
}
}

 



