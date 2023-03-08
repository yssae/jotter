import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '@jtr/feature/user';
import { AllNotesComponent } from '@jtr/feature/user';
import { FavoritesComponent } from '@jtr/feature/user';

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
        loadChildren: () => import('./../notebooks/notebooks.module').then(m => m.NotebooksModule)
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
