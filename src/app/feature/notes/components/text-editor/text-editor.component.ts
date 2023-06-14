import { Component, ElementRef, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QuillEditorComponent } from 'ngx-quill';
import { takeUntil, Subject } from 'rxjs';

import { NoteService } from '@jtr/feature/services/note.service';
import { JtrDialogService } from '@jtr/shared';
import { DeleteNoteComponent } from '../delete-note/delete-note.component';
import { Note } from 'src/app/shared/models/note.model';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {
  private ngUnsubscribe = new Subject<boolean>()
  private timeoutRef: any;

  readonly editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  }

  noteForm: FormGroup;
  currentNote: Note;
  notebookID: string | null = '';

  @ViewChild('colorPicker') colorPicker: ElementRef;
  @ViewChild('quillEditor') quillEditor!: QuillEditorComponent;


  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private jtr: JtrDialogService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TextEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,) {

    this.noteForm = this.fb.group({
      notebookId: ['', Validators.required],
      title: ['Untitled', Validators.required],
      content: '',
      background: '#FFFFFF',
      bookmarked: false
    });
  }

  ngOnInit(): void {
    this.mapExistingNote(this.data);
  }

  ngAfterViewInit() {
    this.timeoutRef = setTimeout(() => {
      const quill = this.quillEditor.quillEditor;
      if (quill && this.currentNote) {
        quill.setContents(quill.clipboard.convert(this.currentNote.content));
        quill.update();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutRef);
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  mapExistingNote(dialogData: any) {
    let note = dialogData.note;
    if(dialogData && note) {
      this.currentNote = note;
      this.noteForm.patchValue({
        notebookId: note.notebookId,
        title: note.title,
        content: note.content,
        background: note.background,
        bookmarked: note.bookmarked
      })
    }
    else
      this.noteForm.patchValue({
        notebookId: dialogData
      })
  }

  save() {
    this.noteForm.valid ? (this.currentNote ? this.updateNote() : this.createNote()) : '';
  }

  bookmark() {
    let bmControl = this.noteForm.get('bookmarked');
    bmControl?.setValue(!bmControl?.value);
    this.save();
  }

  delete() {
    if(this.currentNote) {
      let deleteNBRef = this.dialog.open(DeleteNoteComponent);
      deleteNBRef.afterClosed()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((confirmation: boolean) => {
          if(confirmation) {
            this.noteService.deleteNote(this.currentNote._id)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => response ? this.dialogRef.close(true) : this.jtr.error())
          }
        });
    }
  }

  private createNote() {
    this.noteService.createNote(this.noteForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        response ? this.jtr.success("Note saved!") : this.jtr.error();
        this.dialogRef.close(true)
      })
  }

  private updateNote() {
    this.noteService.updateNote(this.noteForm.value, this.currentNote._id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        response ? this.jtr.success("Note updated!") : this.jtr.error();
        this.dialogRef.close(true)
      })
  }

  changedEditor(event: any) {
    if(event.event === 'text-change') {
      this.noteForm.patchValue({ content: event.html })
    }
  }

  openColorPicker() {
    this.colorPicker.nativeElement.click();
  }

  print() { // for enhancement
    const printContent = this.noteForm.get('content')?.value
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <html>
        <head>
          <title>Jotter Print</title>
        </head>
        <body style="padding: 1em">
          ${printContent}
          <script type="text/javascript">
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow?.print();
  }

  get background(): string {
    return this.noteForm.get('background')?.value;
  }

  get bookmarked(): boolean {
    return this.noteForm.get('bookmarked')?.value;
  }

}
