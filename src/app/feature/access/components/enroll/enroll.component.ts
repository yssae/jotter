import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VericationComponent } from '@jtr/feature/access';
import { TermsAndConditionComponent } from '@jtr/feature/access';
import { User } from '@jtr/shared';

@Component({
  selector: 'enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  hide: boolean = true;
  chide: boolean = true;
  submitted: boolean = false;
  enrollForm: FormGroup;
  testRoute: any;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private activatedroute:ActivatedRoute) { }


  ngOnInit(): void {

    this.activatedroute.data.subscribe(data => this.testRoute = data);
    //alert(this.testRoute['onManualRedirect']);

    /*
      "username":"adrian",
      "email":"test@test.com",
      "password":"test3321
    */
    this.enrollForm = this.fb.group({
      username: [
        '',
        Validators.required,
      ],
      email: [
        '',
        Validators.required,
        Validators.email
      ],
      password:  [
        '',
        Validators.required,
      ],
      cpassword:  [
        '',
        Validators.required,
      ],
    });
    this.hide =true;
    console.log('hide', this.hide);
  }


  get f() {
    return this.enrollForm.controls;
  }


  onOpenTC() {
    this.dialog.open(TermsAndConditionComponent);
  }


  isDirectlyAccessed() {
    return this.testRoute['onManualRedirect'];
  }


  onRegister(enrollForm: User) {

    this.submitted = true;

    //this.access.onRegister(enrollForm); : { [key: string]: AbstractControl }
    // TO DO: close dialog and redirect when verification is correct
    this.dialog.open(VericationComponent, {
      disableClose: true,
      panelClass: 'jtr-dialog'
    });
  }
}
