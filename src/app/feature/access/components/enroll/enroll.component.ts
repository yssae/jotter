import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JTRValidators } from '@jtr/shared';
import { TermsAndConditionComponent } from '@jtr/feature/access';
import { AuthService } from 'src/app/core/services/auth.service';
import { JtrDialogService } from '@jtr/shared';
import { takeUntil, Subject } from 'rxjs';
import { User } from '@jtr/shared';

@Component({
  selector: 'enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit, OnDestroy {
  @Output() toggle = new EventEmitter();
  private ngStop$ = new Subject<boolean>();
  hide: boolean = true;
  chide: boolean = true;
  submitted: boolean = false;
  enrollForm: FormGroup;
  testRoute: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private auth: AuthService,
    private route: ActivatedRoute,
    private jtr: JtrDialogService) {

    this.enrollForm = this.fb.group({
      username: ['', Validators.required,],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    },
    {
      validator: JTRValidators.mustMatch('password', 'cpassword')
    });
  }

  ngOnInit(): void {
    this.route.data
      .pipe(takeUntil(this.ngStop$))
      .subscribe(data => this.testRoute = data);
  }

  register(enrollForm: FormGroup) {
    this.submitted = true;

    if (enrollForm.invalid) {
      return;
    }

    this.auth.enroll(enrollForm.value)
      .pipe(takeUntil(this.ngStop$))
      .subscribe(() => {
        this.jtr.success("Registration is successful, you may now login.");
        this.switchToLogin();
      })
  }

  switchToLogin() {
    this.toggle.emit();
  }

  onOpenTC() {
    this.dialog.open(TermsAndConditionComponent);
  }

  isDirectlyAccessed() {
    return this.testRoute['onManualRedirect'];
  }

  get f() {
    return this.enrollForm.controls;
  }

  ngOnDestroy() {
    this.ngStop$.next(true);
    this.ngStop$.unsubscribe();
  }
}
