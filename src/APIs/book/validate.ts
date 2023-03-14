import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

export const validateSchema = [
    check('title')
        .not().isEmpty()
        .withMessage("ກະລຸນາເພີ່ມຫົວຂໍ້"),
    check('content')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມເນື້ອຫາ'),
    check('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ'),
    check('book_type_id')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກໝວດໝູ່ໜັງສື')
        .isNumeric()
        .withMessage("ໝວດໝູ່ໜັງສື ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
]

export const validateSearchSchema = [
    check('key')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຄຳຄົ້ນຫາ"),
]


export const validateResults = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }
    next();
}


