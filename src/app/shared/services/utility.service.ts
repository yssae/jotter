import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  sort(dataSource: any[], property: string, ascending: boolean): any[] {
    return dataSource.sort((a, b) => {
      if (a[property] < b[property]) {
        return ascending ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
  }

}
