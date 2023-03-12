import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToolsComponent } from '../nb-tools/nb-tools.component';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Notebook } from 'src/app/shared/models/notebook.model';
@Component({
  selector: 'jtr-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss']
})
export class NotebooksComponent implements OnInit {
  sideNavOpened: boolean;
  title: string = "Notebooks";
  filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Notebook',
    'sort' : true
  }

  notebooks : Notebook[];
  selectedNotebook: Notebook;

  constructor(private noteService: MockNoteService,) { }

  ngOnInit(): void {
    this.mapNotebooks();
  }

  mapNotebooks() {
    this.noteService.getNotebooks().subscribe(data => {
      console.log(data);
      this.notebooks = data;
    });
  }
}
