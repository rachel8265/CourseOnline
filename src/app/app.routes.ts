import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';

// export const routes: Routes = [
//     // {path:"/l",component:LoginButtonComponent},
//     // { path: '',  },
//     // { path: '', component: LoginButtonComponent },
//     {path:'login3',component:LoginFormComponent}
// ];
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginButtonComponent },
    // { path: '', component: LoginButtonComponent},//,children:[{path:'login',component:LoginFormComponent}] },
        // ,children:[
            // {path:'login3',component:LoginButtonComponent}
    //  } // הפוך את AppComponent לקומפוננטה הראשית
    // { path: 'login3', component: LoginFormComponent },
    // { path: 'login', component: LoginButtonComponent } 
    
{path:'courses',component:CoursesComponent},
];