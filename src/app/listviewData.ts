import { IListViewItem } from './cc-listview/model/IListViewItem';

export class ListViewData implements IListViewItem {
  public static getData(rawData: any[]): IListViewItem[] {
    let items: IListViewItem[] = [];
    for (let i = 0; i < rawData.length; i++) {
      items.push(
        new ListViewData(
          rawData[i].index,
          rawData[i]._id,
          rawData[i].name,
          rawData[i].greeting,
          rawData[i].gender,
          '',
          rawData[i].messageCount
        )
      );
    }
    return items;
  }

  // required (interface) properties:
  Index: number;
  Id: string;
  Text: string;
  SubText: string;
  Info: string;
  Icon: string;
  Badge: string;
  IsDisabled: boolean;
  IsActive: boolean;
  IsSelected: boolean;
  Color: string;
  BackgroundColor: string;

  // your own properties here:

  constructor(
    index: number,
    id: string,
    text: string,
    subText: string,
    info: string,
    icon: string,
    badge: string,
    isDisabled: boolean = false,
    isActive: boolean = false,
    isSelected: boolean = false,
    color: string = '',
    backgroundColor: string = ''
  ) {
    this.Index = index;
    this.Id = id;
    this.Text = text;
    this.SubText = subText;
    this.Info = info;
    this.Icon = icon;
    this.Badge = badge;
    this.IsDisabled = isDisabled;
    this.IsActive = isActive;
    this.IsSelected = isSelected;
    this.Color = color;
    this.BackgroundColor = backgroundColor;
  }
}
