import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {TableColumn, TableColumnType} from '../../models/table-column.model';
import {ShortNumberPipe} from '../../pipes/short-number.pipe';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule, ShortNumberPipe],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  readonly TableColumnType = TableColumnType;

  get displayedColumns(): string[] {
    return this.columns.map((col) => col.name);
  }
}
