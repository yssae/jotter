import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { JTROUTES } from 'src/app/shared/constants/jtr-routes.const';
import { JtrDialogService } from '@jtr/shared';
import { User } from '@jtr/shared';
import { catchError, first, map, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
    public jtr: JtrDialogService) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
    }

  enroll(user: User) {
    const url = environment.API_BASEURL + ENDPOINT.REGISTER;
    return this.http.post(url, user).pipe(
      map((response: any) => response.status),
      catchError(error => {
        this.jtr.error();
        return throwError(error)
      })
    )
  }

  login(user: User) {
    const url = environment.API_BASEURL + ENDPOINT.LOGIN;
    return this.http.post(url, user).pipe(
      map((response: any) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.userSubject.next(response.data);
        return response.status;
      }),
      catchError(error => {
        this.jtr.error("Incorrect login information. Please double-check your credentials and try again.");
        return throwError(error);
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate([JTROUTES.LOGIN]);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      // Token not found, consider it expired
      return true;
    }

    const tokenData = this.parseToken(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    return tokenData.exp < currentTime;
  }

  private parseToken(token: string): string | any {
    const base64URL = token.split('.')[1];
    const base64 = base64URL.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  private getToken(): string | null {
    return localStorage.getItem('user');
  }

  public get userValue() {
    return this.userSubject.value;
  }

}
