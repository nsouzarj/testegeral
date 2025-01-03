import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

 import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { CommonModule } from '@angular/common';
import { Profile } from '../models/profile.model';
import { UserService } from '../service/user.service';
import { ProfileService } from '../service/profile.service';
import { User } from '../models/user.model';
@Component({
   selector: 'app-user-form',
   standalone:true,
  imports:[FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './user-form.component.html',
   styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
   userForm: FormGroup;
  profiles: Profile[] = [];
 isEditMode = false;
userId: number | null = null;

    constructor(
         private formBuilder: FormBuilder,
        private userService: UserService,
       private profileService: ProfileService
 ) {
    this.userForm = this.formBuilder.group({
         name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
         profile: [null, Validators.required]
   });
}
  ngOnInit(): void {
       this.loadProfiles();
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

  onEdit(user: User): void {
      this.isEditMode = true;
      this.userId = user.id;
      this.userForm.patchValue({
         name: user.name,
         email: user.email,
         profile: user.profile
     });
 }
}
