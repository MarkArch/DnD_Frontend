"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var animations_1 = require("@angular/platform-browser/animations");
var modal_1 = require("ngx-bootstrap/modal");
var http_1 = require("@angular/common/http");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var ckeditor5_angular_1 = require("@ckeditor/ckeditor5-angular");
var angular_6_social_login_v2_1 = require("angular-6-social-login-v2");
var DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var app_component_1 = require("./app.component");
// Import containers
var containers_1 = require("./containers");
var _404_component_1 = require("./views/error/404.component");
var _500_component_1 = require("./views/error/500.component");
var login_component_1 = require("./views/login/login.component");
var register_component_1 = require("./views/register/register.component");
var APP_CONTAINERS = [
    containers_1.DefaultLayoutComponent
];
var angular_1 = require("@coreui/angular");
// Import routing module
var app_routing_1 = require("./app.routing");
// Import 3rd party components
var dropdown_1 = require("ngx-bootstrap/dropdown");
var tabs_1 = require("ngx-bootstrap/tabs");
var campaign_select_component_1 = require("./views/campaign-select/campaign-select.component");
var rest_service_service_1 = require("./shared/rest-service.service");
var shared_variable_service_1 = require("./shared/shared-variable.service");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var ngx_facebook_1 = require("ngx-facebook");
function getAuthServiceConfigs() {
    var config = new angular_6_social_login_v2_1.AuthServiceConfig([
        {
            id: angular_6_social_login_v2_1.FacebookLoginProvider.PROVIDER_ID,
            provider: new angular_6_social_login_v2_1.FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
            id: angular_6_social_login_v2_1.GoogleLoginProvider.PROVIDER_ID,
            provider: new angular_6_social_login_v2_1.GoogleLoginProvider("Your-Google-Client-Id")
        }
    ]);
    return config;
}
exports.getAuthServiceConfigs = getAuthServiceConfigs;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_1.AppRoutingModule,
                angular_1.AppAsideModule,
                angular_1.AppBreadcrumbModule.forRoot(),
                angular_1.AppFooterModule,
                angular_1.AppHeaderModule,
                angular_1.AppSidebarModule,
                ngx_perfect_scrollbar_1.PerfectScrollbarModule,
                dropdown_1.BsDropdownModule.forRoot(),
                tabs_1.TabsModule.forRoot(),
                modal_1.ModalModule.forRoot(),
                http_1.HttpClientModule,
                ckeditor5_angular_1.CKEditorModule,
                ngx_facebook_1.FacebookModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent
            ].concat(APP_CONTAINERS, [
                _404_component_1.P404Component,
                _500_component_1.P500Component,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                campaign_select_component_1.CampaignSelectComponent
            ]),
            providers: [{
                    provide: common_1.LocationStrategy,
                    useClass: common_1.HashLocationStrategy
                }, rest_service_service_1.RestServiceService, shared_variable_service_1.SharedVariableService, ngx_cookie_service_1.CookieService, {
                    provide: angular_6_social_login_v2_1.AuthServiceConfig,
                    useFactory: getAuthServiceConfigs
                }, angular_6_social_login_v2_1.AuthService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map