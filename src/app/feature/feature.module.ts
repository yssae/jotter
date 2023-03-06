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



import { NotebooksListComponent } from './notebooks-list/notebooks-list.component';
import { NotebooksComponent } from './notebooks-list/notebooks/notebooks.component';
import { NotebookComponent } from './notebooks-list/notebooks/notebook/notebook.component';
import { NotebookItemComponent } from './notebooks-list/notebook-item/notebook-item.component';

import { NbToolsComponent } from './nb-tools/nb-tools.component';
import { DeleteComponent } from './nb-tools/delete/delete.component';
import { CreateditComponent } from './nb-tools/create-edit/create-edit.component';

import { TextEditorComponent } from './nb-tools/text-editor/text-editor.component';


@NgModule({
  declarations: [
    NotebooksListComponent,
    NotebooksComponent,
    NotebookComponent,
    NbToolsComponent,
    CreateditComponent,
    DeleteComponent,
    TextEditorComponent,
    NotebookItemComponent,
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
    NotebooksListComponent,
    NotebooksComponent,
    NotebookComponent,
    CreateditComponent,
    DeleteComponent,
    NbToolsComponent,
    TextEditorComponent,
    NotebookItemComponent
  ]
})
export class FeatureModule { }
