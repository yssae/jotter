import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { ChangeComponent } from '@jtr/feature/account';
import { ChangeEmailComponent } from '@jtr/feature/account';
import { ChangePasswordComponent } from '@jtr/feature/account';

@NgModule({
  declarations: [
    ChangeComponent,
    ChangeEmailComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [ ChangeComponent ]
})
export class AccountModule { }
