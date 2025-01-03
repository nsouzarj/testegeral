import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { AuthService } from '../service/auth.service';
@Component({
selector: 'app-login',
standalone:true,
imports:[FormsModule, ReactiveFormsModule, CommonModule],
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
errorMessage: string | null = null;


constructor(private authService: AuthService, private formBuilder: FormBuilder, private appComponent: AppComponent) {
         this.loginForm = this.formBuilder.group({
              username: ['', Validators.required],
              password: ['', Validators.required]
           });
      }

   login(): void {
         if (this.loginForm.valid) {
              const username = this.loginForm.value.username;
              const password = this.loginForm.value.password;
               console.log('Login called with:', username, password);
               this.authService.login(username, password).subscribe(
                   (success) => {
                         if(success === true){
                           console.log('Login successful. Navigating to main menu.');
                             this.errorMessage = null;
                           this.appComponent.isLoggedIn = true;
                           window.location.reload();
                          }else{
                               console.log('Invalid credentials');
                              this.errorMessage = "Invalid credentials";
                           }
                        },
                   (error: HttpErrorResponse) => {
                         console.log('Login error', error);
                           this.errorMessage = "An error has occurred";
                     }
               );
        }
  }
}

