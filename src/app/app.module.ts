import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './shared/app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AccessModule } from './access/access.module';

import { LoginEnrollComponent } from './access/login-enroll/login-enroll.component';
// import { LoginComponent } from './access/login-enroll/login/login.component';
// import { EnrollComponent } from './access/login-enroll/enroll/enroll.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginEnrollComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HomeModule,
    CoreModule,
    SharedModule,
    AccessModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
