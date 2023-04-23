import { Component, ElementRef, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from 'src/app/shared/models/note.model';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {
  readonly centered = true;
  readonly unbounded = true;
  readonly radius = 30;
  readonly color = "rgb(51, 51, 51, 0.30)";
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
      ['clean']
    ]
  }

  noteForm: FormGroup;
  currentNote: Note;
  private timeoutRef: any;

  @ViewChild('colorPicker') colorPicker: ElementRef;
  @ViewChild('quillEditor') quillEditor!: QuillEditorComponent;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Note,) {
    this.currentNote = data;
    this.noteForm = this.fb.group({
      _id: [data._id, [Validators.required]],
      notebookID: [data.notebookID, [Validators.required]],
      title: [data.title, [Validators.required]],
      content: data.content,
      background: data.background,
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onSubmit(noteData: any){
    console.log(noteData);
  }

  changedEditor(e: any) {
    console.log("Delta Object", e);
    console.log(e.html);
  }

  openColorPicker(e:any) {
    e.preventDefault();
    this.colorPicker.nativeElement.click();
  }

  onColorChange(color: any){
    console.log(color);
  };

  ngAfterViewInit() {
    this.timeoutRef = setTimeout(() => {
      const quill = this.quillEditor.quillEditor;
      if (quill && this.currentNote.content) {
        quill.setContents(quill.clipboard.convert(this.currentNote.content));
        quill.update();
      }
    }, 100);
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutRef)
  }
}
