import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from '@jtr/feature/account';
import { NotesModule } from '@jtr/feature/notes';
import { QuillModule } from 'ngx-quill';
import { TextEditorComponent } from './notes/components/text-editor/text-editor.component';

@NgModule({
  declarations: [
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
    TextEditorComponent,
  ]
})
export class FeatureModule { }
