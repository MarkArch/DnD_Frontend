"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Import Containers
var containers_1 = require("./containers");
var _404_component_1 = require("./views/error/404.component");
var _500_component_1 = require("./views/error/500.component");
var login_component_1 = require("./views/login/login.component");
var register_component_1 = require("./views/register/register.component");
var campaign_select_component_1 = require("./views/campaign-select/campaign-select.component");
exports.routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '500',
        component: _500_component_1.P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        data: {
            title: 'Register Page'
        }
    },
    {
        path: 'campaign',
        component: campaign_select_component_1.CampaignSelectComponent,
        data: {
            title: 'Campaign page'
        }
    },
    {
        path: '',
        component: containers_1.DefaultLayoutComponent,
        data: {
            title: 'dashboard'
        },
        children: [
            {
                path: '',
                loadChildren: './views/main/main.module#MainModule'
            },
        ]
    },
    {
        path: '**',
        component: _404_component_1.P404Component,
        data: {
            title: 'Page 404'
        }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map