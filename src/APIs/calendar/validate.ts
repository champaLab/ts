import { StatusCodes } from 'http-status-codes';
import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";



export const validateSchema = [
    check('city_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ເມືອງ")
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check('province_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ແຂວງ")
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ')
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check('festival_type_id')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກປະເພດບຸນ')
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check('date_festival')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ຈັດງານ'),
    // .not().isDate()
    // .withMessage("ວັນທີ່ຈັດງານ ຕ້ອງເປັນເວລາເທົ່ານັ້ນ"),
    check('created_at')
        .not().isEmpty()
        // .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ')
        // .not().isDate()
        .withMessage("ຕ້ອງເປັນເວລາເທົ່ານັ້ນ"),
    check('temple_name')
        .not().isEmpty()
        .withMessage('ກະລຸນາລຸບຸຊື່ວັດ'),
    check('village')
        .not().isEmpty()
        .withMessage('ກະລຸນາລຸບຸຊື່ບ້ານ'),
    check('tel')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ໝາຍເລກໂທລະສັບ')
        .isNumeric()
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ")
        .isLength({ min: 9, max: 10 })
        .withMessage('Whatໝາຍເລກໂທລະສັບ ຕ້ອງເປັນຕົວເລກ 10 ໂຕເທົ່ານັ້ນ'),
    check('whatsapp')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ໝາຍເລກ WhatsApp')
        .isNumeric()
        .withMessage("WhatsApp ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ")
        .isLength({ min: 10, max: 10 })
        .withMessage('WhatsApp ຕ້ອງເປັນຕົວເລກ 10 ໂຕເທົ່ານັ້ນ'),
]


export const validateResults = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() })
    }
    next();
}


