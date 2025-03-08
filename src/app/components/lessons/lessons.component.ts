import { Component, Input, input } from '@angular/core';
import { Course } from '../../modal/course';
import { LessonService } from '../../service/lesson/lesson.service';
import { Lesson } from '../../modal/lesson';

@Component({
  selector: 'app-lessons',
  imports: [],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
constructor(private lessonService:LessonService){}//,private activatedRoute: ActivatedRoute, private router: Router){}
lessons:Lesson[]=[]

ngOnInit():void{
 this.lessonService.getLessonsBycourseId(this.course.teacherId).subscribe((data: Lesson[]) => {
  this.lessons = data; console.log(this.lessons);
  console.log(this.course);
  
})}

 @Input() course!: Course




}
