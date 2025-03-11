import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Lesson } from '../../models/lesson';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LessonService {
  private apiUrl = 'http://localhost:3000/api';
  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  lessons$ = this.lessonsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getLesson(courseId: number) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return;
    }
    this.http.get<Lesson[]>(`${this.apiUrl}/courses/${courseId}/lessons`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(lessons => this.lessonsSubject.next(lessons));
  }

  addLesson(courseId: number, lesson: Lesson): Observable<Lesson> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<Lesson>(`${this.apiUrl}/courses/${courseId}/lessons`, lesson, { headers })
      .pipe(catchError(error => {
        alert("Add Lesson failed: " + error.message);
        return of({} as Lesson);
      }));
  }

  updateLesson(courseId: number, lessonId: number, lesson: Lesson): Observable<Lesson> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<Lesson>(`${this.apiUrl}/courses/${courseId}/lessons/${lessonId}`, lesson, { headers })
      .pipe(catchError(error => {
        alert("Update Lesson failed: " + error.message);
        return of({} as Lesson);
      }));
  }

  deleteLesson(courseId: number, lessonId: number): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<void>(`${this.apiUrl}/courses/${courseId}/lessons/${lessonId}`, { headers })
      .pipe(catchError(error => {
        alert("Delete Lesson failed: " + error.message);
        return of();
      }));
  }
}
