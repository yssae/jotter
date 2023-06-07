import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NbToolsComponent } from '@jtr/feature/notebooks/pages/nb-tools/nb-tools.component';
import { TextEditorComponent } from '@jtr/feature/notes/components/text-editor/text-editor.component';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'note-filter',
  templateUrl: './note-filter.component.html',
  styleUrls: ['./note-filter.component.scss']
})
export class NoteFilterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();
  toolType: any;

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
    .subscribe(data => {
      this.toolType = data;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  onOpenTool() {
    // open Notebook CreateEdit
    // or open Note > Add Note
    if(!this.toolType){
      return;
    }

    if(this.toolType.type == 1){
      this.dialog.open(
        NbToolsComponent,
        {
          panelClass:'modal',
          data: {type: 'Create'}
      });
    }

    if(this.toolType.type == 2){
      let dialogRef = this.dialog.open(TextEditorComponent,{ id:'editor' , data: this.notebookID});
      dialogRef.afterClosed()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.savedNoteEvent.emit('note saved'))
    }
  }
}
