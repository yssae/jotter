import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NotebookService } from '@jtr/feature/services/notebook.service';
import { MockNoteService } from 'src/app/mock/mock-note.service';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { takeUntil, Subject } from 'rxjs';
@Component({
  selector: 'jtr-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss']
})
export class NotebooksComponent implements OnInit, OnDestroy {
  readonly filterMenu = {
    'search' : true,
    'addButton' : true,
    'title' : 'Notebook',
    'sort' : true
  }

  private ngStop$ = new Subject<boolean>();

  sideNavOpened: boolean;
  title: string = "Notebooks";

  notebooks : Notebook[];
  selectedNotebook: Notebook;

  constructor(
    private notebookService: NotebookService,
    private mocknoteService: MockNoteService,
    ) { }

  ngOnInit(): void {
    this.mapNotebooks();
    console.log(this.notebooks)
  }

  mapNotebooks() {
    // this.mocknoteService.getNotebooks()
    // .pipe(takeUntil(this.ngStop$))
    // .subscribe(data => {
    //   this.notebooks = data;
    // });

    this.notebookService.fetchNotebooks()
    .pipe(takeUntil(this.ngStop$))
    .subscribe((notebooks: any) => {
      this.notebooks = notebooks
      // console.log(notebooks)
      // this.notebooks = this.notebooks.concat(notebooks);
    });;
  }

  ngOnDestroy(): void {
    this.ngStop$.next(true);
    this.ngStop$.unsubscribe();
  }

}
