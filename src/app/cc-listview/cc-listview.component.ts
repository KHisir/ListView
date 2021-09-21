import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Pager } from './cc-paginator/pager';
import { ActionResult } from './model/actionResult';
import { IListViewItem } from './model/IListViewItem';
import { ListViewAction } from './model/listViewAction';
import { ListViewMode } from './model/listViewMode';
import { SortBy, SortByKey, Sorter } from './model/sortBy';

@Component({
  selector: 'app-cc-listview',
  templateUrl: './cc-listview.component.html',
  styleUrls: ['./cc-listview.component.scss'],
  animations: [
    trigger('panelInOut', [
      transition('void => *', [
        style({ opacity: 0, top: '45%' }),
        animate(350)
      ]),
      transition('* => void', [
        animate(350, style({ opacity: 1, top: '0%' }))
      ])
    ])
  ]
})
export class CcListviewComponent implements OnInit {
  private _data: IListViewItem[] = [];
  @Input() showSearch: boolean = true;
  @Input() showMenu: boolean = true;
  @Input() showPaginator: boolean = true;
  @Input() showListItemBadge: boolean = true;
  @Input() showListItemSubtext: boolean = true;
  @Input() showListItemInfo: boolean = true;
  @Input() clientsideSearch: boolean = true;
  @Input() clientsideSorting: boolean = true;
  @Input() clientsidePaging: boolean = true;
  @Input() pageSize: number = 50;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100, 500];
  @Input() maxDisplayedTotalPages: number = 5;
  @Input() paginatorBordered: boolean = false;
  @Input() listItemActions: ListViewAction[] = [];
  @Input() listViewActions: ListViewAction[] = [];
  @Input()
  public set data(v: IListViewItem[]) {
    this._data = v;

    if (this.rawData.length === 0 && this._data.length > 0) {
      this.rawData = v; // Object.assign([], v);
    }
    
    if (this.clientsidePaging === true) {
      this.items = this._data.slice(0, this.pageSize);
      this.sortItems();
    } else {
      this.items = this._data;
    }
  }
  public get data(): IListViewItem[] {
    return this._data;
  }

  @Output() searchTriggered = new EventEmitter<string>();
  @Output() sortTriggered = new EventEmitter<SortBy>();
  @Output() paginationTriggered = new EventEmitter<Pager>();
  @Output() listItemActionTriggered = new EventEmitter<ActionResult>();
  @Output() listViewActionTriggered = new EventEmitter<ActionResult>();

  @ViewChild('dropdown', { static: false }) dropdown!: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.dropdown !== undefined) {
      if (this.dropdown.nativeElement.contains(event.target)) {
        // Your code...
      } else {
        this.menuIsOpen = false;
      }
    }
  }

  componentId: string;
  rawData: any[] = [];
  items: IListViewItem[] = [];
  checkedItems: IListViewItem[] = [];
  searchString: string = '';
  sortBy: SortBy = new SortBy(SortByKey.TextAsc, 'Text', 'Text (A-Z)');
  currentListViewMode: ListViewMode = ListViewMode.None;
  menuIsOpen: boolean = false;
  // data: any[] = [];
  // pager: Pager = new Pager(20);

  // lw: ListView = new ListView();
  ListViewMode: any = ListViewMode;

  sortBySelection: SortBy[] = [
    new SortBy(SortByKey.IndexAsc, 'Index', 'Index (0-1)'),
    new SortBy(SortByKey.IndexDesc, 'Index', 'Index (1-0)'),
    new SortBy(SortByKey.TextAsc, 'Text', 'Text (A-Z)'),
    new SortBy(SortByKey.TextDesc, 'Text', 'Text (Z-A)'),
    new SortBy(SortByKey.SubTextAsc, 'SubText', 'Subtext (A-Z)'),
    new SortBy(SortByKey.SubTextDesc, 'SubText', 'Subtext (Z-A)'),
    new SortBy(SortByKey.InfoAsc, 'Info', 'Info (A-Z)'),
    new SortBy(SortByKey.InfoDesc, 'Info', 'Info (Z-A)'),
    new SortBy(SortByKey.BadgeAsc, 'Badge', 'Badge (0-1)'),
    new SortBy(SortByKey.BadgeDesc, 'Badge', 'Badge (1-0)')
  ];

  constructor() {
    this.componentId = this.createComponentId();
  }

  ngOnInit() {}

  pagerOnChange(pager: Pager) {
    if (this.clientsidePaging === true) {
      this.items = this.data.slice(pager.StartIndex, (pager.EndIndex + 1));
      this.sortItems();
    } else {
      this.paginationTriggered.emit(pager);
    }
  }

  searchOnClick(): void {
    if (this.clientsideSearch === true) {
      this.data = this.rawData.filter(item => {
        return item.Text.toLowerCase().includes(this.searchString);
      });
      this.items = this.data;
    } else {
      this.searchTriggered.emit(this.searchString);
    }
  }

  sortItems(): void {
    if (this.clientsideSorting === true) {
      switch (this.sortBy.Type) {
        case SortByKey.IndexAsc:
          Sorter.sort(this.items, false, 'Index', true);
          break;
        case SortByKey.IndexDesc:
          Sorter.sort(this.items, true, 'Index', true);
          break;
        case SortByKey.TextAsc:
          Sorter.sort(this.items, false, 'Text');
          break;
        case SortByKey.TextDesc:
          Sorter.sort(this.items, true, 'Text');
          break;
        case SortByKey.SubTextAsc:
          Sorter.sort(this.items, false, 'SubText');
          break;
        case SortByKey.SubTextDesc:
          Sorter.sort(this.items, true, 'SubText');
          break;
        case SortByKey.InfoAsc:
          Sorter.sort(this.items, false, 'Info');
          break;
        case SortByKey.InfoDesc:
          Sorter.sort(this.items, true, 'Info');
          break;
        case SortByKey.BadgeAsc:
          Sorter.sort(this.items, false, 'Badge', true);
          break;
        case SortByKey.BadgeDesc:
          Sorter.sort(this.items, true, 'Badge', true);
          break;
  
        default:
          Sorter.sort(this.items, false, 'Text');
          break;
      }
    } else {
      this.sortTriggered.emit(this.sortBy);
    }
  }

  contextMenuActionOnClick(action: ListViewAction): void {
    // alert('Count of checked items: ' + this.checkedItems.length);
    this.listViewActionTriggered.emit(new ActionResult(action, this.checkedItems));
    this.uncheckAll();
    this.currentListViewMode = ListViewMode.None;
  }

  itemEditOnClick(item: IListViewItem): void {
    if (item.IsActive === true) {
      item.IsActive = false;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].IsActive = false;
      }
      item.IsActive = true;
    }
  }

  itemContextMenuActionOnClick(action: ListViewAction, item: IListViewItem): void {
    item.IsActive = false;
    this.listItemActionTriggered.emit(new ActionResult(action, item));
  }

  checkAll(evt: any): void {
    if (evt.target.checked === true) {
      this.items.forEach((item: IListViewItem) => (item.IsSelected = true));
    } else {
      this.items.forEach((item: IListViewItem) => (item.IsSelected = false));
    }
    this.refreshCheckedItems();
  }

  uncheckAll(): void {
    this.items.forEach((item: IListViewItem) => (item.IsSelected = false));
    this.refreshCheckedItems();
  }

  refreshCheckedItems(): void {
    this.checkedItems = this.items.filter((x) => x.IsSelected === true);
  }

  getGridTemplateRowClass(): string {
    if (
      this.showSearch === false &&
      this.showMenu === false &&
      this.showPaginator === false
    ) {
      return 'withoutHeaderAndFooter';
    } else if (
      this.showSearch === false &&
      this.showMenu === false
    ) {
      return 'withoutHeader';
    } else if (this.showPaginator === false) {
      return 'withoutFooter';
    } else {
      return '';
    }
  }

  createComponentId() {
    // tslint:disable-next-line:only-arrow-functions
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0;
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
