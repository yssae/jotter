import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginEnrollComponent } from './access/login-enroll/login-enroll.component';
import { ForgotPasswordComponent } from './access/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './access/reset-password/reset-password.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',component: LoginEnrollComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
