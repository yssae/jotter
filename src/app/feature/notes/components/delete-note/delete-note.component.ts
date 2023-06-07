import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'delete-note',
  templateUrl: './delete-note.component.html',
  styleUrls: ['./delete-note.component.scss']
})
export class DeleteNoteComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteNoteComponent>,
  ) { }

  ngOnInit(): void {
  }

  confirm(): void {
    this.dialogRef.close(true)
  }

  cancel(): void {
    this.dialogRef.close(false)
  }
}
