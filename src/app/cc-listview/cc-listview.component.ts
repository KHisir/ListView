import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Pager } from './cc-paginator/pager';
import { PaginatorService } from './cc-paginator/service/paginator.service';
import { ActionResult } from './model/actionResult';
import { ListViewAction } from './model/listViewAction';
import { ListViewMode } from './model/listViewMode';
import { PropType, SortBy, Sorter } from './model/sortBy';

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
  private _data: any[] = [];
  @Input() showSearch: boolean = true;
  @Input() searchBy: string = '';
  @Input() showMenu: boolean = true;
  @Input() showPaginator: boolean = true;
  @Input() clientsideSearch: boolean = true;
  @Input() clientsideSorting: boolean = true;
  @Input() clientsidePaging: boolean = true;
  @Input() pageSize: number = 50;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100, 500];
  @Input() maxDisplayedTotalPages: number = 5;
  @Input() paginatorBordered: boolean = false;
  @Input() sortBySelection: SortBy[] = [];
  @Input() listItemActions: ListViewAction[] = [];
  @Input() listViewActions: ListViewAction[] = [];
  @Input()
  public set data(v: any[]) {
    this._data = v;

    if (this.rawData.length === 0 && this._data.length > 0) {
      this.rawData = v; // Object.assign([], v);
    }
    
    if (this.clientsidePaging === true) {
      this.items = this._data.slice(0, this.pageSize);
      this.sortItems(this.items);
    } else {
      this.items = this._data;
    }
  }
  public get data(): any[] {
    return this._data;
  }

  @Output() searchTriggered = new EventEmitter<string>();
  @Output() sortTriggered = new EventEmitter<SortBy>();
  @Output() paginationTriggered = new EventEmitter<Pager>();
  @Output() listItemActionTriggered = new EventEmitter<ActionResult>();
  @Output() listViewActionTriggered = new EventEmitter<ActionResult>();

  @ContentChild(TemplateRef) template!: TemplateRef<any>;
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
  items: any[] = [];
  checkedItems: any[] = [];
  searchString: string = '';
  sortBy: SortBy = new SortBy('', '');
  currentListViewMode: ListViewMode = ListViewMode.None;
  menuIsOpen: boolean = false;
  // data: any[] = [];
  // pager: Pager = new Pager(20);

  // lw: ListView = new ListView();
  ListViewMode: any = ListViewMode;

  constructor(private paginatorService: PaginatorService) {
    this.componentId = this.createComponentId();
  }

  ngOnInit() {
    this.sortBy = this.getDefaultSort();
  }

  pagerOnChange(pager: Pager) {
    if (this.clientsidePaging === true) {
      this.items = this.data.slice(pager.StartIndex, (pager.EndIndex + 1));
    } else {
      this.paginationTriggered.emit(pager);
    }
  }

  searchOnClick(): void {
    if (this.clientsideSearch === true) {
      this.data = this.rawData.filter(item => {
        return item[this.searchBy].toLowerCase().includes(this.searchString);
      });
      this.items = this.data;
    } else {
      this.searchTriggered.emit(this.searchString);
    }
  }

  sortItems(list: any[]): void {
    if (this.sortBy.PropType === PropType.Number) {
      Sorter.sort(list, this.sortBy.Reversed, this.sortBy.Prop, true);
    } else if (this.sortBy.PropType === PropType.Boolean) {
      Sorter.sort(list, this.sortBy.Reversed, this.sortBy.Prop, false, true);
    } else if (this.sortBy.PropType === PropType.Date) {
      Sorter.sort(list, this.sortBy.Reversed, this.sortBy.Prop, false, false, true);
    } else {
      Sorter.sort(list, this.sortBy.Reversed, this.sortBy.Prop);
    }
  }

  getDefaultSort(): SortBy {
    const found = this.sortBySelection.find(item => item.IsDefault === true);

    if (found !== undefined) {
      return found;
    } else {
      return new SortBy('', '');
    }
  }

  contextMenuActionOnClick(action: ListViewAction): void {
    // alert('Count of checked items: ' + this.checkedItems.length);
    this.listViewActionTriggered.emit(new ActionResult(action, this.checkedItems));
    this.uncheckAll();
    this.currentListViewMode = ListViewMode.None;
  }

  itemEditOnClick(item: any): void {
    if (item.isSelected === true) {
      item.isSelected = false;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].isSelected = false;
      }
      item.isSelected = true;
    }
  }

  itemContextMenuActionOnClick(action: ListViewAction, item: any): void {
    item.isActive = false;
    this.listItemActionTriggered.emit(new ActionResult(action, item));
  }

  checkAll(evt: any): void {
    if (evt.target.checked === true) {
      this.items.forEach((item: any) => (item.isActive = true));
    } else {
      this.items.forEach((item: any) => (item.isActive = false));
    }
    this.refreshCheckedItems();
  }

  uncheckAll(): void {
    this.items.forEach((item: any) => (item.isActive = false));
    this.refreshCheckedItems();
  }

  refreshCheckedItems(): void {
    this.checkedItems = this.items.filter((x) => x.isActive === true);
  }

  // getGridTemplateRowClass(): string {
  //   if (
  //     this.showSearch === false &&
  //     this.showMenu === false &&
  //     this.showPaginator === false
  //   ) {
  //     return 'withoutHeaderAndFooter';
  //   } else if (
  //     this.showSearch === false &&
  //     this.showMenu === false
  //   ) {
  //     return 'withoutHeader';
  //   } else if (this.showPaginator === false) {
  //     return 'withoutFooter';
  //   } else {
  //     return '';
  //   }
  // }

  sortByChanged(): void {
    this.currentListViewMode = ListViewMode.None;

    if (this.clientsideSorting === true) {
      this.sortItems(this.rawData);
      this.paginatorService.reset();
      this.data = this.rawData

      if (this.clientsideSearch === true) {
        this.data = this.rawData.filter(item => {
          return item[this.searchBy].toLowerCase().includes(this.searchString);
        });
        this.items = this.data;
      }
    } else {
      this.sortTriggered.emit(this.sortBy);
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
