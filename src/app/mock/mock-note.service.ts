import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { note } from './note/mock-note.const';
import { Note } from '../shared/models/note.model';

import { notebook } from './notebook/mock-notebook.const';
import { Notebook } from '../shared/models/notebook.model';

@Injectable({
  providedIn: 'root'
})
export class MockNoteService {

  constructor(private http: HttpClient) { }

  getNotes() : Observable<Note[]> {
    return of(note);
  }

  getNotebooks() : Observable<Notebook[]> {
    return of(notebook);
  }
}
