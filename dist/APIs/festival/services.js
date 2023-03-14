"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFestivalService = exports.createFestivalService = exports.getFestivalService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getFestivalService = async () => {
    try {
        console.log("get Festival service");
        let Festival = await prisma_1.default.$queryRaw `
            SELECT  DATE_FORMAT(created_at,'%d-%m-%Y') created_at,  fe_id, festival_name
            FROM tbl_festival 
        `;
        await prisma_1.default.$disconnect();
        return Festival;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getFestivalService = getFestivalService;
const createFestivalService = async (data) => {
    try {
        console.log("==================== create Festival  ============================");
        const created_at = new Date(data.created_at);
        const festival_name = data.festival_name;
        const created_by = Number(data.created_by);
        const checkFestival = await prisma_1.default.tbl_festival.findFirst({ where: { festival_name: festival_name } });
        console.log(checkFestival);
        console.log("======================= check Festival =====================================");
        if (checkFestival) {
            await prisma_1.default.$disconnect();
            return { message: "ລາຍການນີ້ມີໃນລະບົບແລ້ວ", status: "error", };
        }
        const festival = await prisma_1.default.tbl_festival.create({
            data: {
                festival_name,
                created_by,
                created_at,
            }
        });
        console.log("festival create ", festival);
        await prisma_1.default.$disconnect();
        return { message: "ເພີ່ມຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success", };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.createFestivalService = createFestivalService;
const removeFestivalService = async (id) => {
    try {
        console.log("==================== remove festival  ============================");
        const festival = await prisma_1.default.tbl_festival.delete({ where: { fe_id: id }, });
        console.log(festival);
        console.log("==================== remove festival  ============================");
        await prisma_1.default.$disconnect();
        return { message: "ລົບຂໍ້ມູນ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
};
exports.removeFestivalService = removeFestivalService;
