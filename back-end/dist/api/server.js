"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
var Server = /** @class */ (function () {
    function Server(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.setRoutes();
    }
    Server.prototype.setRoutes = function () {
        this.app.use('/', mainRoutes_1.default);
        // Add more routes here.
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server is running at http://localhost:".concat(_this.port));
        });
    };
    return Server;
}());
exports.default = Server;