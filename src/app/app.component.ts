import { Component } from '@angular/core';
import { Pager } from './cc-listview/cc-paginator/pager';
import { ActionResult } from './cc-listview/model/actionResult';
import { ListViewAction } from './cc-listview/model/listViewAction';
import { SortBy } from './cc-listview/model/sortBy';
import { ListViewData } from './listviewData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cc-listview';

  data: any[] = [];
  listItemActions: ListViewAction[] = [new ListViewAction('Action1', '#Action1'), new ListViewAction('Action2', '#Action2')];
  listViewActions: ListViewAction[] = [new ListViewAction('Click1', '#Click1'), new ListViewAction('Click2', '#Click2')];

  constructor() {
    this.fetch((res: any) => {
      this.data = ListViewData.getData(res);
    });
  }

  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/flatList.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }

  onSearch(searchString: string): void {
    console.log(searchString);
  }

  onSort(sortBy: SortBy): void {
    console.log(sortBy);
  }

  onPaged(pager: Pager): void {
    console.log(pager);
  }

  onItemAction(res: ActionResult): void {
    console.log(res);
  }

  onListViewAction(res: ActionResult): void {
    console.log(res);
  }
}
