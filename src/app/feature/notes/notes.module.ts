import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteComponent } from '@jtr/feature/notes';
import { TextEditorComponent } from '@jtr/feature/notes';
@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule,
    AppMaterialModule
  ],
  exports: [
    NotesComponent,
    NoteComponent,
    TextEditorComponent
  ]
})
export class NotesModule { }
