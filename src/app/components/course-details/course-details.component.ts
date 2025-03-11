import { Component, Input } from '@angular/core';
import { Course } from '../../models/course';
import { LessonsComponent } from "../lessons/lessons.component";

@Component({
  selector: 'app-course-details',
  imports: [LessonsComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  @Input() course!: Course

  downloadMaterials(course: Course) {
    console.log("download");
    
  }
}
