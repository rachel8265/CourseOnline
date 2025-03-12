import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient,private router: Router) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return throwError("you already registered");
        }
        return throwError("Registration failed");
      })
    );
  }
  
  // התחברות של משתמש
  login(email: string, password: string): Observable<any> {
 return   this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) 
          alert("User not found");
        if (error.status === 400) 
        alert("Invalid credentials")
        // מחזיר שגיאה אם יש בעיה אחרת
        return throwError("Error logging in");
      }))
}
  
  }

