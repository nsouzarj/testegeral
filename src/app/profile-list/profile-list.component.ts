import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles: Profile[] = [];
  @Output() editProfile = new EventEmitter<Profile>();


  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.profileService.getProfiles().subscribe(profiles => {
      this.profiles = profiles;
    });
  }
  onEdit(profile: Profile): void {
    this.editProfile.emit(profile);
  }
}
