import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Lesson } from '../../modal/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
 private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  getLessonsBycourseId(courseId:number):Observable<Lesson[]>{
    const token = sessionStorage.getItem('userToken');
        console.log("token "+token);
        
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
  return  this.http.get<Lesson[]>(`${this.apiUrl}/courses/:${courseId}/lessons`,{headers})
  .pipe(
        catchError((error) => {
          console.error(" my Error fetching lesson", error);
          return of([]);
        }))
  }

}
