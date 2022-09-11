import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login-enroll/login/login.component';
import { EnrollComponent } from './login-enroll/enroll/enroll.component';
//import { VerifyComponent } from './verication/verify/verify.component';
import { VericationComponent } from './verication/verication.component';
import { TermsAndConditionComponent } from './login-enroll/terms-and-condition/terms-and-condition.component';

import { AppMaterialModule } from '../shared/app-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    EnrollComponent,
    VericationComponent,
    TermsAndConditionComponent
  ],
  entryComponents:[
    VericationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  exports: [
    LoginComponent,
    EnrollComponent
  ]
})
export class AccessModule { }
