"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataForAddCalendarController = exports.removeCalendarController = exports.createCalendarController = exports.getCalendarController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getCalendarController = async (req, res) => {
    const Calendar = await (0, services_1.getCalendarService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
};
exports.getCalendarController = getCalendarController;
const createCalendarController = async (req, res) => {
    const Calendar = await (0, services_1.createCalendarService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
};
exports.createCalendarController = createCalendarController;
const removeCalendarController = async (req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ID ບໍ່ຖືກຕ້ອງ", status: "error" });
    }
    const Calendar = await (0, services_1.removeCalendarService)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
};
exports.removeCalendarController = removeCalendarController;
const getDataForAddCalendarController = async (req, res) => {
    const Calendar = await (0, services_1.getDataForAddCalendarService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(Calendar);
};
exports.getDataForAddCalendarController = getDataForAddCalendarController;
