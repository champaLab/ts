"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validateSchema = [
    (0, express_validator_1.check)('title')
        .trim()
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ໝວດໝູ່"),
    (0, express_validator_1.check)('created_by')
        .not().isEmpty()
        .trim()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ'),
    (0, express_validator_1.check)('created_at')
        .not().isEmpty()
        .trim()
        .withMessage("ກະລຸນາເພີ່ມເວລາການບັນທຶກຂໍ້ມູນ"),
];
const validateResults = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    next();
};
exports.validateResults = validateResults;
