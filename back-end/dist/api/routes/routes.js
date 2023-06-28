"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ARoutes = /** @class */ (function () {
    function ARoutes() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    return ARoutes;
}());
exports.default = ARoutes;
