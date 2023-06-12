import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { takeUntil, Subject } from 'rxjs';

import { NotebookService } from '@jtr/feature/services/notebook.service';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Notebook } from 'src/app/shared/models/notebook.model';

@Component({
  selector: 'jtr-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss']
})
export class NotebooksComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<boolean>();

  readonly filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Notebook',
    'sort' : true
  }

  sideNavOpened: boolean;
  title: string = "Notebooks";

  notebooks : Notebook[];
  selectedNotebook: Notebook;

  constructor(
    private notebookService: NotebookService,
    ) { }

  ngOnInit(): void {
    this.mapNotebooks();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  mapNotebooks() {
    this.notebookService.fetchNotebooks()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((notebooks: any) => {
        this.notebooks = notebooks
      });;
  }

}
