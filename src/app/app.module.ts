import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './shared/app-material.module';

import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './home/navbar/navbar.component';
import { GetStartedComponent } from './home/get-started/get-started.component';
import { FeatureComponent } from './home/feature/feature.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    GetStartedComponent,
    FeatureComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
