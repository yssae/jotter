import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginEnrollComponent } from './access/login-enroll/login-enroll.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login',component: LoginEnrollComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
