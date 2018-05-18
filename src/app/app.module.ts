import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthenticatedGuard } from './authenticated.guard';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseClassComponent } from './base-class/base-class.component';

import { GlobalDataService } from './global-data.service';
import { LoginPageComponent } from './login-page/login-page.component';

import {ToastModule} from 'ng2-toastr/ng2-toastr';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticatedGuard] },

  { path: 'login/:redirectTo', component: LoginPageComponent }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BaseClassComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [GlobalDataService, AuthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
