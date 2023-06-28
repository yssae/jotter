import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from './auth.service';
import { JtrDialogService, User } from '@jtr/shared';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let jtrDialogServiceSpy: jasmine.SpyObj<JtrDialogService>;

  beforeEach(async () => {
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    jtrDialogServiceSpy = jasmine.createSpyObj('JtrDialogService', ['error']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: JtrDialogService, useValue: jtrDialogServiceSpy }
      ],
    }).compileComponents();

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

});
