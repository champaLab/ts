"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProvinceController = exports.createProvinceController = exports.updateProvinceController = exports.getProvinceController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getProvinceController = async (req, res) => {
    const Province = await (0, services_1.getProvinceService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
};
exports.getProvinceController = getProvinceController;
const updateProvinceController = async (req, res) => {
    const Province = await (0, services_1.updateProvinceService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
};
exports.updateProvinceController = updateProvinceController;
const createProvinceController = async (req, res) => {
    const Province = await (0, services_1.createProvinceService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
};
exports.createProvinceController = createProvinceController;
const removeProvinceController = async (req, res) => {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" });
    }
    const Province = await (0, services_1.removeProvinceService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(Province);
};
exports.removeProvinceController = removeProvinceController;
