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

import { NotebooksComponent } from './notebooks/notebooks.component';
import { NotebookComponent } from './notebooks/notebook/notebook.component';

import { NbToolsComponent } from './nb-tools/nb-tools.component';
import { DeleteComponent } from './nb-tools/delete/delete.component';
import { CreateditComponent } from './nb-tools/create-edit/create-edit.component';

import { AllNotesComponent } from './all-notes/all-notes.component';

import { TextEditorComponent } from './nb-tools/text-editor/text-editor.component';

import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
    ChangeComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    NotebooksComponent,
    NotebookComponent,
    NbToolsComponent,
    CreateditComponent,
    DeleteComponent,
    TextEditorComponent,
    AllNotesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    AppMaterialModule,
    SharedModule,
    QuillModule
  ],
  exports: [
    NotebooksComponent,
    CreateditComponent,
    DeleteComponent,
    NbToolsComponent,
    TextEditorComponent
  ]
})
export class CoreModule { }
