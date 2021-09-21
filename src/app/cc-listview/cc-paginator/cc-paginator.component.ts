import { ElementRef, HostListener, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Pager } from './pager';
import { PaginatorService } from './service/paginator.service';

@Component({
  selector: 'app-cc-paginator',
  templateUrl: './cc-paginator.component.html',
  styleUrls: ['./cc-paginator.component.scss']
})
export class CcPaginatorComponent implements OnInit {
  private _length: number = 0;
  
  @Output() page = new EventEmitter<Pager>();
  @Input() pageSize: number = 50;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100, 500];
  @Input() maxDisplayedTotalPages: number = 5;
  @Input() bordered: boolean = false;

  lengthBefore: number = 0;

  @Input()
  public set length(v: number) {
    this._length = v;

    if (this._length !== this.lengthBefore) {
      this.lengthBefore = v;
      this.pager = new Pager(this.pageSize, this.length, this.maxDisplayedTotalPages);
      this.setPage(1, false);
    }
  }
  public get length(): number {
    return this._length;
  }

  @ViewChild("wrapper") paginatorWrapper?: ElementRef;

  pager: Pager;
  disablePageBtns: boolean = false;
  totalElemWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.togglePages();
  }

  constructor(private paginatorService: PaginatorService) {
    this.pager = new Pager(this.pageSize, this.length, this.maxDisplayedTotalPages);
  }

  ngOnInit() {}

  togglePages(): void {
    if (this.paginatorWrapper !== undefined) {
      if (this.totalElemWidth > this.paginatorWrapper.nativeElement.offsetWidth) {
        this.disablePageBtns = true;
      } else {
        this.disablePageBtns = false;
      }
    }
  }

  calculateTotalElemWidth(): void {
    if (this.paginatorWrapper !== undefined) {
      this.totalElemWidth = 0;
      for (const childElem of this.paginatorWrapper.nativeElement.children) {
        for (const childElemElem of childElem.children) {
          if (String(childElemElem.className).includes('pages') === false) {
            this.totalElemWidth += childElemElem.offsetWidth;
          }
        }
      }
    }

    this.totalElemWidth += this.pager.Pages.length * 40;
  }

  setPage(page: number, callParent: boolean = true) {
    this.pager.CurrentPage = page;

    // get pager object from service
    this.pager = this.paginatorService.getPager(this.pager);

    if (callParent === true) {
      this.page.emit(this.pager);
    }
    
    this.calculateTotalElemWidth();
    this.togglePages(); 
  }

  pageSizeOnChange(e: any): void {
    this.pager.PageSize = Number(e.target.value);
    this.setPage(1);
  }

  pageOnSelect(e: any): void {
    this.setPage(Number(e.target.value));
  }

  getTotalPagesArr(i: number) {
    let arr: number[] = [];
    for (let i = 1; i <= this.pager.TotalPages; i++) {
      arr.push(i);
      
    }
    return arr;
  }
}
