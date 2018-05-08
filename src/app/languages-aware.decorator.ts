import { Languages } from './languages.enum';

export function LanguagesAware(constructor: Function) {
    constructor.prototype.Languages = Languages;
}