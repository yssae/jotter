import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { CoreRoutingModule } from './feature-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from './account/account.module';

import { UserNavComponent } from './user/user-nav/user-nav.component';

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

import { QuillModule } from 'ngx-quill';
import { AppMaterialModule } from '../shared/app-material.module';

@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
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
    SharedModule,
    AppMaterialModule,
    QuillModule,
    AccountModule
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
export class FeatureModule { }
