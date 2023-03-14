"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("./services");
const getContactController = async (req, res) => {
    const contact = await (0, services_1.getContactService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(contact);
};
exports.getContactController = getContactController;
