"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    // cloud_name: environment.CLOUDINARY_NAME,
    // api_key: environment.CLOUDINARY_API_KEY,
    // api_secret: environment.CLOUDINARY_API_SECRET
    cloud_name: 'dud3zvxvh',
    api_key: '452234855618922',
    api_secret: 'ETU3A4UkIcMJislKjosGw35bbGA',
});
exports.default = cloudinary_1.default;
