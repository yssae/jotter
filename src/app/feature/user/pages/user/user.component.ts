import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeComponent } from '@jtr/feature/account';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  sideNavOpened:boolean;
  username: string ="biggiebong13"
  drawerState:boolean = false;
  passwordMasked: string = '••••••••••';
  user = {
    'email': 'user@gmail.com'
  }

  constructor(
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['auth'])
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