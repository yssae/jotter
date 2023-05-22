import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './shared/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [
    {
      provide: 'API_BASEURL',
      useValue: environment.API_BASEURL
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
