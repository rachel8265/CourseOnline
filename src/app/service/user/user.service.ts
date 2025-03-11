import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { error } from 'node:console';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }


  register(user: User): void {
    this.http.post<any>(`${this.apiUrl}/auth/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          alert("you allready register");
        }
        // מחזיר שגיאה אם יש בעיה אחרת
        return throwError("you allready register");
      })
    ).subscribe(result => {
      sessionStorage.setItem('token', result.token)

      sessionStorage.setItem("role", result.role)
      sessionStorage.setItem("userId", result.userId)
    })
  }

  // התחברות של משתמש
  login(email: string, password: string): void {
    this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).subscribe(
      result =>{
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem("role", result.role)
        sessionStorage.setItem("userId", result.userId)
      })
}
  
  }

