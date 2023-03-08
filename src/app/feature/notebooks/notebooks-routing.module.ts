import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotebooksComponent } from '@jtr/feature/notebooks';
import { NotebookComponent } from '@jtr/feature/notebooks';

const routes: Routes = [
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotebooksRoutingModule { }

