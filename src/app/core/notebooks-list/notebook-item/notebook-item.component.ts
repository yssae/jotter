import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToolsComponent } from '../../nb-tools/nb-tools.component';

@Component({
  selector: 'notebook-item',
  templateUrl: './notebook-item.component.html',
  styleUrls: ['./notebook-item.component.scss']
})
export class NotebookItemComponent implements OnInit {
  toolType: any;
  radius: number = 25;
  centered: boolean = true;
  unbounded: boolean = true;
  triggerFx: boolean = false;
  color: string = "rgb(255, 255, 255, 0.30)";
  notebookButtons = ['open_in_new', 'edit', 'delete_outline'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.toolType = data;
    })
  }

  onHover() {
    this.triggerFx = this.triggerFx ? false : true;
  }

  openNotebook() {
    //receive notebook id, route to notebook acc to id
    this.router.navigate(['user/notebooks/notebook'], {queryParams: {id: '574885'}});
  }

  editNotebook() {
    this.dialog.open(NbToolsComponent, {panelClass: 'jtr-dialog', data: {type: 'Edit'}});
  }

  deleteNotebook() {
    this.dialog.open(NbToolsComponent, { panelClass: 'jtr-dialog', data: {type: 'Delete'}});
  }

  onClick(index: number) {
    console.log(index);
    switch (index) {
      case 0 :
        this.openNotebook();
        break;

      case 1 :
        this.editNotebook();
        break;

      case 2 :
        this.deleteNotebook();
        break;
    }
  }
}
