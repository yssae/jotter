import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './pages/notes/notes.component';

const routes: Routes = [
  {
    path: 'notes',
    component: NotesComponent,
    data: {
      title: "All Notes"
    }
  },
  {
    path: 'favorites',
    component: NotesComponent,
    data: {
      title: "Favorites"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }

