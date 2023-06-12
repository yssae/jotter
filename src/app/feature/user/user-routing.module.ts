import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '@jtr/feature/user';
import { AllNotesComponent } from '@jtr/feature/user';
import { FavoritesComponent } from '@jtr/feature/user';
import { NotesComponent } from '@jtr/feature/notes';


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
        path: '', // notes & favorites
        loadChildren: () => import('./../notes/notes.module').then(m => m.NotesModule)
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
