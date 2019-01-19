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
var http_1 = require("@angular/common/http");
var userlogin_1 = require("../class/userlogin");
var shared_variable_service_1 = require("./shared-variable.service");
var grid_1 = require("../class/grid");
var RestServiceService = /** @class */ (function () {
    function RestServiceService(http, share) {
        this.http = http;
        this.share = share;
    }
    RestServiceService.prototype.login = function (username, password) {
        var user = new userlogin_1.userlogin(username, password, null);
        return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/login", user, { withCredentials: true });
    };
    RestServiceService.prototype.register = function (username, password, email) {
        return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/register", new userlogin_1.userlogin(username, password, email));
    };
    RestServiceService.prototype.accounts = function () {
        return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/Accounts", { withCredentials: true });
    };
    RestServiceService.prototype.chooseCharacter = function (charName, session_id) {
        return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/choosePg", { "charName": charName, "session_id": session_id }, { withCredentials: true });
    };
    RestServiceService.prototype.logout = function () {
        return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/logout", { withCredentials: true });
    };
    RestServiceService.prototype.getPositions = function () {
        return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/positions", { withCredentials: true });
    };
    RestServiceService.prototype.getPossibleMoves = function (speed) {
        return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/possibleMoves", speed, { withCredentials: true });
    };
    RestServiceService.prototype.facebookLogin = function (accessToken) {
        return this.http.post("http://e0fa5ce2.ngrok.io/DeDManager/facebookLogin", accessToken, { withCredentials: true });
    };
    RestServiceService.prototype.getTurn = function () {
        return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/turn", { withCredentials: true });
    };
    RestServiceService.prototype.nextTurn = function () {
        return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/turn/next", { withCredentials: true });
    };
    RestServiceService.prototype.updatePg = function (label, value) {
        return this.http.put("http://e0fa5ce2.ngrok.io/DeDManager/updatePg", label + ":" + value, { withCredentials: true });
    };
    RestServiceService.prototype.movePg = function (x, y) {
        var g = new grid_1.grid();
        g.x = x;
        g.y = y;
        return this.http.put("http://e0fa5ce2.ngrok.io/DeDManager/movePg", g, { withCredentials: true });
    };
    RestServiceService.prototype.syncroPositions = function () {
        return this.http.get("http://e0fa5ce2.ngrok.io/DeDManager/positions/syncro", { withCredentials: true });
    };
    RestServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, shared_variable_service_1.SharedVariableService])
    ], RestServiceService);
    return RestServiceService;
}());
exports.RestServiceService = RestServiceService;
//# sourceMappingURL=rest-service.service.js.map