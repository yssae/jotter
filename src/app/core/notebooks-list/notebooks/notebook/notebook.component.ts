import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {
  title: string = 'Evermore';
  filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Note',
    'sort' : true
  }
  constructor() { }


  ngOnInit(): void {
  }

}
