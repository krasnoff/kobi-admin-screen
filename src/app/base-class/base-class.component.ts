import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../global-data.service';
import {TranslateService} from '@ngx-translate/core';

import { LanguagesAware } from '../languages-aware.decorator';
import { Languages } from '../languages.enum';

@Component({
  selector: 'app-base-class',
  template: '<p>Hello</p>',
})
@LanguagesAware
export class BaseClassComponent implements OnInit {

  constructor(protected gd: GlobalDataService, protected translate: TranslateService) { 
    if (this.translate.currentLang == undefined)
      this.translate.currentLang = Languages.English;
    translate.setDefaultLang(this.translate.currentLang);

    gd.changeLanguage$.subscribe(lang => this.onLangChange(lang))
  }

  onLangChange(lang: string) {
    console.log('from inner component: ' + lang);
    this.translate.setDefaultLang(this.translate.currentLang);
  }

  ngOnInit() {
  }

}
