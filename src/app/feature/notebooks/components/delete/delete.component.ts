import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Subject, takeUntil } from 'rxjs';

import { NotebookService } from '@jtr/feature/services';
import { Notebook } from 'src/app/shared/models/notebook.model';


@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  notebookData: Notebook;


  constructor(
    private notebookService: NotebookService,
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: Notebook,) {

      this.notebookData = this.dialogData;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  deleteNotebook() {
    this.dialogRef.close(true);
    this.notebookService.deleteNotebook(this.notebookData._id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }
}
