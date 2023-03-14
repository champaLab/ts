"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateGetCitiesSchema = exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validateSchema = [
    (0, express_validator_1.check)('city_name')
        .not().isEmpty()
        .withMessage("ກະລຸນາເພີ່ມຊື່ແຂວງ"),
    (0, express_validator_1.check)('province_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ແຂວງ")
        .isNumeric()
        .withMessage("ລະຫັດແຂວງຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ')
        .isNumeric()
        .withMessage("ລະຫັດແຂວງຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
];
exports.validateGetCitiesSchema = [
    (0, express_validator_1.check)('province_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ແຂວງ")
        .isNumeric()
        .withMessage("ID ແຂວງ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ "),
];
const validateResults = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }
    next();
};
exports.validateResults = validateResults;
