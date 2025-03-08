import { Component, Input } from '@angular/core';
import { Course } from '../../modal/course';
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
    // לוגיקה להורדת חומרים, לדוגמה:
    // window.open(course.materialsUrl, '_blank'); // הנח ש-course.materialsUrl הוא כתובת URL לחומרים
    console.log("download");
    
  }
}
