import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://192.168.18.5:8084';
  private tokenKey = 'auth_token';
  private roleKey = 'auth_role';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean | string> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    });
    return this.http.get(`${this.apiUrl}/auth/login`, { headers }).pipe(
      tap(response => console.log('Login Response:', response)),
      map((response: any) => {
        localStorage.setItem(this.tokenKey, btoa(`${username}:${password}`));
        console.log("Login Success:", response)
        localStorage.setItem(this.roleKey, response?.name);

        return true
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': 'Basic ' + token,
      });
    }
    return new HttpHeaders();
  }
  getUserRoles(): Observable<string[]> {
    const role = localStorage.getItem(this.roleKey);
    if (role) {
      return of([`ROLE_${role}`])
    }
    return of([]);
  }
}
