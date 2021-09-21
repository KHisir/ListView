import { IListViewItem } from './IListViewItem';
import { ListViewAction } from './listViewAction';

export class ActionResult {
  public Action: ListViewAction;
  public Items: IListViewItem[] | IListViewItem;
  constructor(action: ListViewAction, items: IListViewItem[] | IListViewItem) {
    this.Action = action;
    this.Items = items;
  }
}
