import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AccessModule, LoginEnrollComponent } from './../../feature/access';
import { AuthService } from './auth.service';
import { JtrDialogService, User } from '@jtr/shared';

import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { JTROUTES } from 'src/app/shared/constants/jtr-routes.const';

describe('AuthService', () => {
  let router: Router;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let jtrDialogServiceSpy: jasmine.SpyObj<JtrDialogService>;

  beforeEach(async () => {
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    jtrDialogServiceSpy = jasmine.createSpyObj('JtrDialogService', ['error']);

    await TestBed.configureTestingModule({
      imports: [
        AccessModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'auth', component: LoginEnrollComponent },
        ]),
      ],
      providers: [
        AuthService,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: JtrDialogService, useValue: jtrDialogServiceSpy }
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    jtrDialogServiceSpy = TestBed.inject(JtrDialogService) as jasmine.SpyObj<JtrDialogService>;
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.removeItem('user');
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('enroll', () => {
    it('should make a POST request to enroll API and return status after successful enrollment', () => {
      const mockUser: User = { username: 'testuser', password: 'testpassword' };
      const url = environment.API_BASEURL + ENDPOINT.REGISTER;

      authService.enroll(mockUser).subscribe((response) => expect(response).toBeTruthy());

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);
    });

    it('should call dialog service and propagate error', () => {
      const mockUser: User = { username: 'testuser', password: 'testpassword' };

      authService.enroll(mockUser).subscribe({
        error: () => expect(jtrDialogServiceSpy.error).toHaveBeenCalled()
      })

      const url = environment.API_BASEURL + ENDPOINT.REGISTER;
      const req = httpTestingController.expectOne(url);
      req.flush(null, { status: 500, statusText: 'Server Error' }); // Simulate an error response
    })
  })

  describe('login', () => {
    it('should make a POST request to Login API', () => {
      const mockUser: User = { username: 'testuser', password: 'testpassword' };
      const url = environment.API_BASEURL + ENDPOINT.LOGIN;

      authService.login(mockUser).subscribe();

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);
    });

    it('should set token in localStorage and update userValue', () => {
      const mockUser: User = { username: 'testuser', password: 'testpassword' };
      const url = environment.API_BASEURL + ENDPOINT.LOGIN;

      authService.login(mockUser).subscribe(() => {
        const userToken = localStorage.getItem('user');
        expect(userToken).toBeTruthy();
      });

      const req = httpTestingController.expectOne(url);
      const response = { status: 'success', data: mockUser };
      req.flush(response);

      expect(authService.userValue).toEqual(mockUser);
    })

    it('should call dialog service and propagate error', () => {
      const mockUser: User = { username: 'testuser', password: 'testpassword' };

      authService.login(mockUser).subscribe({
        error: () => {
          expect(jtrDialogServiceSpy.error).toHaveBeenCalled();
        }
      })

      const url = environment.API_BASEURL + ENDPOINT.LOGIN;
      const req = httpTestingController.expectOne(url);
      req.flush(null, { status: 500, statusText: 'Server Error' }); // Simulate an error response
    })
  })

  describe('logout', () => {
    it('should remove token in localStorage and nullify userSubject', () => {
      const userToken = localStorage.getItem('user');

      authService.logout();
      expect(userToken).toBeNull();
      expect(authService.userValue).toBeNull();
    });

    it('should navigate to login page after logout', fakeAsync(() => {
      spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

      authService.logout();

      tick(); // Simulate the passage of time until all pending asynchronous tasks are complete
      expect(router.navigate).toHaveBeenCalledWith([JTROUTES.LOGIN])
    }))
  })

});
