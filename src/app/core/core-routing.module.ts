import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';

import { NotebooksComponent } from './notebooks/notebooks.component';
import { NotebookComponent } from './notebooks/notebook/notebook.component';

import { AllNotesComponent } from './all-notes/all-notes.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'notebooks',
        component: NotebooksComponent,
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

