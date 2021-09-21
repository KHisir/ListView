export class Pager {
    public TotalItems: number = 0;
    public CurrentPage: number = 1;
    public PageSize: number = 0;
    public TotalPages: number = 0;
    public StartPage: number = 0;
    public EndPage: number = 0;
    public MaxDisplayedTotalPages: number = 0;
    public StartIndex: number = 0;
    public EndIndex: number = 0;
    public Pages: number[] = [];
    public Info: string = '';
    public PageSizeList: number[] = [10, 20, 50, 100, 250, 500];
  
    constructor(pageSize: number, totalItems: number, maxDisplayedTotalPages: number) {
        this.PageSize = pageSize;
        this.TotalItems = totalItems;
        this.MaxDisplayedTotalPages = maxDisplayedTotalPages;
    }
  }