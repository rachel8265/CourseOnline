import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from "./components/login-button/login-button.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";

@Component({
  
  selector: 'app-root',
  imports: [RouterOutlet, LoginButtonComponent, RouterModule, RouterLink, RouterLinkActive, LoginFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CourseOnlineClient';
}
