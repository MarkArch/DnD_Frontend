"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var shared_variable_service_1 = require("./shared-variable.service");
describe('SharedVariableService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [shared_variable_service_1.SharedVariableService]
        });
    });
    it('should be created', testing_1.inject([shared_variable_service_1.SharedVariableService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=shared-variable.service.spec.js.map