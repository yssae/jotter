import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '@jtr/feature/user';
import { NotebooksListComponent } from '../notebooks-list/notebooks-list.component';
import { NotebookComponent } from '../notebooks-list/notebooks/notebook/notebook.component';
import { NotebooksComponent } from '../notebooks-list/notebooks/notebooks.component';
import { AllNotesComponent } from '../all-notes/all-notes.component';
import { FavoritesComponent } from '../favorites/favorites.component';

const routes: Routes = [
  {
    path: '', //users
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'notebooks',
        pathMatch: 'full'
      },
      {
        path: 'notebooks',
        component: NotebooksListComponent,
        children: [
          {
            path:'',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: NotebooksComponent,
            data: { type: 1 },
          },
          {
            path: 'notebook',
            component: NotebookComponent,
            data: { type: 2 },
          },
          {
            path: 'notebook/:id',
            component: NotebookComponent,
            data: { type: 2 }
          }
        ],
        data: { type: 1 },
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
export class UserRoutingModule { }
