import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TermsAndConditionComponent } from '../terms-and-condition/terms-and-condition.component';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {
  hide = true;
  chide = true;
  testRoute: any;
  enrollForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
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
  }
}
