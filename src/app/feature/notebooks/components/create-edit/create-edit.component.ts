import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
    private jtr: JtrDialogService,
    private dialogRef: MatDialogRef<CreateditComponent>,
    private notebookService: NotebookService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) {

    this.notebookForm = this.fb.group({
      title: ['Untitled Notebook', Validators.required],
      cover: [this.notebookCovers[0].src, Validators.required],
      imageDescription: this.notebookCovers[0].alt,
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  mapExistingNotebook(notebook: Notebook): void {
    console.log(notebook)
  }

  save(): void {
    //Patch Nb Deets not available in Backend
    if(this.notebookForm.invalid || this.headerTitle === 'Edit') {
      this.jtr.error();
      return;
    }

    // this.dialogRef.close(true);
    this.notebookService.createNotebook(this.notebookForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.jtr.closeAll());
  }

  onTriggerFileUpload(): void {
    this.customUpload.nativeElement.click();
  }

  get cover(): string {
    return this.notebookForm.get('cover')?.value
  }

}
