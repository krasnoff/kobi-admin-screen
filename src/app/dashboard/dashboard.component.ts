import { Component, OnInit } from '@angular/core';

import {BaseClassComponent} from '../base-class/base-class.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {
    class:'routerFrame'
  } 
})
export class DashboardComponent extends BaseClassComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
