import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from './app-material.module';
import { JtrbackbuttonComponent } from './components/jtrbackbutton/jtrbackbutton.component';
import { JtrDialogComponent } from './components/jtrdialog/jtrdialog.component';
import { NoteFilterComponent } from './components/note-filter/note-filter.component';

@NgModule({
  declarations: [
    JtrbackbuttonComponent,
    NoteFilterComponent,
    JtrDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppMaterialModule
  ],
  exports: [
    JtrbackbuttonComponent,
    NoteFilterComponent
  ]
})
export class SharedModule { }
