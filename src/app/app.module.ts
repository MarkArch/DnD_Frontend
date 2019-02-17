import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
  VkontakteLoginProvider,
  AuthService,
} from "angular-6-social-login-v2";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CampaignSelectComponent } from './views/campaign-select/campaign-select.component';
import { RestServiceService } from './shared/rest-service.service';
import { postlogin } from './class/postlogin';
import { SharedVariableService } from './shared/shared-variable.service';
import { CookieService } from 'ngx-cookie-service';
import { FacebookModule } from 'ngx-facebook';
import { PdfViewerModule} from 'ng2-pdf-viewer'
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective } from 'ng2-file-upload';
import { NewCharacterComponent } from './views/new-character/new-character.component';
import { DungeonComponent } from './views/main/dungeon/dungeon.component';
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        }     
  
      ]
  );
  return config;
}


@NgModule({
  imports: [
    PdfViewerModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    CKEditorModule,
    FacebookModule.forRoot(),
    ToastrModule.forRoot({maxOpened:5,newestOnTop:true,autoDismiss:true})
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    CampaignSelectComponent,
    NewCharacterComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },RestServiceService,SharedVariableService,CookieService,{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },AuthService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
