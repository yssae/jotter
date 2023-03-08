import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextEditorComponent } from '@jtr/feature/notes/components/text-editor/text-editor.component';
import { ActivatedRoute } from '@angular/router';

import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Note } from 'src/app/shared/models/note.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  title: string = 'Evermore';
  filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Note',
    'sort' : true
  }

  noteEntries: Note[];

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private noteService: MockNoteService,
    ) { }


  ngOnInit(): void {
    this.mapNoteEntries();
    this.activatedRoute.data.subscribe(data => console.log(data));
  }

  openNote() {
    alert('open Note clicked')
    this.dialog.open(TextEditorComponent)
  }

  mapNoteEntries() {
    this.noteService.getNotes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        console.log(data);
        this.noteEntries = data;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }
}
