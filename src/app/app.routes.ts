import { Routes } from '@angular/router';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { CoursesComponent } from './components/courses/courses.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginButtonComponent },
    { path: 'courses', component: CoursesComponent },
];