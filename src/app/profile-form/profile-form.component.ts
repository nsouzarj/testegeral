
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../service/profile.service';
@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})

export class ProfileFormComponent implements OnInit, OnChanges {
  profileForm: FormGroup;
  isEditMode = false;
  profileId: number | null = null;


  @Input() profile: Profile | null = null;
  @Output() cancelEditProfile = new EventEmitter<void>();


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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && changes['profile'].currentValue) {
      this.isEditMode = true;
      this.profileId = changes['profile'].currentValue.id;
      this.profileForm.patchValue({
        name: changes['profile'].currentValue.name
      });
    } else {
      this.isEditMode = false;
      this.profileId = null;
      this.profileForm.reset();
    }
  }
  onSubmit(): void {
    if (this.profileForm.valid) {
      const profile = this.profileForm.value as Profile;
      profile.name = profile.name.toUpperCase();
      if (this.isEditMode && this.profileId) {
        this.profileService.updateProfile(this.profileId, profile).subscribe(() => {
          this.profileForm.reset();
          this.isEditMode = false;
          this.profileId = null;
        });
      } else {
        this.profileService.createProfile(profile).subscribe(() => {
          this.profileForm.reset();
        });
      }
    }
  }

  onCancel(): void {
    this.profileForm.reset();
    this.isEditMode = false;
    this.profileId = null;
    this.cancelEditProfile.emit(); // Emite o evento para o componente pai
  }

}
