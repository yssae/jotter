import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sticky: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('stickyMenu') stickyMenu!: ElementRef;


  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      this.sticky = window.pageYOffset >= 97;
    }
}
