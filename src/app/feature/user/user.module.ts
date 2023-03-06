import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserNavComponent } from '@jtr/feature/user';
import { UserComponent } from '@jtr/feature/user';
import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserNavComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule,
    SharedModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
