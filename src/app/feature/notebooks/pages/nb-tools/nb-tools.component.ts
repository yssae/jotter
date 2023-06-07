import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Notebook } from 'src/app/shared/models/notebook.model';
@Component({
  selector: 'app-nb-tools',
  templateUrl: './nb-tools.component.html',
  styleUrls: ['./nb-tools.component.scss']
})
export class NbToolsComponent implements OnInit {
  headerTitle: string = "";
  notebookID: string = "";
  toolType: number;
  selectedNotebook: Notebook;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

      this.headerTitle = data.type;
      this.selectedNotebook = data.notebookData;
    }

  ngOnInit(): void {
  }

  determineNbTool() {
   return this.headerTitle.toLowerCase() === 'delete' ? true : false;
  }
}
