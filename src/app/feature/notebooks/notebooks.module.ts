import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@jtr/shared';
import { AppMaterialModule } from 'src/app/shared/app-material.module';
import { NotesModule } from '@jtr/feature/notes';
import { NotebooksRoutingModule } from './notebooks-routing.module';
import { NotebookComponent } from '@jtr/feature/notebooks';
import { NotebookItemComponent } from '@jtr/feature/notebooks';
import { NotebooksComponent } from '@jtr/feature/notebooks';
import { CreateditComponent } from '@jtr/feature/notebooks';
import { DeleteComponent } from '@jtr/feature/notebooks';
import { NbToolsComponent } from '@jtr/feature/notebooks';

@NgModule({
  declarations: [
    NotebookComponent,
    NotebookItemComponent,
    NotebooksComponent,
    CreateditComponent,
    DeleteComponent,
    NbToolsComponent
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
