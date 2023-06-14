import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

import { NoteService } from '@jtr/feature/services';
import { UtilityService } from '@jtr/shared';

import { Note } from 'src/app/shared/models/note.model'
@Component({
  selector: 'notes-list',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();

  readonly filterMenu = {
    'search' : true,
    'addButton' : false,
    'title' : 'Note',
    'sort' : true
  }

  title:string = "Notes";
  notes: Note[];
  filteredNotes: Note[];
  searchString = new FormControl();

  constructor(
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => data ? this.title = data.title : "Notes");

    this.mapNotes();
    this.subscribeToSearch();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  mapNotes(): void {
    let favorites = (this.title.toLowerCase() === 'favorites');
    this.noteService.fetchNotes(favorites)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((notes: Note[]) => {
        this.notes = notes;
        this.filteredNotes = [...this.notes];
      })
  }

  sort(option: any): void {
    this.utilityService.sort(this.filteredNotes, option.property, option.ascending);
  }

  subscribeToSearch(): void {
    this.searchString.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(searchTerm => this.filteredNotes = this.notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }

}
