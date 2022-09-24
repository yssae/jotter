import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { CoreRoutingModule } from './core-routing.module';
import { AppMaterialModule } from '../shared/app-material.module';
import { SharedModule } from '../shared/shared.module';

import { UserNavComponent } from './account/user-nav/user-nav.component';
import { ChangeComponent } from './account/change/change.component'; //container component
import { ChangeEmailComponent } from './account/change/change-email/change-email.component';
import { ChangePasswordComponent } from './account/change/change-password/change-password.component';

import { NotebooksListComponent } from './notebooks-list/notebooks-list.component';
import { NotebooksComponent } from './notebooks-list/notebooks/notebooks.component';
import { NotebookComponent } from './notebooks-list/notebooks/notebook/notebook.component';
import { NotebookItemComponent } from './notebooks-list/notebook-item/notebook-item.component';

import { NbToolsComponent } from './nb-tools/nb-tools.component';
import { DeleteComponent } from './nb-tools/delete/delete.component';
import { CreateditComponent } from './nb-tools/create-edit/create-edit.component';

import { AllNotesComponent } from './all-notes/all-notes.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './notes/note/note.component';
import { TextEditorComponent } from './nb-tools/text-editor/text-editor.component';

import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
    ChangeComponent,
    ChangeEmailComponent,
    ChangePasswordComponent,
    NotebooksListComponent,
    NotebooksComponent,
    NotebookComponent,
    NbToolsComponent,
    CreateditComponent,
    DeleteComponent,
    TextEditorComponent,
    AllNotesComponent,
    FavoritesComponent,
    NotesComponent,
    NoteComponent,
    NotebookItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    AppMaterialModule,
    SharedModule,
    QuillModule
  ],
  exports: [
    NotebooksListComponent,
    NotebooksComponent,
    NotebookComponent,
    CreateditComponent,
    DeleteComponent,
    NbToolsComponent,
    TextEditorComponent,
    NotesComponent,
    NoteComponent,
    NotebookItemComponent
  ]
})
export class CoreModule { }
