import { Component, OnInit } from '@angular/core';

import {BaseClassComponent} from '../base-class/base-class.component';

import { GlobalDataService } from '../global-data.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  host: {
    class:'routerFrame'
  }
})
export class FormsComponent extends BaseClassComponent implements OnInit {

  constructor(protected gd: GlobalDataService, protected translate: TranslateService) { 
    super(gd, translate);
  }

  ngOnInit() {
  }

}
