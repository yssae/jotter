import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Notebook } from 'src/app/shared/models/notebook.model';
@Component({
  selector: 'app-nb-tools',
  templateUrl: './nb-tools.component.html',
  styleUrls: ['./nb-tools.component.scss']
})
export class NbToolsComponent implements OnInit {
  toolType: any;
  headerTitle: any;
  cover: any;
  notebookID: any;

  selectedNotebook: Notebook;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
      this.headerTitle = data.type;
      this.selectedNotebook = data.notebookData;
    }

  ngOnInit(): void {
  }

  determineNbTool() {
   return this.headerTitle.toLowerCase() === 'delete' ? true : false;
  }
}
