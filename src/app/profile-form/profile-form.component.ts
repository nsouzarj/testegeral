import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../models/profile.model';
@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup;
  isEditMode = false;
  profileId: number | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("onSubmit called", this.profileForm);
    if (this.profileForm.valid) {
        console.log("Form is valid");
        const profile = this.profileForm.value as Profile;
        profile.name = profile.name.toUpperCase();
        if (this.isEditMode && this.profileId) {
            console.log("Updating profile", profile);
           this.profileService.updateProfile(this.profileId, profile).subscribe(() => {
                console.log("Profile updated successfully");
                 this.profileForm.reset();
                this.isEditMode = false;
               this.profileId = null;
            },
            (error) => {
              console.log("Error updating profile:", error); // Log de erro
           });
        } else {
           console.log("Creating profile", profile);
           this.profileService.createProfile(profile).subscribe(() => {
               console.log("Profile created successfully");
               this.profileForm.reset();
             },
             (error) => {
               console.log("Error creating profile:", error); // Log de erro
           });
         }
    } else {
         console.log("Form is invalid");
     }
    }

  onEdit(profile: Profile): void {
    this.isEditMode = true;
    this.profileId = profile.id;
    this.profileForm.patchValue({
      name: profile.name,
    });
  }
}
