import { Injectable } from '@angular/core';
import { Pager } from '../pager';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  constructor() {}

  // getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
  getPager(pager: Pager): Pager {
    // calculate total pages
    pager.TotalPages = Math.ceil(pager.TotalItems / pager.PageSize);

    if (pager.MaxDisplayedTotalPages === 10) {
      if (pager.TotalPages <= 10) {
        // less than 10 total pages so show all
        pager.StartPage = 1;
        pager.EndPage = pager.TotalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (pager.CurrentPage <= 6) {
          pager.StartPage = 1;
          pager.EndPage = 10;
        } else if (pager.CurrentPage + 4 >= pager.TotalPages) {
          pager.StartPage = pager.TotalPages - 9;
          pager.EndPage = pager.TotalPages;
        } else {
          pager.StartPage = pager.CurrentPage - 5;
          pager.EndPage = pager.CurrentPage + 4;
        }
      }
    } else {
      if (pager.TotalPages <= 5) {
        // less than 5 total pages so show all
        pager.StartPage = 1;
        pager.EndPage = pager.TotalPages;
      } else {
        // more than 5 total pages so calculate start and end pages
        if (pager.CurrentPage <= 3) {
          pager.StartPage = 1;
          pager.EndPage = 5;
        } else if (pager.CurrentPage + 1 >= pager.TotalPages) {
          pager.StartPage = pager.TotalPages - 4;
          pager.EndPage = pager.TotalPages;
        } else {
          pager.StartPage = pager.CurrentPage - 2;
          pager.EndPage = pager.CurrentPage + 2;
        }
      }
    }

    // calculate start and end item indexes
    pager.StartIndex = (pager.CurrentPage - 1) * pager.PageSize;
    pager.EndIndex = Math.min(
      pager.StartIndex + pager.PageSize - 1,
      pager.TotalItems - 1
    );

    // create an array of pages to ng-repeat in the pager control
    pager.Pages = this.range(pager.StartPage, pager.EndPage + 1);

    pager.Info =
      pager.StartIndex +
      1 +
      '-' +
      (pager.EndIndex + 1) +
      '|' +
      pager.TotalItems;

    // return object with all pager properties required by the view
    return pager;
  }

  range(start: number, stop: number): number[] {
    const list: number[] = [];
    for (let i = start; i < stop; i++) {
      list.push(i);
    }
    return list;
  }
}
