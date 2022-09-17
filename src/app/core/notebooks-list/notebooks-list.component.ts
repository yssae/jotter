import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.scss']
})
export class NotebooksListComponent implements OnInit {
  sideNavOpened: boolean;
  title: string = "Notebooks";

  filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Notebook',
    'sort' : true
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sideNavOpened = true;
    console.log(this.activatedRoute.data);
    this.activatedRoute.data.subscribe(data => console.log(data));
  }

}
