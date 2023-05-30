import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToolsComponent } from '../../pages/nb-tools/nb-tools.component';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { JTROUTES } from 'src/app/shared/constants/jtr-routes.const';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'notebook-item',
  templateUrl: './notebook-item.component.html',
  styleUrls: ['./notebook-item.component.scss']
})
export class NotebookItemComponent implements OnInit, OnDestroy {
  private ngStop$ = new Subject<boolean>();

  readonly notebookButtons = ['open_in_new', 'edit', 'delete_outline'];
  readonly color: string = "rgb(255, 255, 255, 0.30)";
  readonly centered: boolean = true;
  readonly unbounded: boolean = true;
  readonly radius: number = 25;

  @Input() notebookItem: Notebook;

  toolType: number = 0;
  triggerFx: boolean = false;


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private noteService: MockNoteService) { }


  ngOnInit(): void {
    this.activatedRoute.data
    .pipe(takeUntil(this.ngStop$))
    .subscribe((data: any) => {
      this.toolType = data.type;
    });

    console.log(this.notebookItem)
  }

  onHover() {
    this.triggerFx = this.triggerFx ? false : true;
  }

  openNotebook(notebook: Notebook) {
    this.router.navigateByUrl(JTROUTES.NOTEBOOK + notebook._id, { state: notebook })
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
        this.openNotebook(notebookItem);
        break;

      case 1 :
        this.editNotebook(notebookItem);
        break;

      case 2 :
        this.deleteNotebook(notebookItem);
        break;

      default :
        this.openNotebook(notebookItem)
    }
  }

  ngOnDestroy(): void {
    this.ngStop$.next(true);
    this.ngStop$.unsubscribe();
  }
}
