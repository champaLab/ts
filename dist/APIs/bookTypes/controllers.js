"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBookTypeController = exports.createBookTypeController = exports.getBookTypeController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const getBookTypeController = async (req, res) => {
    const book = await (0, services_1.getBookTypesService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.getBookTypeController = getBookTypeController;
const createBookTypeController = async (req, res) => {
    if (!req.file) {
        return res.json({ status: "error", message: "ກະລຸນາອັບໂຫຼດ ໄອຄອນ" });
    }
    const book = await (0, services_1.createBookTypesService)(req.body, req.file.path);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.createBookTypeController = createBookTypeController;
const removeBookTypeController = async (req, res) => {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Id ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ", status: "error" });
    }
    const book = await (0, services_1.removeBookTypesService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.removeBookTypeController = removeBookTypeController;
