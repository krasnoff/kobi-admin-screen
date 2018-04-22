import { Component } from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  public codes: Array<any> = [];
  public numOfMails: number = 3;
  public samplePageClicked: boolean = false;
  public displaySideMenu: boolean = false;

  constructor(private _httpService:AppService) {}

  ngOnInit() {
    this._httpService.getMethod('/json/mailList.json')
    .subscribe (
      data => {
        data.forEach(element => {
          this.codes.push(element);
        });
      }
    );
  }

  onSamplePageClicked(event, item){
    this.samplePageClicked = !this.samplePageClicked;
  }

  onDisplayMenuClick(event, item){
    this.displaySideMenu = !this.displaySideMenu;
  }

  private truncate(str: string, numofChars: number) {
    if (str.length > numofChars)
      return str.substring(0,numofChars)+'...';
    else
      return str;
  }
}
