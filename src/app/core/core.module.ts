import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CoreRoutingModule } from './core-routing.module';
import { AppMaterialModule } from '../shared/app-material.module';
import { SharedModule } from '../shared/shared.module';

import { UserNavComponent } from './account/user-nav/user-nav.component';
import { ChangeComponent } from './account/change/change.component'; //container component

@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
    ChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    AppMaterialModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CoreModule { }
