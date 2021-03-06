import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {BaseClassComponent} from '../base-class/base-class.component';
import {AppService} from '../app.service';
import { GlobalDataService } from '../global-data.service';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent extends BaseClassComponent implements OnInit {
  txtUserName: string;
  txtPassword: string;
  chkRemember: boolean;

  redirectTo: string;
  private sub: any;

  constructor(private _httpService:AppService, protected gd: GlobalDataService, protected translate: TranslateService, 
              private router: Router, private route: ActivatedRoute, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    super(gd, translate);
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.redirectTo = params['redirectTo']; // (+) converts string 'id' to a number
    });
  }

  createLogin() {
    if (this.txtUserName == "admin" && this.txtPassword == "admin") {
      this.gd["isLogin"] = true;

      if (this.chkRemember == true)
        localStorage.setItem("isLogin", "true");
      
      this.router.navigate(["/" + this.redirectTo]);
    }
    else {
      //alert("not login");
      this.toastr.error('This is not good!', 'Error:', {positionClass: 'toast-bottom-left'});
    }
  }

}
