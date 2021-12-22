export enum PropType {
  String = 0,
  Number = 1,
  Boolean = 2,
  Date = 3
}

export class SortBy {
  public Prop: string;
  public PropType: PropType;
  public Name: string;
  public IsDefault: boolean;
  public Reversed: boolean;

  constructor(
    prop: string,
    name: string,
    propType: PropType = PropType.String,
    reversed: boolean = false,
    isDefault: boolean = false,
  ) {
    this.Prop = prop;
    this.Name = name;
    this.PropType = propType;
    this.Reversed = reversed;
    this.IsDefault = isDefault;
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
        list.sort(function (a: any, b: any) {
          return reversed * (Number(a[sortBy]) - Number(b[sortBy]));
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function (a: any, b: any) {
          return reversed * (Number(a) - Number(b));
        });
      }
    } else if (isNumericSort) {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function (a: any, b: any) {
          return reversed * (a[sortBy] - b[sortBy]);
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function (a: any, b: any) {
          return reversed * (a - b);
        });
      }
    } else if (isDateSort) {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function (a: any, b: any) {
          return reversed * (a[sortBy].valueOf() - b[sortBy].valueOf());
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function (a: any, b: any) {
          return reversed * (a.valueOf() - b.valueOf());
        });
      }
    } else {
      if (sortBy !== '' && sortBy !== null) {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function (a: any, b: any) {
          const x = a[sortBy].toLowerCase();
          const y = b[sortBy].toLowerCase();
          return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
      } else {
        // tslint:disable-next-line:only-arrow-functions
        list.sort(function (a: any, b: any) {
          const x = a.toLowerCase();
          const y = b.toLowerCase();
          return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
      }
    }

    return list;
  }
}
