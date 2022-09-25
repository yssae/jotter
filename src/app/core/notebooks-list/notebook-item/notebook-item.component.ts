import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToolsComponent } from '../../nb-tools/nb-tools.component';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Note } from 'src/app/shared/models/note.model';
import { Notebook } from 'src/app/shared/models/notebook.model';

@Component({
  selector: 'notebook-item',
  templateUrl: './notebook-item.component.html',
  styleUrls: ['./notebook-item.component.scss']
})
export class NotebookItemComponent implements OnInit {
  notebookButtons = ['open_in_new', 'edit', 'delete_outline'];
  color: string = "rgb(255, 255, 255, 0.30)";

  toolType: any;
  radius: number = 25;
  centered: boolean = true;
  unbounded: boolean = true;
  triggerFx: boolean = false;

  @Input() notebookItem: Notebook;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteService: MockNoteService) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.toolType = data;
    });
  }


  onHover() {
    this.triggerFx = this.triggerFx ? false : true;
  }

  openNotebook(notebookID: string) {
    //receive notebook id, route to notebook acc to id
    this.router.navigate(['user/notebooks/notebook'], {queryParams: {id: notebookID}});
  }

  editNotebook(notebookID: string) {
    console.log(notebookID); // use id reference to edit and open nb, pass data to dialog
    this.dialog.open(NbToolsComponent, {panelClass: 'jtr-dialog', data: {type: 'Edit'}});
  }

  deleteNotebook(notebookID: string) {
    console.log(notebookID); // use id reference to delete nb
    this.dialog.open(NbToolsComponent, { panelClass: 'jtr-dialog', data: {type: 'Delete'}});
  }

  onClick(index: number, notebookID: string) {
    console.log(index);
    switch (index) {
      case 0 :
        this.openNotebook(notebookID);
        break;

      case 1 :
        this.editNotebook(notebookID);
        break;

      case 2 :
        this.deleteNotebook(notebookID);
        break;
    }
  }
}
