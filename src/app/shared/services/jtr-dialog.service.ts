import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JtrDialogComponent } from '@jtr/shared';

@Injectable({
  providedIn: 'root'
})
export class JtrDialogService {

  constructor(public dialog: MatDialog) { }

  success(message?: string) {
    this.dialog.open(JtrDialogComponent, { data: { status: 'success', message } });
  }

  error(message?: string) {
    this.dialog.open(JtrDialogComponent, { data: { status: 'fail', message } });
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
