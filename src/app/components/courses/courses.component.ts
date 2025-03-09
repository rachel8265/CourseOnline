import { Component } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../modal/course';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-courses',
  imports: [CourseDetailsComponent, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule, MatRadioModule, FormsModule, MatCheckboxModule, MatSlideToggleModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute, private router: Router) { }
  courses: Course[] = []
  selectedCourse: Course | null = null

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data; // שמירת הקורסים ש;
    })
  }
  onSelectCourse(course: Course): void {
    this.selectedCourse = course; // עדכון הקורס הנבחר
  }


  checked = false;
  disabled = false;
  
  personalCourses: any[] = [];
  onToggleChange(event: any, course: any): void {
    if (event.checked) {
      this.addCourse(course); // הוסף קורס אם ה-toggle נבחר
    } else {
      this.removeCourse(course); // הסר קורס אם ה-toggle לא נבחר
    }
  }

  addCourse(course: any): void {
    if (!this.personalCourses.includes(course)) {
      this.personalCourses.push(course);
      // כאן תוכל להוסיף קוד לשליחה ל-DB
    }
  }

  removeCourse(course: any): void {
    const index = this.personalCourses.indexOf(course);
    if (index > -1) {
      this.personalCourses.splice(index, 1);
      // כאן תוכל להוסיף קוד לשליחה ל-DB
    }
  }

  // isCourseSelected(course: any): boolean {
  //   return this.personalCourses.includes(course);
  // }
}
