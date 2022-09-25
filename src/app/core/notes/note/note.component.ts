import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextEditorComponent } from '../../nb-tools/text-editor/text-editor.component';
@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  noteContent = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, modi dignissimos iste harum aperiam possimus quis provident! Rem consequatur harum ab iure veniam magnam, deserunt ea commodi iste. Aperiam, eos.';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openNote() {
    this.dialog.open(TextEditorComponent);
  }
}
