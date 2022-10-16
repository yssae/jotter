import { Component, OnInit, Input } from '@angular/core';
import { Notebook } from 'src/app/shared/models/notebook.model';

@Component({
  selector: 'delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input() notebookData: Notebook;

  constructor() { }

  ngOnInit(): void {
  }

  deleteNotebook() {
    console.log(this.notebookData);
  }
}
