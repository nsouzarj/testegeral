import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';

import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent, UserListComponent, ProfileFormComponent, ProfileListComponent, MenuComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meu-frontend';
  activeSection: string = 'user-list';
  isLoggedIn: boolean | string = false;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    console.log("ngOnInit called");
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    console.log('Check login status called');
    const token = this.authService.getToken();
    if (token) {
      console.log('Token found.');
      const role = localStorage.getItem('auth_role')
      this.isLoggedIn = role ? role : true;
    } else {
      console.log('Token not found. Setting isLoggedIn to false');
      this.isLoggedIn = false;
    }
    console.log("isLoggedIn:", this.isLoggedIn)
  }
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
    this.isLoggedIn = false;
  }
  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }
  isAdmin(): Observable<boolean> {
    if (this.isLoggedIn && typeof this.isLoggedIn === 'string') {
      return of(this.isLoggedIn.includes('ADMIN'));
    }
    return of(false);
  }
}
