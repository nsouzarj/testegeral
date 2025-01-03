import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://192.168.18.5:8084/profiles';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`http://192.168.18.5:8084/profiles/list`, { headers: this.authService.getAuthHeaders() });
  }

  getProfileById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`http://192.168.18.5:8084/profiles/${id}`, { headers: this.authService.getAuthHeaders() });
  }
  createProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile, { headers: this.authService.getAuthHeaders() });
  }

  updateProfile(id: number, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`http://192.168.18.5:8084/profiles/${id}`, profile, { headers: this.authService.getAuthHeaders() });
  }
}
