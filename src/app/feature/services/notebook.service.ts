import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ENDPOINT } from 'src/app/shared/constants/endpoint.const';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { JtrDialogService } from '@jtr/shared';
import { map, tap, filter, catchError, throwError } from 'rxjs';
import { APIResponse } from 'src/app/shared/models/api-response.model';
@Injectable({
  providedIn: 'root'
})
export class NotebookService {

  constructor(
    private http: HttpClient,
    public jtr: JtrDialogService,
  ) { }

  createNotebook(notebook: Notebook) {
    const url = environment.API_BASEURL + ENDPOINT.CREATE_NOTEBOOK;
    return this.http.post(url, notebook).pipe(
      map((response: any) => response.status),
      catchError(error => {
        this.jtr.error();
        return throwError(error);
      })
    )
  }
}
