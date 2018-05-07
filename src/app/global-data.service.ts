import { Injectable, EventEmitter } from '@angular/core';

interface ShareObj {
  [id: string]: any;
}

@Injectable()
export class GlobalDataService {
  public changeLanguage$: EventEmitter<string>;
  shareObj: ShareObj = {};
  
  constructor() { 
    this.changeLanguage$ = new EventEmitter();
  }

  public changeLanguage(lang: string): void {
    this.changeLanguage$.emit(lang);
  }

}
