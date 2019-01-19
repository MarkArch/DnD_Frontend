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
var ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
var rest_service_service_1 = require("../../../shared/rest-service.service");
var shared_variable_service_1 = require("../../../shared/shared-variable.service");
var DiaryComponent = /** @class */ (function () {
    function DiaryComponent(service, shared) {
        this.service = service;
        this.shared = shared;
        this.character = this.shared.character.diary;
        this.editor = ClassicEditor;
        this.model = {
            editorData: this.character
        };
        this.config = {
            alignment: {
                options: ['left', 'right']
            },
            toolbar: [
                'heading', '|', 'bulletedList', 'numberedList', 'alignment', 'undo', 'redo'
            ]
        };
    }
    DiaryComponent.prototype.ngOnInit = function () {
    };
    DiaryComponent.prototype.onChangeAttribute = function (char, value) {
        this.service.updatePg(char, value).subscribe();
    };
    DiaryComponent.prototype.onResetDiary = function () {
        var str = "";
        this.onChangeAttribute('diary', str);
    };
    DiaryComponent.prototype.onReady = function (editor) {
        editor.ui.view.editable.element.parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.view.editable.element);
    };
    DiaryComponent = __decorate([
        core_1.Component({
            selector: 'app-diary',
            templateUrl: './diary.component.html',
            styleUrls: ['./diary.component.scss']
        }),
        __metadata("design:paramtypes", [rest_service_service_1.RestServiceService, shared_variable_service_1.SharedVariableService])
    ], DiaryComponent);
    return DiaryComponent;
}());
exports.DiaryComponent = DiaryComponent;
//# sourceMappingURL=diary.component.js.map