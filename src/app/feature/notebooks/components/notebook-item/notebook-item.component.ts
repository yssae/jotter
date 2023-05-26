import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToolsComponent } from '../../pages/nb-tools/nb-tools.component';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { JTROUTES } from 'src/app/shared/constants/jtr-routes.const';

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
    this.router.navigate([JTROUTES.NOTEBOOK], {queryParams: {id: notebookID}});
  }

  editNotebook(notebook: Notebook) {
    this.dialog.open(NbToolsComponent, {panelClass: 'jtr-dialog', data: {type: 'Edit', notebook: notebook}});
  }

  deleteNotebook(notebookItem: Notebook) {
    this.dialog.open(NbToolsComponent, { panelClass: 'jtr-dialog', data: {type: 'Delete', notebookData: notebookItem}});
  }

  selectTool(index: number, notebookItem: Notebook) {
    switch (index) {
      case 0 :
        this.openNotebook(notebookItem._id);
        break;

      case 1 :
        this.editNotebook(notebookItem);
        break;

      case 2 :
        this.deleteNotebook(notebookItem);
        break;

      default :
        this.openNotebook(notebookItem._id)
    }
  }
}
