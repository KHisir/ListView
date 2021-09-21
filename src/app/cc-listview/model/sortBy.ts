export enum SortByKey {
  None = 0,
  IndexAsc = 1,
  IndexDesc = 2,
  TextAsc = 3,
  TextDesc = 4,
  SubTextAsc = 5,
  SubTextDesc = 6,
  InfoAsc = 7,
  InfoDesc = 8,
  BadgeAsc = 9,
  BadgeDesc = 10
}

export class SortBy {
  public Type: SortByKey;
  public Value: string;
  public Name: string;
  constructor(type: SortByKey, value: string, name: string) {
    this.Type = type;
    this.Value = value;
    this.Name = name;
  }
}

export class Sorter {
  constructor() {}

  static sort<T>(
    list: T[],
    reverse: boolean,
    sortBy: string = '',
    isNumericSort?: boolean,
    isBooleanSort?: boolean,
    isDateSort?: boolean
  ): T[] {
    sortBy = sortBy; // by default null
    isNumericSort = isNumericSort || false; // by default text sort
    isBooleanSort = isBooleanSort || false; // by default text sort
    isDateSort = isDateSort || false; // by default text sort
    reverse = reverse || false; // by default no reverse

    const reversed = reverse ? -1 : 1;

    if (isBooleanSort) {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (Number(a[sortBy]) - Number(b[sortBy]));
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (Number(a) - Number(b));
        });
      }
    } else if (isNumericSort) {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (a[sortBy] - b[sortBy]);
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (a - b);
        });
      }
    } else if (isDateSort) {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (a[sortBy].valueOf() - b[sortBy].valueOf());
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          return reversed * (a.valueOf() - b.valueOf());
        });
      }
    } else {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          const x = a[sortBy].toLowerCase();
          const y = b[sortBy].toLowerCase();
          return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function(a: any, b: any) {
          const x = a.toLowerCase();
          const y = b.toLowerCase();
          return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
      }
    }

    return list;
  }
}