"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import fs from 'fs-extra'
const body_parser_1 = __importDefault(require("body-parser"));
const environment_1 = __importDefault(require("./utils/environment"));
const APIs_1 = __importDefault(require("./APIs"));
// import { createStream } from 'rotating-file-stream'
const morgan_1 = __importDefault(require("morgan"));
// import dayjs from 'dayjs'
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('combined'));
app.use((req, res, next) => {
    console.log(req.method, req.path, req.body);
    next();
});
const uptime = (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };
    try {
        return res.json(healthCheck);
    }
    catch (error) {
        healthCheck.message = `${error}`;
        return res.json(healthCheck);
    }
};
app.get(`${environment_1.default.BASE_PATH}`, uptime);
app.get(`/`, uptime);
app.use(`${environment_1.default.BASE_PATH}`, APIs_1.default);
const listener = app.listen(environment_1.default.PORT, environment_1.default.HOST, () => {
    if (listener != null) {
        const server = listener.address();
        const endPoint = `${server.address}:${server.port}`;
        console.log(`API Running on : ${endPoint + environment_1.default.BASE_PATH}`);
        console.log("BASE_PATH ", environment_1.default.BASE_PATH);
    }
});
