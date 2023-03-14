import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";



export const validateSchema = [
    check('festival_name')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ບຸນ"),
    check('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ')
        .isNumeric()
        .withMessage("ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check('created_at')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ'),
]


export const validateResults = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() })
    }
    next();
}


