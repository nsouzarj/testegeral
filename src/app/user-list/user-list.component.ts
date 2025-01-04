
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  @Output() editUser = new EventEmitter<User>();

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  onEdit(user: User): void {
    this.authService.getLoggedUser().subscribe(loggedUser => {
      if (loggedUser && loggedUser.id === user.id) {
        this.editUser.emit(user);
      } else {
        this.authService.getUserRoles().pipe(
          map(roles => roles.includes('ROLE_ADMIN'))
        ).subscribe(isAdmin => {
          if (isAdmin) {
            this.editUser.emit(user);
          }
        })
      }
    })
  }
}
