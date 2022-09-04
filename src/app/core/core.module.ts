import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreComponent } from './core.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    CoreComponent,
    UserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
