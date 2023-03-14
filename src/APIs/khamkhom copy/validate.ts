import { check, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";

export const validateSchema = [
    check('title')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຄຳຄົມ"),
    check('created_by')
        .not().isEmpty()
        .withMessage("ກະລຸນາປ້ອນຜູ້ບັນທຶກ"),
]

export const validateResults = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() })
    }
    next();
}


