import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Note } from 'src/app/shared/models/note.model';
@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  content: string;

  constructor(
    private renderer: Renderer2,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.content = this.htmlToText(this.note.content);
  }

  openNote(id: string, note?: Note) {
    this.dialog.open(TextEditorComponent, {
      id:'editor',
      data: note
    });
  }

  htmlToText(content: string): string {
    let divElement = this.renderer.createElement('div');
    this.renderer.setProperty(divElement, 'innerHTML', content);
    return divElement.textContent || divElement.innerText || '';
  }

}
