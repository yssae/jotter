import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { JtrDialogService } from '@jtr/shared';
import { map, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  constructor(
    private http: HttpClient,
    public jtr: JtrDialogService,
  ) { }

  createNotebook(notebook: Notebook) {
    const url = environment.API_BASEURL + ENDPOINT.NOTEBOOK;
    return this.http.post(url, notebook).pipe(
      map((response: any) => response.status),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }

  fetchNotebooks() {
    const url = environment.API_BASEURL +  ENDPOINT.NOTEBOOK_LIST;
    return this.http.get(url)
      .pipe(
        tap(response => console.log(response)),
        map((response: any) => response.data),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
        })
      )
  }

  fetchNotebookDetails(notebookID: string) {
    const url = environment.API_BASEURL + ENDPOINT.NOTEBOOK + notebookID;
    return this.http.get(url).pipe(
      map((response: any) => response.data),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }

  deleteNotebook(notebookID: string) {
    const url = environment.API_BASEURL + ENDPOINT.NOTEBOOK + notebookID;
    return this.http.delete(url).pipe(
      map((response: any) => response.data),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }

  editNotebook(notebook: Notebook) {
    const url = environment.API_BASEURL + ENDPOINT.NOTEBOOK + notebook._id;
    return this.http.put(url, notebook).pipe(
      map((response: any) => response.status),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }

}
