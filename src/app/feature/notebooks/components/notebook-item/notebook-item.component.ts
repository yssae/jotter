import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { MatDialog } from '@angular/material/dialog';
import { takeUntil, Subject } from 'rxjs';

import { CreateditComponent } from '../create-edit/create-edit.component';
import { DeleteComponent } from '../delete/delete.component';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { JTROUTES } from 'src/app/shared/constants/jtr-routes.const';

@Component({
  selector: 'notebook-item',
  templateUrl: './notebook-item.component.html',
  styleUrls: ['./notebook-item.component.scss']
})
export class NotebookItemComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();

  readonly notebookButtons = ['open_in_new', 'edit', 'delete_outline'];
  readonly color: string = "rgb(255, 255, 255, 0.30)";
  readonly centered: boolean = true;
  readonly unbounded: boolean = true;
  readonly radius: number = 25;

  @Input() notebookItem: Notebook;
  @Output() notebookRefresh = new EventEmitter();

  toolType: number = 0;
  triggerFx: boolean = false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
   ) { }


  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.toolType = data.type;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  onHover() {
    this.triggerFx = this.triggerFx ? false : true;
  }

  openNotebook(notebook: Notebook) {
    this.router.navigateByUrl(JTROUTES.NOTEBOOK + notebook._id, { state: notebook });
  }

  editNotebook(notebook: Notebook) {
    let dialogRef = this.dialog.open(CreateditComponent, {panelClass: 'jtr-dialog', data: {type: 'Edit', notebook: notebook}});
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe((dialogData) => this.notebookRefresh.emit(dialogData));
  }

  deleteNotebook(notebookItem: Notebook) {
    let dialogRef = this.dialog.open(DeleteComponent, { panelClass: 'jtr-dialog', data: notebookItem });
    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe((dialogData) => this.notebookRefresh.emit(dialogData));
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


}
