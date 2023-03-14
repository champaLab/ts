"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validateSchema = [
    (0, express_validator_1.check)('title')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຄຳຄົມ"),
    (0, express_validator_1.check)('created_by')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຜູ້ບັນທຶກ"),
];
const validateResults = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    next();
};
exports.validateResults = validateResults;
