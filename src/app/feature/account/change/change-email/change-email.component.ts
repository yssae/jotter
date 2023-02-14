import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VericationComponent } from 'src/app/access/verication/verication.component';
@Component({
  selector: 'change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(e:any) {
    e.preventDefault();
    this.dialog.open(VericationComponent, {panelClass: 'jtr-dialog'});
  }

  onCancel(e: any) {
    e.preventDefault();
    this.dialog.closeAll();
  }
}
