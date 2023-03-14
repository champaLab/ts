"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCityService = exports.updateCityService = exports.createCityService = exports.getCityByProIdService = exports.getCityService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getCityService = async () => {
    try {
        console.log("get City service");
        let City = await prisma_1.default.$queryRaw `SELECT ci_id, city_name,  DATE_FORMAT(created_at,'%d-%m-%Y') created_at  FROM tbl_cities`;
        await prisma_1.default.$disconnect();
        return City;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getCityService = getCityService;
const getCityByProIdService = async (province_id) => {
    try {
        console.log("get City service by province id");
        let City = await prisma_1.default.$queryRaw `
        SELECT 
        CI.city_name, CI.ci_id,  DATE_FORMAT(CI.created_at,'%d-%m-%Y') created_at,
        PRO.province_name, PRO.pro_id
        FROM tbl_cities AS CI
        LEFT JOIN tbl_provinces AS PRO
        ON CI.province_id = PRO.pro_id
        WHERE CI.province_id = ${province_id}
        `;
        await prisma_1.default.$disconnect();
        return City;
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.getCityByProIdService = getCityByProIdService;
const createCityService = async (data) => {
    try {
        console.log("==================== create City  ============================");
        let { city_name, created_by, province_id } = data;
        let created_at = new Date();
        console.log(data);
        const check = await prisma_1.default.tbl_cities.findMany({
            where: {
                city_name: city_name,
                province_id: province_id
            },
        });
        console.log("==================== check city ============================");
        console.log(check);
        if (check.length > 0) {
            await prisma_1.default.$disconnect();
            return { message: "ຂໍ້ມູນເມືອງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" };
        }
        const City = await prisma_1.default.tbl_cities.create({
            data: {
                city_name,
                created_at,
                created_by,
                province_id,
            }
        });
        console.log("City create ", City);
        await prisma_1.default.$disconnect();
        return { message: "ເພີ່ມຂໍ້ມູນເມືອງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        process.exit(1);
    }
};
exports.createCityService = createCityService;
const updateCityService = async (data) => {
    try {
        console.log("==================== update City  ============================");
        let { city_name, ci_id, created_by, province_id } = data;
        let updated_at = new Date();
        const check = await prisma_1.default.tbl_cities.findFirst({
            where: { city_name: city_name, NOT: { ci_id: ci_id } },
        });
        console.log("============== check ==================");
        console.log("check ");
        if (check) {
            await prisma_1.default.$disconnect();
            return { message: "ຂໍ້ມູນເມືອງນີ້ ມີໃນລະບົບແລ້ວ", status: "error" };
        }
        if (typeof ci_id != "number") {
            await prisma_1.default.$disconnect();
            return { message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" };
        }
        var upsert = await prisma_1.default.tbl_cities.update({
            where: { ci_id: ci_id },
            data: { city_name, updated_at, updated_by: created_by, province_id }
        });
        console.log("update  City  ", upsert);
        await prisma_1.default.$disconnect();
        console.log("==================== remove City  ============================");
        await prisma_1.default.$disconnect();
        return { message: "ອັບເດດຂໍ້ມູນເມືອງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ຜິດພາດ ລອງອີກຄັ້ງ", status: "error" };
    }
};
exports.updateCityService = updateCityService;
const removeCityService = async (ci_id) => {
    try {
        console.log("==================== remove City  ============================");
        const CityType = await prisma_1.default.tbl_cities.delete({
            where: { ci_id },
        });
        console.log(CityType);
        console.log("==================== remove City  ============================");
        await prisma_1.default.$disconnect();
        return { message: "ລົບຂໍ້ມູນເມືອງ ສຳເລັດແລ້ວ", status: "success" };
    }
    catch (e) {
        console.log(e);
        await prisma_1.default.$disconnect();
        return { message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" };
    }
};
exports.removeCityService = removeCityService;
