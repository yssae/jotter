import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '@jtr/feature/account';
import { NotesModule } from '@jtr/feature/notes';

import { QuillModule } from 'ngx-quill';
import { AppMaterialModule } from '../shared/app-material.module';

import { NbToolsComponent } from './nb-tools/nb-tools.component';
import { DeleteComponent } from './nb-tools/delete/delete.component';
import { CreateditComponent } from './nb-tools/create-edit/create-edit.component';

import { TextEditorComponent } from './notes/components/text-editor/text-editor.component';


@NgModule({
  declarations: [
    NbToolsComponent,
    CreateditComponent,
    DeleteComponent,
    TextEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FeatureRoutingModule,
    SharedModule,
    AppMaterialModule,
    QuillModule,
    AccountModule,
    NotesModule,
  ],
  exports: [
    CreateditComponent,
    DeleteComponent,
    NbToolsComponent,
    TextEditorComponent,
  ]
})
export class FeatureModule { }
