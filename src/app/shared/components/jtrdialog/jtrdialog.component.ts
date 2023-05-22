import { Component, OnInit, Inject } from '@angular/core';
import { dialog } from '../../models/dialog.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'jtr-dialog',
  templateUrl: './jtrdialog.component.html',
  styleUrls: ['./jtrdialog.component.scss']
})
export class JtrDialogComponent implements OnInit {
  dialogData: dialog;
  successDialog: dialog = {
    alt: `Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`,
    image: "\\assets\\images\\success.png",
    status: "success",
    title: "Success",
  };
  errorDialog: dialog = {
    alt: `Illustration by <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>`,
    image: "\\assets\\images\\fail.png",
    status: "fail",
    title: "Error",
    message: `An error occured while processing your request. Kindly try again later. If issue persists, you may contact us at support@jotter.com.`,
  }

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: dialog,) {
      this.mapDialogData(data);
    }

  ngOnInit(): void {

  }

  mapDialogData(data: dialog) {
    this.dialogData = {
      ...data,
      ...(data.status === 'success' ? this.successDialog : this.errorDialog),
      ...(data.message ? { message: data.message } : {}),
    };
  }

  isSuccess(): boolean {
    return this.dialogData.status == "success" ? true : false;
  }





}
