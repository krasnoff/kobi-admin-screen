import { Component } from '@angular/core';
import {AppService} from './app.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import { GlobalDataService } from './global-data.service';

import { LanguagesAware } from './languages-aware.decorator';
import { Languages } from './languages.enum';

import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
@LanguagesAware
export class AppComponent {
  public codes: Array<any> = [];
  public numOfMails: number = 3;
  public samplePageClicked: boolean = false;
  public displaySideMenu: boolean = false;

  public closeResult: string;

  constructor(private _httpService:AppService, private modalService: NgbModal, private translate: TranslateService, public gd: GlobalDataService, private router:Router) {
    if (this.translate.currentLang == undefined)
      this.translate.currentLang = Languages.English;
    translate.setDefaultLang(this.translate.currentLang);

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.url.indexOf("/login") > -1) {
          document.getElementById("topNav").style.display = "none";
          document.getElementById("sidebar").style.display = "none";
          
        }
        else {
          document.getElementById("topNav").style.display = "flex";
          document.getElementById("sidebar").style.display = "block";
        }
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
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

  logout() {
    localStorage.removeItem('isLogin');
    this.gd["isLogin"] = false;
    this.router.navigate(["/login/dashboard"]);
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
