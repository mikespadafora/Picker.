"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./api/server"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var server = new server_1.default(3000);
if (server instanceof server_1.default) {
    server.start();
}
