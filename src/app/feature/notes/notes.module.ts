import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteComponent } from '@jtr/feature/notes';
import { TextEditorComponent } from '@jtr/feature/notes';
import { DeleteNoteComponent } from '@jtr/feature/notes';
import { InvertColorDirective } from './directives/invert-color.directive';
@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    TextEditorComponent,
    DeleteNoteComponent,
    InvertColorDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    AppMaterialModule
  ],
  exports: [
    NotesComponent,
    NoteComponent,
    DeleteNoteComponent,
    TextEditorComponent
  ]
})
export class NotesModule { }
