import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../models/profile.model';
 @Component({
     selector: 'app-profile-list',
    standalone:true,
    imports:[CommonModule],
      templateUrl: './profile-list.component.html',
     styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
   profiles: Profile[] = [];

     constructor(private profileService: ProfileService) { }

     ngOnInit(): void {
       this.loadProfiles();
     }

    loadProfiles(): void {
         this.profileService.getProfiles().subscribe(profiles => {
            this.profiles = profiles;
        });
    }
}
