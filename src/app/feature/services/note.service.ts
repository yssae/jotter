import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JtrDialogService } from '@jtr/shared';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { Note } from 'src/app/shared/models/note.model';
import { map, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient,
    public jtr: JtrDialogService
  ) { }

  createNote(note: Note) {
    const url = environment.API_BASEURL + ENDPOINT.NOTES;
    return this.http.post(url, note)
      .pipe(
        map((response: any) => response && response.status === 'success' ? true : false),
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
        map((response: any) => response && response.status === 'success' ? true : false),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
      })
    )
  }

  fetchNotes(notebookID: any) {
    const url = environment.API_BASEURL + ENDPOINT.NOTES;
    const noteParams = new HttpParams().append('notebookID', notebookID);
    return this.http.get(url, { params: noteParams })
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
        })
      )
  }

  deleteNote(id: string) {
    const url = environment.API_BASEURL + ENDPOINT.NOTES + id;
    return this.http.delete(url)
      .pipe(
        map((response: any) => response && response.status === 'success' ? true : false),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
        })
      )
  }

}
