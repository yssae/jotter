import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FeatureComponent } from './feature/feature.component';
import { FooterComponent } from './footer/footer.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactUsComponent,
    FeatureComponent,
    FooterComponent,
    GetStartedComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule { }
