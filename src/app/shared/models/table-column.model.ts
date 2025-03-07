export interface TableColumn {
  name: string;
  label: string;
  property: string;
  type: TableColumnType;
}

export enum TableColumnType {
  Text = 'text',
  NameSymbol = 'nameSymbol',
  Currency = 'currency',
  BigNumber = 'bigNumber',
  Percentage = 'percentage',
}
