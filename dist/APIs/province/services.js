"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProvinceService = exports.updateProvinceService = exports.createProvinceService = exports.getProvinceService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getProvinceService = async () => {
    try {
        console.log("get province service");
        let provinces = await prisma_1.default.$queryRaw `SELECT pro_id, province_name,  DATE_FORMAT(created_at,'%d-%m-%Y') created_at  FROM tbl_provinces`;
        await prisma_1.default.$disconnect();
        let provinceList = [];
        if (provinces.length > 0) {
            provinces.map((item) => {
                provinceList.push({
                    label: item.province_name,
                    value: Number(item.pro_id),
                    pro_id: Number(item.pro_id),
                    created_at: item.created_at,
                    province_name: item.province_name,
                });
            });
        }
        return provinceList;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getProvinceService = getProvinceService;
const createProvinceService = async (data) => {
    try {
        console.log("==================== create Province  ============================");
        let { created_by, province_name } = data;
        let created_at = new Date();
        const check = await prisma_1.default.tbl_provinces.findFirst({ where: { province_name: province_name }, });
        if (check) {
            await prisma_1.default.$disconnect();
            return { message: "ຂໍ້ມູນແຂວງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" };
        }
        const Province = await prisma_1.default.tbl_provinces.create({
            data: {
                province_name,
                created_at,
                created_by,
            }
        });
        console.log("Province create ", Province);
        await prisma_1.default.$disconnect();
        return { message: "ເພີ່ມຂໍ້ມູນແຂວງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.createProvinceService = createProvinceService;
const updateProvinceService = async (data) => {
    try {
        console.log("==================== update Province  ============================");
        let { province_name, pro_id, created_by } = data;
        let updated_at = new Date();
        const check = await prisma_1.default.tbl_provinces.findFirst({
            where: { province_name: province_name, NOT: { pro_id: pro_id } },
        });
        console.log("============== check ==================");
        console.log("check ", check);
        if (check) {
            await prisma_1.default.$disconnect();
            return { message: "ຂໍ້ມູນແຂວງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" };
        }
        if (typeof pro_id != "number") {
            await prisma_1.default.$disconnect();
            return { message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" };
        }
        var upsert = await prisma_1.default.tbl_provinces.update({
            where: { pro_id: pro_id },
            data: { province_name, updated_at, updated_by: created_by }
        });
        console.log("update  Province  ", upsert);
        await prisma_1.default.$disconnect();
        console.log("==================== remove Province  ============================");
        await prisma_1.default.$disconnect();
        return { message: "ອັບເດດຂໍ້ມູນແຂວງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ຜິດພາດ ລອງອີກຄັ້ງ", status: "error" };
    }
};
exports.updateProvinceService = updateProvinceService;
const removeProvinceService = async (pro_id) => {
    try {
        console.log("==================== remove Province  ============================");
        const ProvinceType = await prisma_1.default.tbl_provinces.delete({
            where: { pro_id },
        });
        const city = await prisma_1.default.tbl_cities.deleteMany({
            where: { province_id: pro_id },
        });
        console.log(ProvinceType);
        console.log("==================== remove Province  ============================");
        await prisma_1.default.$disconnect();
        return { message: "ລົບແຂວງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
};
exports.removeProvinceService = removeProvinceService;
