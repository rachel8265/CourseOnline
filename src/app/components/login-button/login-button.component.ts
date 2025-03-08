import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login-button',
  imports: [MatButtonModule, RouterLink, RouterOutlet, MatDialogModule, LoginFormComponent, HttpClientModule,],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent {
  readonly dialog = inject(MatDialog);
  constructor(private router: Router) { }

  openDialog(isRegister:boolean) {

    const dialogRef = this.dialog.open(LoginFormComponent);
    dialogRef.componentInstance.isRegister = isRegister; 
    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.router.navigate(['/courses']);
    });
  }

  
}