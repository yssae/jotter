import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangeComponent } from '@jtr/feature/account';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  drawerState: boolean = false;
  sideNavOpened: boolean;
  user = {
    'email': 'ysae@gmail.com',
    'username': 'ysae',
  }

  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    ) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
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
