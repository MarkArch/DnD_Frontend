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
var home_component_1 = require("./home/home.component");
var grid_component_1 = require("./grid/grid.component");
var diary_component_1 = require("./diary/diary.component");
var sheet_component_1 = require("./sheet/sheet.component");
var dungeon_component_1 = require("./dungeon/dungeon.component");
var routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        component: home_component_1.HomeComponent,
    },
    {
        path: 'grid',
        component: grid_component_1.GridComponent,
    },
    {
        path: 'diary',
        component: diary_component_1.DiaryComponent,
    },
    {
        path: 'sheet',
        component: sheet_component_1.SheetComponent,
    },
    {
        path:'dungeon',
        component:dungeon_component_1.DungeonComponent,
    }
];
var MainRoutingModule = /** @class */ (function () {
    function MainRoutingModule() {
    }
    MainRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], MainRoutingModule);
    return MainRoutingModule;
}());
exports.MainRoutingModule = MainRoutingModule;
//# sourceMappingURL=main-routing.module.js.map