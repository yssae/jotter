import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  ideNavOpened:boolean;
  username: string ="biggiebong13"
  drawerState:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
