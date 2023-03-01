import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { LoginEnrollComponent } from './pages/login-enroll/login-enroll.component';
import { VericationComponent } from './components/verication/verication.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { TermsAndConditionComponent } from './components/terms-and-condition/terms-and-condition.component';
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
