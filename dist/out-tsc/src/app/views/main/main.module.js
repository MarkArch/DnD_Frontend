"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var tabs_1 = require("ngx-bootstrap/tabs");
var common_1 = require("@angular/common");
var tooltip_1 = require("ngx-bootstrap/tooltip");
var ckeditor5_angular_1 = require("@ckeditor/ckeditor5-angular");
var home_component_1 = require("./home/home.component");
var main_routing_module_1 = require("./main-routing.module");
var grid_component_1 = require("./grid/grid.component");
var sheet_component_1 = require("./sheet/sheet.component");
var diary_component_1 = require("./diary/diary.component");
var MainModule = /** @class */ (function () {
    function MainModule() {
    }
    MainModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                main_routing_module_1.MainRoutingModule,
                common_1.CommonModule,
                tabs_1.TabsModule.forRoot(),
                tooltip_1.TooltipModule.forRoot(),
                ckeditor5_angular_1.CKEditorModule
            ],
            declarations: [
                home_component_1.HomeComponent,
                grid_component_1.GridComponent, sheet_component_1.SheetComponent, diary_component_1.DiaryComponent
            ]
        })
    ], MainModule);
    return MainModule;
}());
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map