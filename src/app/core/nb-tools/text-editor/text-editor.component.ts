import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  centered = true;
  unbounded = true;

  radius: number = 30;
  color: string = "rgb(51, 51, 51, 0.30)";

  noteForm: FormGroup;
  formBackground: string;

  @ViewChild('colorPicker') colorPicker: ElementRef;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      noteTitle: '',
      color: '#fff'
    });
  }


  onSubmit(noteData: any){
    console.log(noteData);
  }

  changedEditor(e: any) {
    //console.log(e);
  }

  openColorPicker(e:any) {
    e.preventDefault();
    this.colorPicker.nativeElement.click();

  }

  onColorChange(color: any){
    console.log(color);
  };




}
