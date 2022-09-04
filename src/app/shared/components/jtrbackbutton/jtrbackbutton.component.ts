import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jtr-back-button',
  templateUrl: './jtrbackbutton.component.html',
  styleUrls: ['./jtrbackbutton.component.scss']
})
export class JtrbackbuttonComponent implements OnInit {
  centered : boolean = true;
  unbounded : boolean = false;
  color: string = "rgb(35, 59, 85, 0.8)"

  constructor() { }

  ngOnInit(): void {
  }

  @Input() path: string;
}
