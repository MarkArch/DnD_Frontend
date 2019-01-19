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
var animations_1 = require("@angular/animations");
var shared_variable_service_1 = require("../../../shared/shared-variable.service");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var router_1 = require("@angular/router");
var rest_service_service_1 = require("../../../shared/rest-service.service");
var grid_1 = require("../../../class/grid");
// import { ChangeDetectorRef } from '@angular/core';
var GridComponent = /** @class */ (function () {
    function GridComponent(shared, cookie, router, service) {
        var _this = this;
        this.shared = shared;
        this.cookie = cookie;
        this.router = router;
        this.service = service;
        this.turn = 0;
        this.grid = [];
        this.possibleMoves = [];
        this.charecterPosition = new grid_1.grid();
        this.gridSettingVisible = false;
        this.tooltip = [];
        this.gridDimension = 3;
        this.x = 15;
        this.y = 15;
        this.yAxis = new Array(this.y);
        this.xAxis = new Array(this.x);
        this.diceArray = [{ name: 'd20.svg', type: 'd20', number: 1, value: 0 },
            { name: 'd12.svg', type: 'd12', number: 1, value: 0 },
            { name: 'd10.svg', type: 'd10', number: 1, value: 0 },
            { name: 'd8.svg', type: 'd8', number: 1, value: 0 },
            { name: 'd6.svg', type: 'd6', number: 1, value: 0 },
            { name: 'd4.svg', type: 'd4', number: 1, value: 0 },
            { name: 'dp.svg', type: 'd%', number: 1, value: 0 }];
        this.charStats = ['For', 'Des', 'Cos', 'Int', 'Sag', 'Car'];
        this.stats = [];
        if (this.shared.character == null) {
            this.service.chooseCharacter("", 0).subscribe(function (res) {
                _this.shared.character = res;
                _this.character = _this.shared.character;
                _this.service.getPositions().subscribe(function (res) {
                    _this.grid = res;
                    for (var _i = 0, _a = _this.grid; _i < _a.length; _i++) {
                        var position = _a[_i];
                        if (position.charName == _this.character.charName) {
                            _this.charecterPosition.charName = position.charName;
                            _this.charecterPosition.x = position.x;
                            _this.charecterPosition.y = position.y;
                        }
                    }
                    _this.syncroPositions();
                });
                _this.statInitializer();
                _this.service.getTurn().subscribe(function (res) { _this.sessionPlayers = res; _this.sessionPlayers.forEach(function (p) { _this.tooltip.push("Current HP " + (p.current_hp / p.hp * 100).toFixed(2) + "%"); }); });
            }, function (err) { return _this.router.navigate(['/campaign']); });
        }
        else {
            this.character = this.shared.character;
            this.service.getPositions().subscribe(function (res) {
                _this.grid = res;
                for (var _i = 0, _a = _this.grid; _i < _a.length; _i++) {
                    var position = _a[_i];
                    if (position.charName == _this.character.charName) {
                        _this.charecterPosition.charName = position.charName;
                        _this.charecterPosition.x = position.x;
                        _this.charecterPosition.y = position.y;
                    }
                }
            });
            this.statInitializer();
            this.service.getTurn().subscribe(function (res) { _this.sessionPlayers = res; _this.sessionPlayers.forEach(function (p) { _this.tooltip.push("Current HP " + (p.current_hp / p.hp * 100).toFixed(2) + "%"); }); });
        }
    }
    GridComponent.prototype.ngOnInit = function () {
    };
    GridComponent.prototype.onNextTurn = function () {
        var _this = this;
        this.service.nextTurn().subscribe(function (res) {
            _this.turn = res;
            while (_this.turn >= _this.sessionPlayers.length) {
                _this.turn = _this.turn - _this.sessionPlayers.length;
            }
        });
    };
    GridComponent.prototype.syncroPositions = function () {
        var _this = this;
        this.service.syncroPositions().subscribe(function (res) {
            _this.grid = [];
            _this.grid = res;
            for (var _i = 0, _a = _this.grid; _i < _a.length; _i++) {
                var position = _a[_i];
                if (position.charName == _this.character.charName) {
                    _this.charecterPosition.charName = position.charName;
                    _this.charecterPosition.x = position.x;
                    _this.charecterPosition.y = position.y;
                }
            }
            _this.syncroPositions();
        });
    };
    GridComponent.prototype.searchCharacterOnGrid = function (x, y) {
        var _this = this;
        var a = "";
        this.grid.forEach(function (char) {
            if (char.x == x && char.y == y) {
                for (var i in _this.sessionPlayers) {
                    if (_this.sessionPlayers[i].charName == char.charName) {
                        a = i;
                    }
                }
            }
        });
        this.possibleMoves.forEach(function (char) {
            if (char.x == x && char.y == y) {
                a = "P";
            }
        });
        return a;
    };
    GridComponent.prototype.statInitializer = function () {
        this.stats.push({
            name: "Strenght",
            value: this.character.strenght,
            modifier: Math.floor((this.character.strenght - 10) / 2),
            tempValue: this.character.temporary_strenght,
            totValue: Math.floor((this.character.strenght + this.character.temporary_strenght - 10) / 2),
            savingThrow: this.character.savingThrow_strenght
        });
        this.stats.push({
            name: "Constitution",
            value: this.character.constitution,
            modifier: Math.floor((this.character.constitution - 10) / 2),
            tempValue: this.character.temporary_constitution,
            totValue: Math.floor((this.character.constitution + this.character.temporary_constitution - 10) / 2),
            savingThrow: this.character.savingThrow_constitution
        });
        this.stats.push({
            name: "Dexterity",
            value: this.character.dexterity,
            modifier: Math.floor((this.character.dexterity - 10) / 2),
            tempValue: this.character.temporary_dexterity,
            totValue: Math.floor((this.character.dexterity + this.character.temporary_dexterity - 10) / 2),
            savingThrow: this.character.savingThrow_dexterity
        });
        this.stats.push({
            name: "Intelligence",
            value: this.character.intelligence,
            modifier: Math.floor((this.character.intelligence - 10) / 2),
            tempValue: this.character.temporary_intelligence,
            totValue: Math.floor((this.character.intelligence + this.character.temporary_intelligence - 10) / 2),
            savingThrow: this.character.savingThrow_intelligence
        });
        this.stats.push({
            name: "Weasdom",
            value: this.character.weasdom,
            modifier: Math.floor((this.character.weasdom - 10) / 2),
            tempValue: this.character.temporary_weasdom,
            totValue: Math.floor((this.character.weasdom + this.character.temporary_weasdom - 10) / 2),
            savingThrow: this.character.savingThrow_weasdom
        });
        this.stats.push({
            name: "Charisma",
            value: this.character.charisma,
            modifier: Math.floor((this.character.charisma - 10) / 2),
            tempValue: this.character.temporary_charisma,
            totValue: Math.floor((this.character.charisma + this.character.temporary_charisma - 10) / 2),
            savingThrow: this.character.savingThrow_charisma
        });
    };
    GridComponent.prototype.onChangeAttribute = function (char, value) {
        this.service.updatePg(char, value).subscribe();
    };
    GridComponent.prototype.onTempModify = function (i) {
        this.service.updatePg("temporary_" + this.stats[i].name.toLowerCase(), this.stats[i].tempValue.toString()).subscribe();
        this.stats[i].totValue = Math.floor((this.stats[i].value + this.stats[i].tempValue - 10) / 2);
    };
    GridComponent.prototype.onDiceThrow = function (i) {
        var temp = 0;
        switch (i) {
            case 0: {
                for (var k = 0; k < this.diceArray[i].number; k++) {
                    temp += Math.ceil(Math.random() * 20);
                }
                this.diceArray[i].value = temp;
                break;
            }
            case 1: {
                for (var k = 0; k < this.diceArray[i].number; k++) {
                    temp += Math.ceil(Math.random() * 12);
                }
                this.diceArray[i].value = temp;
                break;
            }
            case 2: {
                for (var k = 0; k < this.diceArray[i].number; k++) {
                    temp += Math.ceil(Math.random() * 10);
                }
                this.diceArray[i].value = temp;
                break;
            }
            case 3: {
                for (var k = 0; k < this.diceArray[i].number; k++) {
                    temp += Math.ceil(Math.random() * 8);
                }
                this.diceArray[i].value = temp;
                break;
            }
            case 4: {
                for (var k = 0; k < this.diceArray[i].number; k++) {
                    temp += Math.ceil(Math.random() * 6);
                }
                this.diceArray[i].value = temp;
                break;
            }
            case 5: {
                for (var k = 0; k < this.diceArray[i].number; k++) {
                    temp += Math.ceil(Math.random() * 4);
                }
                this.diceArray[i].value = temp;
                break;
            }
            case 6: {
                for (var k = 0; k < this.diceArray[i].number; k++) {
                    temp += Math.ceil(Math.random() * 100);
                }
                this.diceArray[i].value = temp;
                break;
            }
        }
    };
    GridComponent.prototype.onDiceReset = function (i) {
        switch (i) {
            case 0: {
                this.diceArray[i].value = 0;
                this.diceArray[i].number = 1;
                break;
            }
            case 1: {
                this.diceArray[i].value = 0;
                this.diceArray[i].number = 1;
                break;
            }
            case 2: {
                this.diceArray[i].value = 0;
                this.diceArray[i].number = 1;
                break;
            }
            case 3: {
                this.diceArray[i].value = 0;
                this.diceArray[i].number = 1;
                break;
            }
            case 4: {
                this.diceArray[i].value = 0;
                this.diceArray[i].number = 1;
                break;
            }
            case 5: {
                this.diceArray[i].value = 0;
                this.diceArray[i].number = 1;
                break;
            }
            case 6: {
                this.diceArray[i].value = 0;
                this.diceArray[i].number = 1;
                break;
            }
        }
    };
    GridComponent.prototype.onGridInit = function () {
        this.xAxis = new Array(this.x);
        this.yAxis = new Array(this.y);
    };
    GridComponent.prototype.onShowGridSettings = function () {
        this.gridSettingVisible = !this.gridSettingVisible;
    };
    GridComponent.prototype.onGridClick = function (x, y, cell) {
        var _this = this;
        if (this.charecterPosition.x == x && this.charecterPosition.y == y) {
            this.service.getPossibleMoves(this.character.speed.toString()).subscribe(function (res) { _this.possibleMoves = res; });
        }
        else if ((this.charecterPosition.x != x || this.charecterPosition.y != y) && cell.style.backgroundColor == 'silver') {
            this.service.movePg(x, y).subscribe();
            this.possibleMoves = [];
        }
    };
    GridComponent.prototype.onResetNote = function () {
        var str = "";
        this.onChangeAttribute('note', str);
    };
    GridComponent = __decorate([
        core_1.Component({
            selector: 'app-grid',
            templateUrl: './grid.component.html',
            styleUrls: ['./grid.component.scss'],
            animations: [
                animations_1.trigger('gridAnimation', [
                    animations_1.state('4', animations_1.style({
                        width: '60px',
                        height: '60px',
                        minWidth: '60px',
                        minHeight: '60px'
                    })),
                    animations_1.state('3', animations_1.style({
                        width: '50px',
                        height: '50px',
                        minWidth: '50px',
                        minHeight: '50px'
                    })),
                    animations_1.state('2', animations_1.style({
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        minHeight: '40px'
                    })),
                    animations_1.state('1', animations_1.style({
                        width: '30px',
                        height: '30px',
                        minWidth: '30px',
                        minHeight: '30px'
                    })),
                    animations_1.transition('4 <=> 3', []),
                    animations_1.transition('3 <=> 2', []),
                    animations_1.transition('2 <=> 1', [])
                ])
            ]
        }),
        __metadata("design:paramtypes", [shared_variable_service_1.SharedVariableService, ngx_cookie_service_1.CookieService, router_1.Router, rest_service_service_1.RestServiceService])
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map