import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';

import { NotebooksListComponent } from './notebooks-list/notebooks-list.component';
import { NotebooksComponent } from './notebooks-list/notebooks/notebooks.component';
import { NotebookComponent } from './notebooks-list/notebooks/notebook/notebook.component';

import { AllNotesComponent } from './all-notes/all-notes.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'notebooks',
        component: NotebooksListComponent,
        data: {
          type: 1
        }
      },
      {
        path: 'notes',
        component: AllNotesComponent,
        data: {
          type: 2
        }
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        data: {
          type: 3
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }

