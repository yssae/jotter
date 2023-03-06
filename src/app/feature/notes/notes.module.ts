import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotesComponent,
    NoteComponent
  ]
})
export class NotesModule { }
