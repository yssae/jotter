import { Component, ElementRef, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '@jtr/feature/services/note.service';
import { Note } from 'src/app/shared/models/note.model';
import { QuillEditorComponent } from 'ngx-quill';
import { rippleSettings } from '@jtr/shared';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';
import { JtrDialogService } from '@jtr/shared';
@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {
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
  private timeoutRef: any;
  private ngUnsubscribe = new Subject<boolean>()

  @ViewChild('colorPicker') colorPicker: ElementRef;
  @ViewChild('quillEditor') quillEditor!: QuillEditorComponent;


  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private jtr: JtrDialogService,
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
    if(this.noteForm.invalid) {
      return
    }
    this.currentNote ? this.updateNote() : this.createNote();
  }

  private createNote() {
    this.noteService.createNote(this.noteForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => response ? this.jtr.success("Note saved!") : this.jtr.error())
  }

  private updateNote() {
    this.noteService.updateNote(this.noteForm.value, this.currentNote._id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => response ? this.jtr.success("Note updated.") : this.jtr.error())
  }

  bookmark() {
    // TO DO: Toggle icon also fill and hollow
    // DECIDE: Whether request to set this as fave is done here or in submit
    let bmControl = this.noteForm.get('bookmarked');
    bmControl?.setValue(!bmControl?.value);
  }

  print() {
    // TO DO: Research how to print text only
    window.print()
  }

  changedEditor(event: any) {
    if(event.event === 'text-change') {
      this.noteForm.patchValue({ content: event.html })
    }
  }

  openColorPicker(e:any) {
    e.preventDefault();
    this.colorPicker.nativeElement.click();
  }

  get background(): string {
    return this.noteForm.get('background')?.value;
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
}
