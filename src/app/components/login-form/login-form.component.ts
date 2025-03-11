import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../service/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'node:console';
import { User } from '../../models/user';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule,],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }


  mail: string;
  password: string;
  name: string;
  role: string;
  isRegister: boolean = false;

  register() {
    this.userService.register(new User(this.name, this.mail, this.password, this.role));
  }


  login() {
    this.userService.login(this.mail, this.password);

  }
}
