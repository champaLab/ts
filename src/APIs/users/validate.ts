import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validateUser = [
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້")
        .isLength({ min: 3 })
        .withMessage("ຊື່ຜູ້ໃຊ້ຄວນມີຢ່າງໜ້ອຍ 3 ໂຕ")
        .matches(/^[A-Za-z0-9 .,'!&]+$/),
    // .withMessage("ບໍ່ຄວນມີຕົວອັກສອນພິເສດ"),
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນອີເມວ")
        .isEmail()
        .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນລະຫັດຜ່ານ")
        .isLength({ min: 8 })
        .withMessage("ລະຫັດຜ່ານຄວນມີຢ່າງໜ້ອຍ 8 ໂຕ")
        .custom(async (password: string, { req }) => {
            if (req.body.confirm_password !== password) {
                throw new Error('ລະຫັດຜ່ານ ບໍ່ກົງກັນ')
            }
        }),
    check("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
];

export const validateUserRegister = [
    check("name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້")
        .isLength({ min: 3 })
        .withMessage("ຊື່ຜູ້ໃຊ້ຄວນມີຢ່າງໜ້ອຍ 3 ໂຕ"),
    // .matches(/^[A-Za-z0-9 .,'!&]+$/),
    // .withMessage("ບໍ່ຄວນມີຕົວອັກສອນພິເສດ"),
    // check("email")
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage("ກະລຸນາປ້ອນອີເມວ")
    //     .isEmail()
    //     .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
    check("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ whatsapp")
        .isLength({ min: 13 })
        .withMessage("whatsapp ຄວນມີຕົວເລກ 13 ໂຕ"),
    check('created_at')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ')
];

export const validateUserUpdateEmail = [
    check("u_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ID"),
    check('email')
        .not().isEmpty()
        .withMessage('ກະລຸນາປ້ອນ Email'),
    check('created_at')
        .not().isEmpty()
        .withMessage('ກະລຸນາເລືອກວັນທີ່ເພີ່ມຂໍ້ມູນ'),
];

export const validateUserUpdate = [
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້")
        .isLength({ min: 3 })
        .withMessage("ຊື່ຜູ້ໃຊ້ຄວນມີຢ່າງໜ້ອຍ 3 ໂຕ"),
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນອີເມວ")
        .isEmail()
        .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
    check("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
];
export const validateUserSendMail = [
    check("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນອີເມວ")
        .isEmail()
        .withMessage("ອີເມວຕ້ອງຖືກຕາມຮູບແບບເຊັ່ນ example@email.com"),
];

export const validateLogin = [
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ WhatsApp Or Email"),
];

export const validateVerify = [
    check("receive")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ WhatsApp Or Email"),
    check("key")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຢືນຢັນ")
];

export async function validateResults(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(StatusCodes.OK).json({
            errors: errors.array(),
        });
    next();
}
