"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var cors = require('cors');
// Middleware (if any), e.g., for parsing request bodies
app.use(express_1.default.json());
app.use(cors());
// Set routes
app.use('/', mainRoutes_1.default);
// Export the app for serverless function use
exports.default = app;
