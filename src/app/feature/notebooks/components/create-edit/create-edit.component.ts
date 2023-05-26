import { Component, OnInit, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COVEROPTIONS } from 'src/app/shared/constants/cover-options.const';
import { NotebookService } from '@jtr/feature/services/notebook.service';
import { takeUntil, Subject } from 'rxjs';
import { JtrDialogService } from '@jtr/shared';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateditComponent implements OnInit {
  readonly centered: boolean = true;
  readonly unbounded: boolean = true;

  readonly radius: number = 20;
  readonly color: string = "rgb(51, 51, 51, 0.30)";

  private ngStop$ = new Subject<boolean>();

  @ViewChild('customUpload') customUpload: ElementRef;
  @Input('headerTitle') headerTitle: string;

  notebookCovers = COVEROPTIONS;
  notebookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jtr: JtrDialogService,
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

  mapExistingNotebook(notebook: Notebook) {
    console.log(notebook)
  }

  save() {
    //Patch Nb Deets not available in Backend
    if(this.notebookForm.invalid || this.headerTitle === 'Edit') {
      this.jtr.error();
      return;
    }

    this.notebookService.createNotebook(this.notebookForm.value)
      .pipe(takeUntil(this.ngStop$))
      .subscribe(() => this.jtr.closeAll());
  }

  onTriggerFileUpload() {
    this.customUpload.nativeElement.click();
  }

  ngOnDestroy(): void {
    this.ngStop$.next(true);
    this.ngStop$.unsubscribe();
  }

}
