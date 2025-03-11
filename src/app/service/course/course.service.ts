import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api';

  getCourses() {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.get<Course[]>(`${this.apiUrl}/courses`, { headers }).pipe(
        catchError((error) => {
          console.error("Error fetching courses", error);
          return of([]);
        })
      ).subscribe(courses => this.coursesSubject.next(courses));
    }
  }
  addCourse(course: Partial<Course>) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<Course>(`${this.apiUrl}/courses`, course, { headers }).subscribe(() => this.getCourses());


  }

  deleteCourse(idCourse: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.http.delete<Course>(`${this.apiUrl}/courses/${idCourse}`, { headers }).subscribe(
      () => this.getCourses());

  }

  updateCourse(idCourse: number, course: Partial<Course>) {
    const url = `${this.apiUrl}/courses/${idCourse}`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.http.put(url, course, { headers }).subscribe(() => this.getCourses());
  }

  getCoursesToUser(): Observable<Course[]> {
    const userId = sessionStorage.getItem("userId")
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<Course[]>(`http://localhost:3000/api/courses/student/${userId}`, { headers });
  }

  addUserToCourse(courseId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const userId = sessionStorage.getItem('userId');
    return this.http.post(`http://localhost:3000/api/courses/${courseId}/enroll`, { userId }, { headers }).subscribe({})
  }

  deleteCourseToUser(courseId: number) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const userId = sessionStorage.getItem('userId');
    return this.http.delete(`http://localhost:3000/api/courses/${courseId}/unenroll`, { headers, body: { userId } }).subscribe({})
  }
}