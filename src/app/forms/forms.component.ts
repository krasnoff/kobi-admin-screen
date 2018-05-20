import { Component, OnInit, ViewContainerRef } from '@angular/core';

import {BaseClassComponent} from '../base-class/base-class.component';

import { GlobalDataService } from '../global-data.service';
import {TranslateService} from '@ngx-translate/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  host: {
    class:'routerFrame'
  }
  
})
export class FormsComponent extends BaseClassComponent implements OnInit {

  public txtFirstName: string;
  public txtLastName: string;
  public txtBirthDate: string;
  public txtIDNum: string;

  public R_ELEGAL_INPUT = -1;
  public R_NOT_VALID = -2;
  public R_VALID = 1; 
  
  public isSubmited = false;
  
  constructor(protected gd: GlobalDataService, protected translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    super(gd, translate);
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  onsubmit() {
    if (!this.isnullOrEmpty(this.txtFirstName) ||
        !this.isnullOrEmpty(this.txtLastName) ||
        this.txtBirthDate == undefined ||
        this.ValidateID(this.txtIDNum) != this.R_VALID) {
      this.isSubmited = true;
    }
    else {
      this.isSubmited = false;
      this.toastr.success('Member submitted successfully', 'Success:', {positionClass: 'toast-bottom-left'});
    }
    
  }

  isnullOrEmpty(str: string) : boolean {
    if(typeof str!='undefined' && str && str.trim() != ""){
      return true;
    } 
    else {
      return false;
    } 
  }

  ValidateID(str: string): number {
    //INPUT VALIDATION

    // Just in case -> convert to string
    var IDnum = String(str);

    // Validate correct input
    /*if ((IDnum.length > 9) || (IDnum.length < 5))
      return this.R_ELEGAL_INPUT; 
    if (Number.isNaN(str))
      return this.R_ELEGAL_INPUT;*/

   // The number is too short - add leading 0000
    if (IDnum.length < 9)
    {  
      while(IDnum.length < 9)
      {
         IDnum = '0' + IDnum;         
      }
    }

    // CHECK THE ID NUMBER
    var mone = 0, incNum;
    for (var i=0; i < 9; i++)
    {
      incNum = Number(IDnum.charAt(i));
      incNum *= (i%2)+1;
      if (incNum > 9)
         incNum -= 9;
      mone += incNum;
    }
    if (mone%10 == 0)
      return this.R_VALID;
    else
      return this.R_NOT_VALID;
    
   
  }
}
