
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { map, Observable, take } from 'rxjs';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { ProfileService } from '../service/profile.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  profiles: Profile[] = [];
  isEditMode = false;
  userId: number | null = null;
  @Input() user: User | null = null;
  @Output() cancelEditUser = new EventEmitter<void>();


  isAdmin: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      profile: [null, Validators.required],
    });
    this.isAdmin = this.authService.getUserRoles().pipe(
      map(roles => roles.includes('ROLE_ADMIN'))
    );
  }
  ngOnInit(): void {
    this.loadProfiles();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.isEditMode = true;
      this.userId = changes['user'].currentValue.id;
      this.userForm.patchValue({
        name: changes['user'].currentValue.name,
        email: changes['user'].currentValue.email,
        profile: changes['user'].currentValue.profile
      });
      this.isAdmin.pipe(take(1)).subscribe(isAdmin => {
        if (!isAdmin) {
          this.userForm.get('profile')?.disable();
        } else {
          this.userForm.get('profile')?.enable();
        }
      })
    } else {
      this.isEditMode = false;
      this.userId = null;
      this.userForm.reset();
    }
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => {
      this.profiles = profiles;
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value as User;
      if (this.isEditMode && this.userId) {
        this.userService.updateUser(this.userId, user).subscribe(() => {
          this.userForm.reset();
          this.isEditMode = false;
          this.userId = null;
        });
      } else {
        this.userService.createUser(user).subscribe(() => {
          this.userForm.reset();
        });
      }
    }
  }
  onCancel(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.userId = null;
    this.cancelEditUser.emit(); // Emite o evento para o componente pai
  }



}
