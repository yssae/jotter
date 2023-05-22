import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './components/home/home.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
  ]
})
export class CoreModule { }
