"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var header_change_service_1 = require("./header-change.service");
describe('HeaderChangeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [header_change_service_1.HeaderChangeService]
        });
    });
    it('should be created', testing_1.inject([header_change_service_1.HeaderChangeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=header-change.service.spec.js.map