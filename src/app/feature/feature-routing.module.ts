import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '@jtr/feature/user';
import { NotebooksListComponent } from './notebooks-list/notebooks-list.component';
import { NotebookComponent } from './notebooks-list/notebooks/notebook/notebook.component';
import { NotebooksComponent } from './notebooks-list/notebooks/notebooks.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: 'user', // user
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./access/access.module').then(m => m.AccessModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

