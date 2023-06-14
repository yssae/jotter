import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';

import { NotebookService } from '@jtr/feature/services/notebook.service';
import { Notebook } from 'src/app/shared/models/notebook.model';
import { UtilityService } from '@jtr/shared';

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
  searchString = new FormControl();


  notebooks : Notebook[];
  filteredNotebooks: Notebook[];
  selectedNotebook: Notebook;

  constructor(
    private notebookService: NotebookService,
    private utilityService: UtilityService,
    ) { }

  ngOnInit(): void {
    this.mapNotebooks();
    this.subscribeToSearch();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.unsubscribe();
  }

  mapNotebooks(forceUpdate: boolean = false) {
    this.notebookService.fetchNotebooks(forceUpdate)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((notebooks: any) => {
        this.notebooks = notebooks;
        this.filteredNotebooks = [...this.notebooks]
      });;
  }

  sort(option: any): void {
    this.utilityService.sort(this.filteredNotebooks, option.property, option.ascending);
  }

  subscribeToSearch(): void {
    this.searchString.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(searchTerm => this.filteredNotebooks = this.notebooks.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }

}
