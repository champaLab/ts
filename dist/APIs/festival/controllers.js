"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFestivalController = exports.createFestivalController = exports.getFestivalController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("./services");
const getFestivalController = async (req, res) => {
    const festival = await (0, services_1.getFestivalService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(festival);
};
exports.getFestivalController = getFestivalController;
const createFestivalController = async (req, res) => {
    const festival = await (0, services_1.createFestivalService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(festival);
};
exports.createFestivalController = createFestivalController;
const removeFestivalController = async (req, res) => {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" });
    }
    const festival = await (0, services_1.removeFestivalService)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(festival);
};
exports.removeFestivalController = removeFestivalController;
