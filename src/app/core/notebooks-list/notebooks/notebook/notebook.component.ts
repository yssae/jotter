import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextEditorComponent } from 'src/app/core/nb-tools/text-editor/text-editor.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {
  title: string = 'Evermore';
  filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Note',
    'sort' : true
  }
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => console.log(data));
  }

  openNote() {
    alert('open Note clicked')
    this.dialog.open(TextEditorComponent)
  }
}
