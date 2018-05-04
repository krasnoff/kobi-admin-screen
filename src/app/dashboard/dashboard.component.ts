import { Component, OnInit } from '@angular/core';

import {BaseClassComponent} from '../base-class/base-class.component';
import {AppService} from '../app.service';

enum DataTableColumns {
  renderingEngine = 1,
  browser = 2,
  platform = 3,
  engineVersion = 4,
  CSSGrade = 5
}

class Cell {
  constructor(public type: DataTableColumns) {}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {
    class:'routerFrame'
  },
  providers: [AppService]
})
export class DashboardComponent extends BaseClassComponent implements OnInit {
  public browsers: Array<any> = [];
  public browsersSlice: Array<any> = [];

  private pageNum: number;
  private pageSize: number;

  // Store a reference to the enum
  cellType = DataTableColumns;
  public cell: Cell;

  constructor(private _httpService:AppService) { 
    super();

    this.pageNum = 1;
    this.pageSize = 10;

    this.cell = new Cell(DataTableColumns.browser)
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
