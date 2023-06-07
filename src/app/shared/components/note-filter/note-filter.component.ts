import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { NbToolsComponent } from '@jtr/feature/notebooks/pages/nb-tools/nb-tools.component';
import { TextEditorComponent } from '@jtr/feature/notes/components/text-editor/text-editor.component';
@Component({
  selector: 'note-filter',
  templateUrl: './note-filter.component.html',
  styleUrls: ['./note-filter.component.scss']
})
export class NoteFilterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  toolType: number;

  @Input() filterMenu: any;
  @Input() pageTitle: string = "";
  @Input() notebookID: string | null;
  @Output() savedNoteEvent = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      this.toolType = data;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  onOpenTool() {
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
