import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { NoteService } from '@jtr/feature/services/note.service';
import { NotebookService } from '@jtr/feature/services/notebook.service';
import { TextEditorComponent } from '@jtr/feature/notes';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { Note } from 'src/app/shared/models/note.model';

@Component({
  selector: 'notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  readonly filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Note',
    'sort' : true
  }

  noteEntries: Note[];
  filteredNoteEntries: Note[];
  notebook: Notebook;
  currentNbID: string | null = "";
  searchString = new FormControl();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location,
    private notebookService: NotebookService,) {

    }


  ngOnInit(): void {
    this.currentNbID = this.route.snapshot.paramMap.get('id');
    this.mapNotebook(this.location.getState());
    this.mapNoteEntries();
    this.subscribeToSearch();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  openNote() {
    this.dialog.open(TextEditorComponent)
  }

  mapNoteEntries() {
    this.noteService.fetchNotes(this.currentNbID)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.noteEntries = data;
        this.filteredNoteEntries = [...this.noteEntries]
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

  subscribeToSearch() {
    this.searchString.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(searchTerm => this.filteredNoteEntries = this.noteEntries.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }

}
