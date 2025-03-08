import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Course } from '../modal/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getCourses(): Observable<Course[]> {
    const token = sessionStorage.getItem('userToken');
    console.log("token "+token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Course[]>(`${this.apiUrl}/courses`, { headers }).pipe(
      catchError((error) => {
        console.error("Error fetching courses", error);
        return of([]);
      })
    );
  }
}