import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ForgotPasswordComponent } from 'src/app/access/forgot-password/forgot-password.component';
@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {
  dialogType: any;
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.dialogType);
      this.dialogType = data;
    }

  ngOnInit(): void {
  }

  getdialogType() {
    return this.dialogType;
  }
}
