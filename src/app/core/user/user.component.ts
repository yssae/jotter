import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeComponent } from '../account/change/change.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  ideNavOpened:boolean;
  username: string ="biggiebong13"
  drawerState:boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEmailChange(e: Event) {
    e.preventDefault();
    this.dialog.open(ChangeComponent, {panelClass: 'custom-dialog-container', data:true});
  }

  onPassChange(e: Event) {
    e.preventDefault();
    this.dialog.open(ChangeComponent, {panelClass: 'custom-dialog-container', data:false});
  }
}
