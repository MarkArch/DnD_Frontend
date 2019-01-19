"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rest_service_service_1 = require("../../shared/rest-service.service");
var shared_variable_service_1 = require("../../shared/shared-variable.service");
var ngx_facebook_1 = require("ngx-facebook");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(route, fb, router, service, shared) {
        this.route = route;
        this.fb = fb;
        this.router = router;
        this.service = service;
        this.shared = shared;
        this.accounts = [];
        var initParams = {
            appId: '285738238803032',
            cookie: true,
            xfbml: true,
            version: 'v3.2'
        };
        fb.init(initParams);
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onRegister = function () {
        this.router.navigate(['/register']);
    };
    LoginComponent.prototype.onLogin = function (username, password) {
        var _this = this;
        //this.router.navigate(['/campaign']);
        this.service.login(username, password).subscribe(function (res) {
            _this.router.navigate(['/campaign']);
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.onSubmitFacebookLogin = function (socialPlatform) {
        var _this = this;
        var loginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'public_profile,email'
        };
        this.fb.getLoginStatus().then(function (res) {
            console.log(res.status);
            if (res.status != 'connected') {
                _this.fb.login(loginOptions)
                    .then(function (res) {
                    _this.service.facebookLogin(res.authResponse.accessToken).subscribe(function (res) { console.log(res); _this.router.navigate(['/campaign']); });
                })
                    .catch(_this.handleError);
            }
            else {
                _this.service.facebookLogin(res.authResponse.accessToken).subscribe(function (res) { console.log(res); _this.router.navigate(['/campaign']); });
            }
        });
    };
    LoginComponent.prototype.onFacebookLogout = function () {
        var _this = this;
        this.fb.getLoginStatus().then(function (res) {
            console.log(res.status);
            if (res.status == 'connected') {
                _this.fb.logout().then(function () { return console.log("logged out"); }).catch(function (err) { return console.log(err); });
            }
        });
    };
    LoginComponent.prototype.handleError = function (error) {
        console.error('Error processing action', error);
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, ngx_facebook_1.FacebookService, router_1.Router, rest_service_service_1.RestServiceService, shared_variable_service_1.SharedVariableService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map