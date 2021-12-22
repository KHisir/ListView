import { ListViewAction } from './listViewAction';

export class ActionResult {
  public Action: ListViewAction;
  public Items: any;
  constructor(action: ListViewAction, items: any) {
    this.Action = action;
    this.Items = items;
  }
}
