import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { JtrDialogService } from '@jtr/shared';
import { User } from '@jtr/shared';
import { catchError, first, map, tap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private http: HttpClient,
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

  public get userValue() {
    return this.userSubject.value;
  }

}
