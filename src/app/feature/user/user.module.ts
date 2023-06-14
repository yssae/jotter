import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotesModule } from '../notes';

import { UserNavComponent } from '@jtr/feature/user';
import { UserComponent } from '@jtr/feature/user';

@NgModule({
  declarations: [
    UserNavComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    AppMaterialModule,
    SharedModule,
    NotesModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
