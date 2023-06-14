import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { TextEditorComponent } from '../text-editor/text-editor.component';
import { Note } from 'src/app/shared/models/note.model';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  content: string = "";

  @Input() note: Note;
  @Output() savedNoteEvent = new EventEmitter();

  constructor(
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.content = this.htmlToText(this.note.content);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe()
  }

  openNote(id: string, note?: Note) {
    let dialogRef = this.dialog.open(
      TextEditorComponent,
      {
        id: "editor",
        data: { note: note }
      }
    );

    dialogRef.beforeClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((dialogData) => this.savedNoteEvent.emit(dialogData))
  }

  htmlToText(content: string): string {
    let divElement = this.renderer.createElement('div');
    this.renderer.setProperty(divElement, 'innerHTML', content);

    // Retrieve the child nodes of the div element
    const childNodes = divElement.childNodes;

    // Array to store the extracted text from child nodes
    const extractedText = [];

    // Iterate over the child nodes and extract the text content
    for (let i = 0; i < childNodes.length; i++) {
      const node = childNodes[i];

      // Check if the node is a text node
      if (node.nodeType === Node.TEXT_NODE) {
        extractedText.push(node.textContent);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Check if the node is an element node
        extractedText.push(node.innerText);
      }
    }

    // Join the extracted text with spaces to ensure proper spacing
    const formattedText = extractedText.join(' ');

    return formattedText;
  }

}
