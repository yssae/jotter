import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JtrDialogService } from '@jtr/shared';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { Note } from 'src/app/shared/models/note.model';
import { Observable, shareReplay, map, tap, of, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notebookNotesMap: Map<any, Observable<Note[]>> = new Map<any, Observable<Note[]>>();
  private notes$: Observable<Note[]> | null;
  private favoriteNotes$: Observable<Note[]> | null;

  constructor(
    private http: HttpClient,
    public jtr: JtrDialogService
  ) { }

  createNote(note: Note) {
    const url = environment.API_BASEURL + ENDPOINT.NOTES;
    return this.http.post(url, note)
      .pipe(
        map((response: any) => {
          this.clearCache();
          return response && response.status === 'success' ? true : false
        }),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
        })
      )
  }

  deleteNote(id: string) {
    const url = environment.API_BASEURL + ENDPOINT.NOTES + id;
    return this.http.delete(url)
      .pipe(
        map((response: any) => {
          this.clearCache();
          return response && response.status === 'success' ? true : false
        }),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
        })
      )
  }

  updateNote(note: Note, id: string) {
    const url = environment.API_BASEURL + ENDPOINT.NOTES + id;
    return this.http.put(url, note)
      .pipe(
        map((response: any) => {
          this.clearCache();
          return response && response.status === 'success' ? true : false
        }),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
      })
    )
  }

  fetchNotesforNb(notebookID: any): Observable<Note[]>{
    const url = environment.API_BASEURL + ENDPOINT.NOTES;
    const noteParams = new HttpParams().append('notebookID', notebookID);

    // Check if the notes are already cached
    if (this.notebookNotesMap.has(notebookID)) {
      return this.notebookNotesMap.get(notebookID) || of([]);
    }

    // Fetch notes from the API
    const notes$ = this.http.get<Note[]>(url, { params: noteParams }).pipe(
      map((response: any) => response.data),
      catchError(error => {
        if (error.error.status == 'fail' && error.error.data.length === 0) {
          return throwError(error);
        } else {
          this.jtr.error();
          return throwError(error);
        }
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // Cache the notes for the specified notebook
    this.notebookNotesMap.set(notebookID, notes$);

    return notes$;
  }

  fetchNotes(favorite: boolean = false): Observable<Note[]> {
    return favorite ? this.fetchFaveNotes() : this.fetchAllNotes();
  }

  private fetchFaveNotes(): Observable<Note[]> {
    const url = environment.API_BASEURL + ENDPOINT.NOTES;
    const noteParams = new HttpParams().set('bookmarked', true);

    if(!this.favoriteNotes$) {
      this.favoriteNotes$ = this.http.get(url, { params: noteParams })
      .pipe(
        map((response: any) => response.data),
        catchError(error => {
          if(error.error.status == 'fail' && error.error.data.length === 0) {
            // do nothing
            return throwError(error);
          }
          else {
            this.jtr.error();
            return throwError(error);
          }
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      )
    }

    return this.favoriteNotes$;
  }

  private fetchAllNotes(): Observable<Note[]> {
    const url = environment.API_BASEURL + ENDPOINT.NOTES;

    if(!this.notes$) {
      this.notes$ = this.http.get(url)
      .pipe(
        map((response: any) => response.data),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      )
    }

    return this.notes$;
  }

  private clearCache() {
    this.notes$ = null;
    this.favoriteNotes$ = null;
    this.notebookNotesMap.clear();
  }
}
