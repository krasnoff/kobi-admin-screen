import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from './blank.component';

import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';

import { AuthenticatedGuard } from '../authenticated.guard';

import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: BlankComponent, canActivate: [AuthenticatedGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [BlankComponent]
})
export class BlankModule { }
