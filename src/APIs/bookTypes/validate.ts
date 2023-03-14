import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

export const validateSchema = [
    check('title')
        .trim()
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ໝວດໝູ່"),
    check('created_by')
        .not().isEmpty()
        .trim()
        .withMessage('ກະລຸນາເພີ່ມ ID ຂອງຜູ້ເພີ່ມ'),
    check('created_at')
        .not().isEmpty()
        .trim()
        .withMessage("ກະລຸນາເພີ່ມເວລາການບັນທຶກຂໍ້ມູນ"),

]

export const validateResults = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }
    next();
}


