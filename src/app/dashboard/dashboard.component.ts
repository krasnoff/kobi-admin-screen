import { Component, OnInit } from '@angular/core';


import { TableColumn } from '../table-column.enum';
import { TableColumnAware } from '../table-column-aware.decorator';
import { SortDirection } from '../sort-direction.enum';
import { SortDirectionAware } from '../sort-direction-aware.decorator';

import {BaseClassComponent} from '../base-class/base-class.component';
import {AppService} from '../app.service';

import { GlobalDataService } from '../global-data.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {
    class:'routerFrame'
  },
  providers: [AppService]
})
@TableColumnAware
@SortDirectionAware
export class DashboardComponent extends BaseClassComponent implements OnInit {
  public TableColumn;
  public renderingEngine;
  public SortDirection;
  public browser;
  public chartHovered;
  public chartClicked;

  public browsers: Array<any> = [];
  public browsersSlice: Array<any> = [];

  public pageNum: number;
  public pageSize: number;

  // Store a reference to the enum
  public tableColumnValue: TableColumn = TableColumn.none;
  public sortDirectionValue: SortDirection = SortDirection.Ascending;

  
      

  constructor(private _httpService:AppService, protected gd: GlobalDataService, protected translate: TranslateService) { 
    super(gd, translate);

    this.pageNum = 1;
    this.pageSize = 10;

  }

  ngOnInit() {
    this._httpService.getMethod('/json/DataTable.json')
    .subscribe (
      data => {
        data.forEach(element => {
          this.browsers.push(element);
        });

        this.sliceData();
      }
    );
  }

  

  //#region table manipulation
  
  private sortData(columnName, direction): void {
    if (this.browsers.length > 0)
    {
      var propertyList = Object.getOwnPropertyNames(this.browsers[0])
      var chosenPropery = propertyList[columnName - 1];
      
      if (direction == SortDirection.Ascending)
      {
        this.browsers.sort(function(a, b) {
          if (a[chosenPropery] > b[chosenPropery]) { return 1; }
          if (a[chosenPropery] < b[chosenPropery]) { return -1; }
          return 0;
        });
      }
      else{
        this.browsers.sort(function(a, b) {
          if (a[chosenPropery] > b[chosenPropery]) { return -1; }
          if (a[chosenPropery] < b[chosenPropery]) { return 1; }
          return 0;
        });
      }

      this.pageNum = 1;
      this.sliceData();
    }
  }

  private sliceData(): void {
    var recordStart = (this.pageNum - 1) * this.pageSize;
    var recordEnd = recordStart + this.pageSize;
    
    this.browsersSlice = this.browsers.slice(recordStart, recordEnd);
  }

  public getMathFloor(myNumber: number): number
  {
    return Math.floor(myNumber);
  }

  public getPagesSequence(): Array<any>
  {
    var numberArray = [];

    for (var i = 1; i <= this.getMathFloor(this.browsers.length / this.pageSize) + 1; i++)
      numberArray.push(i);
    
    return numberArray;
  }

  public incrementPage(): void {
    this.pageNum++;
    if (this.pageNum > this.getMathFloor(this.browsers.length / this.pageSize) + 1)
      this.pageNum = this.getMathFloor(this.browsers.length / this.pageSize) + 1

    this.sliceData();
  }

  public decerementPage(): void {
    this.pageNum--;
    if (this.pageNum < 1)
      this.pageNum = 1;

    this.sliceData();
  }

  public setPage(pageNumber: number): void {
    this.pageNum = pageNumber;
    this.sliceData();
  }

  public sortByClick(tableColumnValue: TableColumn): void {
    if (this.tableColumnValue == tableColumnValue) {
      this.sortDirectionValue = this.sortDirectionValue == SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending
    }
    
    this.tableColumnValue = tableColumnValue;

    this.sortData(tableColumnValue, this.sortDirectionValue);
  }

  //#endregion

  //#region line chart
  
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];

  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  //#endregion

  //#region bar chart

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  //#endregion
}
