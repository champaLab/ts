"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateSchema = void 0;
const express_validator_1 = require("express-validator");
exports.validateSchema = [
    (0, express_validator_1.check)('city_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ເມືອງ")
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('province_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ແຂວງ")
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ')
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('festival_type_id')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກປະເພດບຸນ')
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('date_festival')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ຈັດງານ'),
    // .not().isDate()
    // .withMessage("ວັນທີ່ຈັດງານ ຕ້ອງເປັນເວລາເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('created_at')
        .not().isEmpty()
        // .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ')
        // .not().isDate()
        .withMessage("ຕ້ອງເປັນເວລາເທົ່ານັ້ນ"),
    (0, express_validator_1.check)('temple_name')
        .not().isEmpty()
        .withMessage('ກະລຸນາລຸບຸຊື່ວັດ'),
    (0, express_validator_1.check)('village')
        .not().isEmpty()
        .withMessage('ກະລຸນາລຸບຸຊື່ບ້ານ'),
    (0, express_validator_1.check)('tel')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ໝາຍເລກໂທລະສັບ')
        .isNumeric()
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ")
        .isLength({ min: 9, max: 10 })
        .withMessage('Whatໝາຍເລກໂທລະສັບ ຕ້ອງເປັນຕົວເລກ 10 ໂຕເທົ່ານັ້ນ'),
    (0, express_validator_1.check)('whatsapp')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ໝາຍເລກ WhatsApp')
        .isNumeric()
        .withMessage("WhatsApp ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ")
        .isLength({ min: 10, max: 10 })
        .withMessage('WhatsApp ຕ້ອງເປັນຕົວເລກ 10 ໂຕເທົ່ານັ້ນ'),
];
const validateResults = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }
    next();
};
exports.validateResults = validateResults;
