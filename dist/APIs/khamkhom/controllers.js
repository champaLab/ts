"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomKhamkhomController = exports.deleteKhamkhomController = exports.updateKhamkhomController = exports.getKhamkhomControllerByUserId = exports.getKhamkhomController = exports.createKhamkhomController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("./services");
const createKhamkhomController = async (req, res) => {
    const check = await (0, services_1.checkKhamkhomService)(req.body.title);
    if (check) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "ຄຳຄົມນີ້ ມີໃນລະບົບແລ້ວ",
            status: "error"
        });
    }
    await (0, services_1.createKhamkhomService)(req.body.title, req.body.created_by);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "ບັນທຶກສຳເລັດ",
        status: "success"
    });
};
exports.createKhamkhomController = createKhamkhomController;
const getKhamkhomController = async (req, res) => {
    const _all = await (0, services_1.getKhamkhomService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(_all);
};
exports.getKhamkhomController = getKhamkhomController;
const getKhamkhomControllerByUserId = async (req, res) => {
    const id = Number(req.body.user.u_id);
    const role = req.body.user.role;
    if (role === "Admin" || role === "SuperAdmin") {
        const _all = await (0, services_1.getKhamkhomService)();
        return res.status(http_status_codes_1.StatusCodes.OK).json(_all);
    }
    const _all = await (0, services_1.getKhamkhomServiceByUserId)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(_all);
};
exports.getKhamkhomControllerByUserId = getKhamkhomControllerByUserId;
const updateKhamkhomController = async (req, res) => {
    const id = Number(req.body.id);
    const title = req.body.title;
    const _all = await (0, services_1.updateKhamkhomService)(id, title);
    if (!_all) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "ຄຳຄົມນີ້ ບໍ່ສາມາອັບເດດໄດ້",
            status: "error"
        });
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "ອັບເດດຂໍ້ມູນສຳເລັດ",
        status: "success"
    });
};
exports.updateKhamkhomController = updateKhamkhomController;
const deleteKhamkhomController = async (req, res) => {
    const id = Number(req.params.id);
    const _all = await (0, services_1.deleteKhamkhomService)(id);
    if (!_all) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "ຄຳຄົມນີ້ ບໍ່ລົບໄດ້",
            status: "error"
        });
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "ລົບຂໍ້ມູນສຳເລັດ",
        status: "success"
    });
};
exports.deleteKhamkhomController = deleteKhamkhomController;
const randomKhamkhomController = async (req, res) => {
    const khamkhom = await (0, services_1.randomKhamkhomService)();
    if (!khamkhom) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "ຜິດພາດ ລອງອີກຄັ້ງ",
            status: "error"
        });
    }
    const max = khamkhom.length; // day of month
    const index = Math.floor(Math.random() * max);
    let khamkon = khamkhom[index].title;
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: khamkon,
        status: "success"
    });
};
exports.randomKhamkhomController = randomKhamkhomController;
