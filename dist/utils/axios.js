"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const axios_1 = __importDefault(require("axios"));
const environment_1 = __importDefault(require("./environment"));
const url = environment_1.default.LINE_NOTIFY_URL || "https://notify-api.line.me/api/notify";
const token = environment_1.default.LINE_NOTIFY_TOKEN || "ReIUNk11L875WmEb4MIANGjYfpUHlNxOfCstC3XkQV1";
if (environment_1.default.NODE_ENV === 'development') {
    const http = new https_1.default.Agent({
        rejectUnauthorized: false,
    });
    // @ts-ignore
    axios_1.default.defaults.http = http;
}
const instance = axios_1.default.create({
    baseURL: url
});
instance.interceptors.request.use(async (config) => {
    // @ts-ignore
    config.headers = {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}`
    };
    return config;
});
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log('axios error: ', error);
    return Promise.reject(error);
});
exports.default = instance;
