import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

export const validateSchema = [
    check('city_name')
        .not().isEmpty()
        .withMessage("ກະລຸນາເພີ່ມຊື່ແຂວງ"),
    check('province_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ແຂວງ")
        .isNumeric()
        .withMessage("ລະຫັດແຂວງຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ')
        .isNumeric()
        .withMessage("ລະຫັດແຂວງຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
]

export const validateGetCitiesSchema = [
    check('province_id')
        .not().isEmpty()
        .withMessage("ກະລຸນາເລືອກ ແຂວງ")
        .isNumeric()
        .withMessage("ID ແຂວງ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ "),

]


export const validateResults = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }
    next();
}


