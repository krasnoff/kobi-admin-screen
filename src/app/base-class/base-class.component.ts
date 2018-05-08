import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../global-data.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-base-class',
  template: '<p>Hello</p>',
})
export class BaseClassComponent implements OnInit {

  constructor(protected gd: GlobalDataService, protected translate: TranslateService) { 
    if (this.gd.shareObj['selectedLang'] == undefined)
      this.gd.shareObj['selectedLang'] = 'en'
    translate.setDefaultLang(this.gd.shareObj['selectedLang']);

    gd.changeLanguage$.subscribe(lang => this.onLangChange(lang))
  }

  onLangChange(lang: string) {
    console.log('from inner component: ' + lang);
    this.translate.setDefaultLang(this.gd.shareObj['selectedLang']);
  }

  ngOnInit() {
  }

}
