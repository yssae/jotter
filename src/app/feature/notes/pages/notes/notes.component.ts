import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Note } from 'src/app/shared/models/note.model'
@Component({
  selector: 'notes-list',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  notes: Note[];

  constructor(private noteService: MockNoteService) { }

  ngOnInit(): void {
    this.noteService.getNotes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => this.notes = data)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

}
