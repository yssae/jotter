import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jtr-back-button',
  templateUrl: './jtrbackbutton.component.html',
  styleUrls: ['./jtrbackbutton.component.scss']
})
export class JtrbackbuttonComponent implements OnInit {
  readonly centered : boolean = true;
  readonly unbounded : boolean = false;
  readonly color: string = "rgb(35, 59, 85, 0.8)"

  @Input() path: string;

  constructor() { }

  ngOnInit(): void {
  }

}
