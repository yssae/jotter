import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { JtrbackbuttonComponent } from './components/jtrbackbutton/jtrbackbutton.component';

@NgModule({
  declarations: [
    JtrbackbuttonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [JtrbackbuttonComponent]
})
export class SharedModule { }
