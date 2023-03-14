import { sign } from "../../utils/jwt";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { checkUserService, deleteCodeService, generateCodeService, sendVerifyEmailService, updateEmailService, userVerifyService } from "./services";
import { whatsappBotVerifySender } from "../../utils/whatsapp-bot";
import { userCreateService } from "../users/services";

export const userLoginController = async (req: Request, res: Response) => {
    let username: string = req.body["username"];
    const loginBy: string = req.body["loginBy"];


    try {
        const user = await checkUserService(username);
        if (!user) {
            return res.status(StatusCodes.OK).json({ message: "ຂໍ້ມູນຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ", status: "error" })
        }

        const code = await generateCodeService(username);
        if (!code) {
            return res.status(StatusCodes.OK).json({ message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
        }

        if (loginBy === "whatsapp") {
            const whatsapp = user?.whatsapp || ''
            whatsappBotVerifySender(whatsapp, code)
        } else if (loginBy === "email") {
            // TODO: Call function sens mail
            sendVerifyEmailService(username, code)
        } else {
            return res.status(StatusCodes.OK).json({ status: "error", message: "ຮູບແບບການເຂົ້າສູ່ລະບົບບໍ່ຖືກຕ້ອງ" });
        }


        return res.status(StatusCodes.OK).json({ status: "success" })

    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const userVerifyController = async (req: Request, res: Response) => {
    try {
        const code = req.body.key;
        const receive = req.body.receive;

        const check: any = await userVerifyService(code, receive);
        if (!check || check.length === 0) {
            return res.status(StatusCodes.OK).json({ message: "ລະຫັດບໍ່ຖືກຕ້ອງ", status: "error" })
        }

        const user = await checkUserService(receive)
        deleteCodeService(receive)

        if (!user.name) {
            return res.status(StatusCodes.OK).json({ message: "ຂໍ້ມູນຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ", status: "error" })
        }

        console.log('userVerifyController ', user)
        if (user && user.status !== 'On') {
            return res.status(StatusCodes.OK).json({ message: "ບັນຊີຂອງທ່ານ ຖືກລະງັບການໃຊ້ງານ ຊົ່ວຄາວ", status: "error" })
        }

        const _user = {
            name: user.name,
            u_id: user.u_id,
            email: user.email,
            whatsapp: user.whatsapp,
            role: user.role,
        }

        let response = {
            status: "success",
            user: _user,
            token: '',
        };

        const token = await sign(_user);
        response = { ...response, token, status: "success" }

        console.log(response)
        return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const userUpdateEmailController = async (req: Request, res: Response) => {

    const u_id = req.body.u_id
    const email = req.body.email
    const created_at = req.body.created_at


    const result: any = await checkUserService(email);
    console.log("7777 ", result)
    if (result.check_user) {
        return res.status(StatusCodes.OK).json({
            status: "error",
            message: "Email ມີໃນລະບົບແລ້ວ ກະລຸນາໃຊ້ເມວອື່ນ",
        });
    }

    const user: any = await updateEmailService(
        u_id,
        email,
        created_at,
    )

    console.log(user)

    if (!user) {
        return res.status(StatusCodes.OK).json({
            status: "error",
            message: "ອັບເດດ Email ຜິດພາດ",
        });
    }

    const code = await generateCodeService(email);
    if (!code) {
        return res.status(StatusCodes.OK).json({ message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
    }

    try {
        // TODO: call function to send email
    } catch (error) {
        console.log("send whatsapp error ", error)
    }

    return res.status(StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
};

export const userRegisterController = async (req: Request, res: Response) => {

    const name = req.body.name
    const whatsapp = req.body.whatsapp
    const email = req.body.email
    const role = "Member"
    const created_at = req.body.created_at

    const resultW: any = await checkUserService(whatsapp);

    if (resultW.check_user) {
        return res.status(StatusCodes.OK).json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
        });
    }

    const resultE: any = await checkUserService(email);

    if (resultE.check_user) {
        return res.status(StatusCodes.OK).json({
            status: "error",
            message: "Email ນີ້ມີໃນລະບົບແລ້ວ",
        });
    }

    const user: any = await userCreateService({
        name,
        whatsapp: whatsapp,
        role,
        email,
        created_at,
        last_login: created_at
    })

    if (!user) {
        return res.status(StatusCodes.OK).json({
            status: "error",
            message: "ການລົງທະບຽນຜິດພາດ",
        });
    }

    const code = await generateCodeService(whatsapp);
    if (!code) {
        return res.status(StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
    }

    try {
        whatsappBotVerifySender(whatsapp, code)
    } catch (error) {
        console.log("send whatsapp error ", error)
    }

    return res.status(StatusCodes.OK).json({ status: "success", message: " " });
};

export const userResendCodeEmailController = async (req: Request, res: Response) => {

    const email = req.body.email
    console.log(email)

    const code = await generateCodeService(email);
    if (!code) {
        return res.status(StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
    }

    try {
        await sendVerifyEmailService(email, code)
        return
    } catch (error) {
        console.log("send email error ", error)
        return
    }

    return res.status(StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
};

export const userResendCodeWhatsappController = async (req: Request, res: Response) => {

    const whatsapp = req.body.whatsapp

    const code = await generateCodeService(whatsapp);
    if (!code) {
        return res.status(StatusCodes.OK).json({ status: "success", message: "ການສ້າງ ລະຫັດຜິດພາດ ລອງໃໝ່ອີກຄັ້ງ" })
    }

    try {
        whatsappBotVerifySender(whatsapp, code)
    } catch (error) {
        console.log("send whatsapp error ", error)
    }

    return res.status(StatusCodes.OK).json({ status: "success", message: "ການລົງທະບຽນ ສຳເລັດ" });
};

export const getMeController = async (req: Request, res: Response) => {

    let user = req.body.user
    console.log('========================= USER REFRESH =======================================')
    console.log(user)

    return res.status(StatusCodes.OK).json({ status: "success", user });
};
