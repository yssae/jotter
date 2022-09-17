import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
// import { NbToolsComponent } from '../nb-tools/nb-tools.component';
// import { TextEditorComponent } from '../text-editor/text-editor.component';
// import { toolType } from 'src/app/_models/toolType';

import { NbToolsComponent } from 'src/app/core/nb-tools/nb-tools.component';
import { TextEditorComponent } from 'src/app/core/nb-tools/text-editor/text-editor.component';
@Component({
  selector: 'note-filter',
  templateUrl: './note-filter.component.html',
  styleUrls: ['./note-filter.component.scss']
})
export class NoteFilterComponent implements OnInit {
  toolType: any;

  @Input() pageTitle: string;
  @Input() filterMenu: any;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.toolType = data;
    });
  }

  onOpenTool() {
    // open Notebook CreateEdit
    // or open Note > Add Note
    if(!this.toolType){
      return;
    }

    if(this.toolType.type == 1){
      this.dialog.open(
        NbToolsComponent,
        {
          panelClass:'modal',
          data: {type: 'Create'}
      });
    }

    if(this.toolType.type == 2){
      this.dialog.open(TextEditorComponent,{id:'editor'});
    }
  }
}
