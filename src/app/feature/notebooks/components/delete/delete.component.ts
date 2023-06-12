import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {  Subject, takeUntil } from 'rxjs';

import { NotebookService } from '@jtr/feature/services';
import { JtrDialogService } from '@jtr/shared';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { JtrDialogComponent } from '@jtr/shared';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  @Input() notebookData: Notebook;

  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    private notebookService: NotebookService,
    private jtr: JtrDialogService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  deleteNotebook() {
    this.dialogRef.close();
    this.notebookService.deleteNotebook(this.notebookData._id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if(response) {
          this.jtr.success("Notebook deleted.");
        }
      });
  }
}
