import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalDataService } from './global-data.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, protected gd: GlobalDataService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem("isLogin") == "true")
        this.gd["isLogin"] = true;
      
      if (this.gd["isLogin"] == true)
      {
        return true;
      }
      else {
        this.router.navigate(["/login", state.url.replace(/\//gi, "")]);
        return false;
      }
  }
}