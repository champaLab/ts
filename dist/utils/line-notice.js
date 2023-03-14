"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineNotify = void 0;
const axios_1 = __importDefault(require("./axios"));
const lineNotify = async (message) => {
    try {
        const res = await axios_1.default.post('/', { message });
    }
    catch (error) {
        console.log("=================================================", error);
    }
};
exports.lineNotify = lineNotify;
