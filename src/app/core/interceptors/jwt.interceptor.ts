import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.auth.userValue;
    const isAPIURL = request.url.startsWith(environment.API_BASEURL);

    if(user && isAPIURL) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user}`
        }
      })
    }

    return next.handle(request);
  }
}
