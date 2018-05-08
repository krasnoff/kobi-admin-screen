import { Component } from '@angular/core';
import {AppService} from './app.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import { GlobalDataService } from './global-data.service';

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

  public closeResult: string;

  constructor(private _httpService:AppService, private modalService: NgbModal, private translate: TranslateService, private gd: GlobalDataService) {
    if (this.gd.shareObj['selectedLang'] == undefined)
      this.gd.shareObj['selectedLang'] = 'en'
    translate.setDefaultLang(this.gd.shareObj['selectedLang']);
  }

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

  useLanguage(language: string) {
    this.translate.use(language);  
    this.gd.changeLanguage(language);  
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
