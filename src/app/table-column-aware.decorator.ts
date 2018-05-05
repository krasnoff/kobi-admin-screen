import { TableColumn } from './table-column.enum';

export function TableColumnAware(constructor: Function) {
    constructor.prototype.TableColumn = TableColumn;
}