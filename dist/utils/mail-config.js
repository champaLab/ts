"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = __importDefault(require("./environment"));
const mail_config = {
    host: environment_1.default.MAIL_HOST,
    port: environment_1.default.MAIL_PORT,
    secure: true,
    auth: {
        user: environment_1.default.AUTH_USER,
        pass: environment_1.default.AUTH_PASS
    }
};
exports.default = mail_config;
