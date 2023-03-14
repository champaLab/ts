"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookSearchController = exports.getBookByBookTypeController = exports.removeBookController = exports.createBookController = exports.updateBookController = exports.getMyBookController = exports.adminApproveBookController = exports.editorApproveBookController = exports.adminGetNewBookController = exports.editorGetNewBookController = void 0;
const services_1 = require("./services");
const http_status_codes_1 = require("http-status-codes");
const editorGetNewBookController = async (req, res) => {
    const user = req.body.user;
    const book = await (0, services_1.editorGetNewBookService)(user);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.editorGetNewBookController = editorGetNewBookController;
const adminGetNewBookController = async (req, res) => {
    const book = await (0, services_1.adminGetNewBookService)();
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.adminGetNewBookController = adminGetNewBookController;
const editorApproveBookController = async (req, res) => {
    const book = await (0, services_1.editorApproveBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.editorApproveBookController = editorApproveBookController;
const adminApproveBookController = async (req, res) => {
    const book = await (0, services_1.adminApproveBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.adminApproveBookController = adminApproveBookController;
const getMyBookController = async (req, res) => {
    const user = req.body.user;
    const book = await (0, services_1.getMyBookService)(user);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.getMyBookController = getMyBookController;
const updateBookController = async (req, res) => {
    const book = await (0, services_1.updateBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.updateBookController = updateBookController;
const createBookController = async (req, res) => {
    const book = await (0, services_1.createBookService)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(book);
};
exports.createBookController = createBookController;
const removeBookController = async (req, res) => {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" });
    }
    const Book = await (0, services_1.removeBookService)(Number(id));
    return res.status(http_status_codes_1.StatusCodes.OK).json(Book);
};
exports.removeBookController = removeBookController;
const getBookByBookTypeController = async (req, res) => {
    const id = Number(req.params.id);
    if (!id || typeof id !== 'number') {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "ບໍ່ສາມາດລົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍໄດ້", status: "error" });
    }
    const Book = await (0, services_1.getBookByTypeBookService)(id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Book);
};
exports.getBookByBookTypeController = getBookByBookTypeController;
const getBookSearchController = async (req, res) => {
    const key = req.body.key;
    const column = `${req.body.column}`.trim();
    const Book = await (0, services_1.getBookSearchService)(key, column);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Book);
};
exports.getBookSearchController = getBookSearchController;
