"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_2 = require("multer");
const path_1 = require("path");
const environment_1 = __importDefault(require("./environment"));
const uploadFile = () => (0, multer_1.default)({
    storage: (0, multer_2.diskStorage)({
        destination: (0, path_1.resolve)(`${environment_1.default.PWD}`),
        filename: (req, file, cb) => {
            const date = Date.now();
            const newFileName = file.originalname.trim().replace(' ', '').replace(',', '');
            cb(null, `${date}-${file.fieldname}-${newFileName}`);
        }
    }),
});
exports.uploadFile = uploadFile;
