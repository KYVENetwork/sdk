"use strict";
exports.__esModule = true;
exports.createKyveLCDClient = void 0;
var query_1 = require("./registry/v1beta1/query");
var KyveLCDClient = /** @class */ (function () {
    function KyveLCDClient(restEndpoint) {
        this.registry = {
            v1beta1: new query_1.KyveRegistryLCDClient(restEndpoint)
        };
    }
    return KyveLCDClient;
}());
function createKyveLCDClient(restEndpoint) {
    return {
        kyve: new KyveLCDClient(restEndpoint)
    };
}
exports.createKyveLCDClient = createKyveLCDClient;
