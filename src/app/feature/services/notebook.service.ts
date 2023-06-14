import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { JtrDialogService } from '@jtr/shared';
import { Observable, shareReplay, map, tap, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private notebooks$: Observable<Notebook[]> | null;

  constructor(
    private http: HttpClient,
    public jtr: JtrDialogService,
  ) { }

  createNotebook(notebook: Notebook) {
    const url = environment.API_BASEURL + ENDPOINT.NOTEBOOK;
    return this.http.post(url, notebook).pipe(
      map((response: any) => {
        this.clearCache();
        return response.status
      }),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }

  fetchNotebooks(): Observable<Notebook[]> {
    const url = environment.API_BASEURL +  ENDPOINT.NOTEBOOK_LIST;
    if (!this.notebooks$) {
      this.notebooks$ = this.http.get<Notebook[]>(url).pipe(
        map((response: any) => response.data),
        catchError(error => {
          this.jtr.error();
          return throwError(error);
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }

    return this.notebooks$;
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
      map((response: any) => {
        this.clearCache();
        return response.data
      }),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }

  editNotebook(notebook: Notebook) {
    const url = environment.API_BASEURL + ENDPOINT.NOTEBOOK + notebook._id;
    return this.http.put(url, notebook).pipe(
      map((response: any) => {
        this.clearCache();
        return response.status;
      }),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }

  private clearCache() {
    this.notebooks$ = null;
  }
}
