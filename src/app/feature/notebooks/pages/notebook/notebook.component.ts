import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TextEditorComponent } from '@jtr/feature/notes/components/text-editor/text-editor.component';
import { ActivatedRoute, Router } from '@angular/router';

import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Note } from 'src/app/shared/models/note.model';
import { Subject, takeUntil } from 'rxjs';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { NoteService } from '@jtr/feature/services/note.service';
import { Location } from '@angular/common';
import { NotebookService } from '@jtr/feature/services/notebook.service';

@Component({
  selector: 'notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  readonly filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Note',
    'sort' : true
  }

  noteEntries: Note[];
  notebook: Notebook;
  currentNbID: string | null = '';

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location,
    private notebookService: NotebookService,
    private mockNoteService: MockNoteService) {

    }


  ngOnInit(): void {
    this.mapNotebook(this.location.getState());
    this.currentNbID = this.route.snapshot.paramMap.get('id');
    this.mapNoteEntries();
  }

  openNote() {
    this.dialog.open(TextEditorComponent)
  }

  mapNoteEntries() {
    // this.mockNoteService.getNotes()
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe(data => {
    //     //console.log(data);
    //     this.noteEntries = data;
    //   });

    this.noteService.fetchNotes(this.currentNbID)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.noteEntries = data;
      })
  }

  mapNotebook(notebook: any) {
    notebook && notebook._id ? this.notebook = notebook : this.fetchNotebookDetails();
  }

  fetchNotebookDetails() {
    if(this.currentNbID) {
      this.notebookService.fetchNotebookDetails(this.currentNbID)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => this.notebook = response)
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }
}
