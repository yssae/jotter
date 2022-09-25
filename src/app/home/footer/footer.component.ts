import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jtr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerIcons = [
    { name: 'location', icon: 'location_on', link: 'https://goo.gl/maps/UXK4C4tft4DxwqkC9', description: 'Manila, Philippine' },
    { name: 'phone', icon: 'call', link: 'tel:+155512345', description: '+1 555 12345' },
    { name: 'email', icon: 'send', link: 'mailto: support@jotter.com', description: 'support@jotter.com' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
