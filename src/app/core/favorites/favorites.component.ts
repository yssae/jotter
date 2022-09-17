import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  title:string = "Favorites";

  filterMenu = {
    'search' : true,
    'addButton' : false,
    'title' : 'Favorites',
    'sort' : true
  }
  constructor() { }

  ngOnInit(): void {
  }

}
