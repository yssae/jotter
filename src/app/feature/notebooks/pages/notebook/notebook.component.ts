import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { NoteService } from '@jtr/feature/services';
import { NotebookService } from '@jtr/feature/services';
import { UtilityService } from '@jtr/shared';

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
    private location: Location,
    private route: ActivatedRoute,
    private noteService: NoteService,
    private notebookService: NotebookService,
    private utilityService: UtilityService) {

    }

  ngOnInit(): void {
    this.currentNbID = this.route.snapshot.paramMap.get('id');
    this.mapNotebook(this.location.getState());
    this.mapNoteEntries();
    this.subscribeToSearch();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  openNote(): void {
    this.dialog.open(TextEditorComponent)
  }

  mapNoteEntries(): void {
    this.noteService.fetchNotesforNb(this.currentNbID)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.noteEntries = data;
        this.filteredNoteEntries = [...this.noteEntries]
      })
  }

  mapNotebook(notebook: any): void {
    notebook && notebook._id ? this.notebook = notebook : this.fetchNotebookDetails();
  }

  fetchNotebookDetails(): void {
    if(this.currentNbID) {
      this.notebookService.fetchNotebookDetails(this.currentNbID)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response: any) => this.notebook = response)
    }
  }

  sort(option: any): void {
    this.utilityService.sort(this.filteredNoteEntries, option.property, option.ascending);
  }

  subscribeToSearch(): void {
    this.searchString.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(searchTerm => this.filteredNoteEntries = this.noteEntries.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }

}
