import { SortDirection } from './sort-direction.enum';

export function SortDirectionAware(constructor: Function) {
    constructor.prototype.SortDirection = SortDirection;
}