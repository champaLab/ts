"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validateSchema = [
    (0, express_validator_1.check)('province_name')
        .not().isEmpty()
        .withMessage("ກະລຸນາເພີ່ມຊື່ແຂວງ"),
    (0, express_validator_1.check)('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ'),
];
const validateResults = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    next();
};
exports.validateResults = validateResults;
