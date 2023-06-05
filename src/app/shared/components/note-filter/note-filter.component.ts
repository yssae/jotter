import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NbToolsComponent } from '@jtr/feature/notebooks/pages/nb-tools/nb-tools.component';
import { TextEditorComponent } from '@jtr/feature/notes/components/text-editor/text-editor.component';
@Component({
  selector: 'note-filter',
  templateUrl: './note-filter.component.html',
  styleUrls: ['./note-filter.component.scss']
})
export class NoteFilterComponent implements OnInit {
  toolType: any;

  @Input() filterMenu: any;
  @Input() pageTitle: string = "";
  @Input() notebookID: string | null;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      console.log(data)
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
      this.dialog.open(TextEditorComponent,{ id:'editor' , data: this.notebookID});
    }
  }
}
