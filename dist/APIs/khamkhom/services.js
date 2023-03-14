"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomKhamkhomService = exports.deleteKhamkhomService = exports.updateKhamkhomService = exports.getKhamkhomService = exports.checkKhamkhomService = exports.getKhamkhomServiceByUserId = exports.createKhamkhomService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const date = (0, dayjs_1.default)(new Date()).format();
// const date = dayjs(new Date()).tz('Asia/Bangkok').format()
const createKhamkhomService = async (title, created_by) => {
    try {
        console.log("date ", date);
        let result = await prisma_1.default.tbl_khamkhom.create({
            data: { title: title, created_at: date, created_by }
        });
        await prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.createKhamkhomService = createKhamkhomService;
const getKhamkhomServiceByUserId = async (created_by) => {
    try {
        let result = await prisma_1.default.tbl_khamkhom.findMany({
            where: { created_by }
        });
        await prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getKhamkhomServiceByUserId = getKhamkhomServiceByUserId;
const checkKhamkhomService = async (title) => {
    try {
        let check = await prisma_1.default.tbl_khamkhom.findUnique({
            where: { title }
        });
        await prisma_1.default.$disconnect();
        return check;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.checkKhamkhomService = checkKhamkhomService;
const getKhamkhomService = async () => {
    try {
        let check = await prisma_1.default.tbl_khamkhom.findMany({});
        await prisma_1.default.$disconnect();
        return check;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getKhamkhomService = getKhamkhomService;
const updateKhamkhomService = async (id, title) => {
    try {
        let result = await prisma_1.default.tbl_khamkhom.update({
            where: { id },
            data: { title }
        });
        await prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return null;
    }
};
exports.updateKhamkhomService = updateKhamkhomService;
const deleteKhamkhomService = async (id) => {
    try {
        console.log("delete khamkhom ", typeof id, id);
        let result = await prisma_1.default.tbl_khamkhom.delete({
            where: { id }
        });
        console.log(result);
        await prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return null;
    }
};
exports.deleteKhamkhomService = deleteKhamkhomService;
const randomKhamkhomService = async () => {
    try {
        let result = await prisma_1.default.$queryRaw `
        SELECT K.title, U.name FROM tbl_khamkhom AS K
        LEFT JOIN tbl_users AS U 
        ON U.u_id = K.created_by 
        `;
        await prisma_1.default.$disconnect();
        return result;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return null;
    }
};
exports.randomKhamkhomService = randomKhamkhomService;
