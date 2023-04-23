import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../shared/app-material.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { AccountModule } from '@jtr/feature/account';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeatureRoutingModule,
    AppMaterialModule,
    AccountModule,

  ]
})
export class FeatureModule { }
