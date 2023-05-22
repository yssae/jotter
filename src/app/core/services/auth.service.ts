import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { JtrDialogService } from '@jtr/shared';
import { User } from '@jtr/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public jtr: JtrDialogService) { }

  enroll(user: User) {
    const url = environment.API_BASEURL + ENDPOINT.REGISTER;
    return this.http.post(url, user).pipe(
      map((result: any) => result.status),
      catchError(error => {
        this.jtr.error();
        return throwError(error)
      })
    )
  }

}
