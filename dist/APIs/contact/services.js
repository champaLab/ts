"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getContactService = async () => {
    try {
        let content = await prisma_1.default.$queryRaw ` SELECT * FROM tbl_contact order by id DESC limit 1 `;
        await prisma_1.default.$disconnect();
        return content;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getContactService = getContactService;
