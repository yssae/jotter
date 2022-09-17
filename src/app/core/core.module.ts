import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CoreRoutingModule } from './core-routing.module';
import { AppMaterialModule } from '../shared/app-material.module';
import { SharedModule } from '../shared/shared.module';

import { UserNavComponent } from './account/user-nav/user-nav.component';
import { ChangeComponent } from './account/change/change.component'; //container component
import { ChangeEmailComponent } from './account/change/change-email/change-email.component';
import { ChangePasswordComponent } from './account/change/change-password/change-password.component';
@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
    ChangeComponent,
    ChangeEmailComponent,
    ChangePasswordComponent
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
