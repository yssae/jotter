import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NbToolsComponent } from '../../nb-tools/nb-tools.component';
@Component({
  selector: 'notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {
  triggerFx: boolean = false;

  centered = true;
  unbounded = true;

  radius: number = 25;
  color: string = "rgb(255, 255, 255, 0.30)";

  //MAT_DIALOG_DATA: InjectionToken<any>;
  //@Inject(MAT_DIALOG_DATA) public data: any

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) { }
  toolType: any;

  ngOnInit(): void {
  }


  onHover() {
    this.triggerFx = this.triggerFx ? false : true;
  }


  // Pass on ID as param
  onEditNb() {
    this.activatedRoute.data.subscribe(data => {
      console.log(data)
      this.toolType = data;
    })

    this.dialog.open(NbToolsComponent, {panelClass: 'jtr-dialog' ,data: {type: 'Edit'}});
  }


  onDeleteNb() {
    this.activatedRoute.data.subscribe(data => {
      console.log(data)
      this.toolType = data;
    })

    this.dialog.open(NbToolsComponent, { panelClass: 'jtr-dialog', data: {type: 'Delete'}});
  }

}
