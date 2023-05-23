import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JTROUTES } from 'src/app/shared/constants/jtr-routes.const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.auth.userValue;
      return user ? true : this.redirectToLogin('/');
  }

  canLoad(route: Route, segments?: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.auth.userValue;
    return user ? true : this.redirectToLogin('/');
  }

  // using createUrlTree allows to create a UrlTree object that represents the login route with the appropriate query parameters.
  private redirectToLogin(returnUrl: string): UrlTree {
    return this.router.createUrlTree([JTROUTES.LOGIN], { queryParams: { returnUrl }});
  }

}
