import { Component } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../modal/course';
import { CourseDetailsComponent } from "../course-details/course-details.component";

@Component({
  selector: 'app-courses',
  imports: [CourseDetailsComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
constructor(private courseService:CourseService,private activatedRoute: ActivatedRoute, private router: Router){}
courses:Course[]=[]
selectedCourse:Course|null=null

ngOnInit():void{
 this.courseService.getCourses().subscribe((data: Course[]) => {
  this.courses = data; // שמירת הקורסים ש;
})
}
onSelectCourse(course: Course): void {
  this.selectedCourse = course; // עדכון הקורס הנבחר
}
}
