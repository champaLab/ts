"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validateSchema = [
    (0, express_validator_1.check)('festival_name')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ບຸນ"),
    (0, express_validator_1.check)('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ')
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('created_at')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ'),
];
const validateResults = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    next();
};
exports.validateResults = validateResults;
