"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCityController = exports.createCityController = exports.updateCityController = exports.getCityByProIdController = exports.getCityController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getCityController = async (req, res) => {
    const City = await (0, services_1.getCityService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
};
exports.getCityController = getCityController;
const getCityByProIdController = async (req, res) => {
    const pro_id = req.body.province_id;
    const City = await (0, services_1.getCityByProIdService)(pro_id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
};
exports.getCityByProIdController = getCityByProIdController;
const updateCityController = async (req, res) => {
    const City = await (0, services_1.updateCityService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
};
exports.updateCityController = updateCityController;
const createCityController = async (req, res) => {
    const City = await (0, services_1.createCityService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
};
exports.createCityController = createCityController;
const removeCityController = async (req, res) => {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" });
    }
    const City = await (0, services_1.removeCityService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(City);
};
exports.removeCityController = removeCityController;
