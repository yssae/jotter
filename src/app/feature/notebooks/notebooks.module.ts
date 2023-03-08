import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@jtr/shared';
import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { NotebooksRoutingModule } from './notebooks-routing.module';
import { NotebookComponent } from '@jtr/feature/notebooks';
import { NotebookItemComponent } from '@jtr/feature/notebooks';
import { NotebooksComponent } from '@jtr/feature/notebooks';
import { NotesModule } from '@jtr/feature/notes';

@NgModule({
  declarations: [
    NotebookComponent,
    NotebookItemComponent,
    NotebooksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AppMaterialModule,
    NotebooksRoutingModule,
    NotesModule
  ]
})
export class NotebooksModule { }
