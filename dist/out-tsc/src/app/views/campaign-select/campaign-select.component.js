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
var modal_1 = require("ngx-bootstrap/modal");
var shared_variable_service_1 = require("../../shared/shared-variable.service");
var sessionEnum_1 = require("../../class/sessionEnum");
var rest_service_service_1 = require("../../shared/rest-service.service");
var CampaignSelectComponent = /** @class */ (function () {
    function CampaignSelectComponent(route, router, modalService, shared, service) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.modalService = modalService;
        this.shared = shared;
        this.service = service;
        this.headTitle = ' D&D WebApp';
        this.accounts = [];
        this.currentAccount = [];
        this.sessions = [];
        this.service.accounts().subscribe(function (res) {
            _this.accounts = res;
            console.log(res);
            _this.onSessionsInitializer();
        }, function (err) { return _this.router.navigate(['/login']); });
    }
    CampaignSelectComponent.prototype.ngOnInit = function () {
    };
    CampaignSelectComponent.prototype.onSessionsInitializer = function () {
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            var session = new sessionEnum_1.sessionEnum(account.session_id, account.session_master, account.session_name);
            this.sessions.push(session);
        }
        console.log(this.sessions);
        for (var i = 0; i < this.sessions.length - 1; i++) {
            if (this.sessions[i].session_id == this.sessions[i + 1].session_id) {
                this.sessions.splice(i, 1);
                i = i - 1;
            }
        }
    };
    CampaignSelectComponent.prototype.onSelectCharacter = function (charName, session_id) {
        var _this = this;
        console.log(charName);
        console.log(session_id);
        this.service.chooseCharacter(charName, session_id).subscribe(function (res) {
            _this.shared.character = res;
            _this.router.navigate(['/dashboard']);
        });
    };
    CampaignSelectComponent.prototype.openModal = function (template, session_id) {
        this.currentAccount = [];
        for (var _i = 0, _a = this.accounts; _i < _a.length; _i++) {
            var account = _a[_i];
            if (account.session_id == session_id) {
                this.currentAccount.push(account);
            }
        }
        this.modalRef = this.modalService.show(template);
    };
    CampaignSelectComponent.prototype.onNewSession = function () {
        console.log("New session dialog");
    };
    CampaignSelectComponent.prototype.onNewCharacter = function () {
        console.log("New character sheet");
    };
    CampaignSelectComponent.prototype.ngOnDestroy = function () {
        if (this.modalRef) {
            this.modalRef.hide();
        }
    };
    CampaignSelectComponent = __decorate([
        core_1.Component({
            selector: 'app-campaign-select',
            templateUrl: './campaign-select.component.html',
            styleUrls: ['./campaign-select.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, modal_1.BsModalService, shared_variable_service_1.SharedVariableService, rest_service_service_1.RestServiceService])
    ], CampaignSelectComponent);
    return CampaignSelectComponent;
}());
exports.CampaignSelectComponent = CampaignSelectComponent;
//# sourceMappingURL=campaign-select.component.js.map