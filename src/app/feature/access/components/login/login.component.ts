import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { JTROUTES } from 'src/app/shared/constants/jtr-routes.const';
import { Subject } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService,) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if(this.auth.userValue) {
      this.router.navigate([JTROUTES.USER_DASHBOARD]);
    }
  }

  login() {
    this.submitted = true;
    if(this.loginForm.invalid) {
      return
    }

    this.auth.login(this.loginForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.router.navigate([JTROUTES.USER_DASHBOARD]));
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }
}
