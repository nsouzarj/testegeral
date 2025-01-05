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
import { Profile } from './models/profile.model';
import { User } from './models/user.model';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent, UserListComponent, ProfileFormComponent, ProfileListComponent, MenuComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SYSCADUSER';
  activeSection: string = 'user-list';
  isLoggedIn: boolean | string = false;
  profileToEdit: Profile | null = null;
  userToEdit: User | null = null;
  loggedUser: User | null = null;

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
      this.authService.getLoggedUser().subscribe(user => this.loggedUser = user)
    } else {
      console.log('Token not found. Setting isLoggedIn to false');
      this.isLoggedIn = false;
    }
    console.log("isLoggedIn:", this.loggedUser?.name)
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
  onEditProfile(profile: Profile): void {
    this.profileToEdit = profile;
    this.activeSection = 'profile-form';
  }
  onCancelProfileEdit(): void {
    this.profileToEdit = null;
    this.activeSection = 'profile-list';
  }
  onEditUser(user: User): void {
    this.userToEdit = user;
    this.activeSection = 'user-form';
  }
  onCancelUserEdit(): void {
    this.userToEdit = null;
    this.activeSection = 'user-list';
  }
  isOwnUser(user: User): boolean {
    if (this.loggedUser) {
      return this.loggedUser.id === user.id;
    }
    return false;
  }
}
