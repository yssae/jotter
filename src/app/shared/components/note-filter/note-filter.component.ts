import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { NbToolsComponent } from '@jtr/feature/notebooks/pages/nb-tools/nb-tools.component';
import { TextEditorComponent } from '@jtr/feature/notes/components/text-editor/text-editor.component';
import { SORTOPTIONS } from '../../constants/sort-options.const';
@Component({
  selector: 'note-filter',
  templateUrl: './note-filter.component.html',
  styleUrls: ['./note-filter.component.scss']
})
export class NoteFilterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();

  toolType: number;
  sortOption = SORTOPTIONS;

  @Input() filterMenu: any;
  @Input() pageTitle: string = "";
  @Input() notebookID: string | null;
  @Input() searchControl = new FormControl();
  @Output() savedNoteEvent = new EventEmitter<string>();
  @Output() sortEvent = new EventEmitter<Object>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        this.toolType = data.type;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  sort(option: any): void {
    this.sortEvent.emit(option);
  }

  onOpenTool(): void {
    if(!this.toolType){
      return;
    }

    switch (this.toolType) {
      case 1 :
        this.dialog.open(NbToolsComponent, { panelClass:'modal', data: {type: 'Create'}});
        break;

      case 2 :
        let dialogRef = this.dialog.open(TextEditorComponent, { id: 'editor', data: this.notebookID });
        dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.savedNoteEvent.emit('note saved'));
        break;

      default :
        this.dialog.open(NbToolsComponent, { panelClass:'modal', data: {type: 'Create'}});
        break;
    }
  }

}
