import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login-enroll/login/login.component';
import { EnrollComponent } from './login-enroll/enroll/enroll.component';
import { LoginEnrollComponent } from './login-enroll/login-enroll.component';
import { VericationComponent } from './verication/verication.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermsAndConditionComponent } from './login-enroll/terms-and-condition/terms-and-condition.component';
import { AppMaterialModule } from '../../shared/app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AccessRoutingModule } from './access.routing.module';
@NgModule({
  declarations: [
    LoginComponent,
    EnrollComponent,
    LoginEnrollComponent,
    VericationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TermsAndConditionComponent,
  ],
  entryComponents:[
    VericationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccessRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    EnrollComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ]
})
export class AccessModule { }
