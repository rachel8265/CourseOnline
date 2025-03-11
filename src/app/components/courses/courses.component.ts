import { Component, inject } from '@angular/core';
import { CourseService } from '../../service/course/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { CourseDetailsComponent } from "../course-details/course-details.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseAddFormComponent } from '../course-add-form/course-add-form.component';
import { LessonService } from '../../service/lesson/lesson.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-courses',
  imports: [CommonModule, CourseDetailsComponent, MatDialogModule, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule, MatRadioModule, FormsModule, MatCheckboxModule, MatSlideToggleModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  courses: Course[] = [];
  registeredCourses: Course[] = []; // רשימה של קורסים שהמשתמש רשום להם
  selectedCourse: Course | null = null;
  readonly dialog = inject(MatDialog);
  isTeacher: string = "student";

  constructor(lessonService: LessonService, private courseService: CourseService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
    this.loadRegisteredCourses();
    this.isTeacher = sessionStorage.getItem("role") as string;
  }

  loadCourses() {
    this.courseService.getCourses();
    this.courseService.courses$.subscribe(courses => {
      this.courses = courses; // מעדכן את המערך עם הקורסים שהתקבלו
      this.updateCourseCheckStates(); // עדכן את מצב הכפתורים
    });
  }

  loadRegisteredCourses() {
    this.courseService.getCoursesToUser().subscribe((registeredCourses => {

      this.registeredCourses = registeredCourses;
      this.updateCourseCheckStates(); // עדכון מצב 
    }))
  }
  updateCourseCheckStates() {
    this.courses.forEach(course => {
      course.checked = this.registeredCourses.some(registeredCourse => registeredCourse.id === course.id);
    });
  }

  onToggleChange(event: MatSlideToggleChange, course: Course): void {

    if (event.checked) {
      this.addUserToCourse(course);
    } else {
      this.deleteCourseToUser(course);
    }
  }

  addUserToCourse(course: Course): void {
    if (!this.registeredCourses.includes(course)) {
      this.registeredCourses.push(course);
      this.courseService.addUserToCourse(course.id)
    }
  }

  deleteCourseToUser(course: Course): void {
    if (!this.registeredCourses.includes(course)) {
      this.registeredCourses.push(course);
      this.courseService.deleteCourseToUser(course.id)
    }
  }


  //for teacher
  changeSelectedCourse() {
    this.selectedCourse = null
  }


  updateCourse(course: Course) {

    const dialogRef = this.dialog.open(CourseAddFormComponent);
    dialogRef.componentInstance.isUpdate = true;
    dialogRef.componentInstance.currentCourse = course;
    dialogRef.componentInstance.idcurentCourse = course.id;

    dialogRef.componentInstance.title = course.title;
    dialogRef.componentInstance.description = course.description;
    dialogRef.componentInstance.teacherId = course.teacherId;
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course.id)

  }

  addCourse(isUpdate: boolean) {
    const dialogRef = this.dialog.open(CourseAddFormComponent);
    dialogRef.componentInstance.isUpdate = false;

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['/courses']);
    });

  }

}


