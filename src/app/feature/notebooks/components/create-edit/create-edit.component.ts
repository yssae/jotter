import { Component, OnInit, Renderer2, ElementRef, ViewChild, Input } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewNotebook, NotebookCover } from 'src/app/shared/models/notebook.model';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { COVEROPTIONS } from 'src/app/shared/constants/cover-options.const';

@Component({
  selector: 'create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateditComponent implements OnInit {
  centered = true;
  unbounded = true;
  radius: number = 20;
  color: string = "rgb(51, 51, 51, 0.30)";
  notebookCovers = COVEROPTIONS;
  notebookForm: FormGroup;
  nbfxName: string;
  @ViewChild('customUpload') customUpload: ElementRef;
  @Input('headerTitle') headerTitle: ElementRef;

  constructor(private fb: FormBuilder) {
    this.notebookForm = this.fb.group({
      title: ['Untitled Notebook', Validators.required],
      cover: [this.notebookCovers[0].src, Validators.required],
      imageDescription: this.notebookCovers[0].alt,
    })
  }

  ngOnInit(): void {
  }

  save() {
    console.log(this.notebookForm.value)
    if(this.notebookForm.invalid) {
      return;
    }

  }

  onTriggerFileUpload() {
    console.log(this.customUpload);
    this.customUpload.nativeElement.click();
  }

  ngAfterViewInit() {

  }

}
