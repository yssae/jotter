import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil, Subject } from 'rxjs';

import { NotebookService } from '@jtr/feature/services/notebook.service';
import { JtrDialogService } from '@jtr/shared';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { COVEROPTIONS } from 'src/app/shared/constants/cover-options.const';

@Component({
  selector: 'create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();

  readonly centered: boolean = true;
  readonly unbounded: boolean = true;
  readonly radius: number = 20;
  readonly color: string = "rgb(51, 51, 51, 0.30)";

  @ViewChild('customUpload') customUpload: ElementRef;
  @Input('headerTitle') headerTitle: string;

  notebookCovers = COVEROPTIONS;
  notebookForm: FormGroup;
  selectedNotebook: Notebook;

  constructor(
    private fb: FormBuilder,
    private jtr: JtrDialogService,
    private dialogRef: MatDialogRef<CreateditComponent>,
    private notebookService: NotebookService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) {

    this.selectedNotebook = data.notebook;
    this.notebookForm = this.fb.group({
      _id: '',
      title: ['Untitled Notebook', Validators.required],
      cover: [this.notebookCovers[0].src, Validators.required],
    });
  }

  ngOnInit(): void {
    this.mapExistingNotebook(this.selectedNotebook);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  mapExistingNotebook(notebook: Notebook): void {
    if(notebook && notebook._id) {
      this.notebookForm.patchValue({
        title: notebook.title,
        cover: notebook.cover,
        _id: notebook._id
      })
      this._id?.setValidators([Validators.required])
      this.notebookForm.updateValueAndValidity();
    }
  }

  save(): void {
    if(this.notebookForm.invalid) {
      this.jtr.error("Invalid form. Please fill up the form before saving.");
      return;
    }

    this.selectedNotebook ? this.updateNotebook() : this.saveNew();
  }

  saveNew() {
    this.notebookService.createNotebook(this.notebookForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.jtr.closeAll());
  }

  updateNotebook() {
    this.notebookService.editNotebook(this.notebookForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.jtr.closeAll());
  }

  onTriggerFileUpload(): void {
    this.customUpload.nativeElement.click();
  }

  get cover(): string {
    return this.notebookForm.get('cover')?.value
  }

  get _id(): AbstractControl | null {
    return this.notebookForm.get('_id');
  }

}
