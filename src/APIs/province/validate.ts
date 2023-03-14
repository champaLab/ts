import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

export const validateSchema = [
    check('province_name')
        .not().isEmpty()
        .withMessage("ກະລຸນາເພີ່ມຊື່ແຂວງ"),
    check('created_by')
        .not().isEmpty()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ'),
]


export const validateResults = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }
    next();
}


