import { Component, OnInit } from '@angular/core';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Note } from 'src/app/shared/models/note.model'
@Component({
  selector: 'notes-list',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[];

  constructor(private noteService: MockNoteService) { }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(data => this.notes = data)
  }



}
